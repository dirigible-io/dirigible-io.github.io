---
layout: api
title: Websocket
icon: fa-ellipsis-h
---

{{ page.title }}
===

Websocket API provides access to the Session object for management of the bi-directional communication based on Websockets specification.

Version 4.x
---

- Module: **net/v4/websockets**
- Alias: **net/websockets**
- Definition: [https://github.com/eclipse/dirigible/issues/391](https://github.com/eclipse/dirigible/issues/391)
- Source: [/net/v4/websockets.js](https://github.com/dirigiblelabs/api-net/blob/master/net/v4/websockets.js)
- Facade: [WebsocketsFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-net/src/main/java/org/eclipse/dirigible/api/v4/websockets/WebsocketsFacade.java)
- Status: **stable**


### Basic Usage

#### Client

```javascript
var websockets = require("net/v4/websockets");
var uri = "ws://echo.websocket.org:80/";
var handler = "my-project/ws-handler"

function initialize() {
    console.log("Connect to: " + uri);
    var websocket = websockets.createWebsocket(uri, handler);
    websocket.send("hello");
}

initialize();

websockets.getClientByHandler(handler).close();
```

The handler:

```javascript
exports.onOpen = function()  {
  console.log("Connection openned.");
}

exports.onMessage = function(message) {
  console.log("Message received: " + message);
}

exports.onError = function(error) {
  console.error("Error: " + error);
}

exports.onClose = function() {
  console.warn("Connection closed.");
}
```

#### Server

> For example: `my-endpoint.websocket` is using the same **handler** from above

```
{
  "handler": "my-project/ws-handler",
  "endpoint":"my-endpoint",
  "description":"My Websocket"
}
```

then you can call from a browser:

```
var ws = new WebSocket("ws://localhost:8080/websockets/v4/service/my-endpoint");
ws.send('hello');
```

### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**createWebsocket(uri, handler, engine)**   | Creates a WebsocketClient by URI, handler and engine type | *WebsocketClient*
**getClients()**    | Returns the list of the created WebsocketClients | *list of WebsocketClient metadata*
**getClient(id)**   | Returns the client by its id, if exists or null otherwise | *WebsocketClient*
**getClientByHandler(handler)**   | Returns the client by its handler, if exists or null otherwise | *WebsocketClient*
**getMessage()**   | Returns the message in context of OnMessage handler | *string*
**getError()**   | Returns the error in context of OnError handler | *string*
**getMethod()**   | Returns the method type in context of the handler | *onopen, onmessage, onerror, onclose*
**isOnOpen()**   | Returns true in context of OnOpen handler | *boolean*
**isOnMessage()**   | Returns true in context of OnMessage handler | *boolean*
**isOnError()**   | Returns true in context of OnError handler | *boolean*
**isOnClose()**   | Returns true in context of OnClose handler | *boolean*



### Objects

---

#### WebsocketClient

Function     | Description | Returns
------------ | ----------- | --------
**send(message)**   | Sends a text message via the Websocket connection | -
**close()**   | Closes the Websocket connection | -


Compatibility
---

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
---


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


