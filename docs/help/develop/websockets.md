---
title: Websockets
description: Server WebSocket endpoints over STOMP.
---

# Websockets

`engine-websockets` exposes user-defined endpoints under `/websockets/stomp/<suffix>`. Two declaration styles are supported.

## `@Component` endpoint

An endpoint is a `@Component` bean. There are exactly **two** styles. A class uses **one or the other, never both** - the engine rejects a class that mixes them.

**Java**

**Style 1 - self-describing interface.** A `@Component` that implements `WebsocketHandler`. The interface carries the binding itself: `endpoint()` returns the path suffix, and the four lifecycle callbacks (`onOpen` / `onMessage` / `onError` / `onClose`) are `default` no-ops you override only as needed, so **no class-level `@Websocket`** is used. This mirrors Spring's `TextWebSocketHandler`.

```java
package demo.websocket;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.net.WebsocketHandler;

@Component
public class ChatHandler implements WebsocketHandler {

    @Override
    public String endpoint() {
        return "java-chat";
    }

    @Override
    public void onOpen() {
        System.out.println("ChatHandler: client connected");
    }

    @Override
    public void onMessage(String message, String from) {
        System.out.println("ChatHandler: " + from + " says: " + message);
    }

    @Override
    public void onError(String error) {
        System.out.println("ChatHandler: error: " + error);
    }

    @Override
    public void onClose() {
        System.out.println("ChatHandler: client disconnected");
    }
}
```

Override only the callbacks you need; the rest inherit the no-op default. Clients connect at `/websockets/stomp/java-chat`.

**Style 2 - `@Websocket` class with method-level callbacks.** A `@Websocket(endpoint = "…")` class whose lifecycle callbacks are bound by the `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose` method annotations, so the bean only declares the callbacks it needs and can inject collaborators. A non-`void` `@OnMessage` return value is sent back to the client. Note the asymmetry: `@Websocket` remains a **class** annotation here because the endpoint has no method-level home (like Jakarta's `@ServerEndpoint`).

```java
package demo.websocket;

import org.eclipse.dirigible.sdk.net.OnClose;
import org.eclipse.dirigible.sdk.net.OnMessage;
import org.eclipse.dirigible.sdk.net.OnOpen;
import org.eclipse.dirigible.sdk.net.Websocket;

@Websocket(name = "Java Ticker", endpoint = "java-ticker")
public class TickerHandler {

    @OnOpen
    public void opened() {
        System.out.println("TickerHandler: client connected");
    }

    @OnMessage
    public String message(String message, String from) {
        return "tick: " + message;
    }

    @OnClose
    public void closed() {
        System.out.println("TickerHandler: client disconnected");
    }
}
```

Both styles give compile-time signature checking and a direct dispatch path. There is no reflective by-name fallback. See [`/sdk/net/decorators`](/sdk/net/decorators) for details.

**Sample project:** [`dirigiblelabs/sample-java-websocket-decorator`](https://github.com/dirigiblelabs/sample-java-websocket-decorator) - `ChatHandler` (interface style on `java-chat`) and `TickerHandler` (`@Websocket` with `@OnOpen` / `@OnMessage` / `@OnClose`). SDK reference: [`/sdk/`](https://www.dirigible.io/sdk/).

**TypeScript:**

```ts
import { Websocket } from "@aerokit/sdk/net";

@Websocket({ name: "chat", endpoint: "chat" })
export class ChatEndpoint {

  public onOpen() { }
  public onMessage(message: string, sessionId: string) { }
  public onError(error: string) { }
  public onClose() { }
}
```

Reach the endpoint at `/websockets/stomp/chat`.

## `.websocket` artefact

A JSON descriptor pointing at a JS/TS handler module:

```json
{
  "endpoint": "chat",
  "handler": "demo/websockets/chat.js"
}
```

`WebsocketsSynchronizer` reconciles each `.websocket` file into a live endpoint.

## Hot-reload

Both declarations are hot-reloaded - the endpoint is reinstalled on every change.

## See also

- Working sample: [`dirigiblelabs/sample-java-websocket-decorator`](https://github.com/dirigiblelabs/sample-java-websocket-decorator).
- [TypeScript API - net](/api/).
- [Java SDK - net](/sdk/).
- [SDK reference](https://www.dirigible.io/sdk/).
