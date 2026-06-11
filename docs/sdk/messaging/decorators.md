# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.messaging`
- source: [messaging/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging)
:::

The messaging module exposes two declarative types used to define always-on listeners on the embedded ActiveMQ broker:

- `@Listener` - the type-level annotation that marks a Java class as a managed message listener.
- `ListenerKind` - the enum used as the `kind` attribute of `@Listener` to choose between point-to-point queue semantics and publish-subscribe topic semantics.

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
import org.eclipse.dirigible.sdk.log.Logging;
import org.eclipse.dirigible.sdk.log.Logger;

@Listener(name = "orders.created", kind = ListenerKind.QUEUE)
public class OrderListener {

    private static final Logger LOG = Logging.getLogger("com.acme.orders.OrderListener");

    public void onMessage(String message) {
        LOG.info("Received order event: {}", message);
        // ... deserialize and process the order ...
    }

    public void onError(String error) {
        LOG.error("Listener failure: {}", error);
    }
}
```

A topic listener - identical class shape, only the `kind` changes:

```java
@Listener(name = "metrics.heartbeat", kind = ListenerKind.TOPIC)
public class HeartbeatListener {
    public void onMessage(String message) {
        // every subscriber receives this message
    }
}
```

To publish to the same destinations from elsewhere in your code, use [`Producer.sendToQueue`](./producer.md#sendtoqueue) / [`Producer.sendToTopic`](./producer.md#sendtotopic).
