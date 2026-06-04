# Consumer

## Overview

::: tip Module
- package: `@aerokit/sdk/kafka`
- source: [kafka/consumer.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/kafka/consumer.ts)
- last updated: 
:::

The Consumer module provides an API for configuring and managing Kafka consumers, allowing scripts to start and stop listening to specific topics. It abstracts the complexities of Kafka consumer configuration and lifecycle management, enabling developers to easily integrate Kafka message consumption into their applications.

### Key Features:
- **Topic Configuration**: The `Consumer.topic` method allows developers to create a topic configuration wrapper with specified destination and properties.
- **Background Listening**: The `startListening` method starts a background process that listens for messages on the configured topic, invoking a specified handler function for incoming messages.
- **Graceful Shutdown**: The `stopListening` method allows developers to stop the background listening process based on the topic and configuration.

### Use Cases:
- **Real-time Data Processing**: Developers can use this module to consume messages from Kafka topics in real-time, enabling use cases such as stream processing, event-driven architectures, and microservices communication.
- **Integration with Other Systems**: By consuming Kafka messages, applications can integrate with other systems that produce messages to Kafka, facilitating data flow across different components of an ecosystem.

### Example Usage:
```ts
import { Consumer } from "@aerokit/sdk/kafka";

// Create a consumer for the "orders" topic with specific configuration
const ordersConsumer = Consumer.topic("orders", { "group.id": "order-processors" });

// Start listening to the "orders" topic with a message handler and timeout
ordersConsumer.startListening("handleOrderMessage", 30000);

// Later, stop listening to the "orders" topic
ordersConsumer.stopListening();
```

## Classes

### Consumer

#### topic()

Creates a new topic configuration wrapper that can be used to start or
stop listening for messages on a Kafka topic.

> ```ts
> static topic(destination: string, configuration: any): Topic;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `destination` | `string` | The name of the Kafka topic to consume messages from. |
> | `configuration` | `any` | Optional key-value object containing Kafka consumer properties
(e.g., 'group.id', 'auto.offset.reset'). |
>
> ::: info Returns
> - **Type**: `Topic`
> - **Description**: A Topic instance configured for the specified destination and properties.
> :::

