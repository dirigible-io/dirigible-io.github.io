---
title: "How the Orion editor is integrated in Dirigible"
author: Yordan Pavlov
author_gh_user: thuf
author_avatar: https://avatars.githubusercontent.com/u/4092083?v=4
read_time: 7 min
publish_date: October 28, 2015
---

Why Orion? How the code-completion is achieved? How the Orion editor is integrated with RAP?

Why Orion?
----

Our choice for using the Orion editor as the primary editor in Dirigible is bases on that it is has the best support and tooling for JavaScript. Also JavaScript is the language of choice for writing services with Dirigible. Beyond these arguments, **Dirigible** and **Orion** are part of the [Eclipse Cloud Development iniciative](https://www.eclipse.org/ecd/), that strives to set up the standarts and the best practices for **"developing in the cloud for the cloud"**. Taking advantage of the open source eco system is key mindset, layed in the foundations of the project.

<br>
<img src="/img/posts/injected_api_in_orion.png" width="700px"/>
<br>

---

Why Tern.js?
----

Tern.js is a code-analysis and code-completion library for JavaScript. It can run both on client-side and on server-side. In order to achive real time proposals and to remove the overhead from server communication, in Dirigible we use Tern.js as a client-side library. In addition to the JavaScript code-completion, Tern.js allows to introduce custom suggestions - the way to integrate and allow code-completion for [Dirigible API](http://www.dirigible.io/help/api.html).

<br>
<img src="/img/posts/injected_api_code_completion.png" width="700px"/>
<br>

---

How is the Injected API integrated in Orion?
----

We use the standard Tern.js approach leveraged by Orion, by declaring objects and functions for code-completion as a JavaScript plugin. You can find the plugin [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/ide/org.eclipse.dirigible.ide.editor.orion/src/org/eclipse/dirigible/ide/editor/orion/api/dirigible.js). After the build of Orion itself, there is a generated [dirigible.json](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/ide/org.eclipse.dirigible.ide.editor.orion/src/org/eclipse/dirigible/ide/editor/orion/api/dirigible.json)  file out of the declarations.

To use and package the embedded Orion editor in Dirigible we need to go over the following steps:

Build the json definition with:
-----

	npm install tern
	git clone orion.client
	git reset --hard origin/stable_20150817

Add your declaration file in ternWorkerCore.js
-----

	orion.client/bundles/org.eclipse.orion.client.javascript/web/node_modules/tern/bin/condense --name dirigible --no-spans --plugin doc_comment --def ecma5 --def browser  dirigible.js > orion.client/bundles/org.eclipse.orion.client.javascript/web/tern/defs/dirigible.json
	mvn clean install
	copy orion.client/build-js/codeEdit > resources

---

How it is integrated with RAP?
----

By using [RAP](https://www.eclipse.org/rap/) scripting capabilities for callbacks, we have client and backend sides communicating via the standard RAP chanel. Thanks to functions like **getText()**, **setText()**, **setDirty()**, **setDebugRow()**, etc., we are on the half of the way. To glue to whole thing to works as one, we have in the backend [EditorWidget.java](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/ide/org.eclipse.dirigible.ide.editor.orion/src/org/eclipse/dirigible/ide/editor/orion/EditorWidget.java) and its coresponding client-side controller [editor.html](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/ide/org.eclipse.dirigible.ide.editor.orion/resources/editor.html).

---

What about Debugging?
----

Last but not least, here comes the integrated [debuggier](http://www.dirigible.io/help/debugger.html) in Dirigible. This was not so easy and trivial part, but finally the Dirigible's debugger uses the Orion editor.

Client-side integration
-----

```java

	...
	function getBreakpointsEnabled() {
	    return breakpointsEnabled;
	}

	function setBreakpointsEnabled(status) {
		breakpointsEnabled = status;
	}

	function loadBreakpoint(breakpoint) {
		handleAddRemoveBreakpoint(breakpoint);
	}


	function setDebugRow(row) {
		editor.setCaretOffset(editor.getLineStart(row));
	}

	function handleAddRemoveBreakpoint(lineIndex) {
		if(typeof(Storage) === "undefined") {
	    	alert("Session storage is not available!")
	    } else if (getBreakpointsEnabled()) {
			var breakpointsArray;
	    	if (sessionStorage.breakpoints) {
	    		breakpointsArray = JSON.parse(sessionStorage.breakpoints);
	    		var index = breakpointsArray.indexOf(lineIndex);
	    		if (index > -1) {
	    			breakpointsArray.splice(index, 1);
	    		    clearBreakpoint(lineIndex);
	    		} else {
	    			breakpointsArray.push(lineIndex);
	    			setBreakpoint(lineIndex);
	    		}
	    	} else {
	    		breakpointsArray = [];
	    		breakpointsArray.push(lineIndex);
	    	    setBreakpoint(lineIndex);
	    	}
		    sessionStorage.breakpoints = JSON.stringify(breakpointsArray);
	    }
	}
	...

```

The whole file can be found [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/ide/org.eclipse.dirigible.ide.editor.orion/resources/editor.html).

Server-side
-----

```java

	...
	new BrowserFunction(browser, "setBreakpoint") {
		@Override
		public Object function(final Object[] arguments) {
			if ((listener != null) && (arguments[0] != null) && (arguments[0] instanceof Number)) {
				listener.setBreakpoint(((Number) arguments[0]).intValue());
			}
			return null;
		}
	};

	new BrowserFunction(browser, "clearBreakpoint") {
		@Override
		public Object function(final Object[] arguments) {
			if ((listener != null) && (arguments[0] != null) && (arguments[0] instanceof Number)) {
				listener.clearBreakpoint(((Number) arguments[0]).intValue());
			}
			return null;
		}
	};

	...
	public void setDebugRow(final int row) {
		execute("setDebugRow", row);
	}

	public void loadBreakpoints(final int[] breakpoints) {
		for (final int breakpoint : breakpoints) {
			execute("loadBreakpoint", breakpoint);
		}
	}

	private void execute(final String function, final Object... arguments) {
		browser.execute(buildFunctionCall(function, arguments));
	}
	...

```

The whole file can be found [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/ide/org.eclipse.dirigible.ide.editor.orion/src/org/eclipse/dirigible/ide/editor/orion/EditorWidget.java).

Special thanks to **Libing Wang** and the **orion-dev** team for helping us with the integration between the debugger and the Orion editor. You can find the whole conversation [here](https://dev.eclipse.org/mhonarc/lists/dirigible-dev/msg00023.html).