---
layout: samples
title: Thread Notify
icon: none
group: simple
---

Thread Notify
===

Develop
--

1. Create a new project and name it **thread_notify_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **thread_notify_basic.js**).
6. Replace the generated code in **thread_notify_basic .js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var threads = require('core/threads');
	var response = require('net/http/response');

	response.setContentType("text/plain; charset=UTF-8");
	response.setCharacterEncoding("UTF-8");

	var obj = { 
		syncWait: threads.sync(function () { 
				console.log("I am synchronized waiter");
				this.wait(5000);
				console.log("I waited 5s or I was notified?");
		}),
		syncNotify: threads.sync(function () { 
				console.log("I am synchronized notifier");
				this.notifyAll();
				console.log("I notified all");
		})
	};

	function waitable() {
		// 'syncWait' is a "synchronized" method.
		obj.syncWait();
	};

	function notifyable() {
		// 'syncWait' is a "synchronized" method.
		obj.syncNotify();
	};

	var waiter = threads.create(waitable, "I am the waiter thread");
	console.log(waiter.getName());
	waiter.start();
	console.log("Waiter started.");
	//waiter.join(); // to be able to print to the response

	var notifier = threads.create(notifyable, "I am the notifier thread");
	console.log(notifier.getName());
	notifier.start();
	console.log("Notifier started.");

	response.println("See log...");

	response.flush();
	response.close();
	
```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git=https://github.com/dirigiblelabs/sample_threads_thread_notify_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/threads.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
