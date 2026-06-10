# Websockets

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.net`
- source: [net/Websockets.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/net/Websockets.java)
:::

Outbound STOMP WebSocket client — connect to a remote endpoint, register a registry-resident handler for lifecycle and message events, then optionally publish or query the platform's view of active connections. Useful for bridging Dirigible into another service that exposes a WebSocket interface (an external trading desk, a chat server, an MQTT bridge).

For **inbound** WebSockets (handlers exposed by Dirigible to remote clients) use the `@Websocket` class annotation instead — that gives you `onOpen` / `onMessage` / `onClose` entry points on a Java class.

### Key Features:
- **STOMP outbound** — connect, return a `StompSession` for sends and subscriptions.
- **Connection registry** — inspect active clients by id, handler name, or as JSON.
- **Inbound counterpart** — `@Websocket` annotation for handlers Dirigible serves.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.net.Websockets;
import org.springframework.messaging.simp.stomp.StompSession;

StompSession session = Websockets.createWebsocket("ws://example.com/stomp", "/my-handler");
session.send("/app/echo", "hello".getBytes());

String activeJson = Websockets.getClientsAsJson();
```

## Methods

### createWebsocket()

Opens an outbound STOMP WebSocket connection.

> ```java
> public static StompSession createWebsocket(String uri, String handler)
>     throws DeploymentException, IOException, InterruptedException, ExecutionException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `uri` | `String` | Target WebSocket URL. |
> | `handler` | `String` | Path of a registry handler script invoked on lifecycle and message events. |
>
> ::: info Returns
> - **Type**: `StompSession`
> - **Description**: Live Spring STOMP session — use it to send or subscribe.
> :::

### getClients()

Returns all active client connections known to the platform.

> ```java
> public static List<WebsocketClient> getClients();
> ```
>
> ::: info Returns
> - **Type**: `List<WebsocketClient>`
> - **Description**: All active WebSocket clients.
> :::

### getClientsAsJson()

Same as `getClients()` but serialised to JSON for easy forwarding.

> ```java
> public static String getClientsAsJson();
> ```

### getClient()

Finds a client by id.

> ```java
> public static WebsocketClient getClient(String id);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `String` | Client id. |
>
> ::: info Returns
> - **Type**: `WebsocketClient`
> - **Description**: The matching client, or `null`. |
> :::

### getClientByHandler()

Finds a client by its registered handler path.

> ```java
> public static WebsocketClient getClientByHandler(String handler);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `handler` | `String` | Handler path. |
>
> ::: info Returns
> - **Type**: `WebsocketClient`
> - **Description**: The matching client, or `null`. |
> :::
