# Producer

## Overview

::: tip Module
- package: `@aerokit/sdk/messaging`
- source: [messaging/producer.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/messaging/producer.ts)
- last updated: 
:::

The Producer module provides an API for configuring and managing messaging producers, allowing scripts to send messages to JMS-style destinations such as Queues and Topics. It abstracts the complexities of message production, enabling developers to easily integrate message sending capabilities into their applications.

### Key Features:
- **Queue and Topic Support**: The module supports both Queue and Topic producers, enabling different messaging patterns (point-to-point and publish/subscribe).
- **Message Sending**: The `send` method allows for sending messages to the configured destinations.

### Use Cases:
- **Event Production**: Developers can use this module to produce messages to queues or topics, enabling use cases such as event-driven architectures and microservices communication.
- **Integration with Messaging Systems**: By sending messages to JMS-style destinations, applications can integrate with various messaging systems that support these patterns.

### Example Usage:
```ts
import { Producer } from "@aerokit/sdk/messaging";

// Create a Queue producer for 'task.queue'
const queueProducer = Producer.queue("task.queue");
queueProducer.send("New task created");

// Create a Topic producer for 'sensor.data.topic'
const topicProducer = Producer.topic("sensor.data.topic");
topicProducer.send("Temperature reading: 22°C");
```

## Classes

### Producer

#### queue()

Creates a Queue producer instance for point-to-point messaging.
Messages sent to this destination are intended to be consumed by a single receiver.

> ```ts
> static queue(destination: string): Queue;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `destination` | `string` | The name of the queue destination (e.g., 'task.queue'). |
>
> ::: info Returns
> - **Type**: `Queue`
> - **Description**: A Queue instance.
> :::

#### topic()

Creates a Topic producer instance for publish/subscribe messaging.
Messages sent to this destination can be consumed by multiple subscribers simultaneously.

> ```ts
> static topic(destination: string): Topic;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `destination` | `string` | The name of the topic destination (e.g., 'sensor.data.topic'). |
>
> ::: info Returns
> - **Type**: `Topic`
> - **Description**: A Topic instance.
> :::

