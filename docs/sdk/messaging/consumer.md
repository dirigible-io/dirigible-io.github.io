# Consumer

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.messaging`
- source: [messaging/Consumer.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging/Consumer.java)
:::

Synchronously pulls a single message from a queue or topic, blocking up to `timeoutMillis`. Returns `null` when the timeout elapses without a delivery.

Use this in script-style code that processes a single message and exits, or when you want tight backpressure control. For long-running, always-on consumption use a `@Listener`-annotated class &mdash; the platform manages the consumer thread, reconnects, and ordering for you.

### Key Features:
- **Blocking Pull**: Each call blocks the caller until a message arrives or the supplied timeout elapses.
- **Queue and Topic Support**: Separate methods cover point-to-point queue consumption and publish-subscribe topic consumption.
- **Null on Timeout**: An empty queue / topic at timeout produces a `null` return value rather than an exception, so callers can drive a polling loop without try/catch.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.messaging.Consumer;

// Wait up to 5 seconds for the next message on the 'orders.created' queue.
String message = Consumer.receiveFromQueue("orders.created", 5000L);
if (message != null) {
    System.out.println("Received: " + message);
}

// Poll a topic with a 1-second deadline per call.
String tick = Consumer.receiveFromTopic("metrics.heartbeat", 1000L);
```

## Methods

### receiveFromQueue()

Blocks up to `timeoutMillis` waiting for a single message on the named queue. The message is removed from the queue when consumed.

> ```java
> public static String receiveFromQueue(String queue, long timeoutMillis);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `queue` | `String` | Logical name of the queue destination. |
> | `timeoutMillis` | `long` | Maximum time to wait, in milliseconds. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The message payload, or `null` if the timeout elapses without a delivery.
> :::

### receiveFromTopic()

Blocks up to `timeoutMillis` waiting for a single message on the named topic.

> ```java
> public static String receiveFromTopic(String topic, long timeoutMillis);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `topic` | `String` | Logical name of the topic destination. |
> | `timeoutMillis` | `long` | Maximum time to wait, in milliseconds. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The message payload, or `null` if the timeout elapses without a delivery.
> :::
