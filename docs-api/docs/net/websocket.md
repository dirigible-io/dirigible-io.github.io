---
title: WebSocket
---

WebSocket
===

WebSocket API provides access to the Session object for management of the bi-directional communication based on Websockets specification.

=== "Overview"
- Module: `net/websockets`
- Definition: [https://github.com/eclipse/dirigible/issues/391](https://github.com/eclipse/dirigible/issues/391)
- Source: [/net/websockets.js](https://github.com/eclipse/dirigible/blob/master/components/api-net/src/main/resources/META-INF/dirigible/net/websockets.js)
- Status: `stable`
- Group: `platform`


### Basic Usage

#### Client

=== "ECMA6"

    ```javascript
    import { websockets } from "sdk/net"

    const uri = "ws://echo.websocket.org:80/";
    const handler = "my-project/ws-handler"

    function initialize() {
        console.log("Connect to: " + uri);
        let websocket = websockets.createWebsocket(uri, handler);
        websocket.send("hello");
    }

    initialize();

    websockets.getClientByHandler(handler).close();
    ```

<!-- === "CommonJS

    ```javascript
    const websockets = require("net/websockets");

    const uri = "ws://echo.websocket.org:80/";
    const handler = "my-project/ws-handler"

    function initialize() {
        console.log("Connect to: " + uri);
        let websocket = websockets.createWebsocket(uri, handler);
        websocket.send("hello");
    }

    initialize();

    websockets.getClientByHandler(handler).close();
    ```

    The handler:

    ```javascript
    exports.onMessage = function(message) {
      console.log("Message received: " + message);
    }

    exports.onError = function(error) {
      console.error("Error: " + error);
    }
    ``` -->

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
let ws = new WebSocket("ws://localhost:8080/websockets/v4/service/my-endpoint");
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
