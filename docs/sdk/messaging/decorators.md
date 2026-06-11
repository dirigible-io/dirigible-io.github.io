# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.messaging`
- source: [messaging/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging)
:::

The messaging module exposes three declarative types used to define always-on listeners on the embedded ActiveMQ broker:

- `@Listener` - the type-level annotation that marks a Java class as a managed message listener.
- `ListenerKind` - the enum used as the `kind` attribute of `@Listener` to choose between point-to-point queue semantics and publish-subscribe topic semantics.
- `MessageHandler` - optional typed contract for the `onMessage` / `onError` callbacks. Implementing it gives compile-time signature checking and a direct (non-reflective) dispatch path. The legacy method-by-name reflective fallback is preserved, so classes that don't implement the interface still work unchanged.

Listeners are discovered and instantiated by the Dirigible runtime at startup and on hot-reload - you do not need to register them manually.

## @Listener

::: tip Source
[messaging/Listener.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging/Listener.java)
:::

Marks a client Java class as an ActiveMQ message listener managed by the Dirigible runtime.

The annotated class must expose a public `onMessage(String message)` method and optionally an `onError(String error)` method. Dirigible instantiates the class once, connects it to the specified queue or topic, and routes incoming messages to `onMessage`. Hot-reload replaces the listener transparently - subsequent messages flow to the new instance without restart.

### Attributes:

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| `name` | `String` | - (required) | Logical name of the queue or topic destination. |
| `kind` | `ListenerKind` | `ListenerKind.QUEUE` | Whether to listen on a queue or a topic. |

### Target and retention:

- `@Target(ElementType.TYPE)` - applied to classes.
- `@Retention(RetentionPolicy.RUNTIME)` - visible to the platform's reflective scanner at runtime.

## MessageHandler

::: tip Source
[messaging/MessageHandler.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging/MessageHandler.java)
:::

Optional typed contract for the `@Listener` callback methods. Implementing it gives compile-time signature checking and a direct dispatch path; classes that don't implement it still work via reflection.

> ```java
> public interface MessageHandler {
>     void onMessage(String message);
>     default void onError(String error) {}
> }
> ```

### Notes:

- `@Listener` is the marker that binds the class to a destination - implementing the interface alone does not register anything.
- `onError` is a default no-op so handlers that don't care about delivery failures don't need an empty stub.
- The startup log line reports which path was chosen (`typed dispatch` vs `reflective dispatch`).

## ListenerKind

::: tip Source
[messaging/ListenerKind.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging/ListenerKind.java)
:::

Destination type for a `@Listener`-annotated class. Selects between the two JMS-style delivery semantics.

### Constants:

| Constant | Description |
| -------- | ----------- |
| `QUEUE` | Point-to-point queue - each message is consumed by exactly one listener. The default when `kind` is omitted on `@Listener`. |
| `TOPIC` | Publish-subscribe topic - each message is delivered to all active subscribers. Use for fan-out broadcasts. |

## Example Usage

A complete queue listener that processes incoming order events and logs failures:

```java
package com.acme.orders;

import org.eclipse.dirigible.sdk.messaging.Listener;
import org.eclipse.dirigible.sdk.messaging.ListenerKind;
import org.eclipse.dirigible.sdk.messaging.MessageHandler;
import org.eclipse.dirigible.sdk.log.Logging;
import org.eclipse.dirigible.sdk.log.Logger;

@Listener(name = "orders.created", kind = ListenerKind.QUEUE)
public class OrderListener implements MessageHandler {

    private static final Logger LOG = Logging.getLogger("com.acme.orders.OrderListener");

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

A topic listener that only handles successful messages - the default `onError` no-op covers the rest:

```java
@Listener(name = "metrics.heartbeat", kind = ListenerKind.TOPIC)
public class HeartbeatListener implements MessageHandler {
    @Override
    public void onMessage(String message) {
        // every subscriber receives this message
    }
}
```

To publish to the same destinations from elsewhere in your code, use [`Producer.sendToQueue`](./producer.md#sendtoqueue) / [`Producer.sendToTopic`](./producer.md#sendtotopic).
