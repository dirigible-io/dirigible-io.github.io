---
layout: samples
title: Websocket
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

Version 2.x
---

### Develop


1. Create a new project and name it **websocket_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **websocket_basic.js**).
6. Replace the generated code in **websocket_basic .js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var globals = require("core/globals");
	var websocket = require("net/websocket");
	var context = require("core/context");

	var websocketSession = websocket.getSession();
	var type = context.get("type");
	var from = context.get("from");
	var to = context.get("to");
	var message = context.get("message");

	if (type == "welcome") {
		websocketSession.sendText("Welcome " + from + "!");
		globals.set("chat-session-" + from, websocketSession);
		var chatMembers = globals.get("chat-members");
		if (chatMembers === null) {
			chatMembers = [];
			globals.set("chat-members", chatMembers);
		}
		chatMembers.push(from);
		console.error("registered " + from);
	}

	if (type == "message") {
		var toSession = globals.get("chat-session-" + to);
		if (toSession !== null) {
			toSession.sendText(message);
			console.error("send to " + to);
		} else {
			console.error("no session for " + to);
		}
	}

	if (type == "list") {
		var chatMembers = globals.get("chat-members");
		console.error("list: " + JSON.stringify(chatMembers));
		websocketSession.sendText(JSON.stringify(chatMembers));
	}


	/**
	-- Client 1
	var jsSocket = new WebSocket("ws://localhost:8080/service/js");
	jsSocket.send('{"module": "/chat/chat_service.js","params": {"type":"welcome", "from":"Tom"}}');
	-- Client 2
	var jsSocket = new WebSocket("ws://localhost:8080/service/js");
	jsSocket.send('{"module": "/chat/chat_service.js","params": {"type":"welcome", "from":"Jerry"}}');
	-- Client 1
	jsSocket.send('{"module": "/chat/chat_service.js","params": {"type":"message", "from":"Tom", "to":"Jerry", "message": "Hello Jerry!"}}');
	-- Client 2
	jsSocket.send('{"module": "/chat/chat_service.js","params": {"type":"message", "from":"Jerry", "to":"Tom", "message": "Hi Tom!"}}');
	jsSocket.send('{"module": "/chat/chat_service.js","params": {"type":"list", "from":"Tom"}}');
	*/
	
```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/web/registry/anonymous.html?git=https://github.com/dirigiblelabs/sample_net_websocket_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/websocket.html">API</a>
</div>

### Discover

To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
