---
title: WebSocket
---

WebSocket
===

WebSocket API provides access to the Session object for management of the bi-directional communication based on Websockets specification.

=== "Overview"
- Module: `net/v4/websockets`
- Alias: `net/websockets`
- Definition: [https://github.com/eclipse/dirigible/issues/391](https://github.com/eclipse/dirigible/issues/391)
- Source: [/net/v4/websockets.js](https://github.com/dirigiblelabs/api-net/blob/master/net/v4/websockets.js)
- Facade: [WebsocketsFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-net/src/main/java/org/eclipse/dirigible/api/v4/websockets/WebsocketsFacade.java)
- Status: `stable`


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

### Functions

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
