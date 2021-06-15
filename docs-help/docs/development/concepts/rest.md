---
title: REST
---

REST
===

The http-rs module is designed to define and run a broad range of HTTP REST services.

A very simple example `hello-api.js`:

```javascript
var rs = require("http/v4/rs");

// serve GET HTTP requests sent to resource path "" (i.e. directly to hello-api.js)
rs.service()
    .resource("")
      .get(function(ctx, request, response){
         response.println("Hello there!");
       })
  .execute();
```

Sending a `GET` request to `/services/v4/js/test/hello-api.js` to the server and hosting the `hello-api.js` piece of code above in `test/hello-api.js` will return response body:

> `Hello there!`  

## Overview

Let’s have a closer look at the methods shown in the example above.

First, we requested a new REST service instance from the framework:  

> rs.service()  

Next, we configured the instance to serve HTTP GET requests sent to root path  `("")` using the supplied function:  

```javascript
.resource("")
  .get(function(ctx, request, response){
    response.println("Hello there!");
  })
```

Technically, configuration is not required to execute a service, but obviously it will do nothing, if you don't instruct it what to do. 

Finally, we run the service and it processes the HTTP request:  

> .execute();

Now, this is a fairly simplistic example aiming to give you a hint of how you can bring up a REST API to life with http-rs. There is a whole lot more that we shall explore in the next sections.

## Creating REST services  

> rs.service()  

Creating new service instances is as simple as invoking `rs.service()`. That returns a configurable and/or executable instance of the HttpController class. The controller API allows to:
- start configuring REST service (method `resource()`) 
- serve requests (method `execute()`) 
- perform a couple of more advanced activities, which will be reviewed in the [Advanced](#advanced) section below 

Additionally, the controller API features also shortcut factory methods that are useful for simplistic configurations (like the one in our initial example) such as `get(sPath, fServe, arrConsume, arrProduces)`. Read below for more examples how to use the methods.

## Serving requests

> execute()

The mechanism for serving requests is implemented in the `execute()` method of the HttpController. It tries to match the request to the service API configuration.

* If the mechanism matches the request successfully, it triggers the execution flow of the callback functions. The execution flow processes the request and response. 
* If the mechanism doesn't match the request successfully, it sends a Bad Request error to the client. 

The request and response objects are implicitly those that were used to request the script where the `execute()` method invocation occurred. But they can be exchanged for others as shown in the [Advanced](#advanced) section. 

The `execute()` method is defined in the service instance (class HttpController) obtained with `rs.service()`. The `execute()` method can be triggered with `rs.service().execute()`. The `rs` API configuration also provides numerous references to the method so you can invoke it on any stage. For example,

```javascript
rs.service().get("").execute()  
rs.service().resource("").get().execute()  
rs.service().resource("").get().produces(["text/json"]).execute()
```  

are all valid ways to serve requests.

What you need to consider is that `execute()` must be the final method invocation. Even if you retain a reference to a configuration object and change it after that, it will be irrelevant since the response will be flushed and closed by then.

## Configuring services

There are three options as far as configuration is concerned.

- You can start from scratch and build the configuration using the `rs` API.
- You can use configuration objects. They are holding the configuration that the `rs` API produces.
- You can start with a configuration object and then enhance or override the configuration using the `rs` API. 

!!! Info "Configuration objects"
	A configuration object is a JS object with canonical structure that the *http-rs* can interpret. We will discuss its schema later on in this guide. For now, let's just consider that it's the same thing that the rs-fluent API will actually produce behind the scenes so it's a completely valid alternative and complement to the rs-fluent API configuration approach.
	Refer to the [Advanced](#advanced) section for more details on using configuration objects.

### Defining service resources

> resource(sPath, oConfiguration?)

Resources are the top-level configuration objects that represent an [HTTP (server) resource](https://en.wikipedia.org/wiki/Web_resource), for which we will be defining a protocol. Each resource is identified by a URL on the server. You can have multiple resources per service configuration, provided that their URLs do not overlap.

!!! Info "Resource vs Path vs Resource Path"
	As per the REST terms, a resource is an abstraction or a server-side resource that can be a file, a dynamically generated content, or a procedure (although the last is considered heresy by purists). It's virtually anything hosted on a server that has an address and can be accessed with a standard HTTP method. It is often referred to as "path" or "resource path" due to its singular most notable identifying characteristic. But to be precise, "path" is only a property of the resource. As far as configuration is concerned, the resource defines the configuration scope for which we define method handlers and constraints, and is identifiable by its "path" property.

### Resource paths and path templates

The `sPath` string parameter (mandatory) of the `resource()` method will serve as the resource URL. It is relative to the location where the JavaScript service is running (e.g. `/services/v4/my-application/api/my-service.js`). No path (`""`), request directly to the JavaScript service root (`""`) path.
The path can also be a URL template, i.e. parameterized.  
For example consider the path template:  

> {id}/assets/{assetType}/{name}  

This will resolve request paths such as:

> /services/js/test.js/1/assets/longterm/building 

to service path:

> 1/assets/longterm/building  

If a request is matched to such path, the service mechanism will provide the resolved parameters as an object map to the function that handles the request. Using the sample path above the path parameters object will look like this:

```json
{
  "id": 1,
  "assetType": "longterm",
  "name": "building"
}
```

### Defining HTTP methods allowed for a resource

```javascript
resource.get()  
resource.post()  
resource.put()  
resource["delete"]() and resource.remove()    
resource.method()
```

By default, only the HTTP request methods that you have configured for a resource are allowed. The fluent API of Resource instances, obtained with the `resource(sPath)` method that we discussed above, exposes the most popular REST API methods (`get`,`post`,`put` and `delete`). They are simply aliases for the generic method `method`.
Whichever we consider, we will receive a ResourceMethod instance from the invocation and its API will allow us to specify processing functions and further specify constraints on the request/response for which they are applicable:

> rs.resource('').get().produces(["application/json"]).serve(function(){})

Alternatively, as we have already seen, we can supply the `serve` callback function directly as first argument to the method, which comes in handy if we have nothing more to setup:  

> rs.resource('').get(function(){})

We can also use configuration object as a third option and this will be discussed in the [Advanced](#advanced) section.  
The samples here are all for configuring HTTP GET Method but the usage pattern is still the same for all:  

> rs.resource('').post().consumes(["application/json"]).serve(function(){})

#### Shortcuts

You already noticed that instead of explicitly using `serve` to configure callback for serving the requests we could directly provide the function as argument to the method configuring the HTTP method (e.g. `get`). 

> rs.resource('').get(function(){})   
> rs.resource('').get().serve(function(){})

So why bother provisioning an explicit `serve()` function in the first place then? The answer is that `serve()` configures only one of the callback functions that are triggered during the request processing flow. And this *shortcut* is handy if it is only `serve()` that you are interested into configuring. Of course, nothing prevents you also from using the shortcut and still configure the other callback functions, unless you find it confusing. These are all valid options. Find out more about configuring request processing callback functions in the section dedicated to this.

When the controller API was discussed, it was mentioned that there are shortcut factory methods that combine a couple operations to produce directly a method handler for a resource path.

Example

```javascript
rs.service()
.get("", function(ctx, request, response) {
  response.print('ok');
})
.execute();
```

That would be equivalent to the following:

```javascript
rs.service()
    .resource("")
      .get(function(ctx, request, response){
         response.print('ok');
      })
.execute();
```

These shortcut methods share the same names with those in `Resource` that are used for defining HTTP method handlers: `get`, `post`, `put`, `delete` and its alias `remove`, but differ in signature (first argument is a string for the resource path) and the return type (the HttpController instance, instead of ResourceMethod).

They are useful as a compact mechanism if you intend to build something simple and simplistic, such as a single resource and one or few handler functions for it. You will not be able to go much further with this API so if you consider anything even slightly more sophisticated you should look into the fluent API of `resource` instead: `rs.service().resource("")`.

!!! Note
	Note that the scope of these shortcut methods is the controller, not the resource. That has effect on the method chaining. For clean code, do not confuse despite the similar names and avoid mixing them.

### Defining content types that an API consumes and produces

```javascript
rs.resource("").get().produces("[application/json]")  
rs.resource("").post().consumes("[application/json]")  
rs.resource("").put().consumes("[application/json]").produces("[application/json]")
```  

Optionally, but also quite likely, we will add some constraints on the data type consumed and produced by the resource method handler that we configure.   
At request processing runtime, these constraints will be matched for compatibility against the HTTP request headers before delegating to the handler processing function. You can use wildcards (*) in the MIME types arguments both for type and sub-type and it will be considered as anything during the execution:  

```javascript
rs.resource("").post().consumes("[*/json]")  
rs.resource("").post().consumes("[*/*]")
```  

### Request processing flow and events
Before we continue, let us take a look at the request processing flow.  

1. The request is matched against the resource method handling definitions in the configuration and if there is a compatible one it is elicited for execution. Otherwise, a Bad request error is returned back to the client.  
2. The `before` callback function is invoked if any was configured.
3. The `serve` callback function is invoked if any was configured.
4. If an `Error` was thrown from the `serve` function, a `catch` callback function is invoked. The callback function is either configured or the default one.
5. A `finally` (always executed) function is invoked if one was configured.

Or in pseudocode:

```javascript
try {
  before(ctx, request, response, resourceMethod, controller);
  serve(ctx, request, response, resourceMethod, controller);
} catch(err){
  catch(ctx, err, request, response, resourceMethod, controller);
} finally {
  finally();
}
```

As evident form the flow, it is only the `serve` event callback handler function that is required to be setup. But if you require fine grained reaction to the other events, you can configure handlers for each of those you are interested in.
Currently, the API supports a single handler function per event so in multiple invocation of a setup method on the same resource method only the last will matter.

### Defining event handling functions

```javascript
resource.get().before(function(ctx, request, response, resourceMethod, controller){
  //Implements pre-processing logic
})
resource.get().serve(function(ctx, request, response, resourceMethod, controller){
  //Implements request-processing logic
})
resource.get().catch(function(ctx, error, request, response, resourceMethod, controller){
  //Implements error-processing logic overriding the default
})  
resource.get().finally(function(){
  //Implements post-processing logic regardless of error or success of the serve function
})
```

A valid, executable resource method configuration requires at least the `serve` callback function to be setup:  

```javascript
resource.get().serve(function(ctx, request, response){
   response.println('OK');
});
```
The rest are optional and/or have default implementations.  

Errors thrown from the `before` and `serve` callbacks are delegated to the `catch` callback. There is a default `catch` callback that sends formatted error back in the response and it can be overridden using the `catch` method to setup another error processing logic. The `finally` callback is invoked after the response has been flushed and closed (regardless if in error or success) and can be used to cleanup resources.  
Example:  

```javascript
rs.service().resource("")
  .get()
    .before(function(ctx, request, response){
       request.setHeader('X-arestme-version', '1.0');
    })
    .serve(function(ctx, request, response){
       response.println('Serving GET request');
    })
    .catch(function(ctx, err, request, response){
       console.error(err.message);
    })
    .finally(function(){
       console.info('GET request processing finished');
    })
```



## Advanced

### Using configuration objects

Configuration objects are particularly useful when you are enhancing or overriding an existing protocol so you don't start configuring from scratch but rather amend or change pieces of the configuration. It is also useful when you are dealing with dynamically generated HTTP-based protocol configurations. 
For example, consider the simple sample that we started with. It is completely identical with this one, which uses a configuration object and provides it to the `service` function:  

```javascript
rs.service({
  "": {
    "get":[{
      "serve": function(ctx, request, response){
         response.println("Hello there!");
       }
    }]
  }
}).execute();
```

It is also completely identical with this one: 

```javascript
rs.service()
  .resource("", {
    "get":[{
      "serve": function(ctx, request, response){
         response.println("Hello there!");
       }
    }]
  }).execute();
```

or this one:

```javascript
rs.service()
  .resource("")
    .get([{
        "serve": function(ctx, request, response){
          response.println("Hello there!");
        }
     }]).execute();
```

In fact, here is a sample how to define a whole API providing configuration directly to the service method and then enhance it. 

```javascript
rs.service({
  "": {
    "get":[{
      "serve": function(ctx, request, response){
         response.println("Hello there!");
       }
    }]
  }
})
.resource("")
    .post()
      .serve(function(ctx, request, response){
         console.info(request.readText());
       })
.execute();
```

In this way we essentially are exploiting the fluent API to configure a service but we will not start from scratch. Many of the API methods accept as a second argument configuration object and this doesn't prevent you to continue the API design with fluent API to enhance or override it.

### The sendError method in HttpController
The HttpController class instances that we receive when `rs.service()` is invoked, features a sendError method. It implements the logic for formatting errors and returning them back to the client taking into account its type and content type preferences. 
Should you require to change this behavior globally you can redefine the function. If you require different behavior for particular resources or resource method handlers, then using the `catch` callback is the better approach.  
Sometimes it's useful to reuse the method and send error in your handler functions. The standard request processing mechanism in HttpController does not account for *logical* errors. It doesn't know for example that a parameter form a client input is out of valid range. For such cases you would normally implement validation either in `before` event handler or in serve. And if you need tighter control on what is sent back, e.g. the HTTP code you wouldn't simply throw an Error but invoke the sendError function with the right parameters yourself. For these purposes the last argument of each event handler function is conveniently the controller instance.

```javascript
rs.service().resource("")
  .get()
    .before(function(ctx, request, response, methodHandler, controller){
       //check if requested file exists
       if(!file.exists()){
         controller.sendError();
       }
    })
    .serve(function(){
      //return file content
    })
```

### Defining readonly APIs

> mappings.readonly()  

An obvious way of defining readonly APIs is to use only `GET` resource methods definitions. In some cases though APIs can be created from external configuration that also contains other resource method handlers, or we can receive an API instance from another module factory, or we want to support two instances of the same API, one readonly and one with edit capabilities, with minimal code. In such cases, we already have non-GET resource methods that we have to get rid of somehow. Here the readonly method steps in and does exactly this - removes all but the GET resource handlers if any. 

Example:  

```javascript
rs.service()
  .resource("")
    .post()
      .serve(function(){});
    .get()
      .serve(function(){});
  .readonly()
    .execute();
```

If you inspect the configuration after `.readonly()` is invoked (use `resource("").configuration()`) you will notice that the post verb definition is gone. Consecutively, POST requests to this resource will end up in Bad Request (400).
Note that for this to work, this must be the last configuration action for a resource. Otherwise, you are resetting the resource configuration to readonly, only to define write methods again.
The readonly method is available both for ResourceMapping and Resource objects returned by either invocations of service `mappings()` method or retained references from configuration API invocations.

### Disabling a ResourceMethod Handler

> api.disable(sPath, sVerb, arrConsumesTypes, arrProducesTypes)

Similar to the use cases explored for the readonly method above yo might not be in full control of the definition of the API, but rather takeover at some point. Similar to the readonly method, this one will remove the handler definition identified by the four parameters - resource path, resource verb, consumes constraint array (not necessarily in same order), produces constraint array (not necessarily in same order), but it will do it for any verb, not only `GET`. In that sense readonly is a specialization of this one only for `GET` verbs.  

Example:

```javascript
var mappings = rs.service({
  "": {
    "post": [{
      serve: function(){}
    }],
    "get": [{
      serve: function(){}
    }]
  }
}).mappings();
mappings.disable("", "post");
```

With this API definition, invoking `mappings.find("","get")` will return a reference to the only get handler defined there and you can manage it. Note that you get a reference to the configuration and not an API.

Example:

```javascript
// add produces constraint and redefine the serve callback
var mappings = rs.service().get(function(){}).mappings();
//later in code
var handler = mappings.find("", "get");
handler.produces = ["application/json"]
handler.serve = function(){
  console.info("I was redefined");
}
```


### Executing service with explicit request/response arguments

The request and response parameters of the execute method are optional. If you don't supply them, the service will take the request/response objects that were used to request the script. Most of the time this is what you want. However, supplying your own request and response arguments can be very handy for testing as you can easily mock and inspect them.

### Fluency for execute method
The `execute` method is defined by the service instance (HttpController) obtained with `rs.service()` and can be executed with: `rs.service().execute()`. The fluent configuration API also provides references to the method, so you can actually invoke it on any stage. Examples:  

```javascript
rs.service().resource("").get(function(){}).execute()
rs.service().resource("").get().serve(function(){}).execute()
rs.service().resource("").get().produces(["text/json"]).serve(function(){}).execute()
```

```javascript
rs
  .service()
    .resource("")
      .produces(["application/json"])
      .get(function(){})
    .resource("")
      .consumes(["*/json"])
      .post(function(){})
  .execute()
```

### Mappings vs Configurations
The API supplies two methods `mappings()` and `configuration()` that provide configuration in two forms. 
The mappings method supplies typed API objects such as Resource aggregating ResourceMethod instances. To get a reference to a service mappings, invoke mappings on the service instance: 

> rs.service().mappings()

With a reference to mappings you have their fluent API at disposal. This is useful when extending and enhancing the core rs functionality to build dedicated services. For example the HttpController constructor function is designed to accept mappings and if you extend or initialize it internally in another API you will likely need this form of configuration.

An invocation of the configuration method on the other hand provides the underlying JS configuration object. It can be used to supply generic configurations that are used to initialize new types of services as the public fluent API is designed to accept this form of configuration.

Both are represent configuration but while the mappings are sort of internal, *parsed* version, the configuration object is the version that the public api accepts and is also therefore kind of advanced public form of the internal configuration.

It is also possible to convert between the two:  

```javascript
rs.service(jsConfig).mappings()  
rs.service().resource().configuration() 
```

### Finding a ResourceMethod

> rs.service().mappings().find(sPath, sMethod, arrConsumesTypes, arrProducesTypes)

Suppose you want to redefine a handler definition to e.g. change the `serve` callback, add a `before` handler, change or add to the `consumes` media types constraint etc. To do that you need a reference to the handler, which is identified by the four parameters - *resource path*, *resource method*, *consumes constraint array* (not necessarily in same order), *produces constraint array* (not necessarily in same order). On a successful search hit you get a reference to the handler definition and can perform changes on it. 

Example:

```javascript
rs.service()
  .resource("")
    .get(function(){});
```

With this API definition, invoking  

> rs.service().mappings().find("","get")  

will return a reference to the only `get` handler defined there and you can manage it. Note that you get a reference to the configuration and not an API.  

Example:

```javascript
// add produces constraint and redefine the serve callback
var handler = svc.mappings().find("", "get");
handler.produces = ["application/json"]
handler.serve = function(){
  console.info("I was redefined");
}
```

With consumes and produces constraints on a resource method handler, getting a reference will require them specified too.

Example:  

```javascript
var svc = rs.service();
svc.mapings()
  .resource("")
    .post()
      .consumes(['application/json', 'text/json']) 
      .produces(['application/json']) 
      .serve(function(){});

var handler = svc.mapings().find("", "post", ['text/json', 'application/json'], ['application/json']);
```

Note, that the order of the MIME type string values in the consumes/produces array parameters is not significant. They will be sorted before matching the sorted corresponding arrays in the definition.

### Configuring resource with JS object

Having defined a resource with path we have two options for configuring it. We can proceed using its fluent API or we can provision a configuration JS object as second argument to the `resource` method and have it done in one step. Considering the latter, we will be provisioning configuration for this resource only, so it should be an object with method definitions as root members.

```javascript
rs.service()
  .resource("", {
    "get":[{
      "serve": function(ctx, request, response){
         response.println("Hello there!");
       }
    }]
  }).execute();
```

Refer to the next sections for comparison how to achieve the same, using fluent API and/or configuration objects on the lower levels.

## JS Configuration object schema
In progress. Check back later.

Schema:  

```javascript
{
  pathString: {
    methodString: [{
      "consumes": ["types/subtype|*/subtype|type/*|*/*"]
      "produces": ["types/subtype|*/subtype|type/*|*/*"]
      "before": Function
      "serve": Function
      "catch": Function
      "finally": Function
    }]
  }
}
```

- `pathString` is a string that represents the resource path. There could be 0 or more such non-overlapping members.  
- `methodString` is a string for the HTTP resource method. There could be 0 or more such non-overlapping members.  
- The value of methodString is an array of 0 or more objects, each defining a request method processing that will be executed under unique conditions (constraints) that match the request. 
- A component in the methodString array, can consist of constraints (consumes, produces) and request processing flow event handlers (before, serve, catch, finally)  
- `consumes` value is an array of 0 or more strings, each a valid MIME type string formatted as types/subtype. Can be undefined.
- `produces` value is an array of 0 or more strings, each a valid MIME type string formatted as types/subtype. Can be undefined.
- `before`, `serve`, `catch` and `finally` values are functions. Except for the `serve` function, the rest can be `undefined`.

## Building a CRUD rest service
The code snippet below shows a sample design for a REST API for simple CRUD file operations. It has illustrative purposes.  

The service design is to work with files in the HOME directory of the user that runs the dirigible instance currently. Users can create, read, update and delete files by sending corresponding POST, GET, PUT and DELETE requests using the file name as path segment (e.g. `/services/js/file-serivce.js/test.json`) and they can also upload files if they don't specify file name but send multipart-form-data POST request directly to the service (e.g. `/services/js/file-serivce.js`).

Note how the `before` handler is used to validate user has permissions on resources and how it makes use of controller's `sendError` method.

```javascript
var LOGGER = require("log/v4/logging").getLogger('http.filesvc');
var rs = require("http/v4/rs");
var upload = require('http/v4/upload');
var files = require('io/v4/files');
var user = require('security/v4/user');
var env = require('core/v4/env');

var validateRequest = function(permissions, ctx, request, response, methodHandler, controller){
	var filePath = env.get('HOME') + '/' + ctx.pathParameters.fileName;
	if(!files.exists(filePath)){
		LOGGER.info("Requested file "+filePath+" does not exist.");
		controller.sendError(response.NOT_FOUND, undefined, response.HttpCodesReasons.getReason(String(response.NOT_FOUND)), ctx.pathParameters.fileName + " does not exist.");
		return;
	}
	if(permissions){
		var resourcePermissions = files.getPermissions(filePath);
		if(resourcePermissions !== null && resourcePermissions.indexOf(permissions)>-1){
			var loggedUser = user.getName();
			LOGGER.error("User {} does not have sufficient permissions[{}] for {}", loggedUser, files.getPermissions(filePath), filePath);
			controller.sendError(response.UNAUTHORIZED, undefined, response.HttpCodesReasons.getReason(String(response.UNAUTHORIZED)), "User " + loggedUser + " does not have sufficient permissions for " + ctx.pathParameters.fileName);
			return;
		}
	}
	LOGGER.error('validation successfull');
};

var postProcess = function(operationName){
	LOGGER.info("{} operation finished", operationName);
};

rs.service()
	.resource("")
		.post(function(ctx, request, response){
				var fileItems = upload.parseRequest();
				for (var i=0; i < fileItems.size(); i++) {
					var filePath = env.get('HOME') + '/';
					var content;
					var fileItem = fileItems.get(i);
					if (!fileItem.isFormField()) {
						filePath += fileItem.getName();
						content = String.fromCharCode.apply(null, fileItem.getBytes());
					} else {
						filePath += fileItem.getFieldName();
						content = fileItem.getText();
					}
					LOGGER.debug("Creating file" + filePath);
					files.writeText(filePath, content);
				}
				response.setStatus(response.CREATED);
			})
			.before(function(ctx, request, response, methodHandler, controller){
				var loggedUser = user.getName();
				if(files.getOwner(ctx.pathParameters.fileName) !== loggedUser)
					controller.sendError(response.UNAUTHORIZED, undefined, response.HttpCodesReasons.getReason(String(response.UNAUTHORIZED)), loggedUser + " is not owner of " + ctx.pathParameters.fileName);
			})
			.finally(postProcess.bind(this, "Upload"))
			.consumes(["multipart/form-data"])
	.resource("{fileName}")
		.post(function(ctx, request, response){
				var content = request.getText();
				var filePath = env.get('HOME') + '/' + ctx.pathParameters.fileName;
				LOGGER.debug("Creating file " + filePath);
				files.writeText(filePath, content);
				files.setPermissions(filePath, 'rw');
				response.setStatus(response.CREATED);
			})
			.finally(postProcess.bind(this, "Create"))
			.consumes(["application/json"])
		.get(function(ctx, request, response){
				var filePath = env.get('HOME') + '/' + ctx.pathParameters.fileName;
				LOGGER.error("Reading file " + filePath);
				var content = files.readText(filePath);
				response.setStatus(response.OK);
				response.print(content);
			})
			.before(validateRequest.bind(this, 'r'))
			.finally(postProcess.bind(this, "Read"))
			.produces(["application/json"])
		.put(function(ctx, request, response){
				var filePath = env.get('HOME') + '/' + ctx.pathParameters.fileName;
				LOGGER.debug("Updating file " + filePath);
				var content = request.getJSON();
				files.deleteFile(filePath);
				files.writeText(filePath, content);
				response.setStatus(response.ACCEPTED);
			})
			.finally(postProcess.bind(this, "Update"))
			.before(validateRequest.bind(this, 'rw'))
	  		.consumes(["application/json"])
		.remove(function(ctx, request, response){
				var filePath = env.get('HOME') + '/' + ctx.pathParameters.fileName;
				LOGGER.debug("Removing file " + filePath);
				files.deleteFile(filePath);
				response.setStatus(response.NO_CONTENT);
			})
			.before(validateRequest.bind(this, 'w'))
			.finally(postProcess.bind(this, "Delete"))
	.execute();
```

You can find the complete documentation for [http/rs](../../../../api/http/rs/) and [http/rs-data](../../../../api/http/rs-data/) under the API [page](../../../../api/).
