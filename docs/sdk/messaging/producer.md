# Producer

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.messaging`
- source: [messaging/Producer.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging/Producer.java)
:::

Sends a message into the embedded ActiveMQ broker. `sendToQueue(String, String)` delivers to a queue (point-to-point &mdash; one listener receives the message), `sendToTopic(String, String)` delivers to a topic (pub/sub &mdash; all active subscribers receive the message).

Both methods are non-blocking past the broker's acknowledgement; the broker handles persistence and at-least-once delivery semantics. Pair with a `@Listener`-annotated class on the receiving side, or with `Consumer.receiveFromQueue(String, long)` when you want to pull messages synchronously.

### Key Features:
- **Queue and Topic Support**: Two static methods cover the two JMS-style delivery semantics &mdash; point-to-point queues and publish-subscribe topics.
- **Embedded Broker**: Talks to the ActiveMQ broker that ships in-process with every Dirigible runtime &mdash; no broker URL, no client configuration.
- **Cross-language Interoperability**: Every component running on the platform &mdash; in any supported language &mdash; targets the same embedded broker, so producers and consumers interoperate transparently.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.messaging.Producer;

// Point-to-point: a single listener picks up the message.
Producer.sendToQueue("orders.created", "{\"orderId\":42}");

// Publish-subscribe: every active subscriber receives the message.
Producer.sendToTopic("metrics.heartbeat", "{\"ts\":1700000000}");
```

## Methods

### sendToQueue()

Publishes a message to the named queue. The first listener available on the queue receives it.

> ```java
> public static void sendToQueue(String queue, String message);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `queue` | `String` | Logical name of the queue destination. |
> | `message` | `String` | Message payload &mdash; typically a JSON-encoded string. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: Returns once the broker has acknowledged receipt. Delivery to the listener happens asynchronously.
> :::

### sendToTopic()

Publishes a message to the named topic. Every currently subscribed listener receives a copy.

> ```java
> public static void sendToTopic(String topic, String message);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `topic` | `String` | Logical name of the topic destination. |
> | `message` | `String` | Message payload &mdash; typically a JSON-encoded string. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: Returns once the broker has acknowledged receipt. Each active subscriber receives the message asynchronously.
> :::
