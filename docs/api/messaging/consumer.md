# Consumer

## Overview

::: tip Module
- package: `@aerokit/sdk/messaging`
- source: [messaging/consumer.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/messaging/consumer.ts)
- last updated: 
:::

The Consumer module provides an API for consuming messages from JMS-style destinations, supporting both Queues (point-to-point) and Topics (publish/subscribe). It abstracts the complexities of message consumption, allowing developers to easily receive messages from configured destinations with optional timeout handling.

### Key Features:
- **Queue and Topic Support**: The module supports both Queue and Topic consumers, enabling different messaging patterns (point-to-point and publish/subscribe).
- **Synchronous Message Reception**: The `receive` method allows for synchronous message retrieval with an optional timeout parameter.

### Use Cases:
- **Message-Driven Applications**: Developers can use this module to build applications that react to messages received from queues or topics, enabling event-driven architectures.
- **Integration with Messaging Systems**: By consuming messages from JMS-style destinations, applications can integrate with various messaging systems that support these patterns.

### Example Usage:
```ts
import { Consumer } from "@aerokit/sdk/messaging";

// Create a Queue consumer for 'orders.queue'
const queueConsumer = Consumer.queue("orders.queue");
const messageFromQueue = queueConsumer.receive(5000); // Wait up to 5 seconds for a message
console.log("Received from queue:", messageFromQueue);

// Create a Topic consumer for 'market.updates.topic'
const topicConsumer = Consumer.topic("market.updates.topic");
const messageFromTopic = topicConsumer.receive(5000); // Wait up to 5 seconds for a message
console.log("Received from topic:", messageFromTopic);
```

## Classes

### Consumer

#### queue()

Creates a Queue consumer instance for point-to-point messaging.
Messages sent to this destination are consumed by only one receiver.

> ```ts
> static queue(destination: string): Queue;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `destination` | `string` | The name of the queue destination (e.g., 'orders.queue'). |
>
> ::: info Returns
> - **Type**: `Queue`
> - **Description**: A Queue instance.
> :::

#### topic()

Creates a Topic consumer instance for publish/subscribe messaging.
Messages sent to this destination can be consumed by multiple subscribers.

> ```ts
> static topic(destination: string): Topic;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `destination` | `string` | The name of the topic destination (e.g., 'market.updates.topic'). |
>
> ::: info Returns
> - **Type**: `Topic`
> - **Description**: A Topic instance.
> :::

