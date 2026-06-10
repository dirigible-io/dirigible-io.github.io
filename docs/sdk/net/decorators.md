# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.net`
- source: [net/Websocket.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/net/Websocket.java)
:::

`@Websocket` marks a client Java class as a WebSocket handler managed by the Dirigible runtime. The annotated class may expose any combination of:

- `onOpen()` — called when a client connects
- `onMessage(String message, String from)` — called for each inbound message
- `onError(String error)` — called on transport or handler error
- `onClose()` — called when the connection is closed

All methods are optional; missing ones are silently skipped.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.net.Websocket;

@Websocket(name = "chat", endpoint = "chat")
public class ChatHandler {

    public void onOpen() { /* greet new clients */ }

    public void onMessage(String message, String from) {
        // broadcast or process the message
    }

    public void onClose() { /* cleanup */ }
}
```

The example handler is reachable by clients via the URL suffix `/websockets/stomp/chat`.

## @Websocket

Registers the class as a STOMP WebSocket handler.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.TYPE)
> public @interface Websocket { ... }
> ```

### Attributes

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `name` | `String` | Logical display name for the websocket. |
| `endpoint` | `String` | URL endpoint suffix used by the client to connect — for example, `"chat"` maps to `/websockets/stomp/chat`. |
