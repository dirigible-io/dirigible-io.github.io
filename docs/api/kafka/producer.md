# Producer

## Overview

::: tip Module
- package: `@aerokit/sdk/kafka`
- source: [kafka/producer.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/kafka/producer.ts)
- last updated: 
:::

The Producer module provides an API for configuring and managing Kafka producers, allowing scripts to create topics, send messages, and close the producer connection. It abstracts the complexities of Kafka producer configuration and message sending, enabling developers to easily integrate Kafka message production into their applications.

### Key Features:
- **Topic Configuration**: The `Producer.topic` method allows developers to create a topic configuration wrapper with specified destination and properties.
- **Message Sending**: The `send` method on the Topic class enables sending messages with optional keys to the configured Kafka topic.
- **Connection Management**: The `close` method allows developers to close the Kafka producer connection pool, ensuring proper resource cleanup.

### Use Cases:
- **Event Production**: Developers can use this module to produce messages to Kafka topics in real-time, enabling use cases such as event-driven architectures and microservices communication.
- **Integration with Other Systems**: By sending Kafka messages, applications can integrate with other systems that consume messages from Kafka, facilitating data flow across different components of an ecosystem.

### Example Usage:
```ts
import { Producer } from "@aerokit/sdk/kafka";

// Create a producer for the "orders" topic with specific configuration
const ordersProducer = Producer.topic("orders", { "bootstrap.servers": "localhost:9092" });

// Send a message with a key to the "orders" topic
ordersProducer.send("order123", "New order placed");

// Later, close the producer connection
Producer.close({ "bootstrap.servers": "localhost:9092" });
```

## Classes

### Producer

#### topic()

Creates a new topic configuration wrapper that can be used to send messages
to a specific Kafka topic.

> ```ts
> static topic(destination: string, configuration: any): Topic;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `destination` | `string` | The name of the Kafka topic to send messages to. |
> | `configuration` | `any` | Optional key-value object containing Kafka producer properties
(e.g., 'bootstrap.servers', 'acks'). |
>
> ::: info Returns
> - **Type**: `Topic`
> - **Description**: A Topic instance configured for the specified destination and properties.
> :::

#### close()

Closes the Kafka producer connection pool, releasing associated resources.
This should be called when message sending is complete to ensure proper cleanup.

> ```ts
> static close(configuration: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `configuration` | `any` | Optional key-value object containing the configuration
used to initialize the producer to be closed. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

