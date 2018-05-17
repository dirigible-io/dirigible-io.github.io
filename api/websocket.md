---
layout: api
title: Websocket
icon: fa-ellipsis-h
---

{{ page.title }}
===

Websocket API provides access to the Session object for management of the bi-directional communication based on Websockets specification.

Version 3.x
---

None yet.

---


Version 2.x
---

- Module: **service/websocket**
- Definition: [/core_api/issues/26](https://github.com/dirigiblelabs/core_api/issues/26)
- Source: [/net/websocket.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/net/websocket.js)
- Status: **beta**

Basic Usage
---

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



Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getSession()**   | Returns the Websocket Session | *WebsocketSession*
**getOpenSessions()**   | Returns the an array of the currently active Websocket Sessions | *array of WebsocketSession*




### Objects

---

#### WebsocketSession


Function     | Description | Returns
------------ | ----------- | --------
**sendText(text)**   | Sends synchronously a text via the Websocket | -
**sendTextAsync(text)**   | Sends asynchronously a text via the Websocket | -
**getId()**   | Returns the ID of this Websocket Session | *string*
**close()**   | Closes this Websocket Session | *string*




Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌


