# Producer

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.rabbitmq`
- source: [rabbitmq/Producer.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/rabbitmq/Producer.java)
:::

Publishes a single message to a RabbitMQ queue. The message is delivered using the platform's default channel configuration - for routing to topic / fanout exchanges, configure them through a `.rabbitmq` artefact (see `engine-rabbitmq`) and publish to the resulting queue here.

### Key Features:
- **Direct Queue Publish**: A single `send` call enqueues a `String` payload on the named queue.
- **Platform-managed Channel**: Connection, channel, and exchange wiring is owned by the platform - no client-side setup needed.
- **Artefact-driven Routing**: For exchange-based routing (topic / fanout / direct), declare the topology through a `.rabbitmq` artefact and publish to the resulting queue.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.rabbitmq.Producer;

// Publish directly to a queue using the platform default channel.
Producer.send("orders.created", "{\"orderId\":42,\"status\":\"created\"}");
```

## Methods

### send()

Publishes a single message to the named RabbitMQ queue using the platform's default channel.

> ```java
> public static void send(String queue, String message);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `queue` | `String` | Name of the RabbitMQ queue. |
> | `message` | `String` | Message payload - typically a JSON-encoded string. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: Returns once the platform's RabbitMQ channel has accepted the message for publication.
> :::
