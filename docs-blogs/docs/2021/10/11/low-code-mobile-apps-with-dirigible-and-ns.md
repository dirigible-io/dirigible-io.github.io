#Low-code mobile apps with Dirigible and NativeScript

##Webviews sometimes work

Nowadays, modern browsers allow web developers to access more and more native APIs and thus making them a platform good enough too meet more and more needs.

Sometimes though you have a good reason to ask users to install your app on a device without native UI being necessary. And even more - what if you just reuse your web app code? Of course, I am talking about webviews.

####If you are happy with how your app looks in browsers but you need to use platform APIs that are limited for PWAs (like notifications, Bluetooth, Face ID, more offline storage etc.), a webview application with JS-to-native messages would do the trick. 
And it's fairly simple to produce - create a single-view application with a webview and implement some callbacks in both JavaScript and native code ([here](https://medium.com/@JillevdWeerd/creating-links-between-wkwebview-and-native-code-8e998889b503) is how you can do it in iOS).

*If it's simple, why don't you automate it?*

##Step 1: Generate a webview mobile app from Dirigible 
First, let's create a webview app for iOS from scratch. Create a new Xcode project, choose Single View Application and add a WKWebView to your one-and-only UIViewController.

![](/img/posts/20211011/ios-proj-step1.png)

![](/img/posts/20211011/ios-proj-step2.png)

You need to add some boilerplate code to make your WKWebview open a URL.

```
import SwiftUI
import WebKit

struct ContentView: View {
    var body: some View {
        Webview(url: URL(string: "https://www.dirigible.io/")!)
    }
}

struct Webview: UIViewRepresentable {
    let url: URL

    func makeUIView(context: UIViewRepresentableContext<Webview>) -> WKWebView {
        
        let config = WKWebViewConfiguration()
        let webview = WKWebView(frame: CGRect.zero, configuration: config)

        let request = URLRequest(url: self.url)
      
        webview.load(request)
        return webview
    }

    func updateUIView(_ webview: WKWebView, context: UIViewRepresentableContext<Webview>) {
        let request = URLRequest(url: self.url, cachePolicy: .returnCacheDataElseLoad)
        webview.load(request)
    }
}
```

Therefore, this works with the public URL of your deployed app.

![](/img/posts/20211011/dirigible-io-webview.gif)


Now you can go ahead and publish your app in the App Store.

*If we change just the WKWebView URL, it should be really simple to automate it.*

Let's go through the steps that need to be automated:

1. Create a Xcode project template to build the app from. In this project, we update the URL in the webview configuration code to match the public index URL of our app.
2. Replace the URL in the webview configuration code with the public index URL of our app.
3. Build and archive the iOS application.
4. Send the archived application to a user via the Dirigible UI.

**Step 1.** We already did that, but let's add a placeholder for the app URL, which we will be updating using a regex.

For steps **2.** and **3.** I created a **Node.js** script that you can get from [here](https://github.com/dirigiblelabs/mobile-gen) and play with it.

For **Step 4.** I created an endpoint in [TransportProjectRestService.java](https://github.com/eclipse/dirigible/blob/master/modules/services/service-transport/src/main/java/org/eclipse/dirigible/runtime/transport/service/TransportProjectRestService.java):

```
@GET
	@Path("/project/{workspace}/{project}/ios")
	@ApiOperation("Generate ipa file")
	@ApiResponses({ @ApiResponse(code = 200, message = "Project Exported") })
	public void exportProjectIos(@Suspended AsyncResponse asyncResponse, @ApiParam(value = "Name of the Workspace", required = true) @PathParam("workspace") String workspace,
								 @ApiParam(value = "Name of the Project", required = true) @PathParam("project") String project, @QueryParam("previewUrl") String previewUrl) throws RepositoryExportException {
		String user = UserFacade.getName();
		if (user == null) {
			asyncResponse.resume(createErrorResponseForbidden(NO_LOGGED_IN_USER));
		}
		String appUrl = previewUrl + project + "/index.html";
		ProcessBuilder pb = new ProcessBuilder("node", APP_GENERATOR_SCRIPT_PATH, "generate", appUrl);
		pb.inheritIO();
		try {
			Process p = pb.start();
			CompletableFuture onProcessExit = p.onExit();
			onProcessExit.get();
			onProcessExit.thenAccept(ph -> {
				ByteArrayOutputStream baos = null;
				baos = new ByteArrayOutputStream();
				ZipOutputStream zipOut = new ZipOutputStream(baos);
				File fileToZip = new File(GENERATED_APP_BUILD_PATH);

				try {
					zipFile(fileToZip, fileToZip.getName(), zipOut);
				} catch (IOException e) {
					e.printStackTrace();
				}
				try {
					zipOut.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
				asyncResponse.resume(Response.ok().header("Content-Disposition",  "attachment; filename=\"" + project + "-" + "build.zip\"").entity(baos.toByteArray()).build());
			});
		} catch(IOException e) {
			asyncResponse.resume(Response.noContent().build());
		} catch (ExecutionException e) {
			e.printStackTrace();
			asyncResponse.resume(Response.noContent().build());
		} catch (InterruptedException e) {
			e.printStackTrace();
			asyncResponse.resume(Response.noContent().build());
		}
	}
```

It does the following:

1. Gets the public URL of the Dirigible app from the request parameters.
2. Calls the Node.js script with the URL as a parameter.
3. Archives the contents of the **build** folder (archived iOS artifacts).
4. Sends the .zip in the response.


Now we need some front-end stuff. I went for the simplest way possible - added a new **Export iOS app** in the project right-button menu ([workspace.js](https://github.com/eclipse/dirigible/blob/master/ide/ui/ide-workspace/src/main/resources/META-INF/dirigible/ide-workspace/workspace.js)). 

The result:

![](/img/posts/20211011/export-ios-button.gif)

And when we load the app in the iOS Simulator:

![](/img/posts/20211011/export-webview-no-native.gif)

##Step 2: Call native APIs from the Dirigible app

At the beginning of this post, I talked about messages between JS and native code but this would require a bunch of code for handling different scenarios. Fortunately, there is a better way.

**NativeScript's runtime allows native calls from JavaScript while keeping the exact same class, methods and property names as you are writing native code.** 

This practically eliminates any need for learning bridge-specific APIs and if you want to do a native call, you can just refer to the corresponding docs. 

For example, this is how we initialize a *UIViewController* in Objective-C:

```
UIViewController* vc = [UIViewController alloc] init];
```

Using NativeScript it becomes:

```
let vc = UIViewController.alloc().init();
```

Since the NativeScript runtime works in a separate thread, we can't share context between it and our web app. That's why it provides [worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)-like interface. Keep in mind that this interface is still an experimental feature. For example, this is how you can get the model of the device from your Dirigible application:

```
let worker = new NSWorker("postmessage(UIDevice.currentDevice.localizedModel)");
onNativeMessage = function(msg) {
    console.log("Message from native - " + JSON.stringify(msg));
    $('#model').text(JSON.stringify(msg.data));
}
```

To make our Xcode project template project support this some [changes](https://github.com/dirigiblelabs/mobile-gen/commit/e045d19a2e8d7d00711e0191731f5fdaf488ea64) are necessary - add the NativeScript framework and some other build settings in order to build and link the project properly. 

And this is the final result:

![](/img/posts/20211011/final-demo-ns.gif)


What we reviewed in this article is a research topic rather than a fully implemented feature in Dirigible. The generation of mobile apps is certainly coming to Dirigible at some point but there is a lot of work left to make it production-ready. That being said, any feedback, ideas and, of course, contribution will be appreciated.












