---
title: Websockets Editor
description: Editor for `.websocket` endpoint-binding artefacts.
---

# Websockets Editor

Editor for `*.websocket` artefacts. A websocket binding exposes a server WebSocket endpoint and routes each frame to a handler module. Served by `engine-websockets`.

Component: `editor-websockets`. Synchronizer: `WebsocketsSynchronizer`.

## Artefact shape

```json
{
    "endpoint": "trade-feed",
    "handler": "trading/websockets/trade-feed-handler.ts",
    "description": "Live trade feed"
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `endpoint` | yes | Endpoint suffix. The full URL is `ws://<host>/websockets/<endpoint>`. |
| `handler` | yes | Repository path to the handler module. TS / JS via `engine-javascript`, Java via `engine-java`. |
| `description` | no | Human-readable description. |

The handler exports lifecycle callbacks (`onOpen`, `onMessage`, `onClose`, `onError`) invoked by the engine on each session event.

## Editor fields

- **Endpoint** - the URL suffix.
- **Handler** - file picker.
- **Description**.

## Runtime

Active sessions are visible in the [Websockets view](/help/ide/views/websockets) (location, endpoint, handler, created-at, creator).

## See also

- [Websocket artefact](/help/artefacts/process/websocket)
- [`@aerokit/sdk/net/websocket`](/sdk/net/websockets)
