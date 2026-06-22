# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.messaging`
- source: [messaging/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging)
:::

A message listener on the embedded ActiveMQ broker is a [`@Component`](/sdk/component/decorators) declared in one of two styles - never both on the same class:

- **`@Listener`** on a method - annotate a public `void m(String)` method of a `@Component`; the runtime routes inbound messages from the named destination to that method.
- **`MessageHandler`** - a self-describing interface; a `@Component` that implements it *is* the listener, carrying its destination via `destination()`.

`ListenerKind` selects between point-to-point queue semantics and publish-subscribe topic semantics. Listeners are discovered, instantiated, and connected by the runtime at startup and on hot-reload - you do not register them manually.

## @Listener

::: tip Source
[messaging/Listener.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging/Listener.java)
:::

Marks a public `void m(String message)` method of a `@Component` as an ActiveMQ message listener. It is a **method-level** annotation. The runtime connects the method to the specified queue or topic and invokes it for each inbound message. Hot-reload reconnects to the new instance without restart.

### Attributes:

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| `name` | `String` | - (required) | Logical name of the queue or topic destination. |
| `kind` | `ListenerKind` | `ListenerKind.QUEUE` | Whether to listen on a queue or a topic. |

### Target and retention:

- `@Target(ElementType.METHOD)` - applied to a `void m(String)` method of a `@Component`.
- `@Retention(RetentionPolicy.RUNTIME)` - visible to the platform's reflective scanner at runtime.

## MessageHandler

::: tip Source
[messaging/MessageHandler.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging/MessageHandler.java)
:::

Self-describing contract for a listener. A `@Component` implementing it *is* the listener - it names its own destination, so no `@Listener` annotation is involved.

> ```java
> public interface MessageHandler {
>     String destination();
>     default ListenerKind kind() { return ListenerKind.QUEUE; }
>     void onMessage(String message);
>     default void onError(String error) {}
> }
> ```

### Notes:

- `destination()` is the queue or topic name; `kind()` defaults to `QUEUE`.
- `onError` is a default no-op so handlers that don't care about delivery failures don't need an empty stub.
- Use either `MessageHandler` or a method-level `@Listener` on a class, never both.

## ListenerKind

::: tip Source
[messaging/ListenerKind.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging/ListenerKind.java)
:::

Destination type for a listener. Selects between the two JMS-style delivery semantics.

### Constants:

| Constant | Description |
| -------- | ----------- |
| `QUEUE` | Point-to-point queue - each message is consumed by exactly one listener. The default when `kind` is omitted. |
| `TOPIC` | Publish-subscribe topic - each message is delivered to all active subscribers. Use for fan-out broadcasts. |

## Example Usage

A queue listener via a self-describing `MessageHandler`:

```java
package com.acme.orders;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.messaging.ListenerKind;
import org.eclipse.dirigible.sdk.messaging.MessageHandler;
import org.eclipse.dirigible.sdk.log.Logging;
import org.eclipse.dirigible.sdk.log.Logger;

@Component
public class OrderListener implements MessageHandler {

    private static final Logger LOG = Logging.getLogger("com.acme.orders.OrderListener");

    @Override
    public String destination() {
        return "orders.created";
    }

    @Override
    public void onMessage(String message) {
        LOG.info("Received order event: {}", message);
        // ... deserialize and process the order ...
    }

    @Override
    public void onError(String error) {
        LOG.error("Listener failure: {}", error);
    }
}
```

A topic listener via a method-level `@Listener`:

```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.messaging.Listener;
import org.eclipse.dirigible.sdk.messaging.ListenerKind;

@Component
public class HeartbeatListener {

    @Listener(name = "metrics.heartbeat", kind = ListenerKind.TOPIC)
    public void onHeartbeat(String message) {
        // every subscriber receives this message
    }
}
```

To publish to the same destinations from elsewhere in your code, use [`Producer.sendToQueue`](./producer.md#sendtoqueue) / [`Producer.sendToTopic`](./producer.md#sendtotopic).
