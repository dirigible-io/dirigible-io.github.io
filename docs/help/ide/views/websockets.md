---
title: Websockets
description: Active WebSocket sessions on the running platform.
---

# Websockets

Lists every WebSocket session currently held by the JVM. Read-only. Useful for confirming a client connected and for spotting leaked sessions.

## Backing data

`WebsocketsFacade.getClients()` - the same registry that backs `@aerokit/sdk/net/websocket` on the server side. Sessions are enumerated live; the view polls.

## Columns

- **Session id** - the container-assigned id (used for targeted sends).
- **Handler** - the user `.websocket` artefact handling the session, or the built-in IDE handler for system channels.
- **Endpoint** - the URL pattern the client connected to.
- **Peer** - remote address.
- **Created** - session open timestamp.
- **Creator** - authenticated user (or anonymous).

## System sessions

The IDE itself holds several long-lived sessions, for example:

- `/websockets/ide/java-debug` - DAP bridge for the Java debugger.
- Terminal channels (`ttyd` on port 9000).
- Log streaming.

These appear alongside user `.websocket` sessions and are expected.

## Related

- [Websocket artefacts](/help/develop/websockets)
- API: [`@aerokit/sdk/net/websocket`](/api/net/websockets)
- [Java debugger view](/help/ide/views/debugger-java)
