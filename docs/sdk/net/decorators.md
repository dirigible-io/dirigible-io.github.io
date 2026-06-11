# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.net`
- sources: [Websocket.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/net/Websocket.java), [WebsocketHandler.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/net/WebsocketHandler.java)
:::

`@Websocket` marks a client Java class as a WebSocket handler managed by the Dirigible runtime. The annotated class may expose any combination of:

- `onOpen()` - called when a client connects
- `onMessage(String message, String from)` - called for each inbound message
- `onError(String error)` - called on transport or handler error
- `onClose()` - called when the connection is closed

All methods are optional; missing ones are silently skipped.

The optional `WebsocketHandler` interface formalises the four callback shapes. Implementing it gives compile-time signature checking and lets each lifecycle method be omitted - the interface provides empty default implementations, so a handler that only cares about `onMessage` doesn't have to declare empty stubs for the rest. Classes that don't implement the interface still work via the same method-by-name reflective dispatch as before.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.net.Websocket;
import org.eclipse.dirigible.sdk.net.WebsocketHandler;

@Websocket(name = "chat", endpoint = "chat")
public class ChatHandler implements WebsocketHandler {

    @Override
    public void onMessage(String message, String from) {
        // broadcast or process the message
    }

    // onOpen / onError / onClose inherit the no-op default
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
| `endpoint` | `String` | URL endpoint suffix used by the client to connect - for example, `"chat"` maps to `/websockets/stomp/chat`. |

## WebsocketHandler

Optional typed contract for `@Websocket` lifecycle callbacks. All four methods are `default` and no-op, so implementations only override what they need.

> ```java
> public interface WebsocketHandler {
>     default void onOpen()                                {}
>     default void onMessage(String message, String from)  {}
>     default void onError(String error)                   {}
>     default void onClose()                               {}
> }
> ```

### Notes:

- `@Websocket` is the marker that registers the class for an endpoint - implementing the interface alone does not register anything.
- Every callback has an empty default, so partial implementations are explicit by design - omit anything you don't need.
- The reflective fallback finds the same `onOpen` / `onMessage(String, String)` / `onError(String)` / `onClose` methods by name on classes that don't implement the interface.
