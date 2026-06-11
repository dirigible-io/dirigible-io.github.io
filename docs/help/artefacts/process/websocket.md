---
title: WebSocket endpoint
description: STOMP-over-WebSocket handler binding. *.websocket artefact.
---

# WebSocket endpoint

`*.websocket` binds a JS / TS handler to a STOMP-over-WebSocket endpoint.

- **File format.** JSON descriptor.
- **Synchronizer.** `WebsocketsSynchronizer`.
- **Engine.** `engine-websockets`.
- **Editor.** [Websockets editor](/help/ide/editors/websockets).
- **URL.** Reachable at `/websockets/stomp/<endpoint>`.
- **See also.** [Java `@Websocket`](/help/develop/websockets) - annotation-based alternative for client Java.

## File format

```json
{
  "location": "/myproject/websockets/notifications.websocket",
  "handler": "myproject/websockets/notifications-handler.js",
  "endpoint": "notifications",
  "description": "Push notifications stream"
}
```

| Field | Purpose |
| --- | --- |
| `location` | Registry path of the descriptor. |
| `handler` | Registry path of the JS / TS module. Called on `onOpen`, `onMessage`, `onClose`, `onError`. |
| `endpoint` | URL suffix. The endpoint above is reached at `/websockets/stomp/notifications`. |
| `description` | Free text. |

The handler module dispatches on a `method` variable in scope (`onOpen` / `onMessage` / `onClose` / `onError`). Use [`@aerokit/sdk/net/websocket`](/api/net/websockets) to send frames back to the client.

## Java alternative - `@Websocket`

A client `.java` class annotated with `@Websocket(endpoint = "notifications")` registers without a `.websocket` artefact. See [WebSockets](/help/develop/websockets).
