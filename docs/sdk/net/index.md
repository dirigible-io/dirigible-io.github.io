# net/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.net`
- source: [net/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/net)
:::

This module exposes minimal helpers for SOAP traffic and STOMP WebSockets, plus the `@Websocket` annotation that turns a client class into an inbound WebSocket handler.

The main components of this module are:
- **Soap**: Static helpers built directly on `jakarta.xml.soap` — create / parse / invoke SOAP messages.
- **Websockets**: Static facade for outbound STOMP WebSocket clients and inspecting active connections.
- **@Websocket**: Class annotation that marks a Java class as an inbound WebSocket handler managed by the runtime.

## Classes
