---
title: Websockets
description: Server WebSocket endpoints over STOMP.
---

# Websockets

`engine-websockets` exposes user-defined endpoints under `/websockets/stomp/<suffix>`. Two declaration styles are supported.

## `@Websocket` annotation

A class exposing any combination of `onOpen()`, `onMessage(String, String)`, `onError(String)`, `onClose()`.

**Java:**

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.net.Websocket;

@Websocket(name = "chat", endpoint = "chat")
public class ChatEndpoint {

    public void onOpen() { }

    public void onMessage(String message, String sessionId) {
        // route / broadcast
    }

    public void onError(String error) { }

    public void onClose() { }
}
```

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

- [TypeScript API - net](/api/).
- [Java SDK - net](/sdk/).
