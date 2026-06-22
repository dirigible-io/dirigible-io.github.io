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
package com.acme.demo;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.net.WebsocketHandler;

@Component
public class ChatEndpoint implements WebsocketHandler {

    @Override
    public String endpoint() {
        return "chat";
    }

    @Override
    public void onMessage(String message, String sessionId) {
        // route / broadcast
    }

    // onOpen / onError / onClose inherit the no-op default
}
```

**Style 2 - `@Websocket` class with method-level callbacks.** A `@Websocket(endpoint = "…")` class whose lifecycle callbacks are bound by the `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose` method annotations, so the bean only declares the callbacks it needs and can inject collaborators. Note the asymmetry: `@Websocket` remains a **class** annotation here because the endpoint has no method-level home (like Jakarta's `@ServerEndpoint`).

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.net.Websocket;
import org.eclipse.dirigible.sdk.net.OnMessage;

@Websocket(endpoint = "chat")
public class ChatEndpoint {

    @OnMessage
    public void handle(String message, String sessionId) {
        // route / broadcast
    }
}
```

Both styles give compile-time signature checking and a direct dispatch path. There is no reflective by-name fallback. See [`/sdk/net/decorators`](/sdk/net/decorators) for details.

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
