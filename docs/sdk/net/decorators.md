# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.net`
- sources: [Websocket.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/net/Websocket.java), [WebsocketHandler.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/net/WebsocketHandler.java)
:::

A WebSocket handler is a [`@Component`](/sdk/component/decorators) declared in one of two styles - never both on the same class:

- **`@Websocket` + `@OnX`** - mark the class with `@Websocket(name = …, endpoint = …)` and annotate its lifecycle methods with `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose`.
- **`WebsocketHandler`** - a self-describing interface; a `@Component` that implements it *is* the handler, carrying its endpoint via `endpoint()` and overriding only the lifecycle defaults it needs.

The lifecycle callbacks are:

- `onOpen()` - called when a client connects
- `onMessage(String message, String from)` - called for each inbound message; a non-`void` return value is sent back to the client
- `onError(String error)` - called on transport or handler error
- `onClose()` - called when the connection is closed

### Example Usage:

Self-describing `WebsocketHandler`:
```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.net.WebsocketHandler;

@Component
public class ChatHandler implements WebsocketHandler {

    @Override
    public String endpoint() {
        return "chat";
    }

    @Override
    public void onMessage(String message, String from) {
        // broadcast or process the message
    }

    // onOpen / onError / onClose inherit the no-op default
}
```

Annotation style with `@Websocket` + `@OnX`:
```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.net.Websocket;
import org.eclipse.dirigible.sdk.net.OnMessage;

@Component
@Websocket(name = "chat", endpoint = "chat")
public class ChatController {

    @OnMessage
    public String onMessage(String message, String from) {
        return "echo: " + message; // returned value is sent back to the client
    }
}
```

The example handler is reachable by clients via the URL suffix `/websockets/stomp/chat`.

## @Websocket

Marks the `@Component` class as a STOMP WebSocket handler, paired with method-level `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose`.

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

## @OnOpen / @OnMessage / @OnError / @OnClose

Method-level annotations that bind the WebSocket lifecycle events on a `@Websocket` class.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.METHOD)
> public @interface OnOpen { }
> // ... OnMessage, OnError, OnClose follow the same shape
> ```

### Notes:

- `@OnMessage` binds a `(String message, String from)` method; a non-`void` return is sent back to the client.
- `@OnOpen` / `@OnClose` bind no-arg methods; `@OnError` binds a `(String error)` method.
- Every callback is optional - annotate only the events you need.

## WebsocketHandler

Self-describing contract for a WebSocket handler. A `@Component` implementing it *is* the handler - it names its own endpoint and overrides only the lifecycle methods it needs (all are `default` no-ops).

> ```java
> public interface WebsocketHandler {
>     String endpoint();
>     default void onOpen()                                {}
>     default void onMessage(String message, String from)  {}
>     default void onError(String error)                   {}
>     default void onClose()                               {}
> }
> ```

### Notes:

- `endpoint()` is the URL endpoint suffix (e.g. `"chat"` → `/websockets/stomp/chat`).
- Every lifecycle callback has an empty default, so partial implementations are explicit by design - omit anything you don't need.
- Use either `WebsocketHandler` or `@Websocket` + `@OnX` on a class, never both.
