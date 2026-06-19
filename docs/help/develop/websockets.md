---
title: Websockets
description: Server WebSocket endpoints over STOMP.
---

# Websockets

`engine-websockets` exposes user-defined endpoints under `/websockets/stomp/<suffix>`. Two declaration styles are supported.

## `@Websocket` annotation

A class exposing any combination of `onOpen()`, `onMessage(String, String)`, `onError(String)`, `onClose()`.

**Java** - two equivalent styles.

Strong interface - a class annotated `@Websocket` that implements `WebsocketHandler`:

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.net.Websocket;
import org.eclipse.dirigible.sdk.net.WebsocketHandler;

@Websocket(name = "chat", endpoint = "chat")
public class ChatEndpoint implements WebsocketHandler {

    @Override
    public void onMessage(String message, String sessionId) {
        // route / broadcast
    }

    // onOpen / onError / onClose inherit the no-op default
}
```

Method-level - `@Websocket` on a `@Component` bean with the lifecycle callbacks bound by the `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose` method annotations, so the bean only declares the callbacks it needs and can inject collaborators:

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.net.Websocket;
import org.eclipse.dirigible.sdk.net.OnMessage;

@Component
@Websocket(name = "chat", endpoint = "chat")
public class ChatEndpoint {

    @OnMessage
    public void handle(String message, String sessionId) {
        // route / broadcast
    }
}
```

`WebsocketHandler` is the optional typed contract for the four lifecycle callbacks. All its methods are `default` no-ops, so handlers only override what they need - no empty stubs. The method-level `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose` annotations are the alternative. Classes that use neither still work via the legacy method-by-name reflective dispatch. See [`/sdk/net/decorators`](/sdk/net/decorators) for details.

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
