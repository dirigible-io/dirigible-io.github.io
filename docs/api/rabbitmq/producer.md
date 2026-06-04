# Producer

## Overview

::: tip Module
- package: `@aerokit/sdk/rabbitmq`
- source: [rabbitmq/producer.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/rabbitmq/producer.ts)
- last updated: 
:::

The RabbitMQ Producer module provides a simple facade for sending messages to RabbitMQ queues. It abstracts the underlying Java implementation, allowing developers to easily integrate message sending capabilities into their applications built on the platform. This module is designed to facilitate communication with RabbitMQ by providing a straightforward interface for sending messages to specified queues.

### Key Features:
- **Message Sending**: The `send` method allows developers to send messages to a specified RabbitMQ queue with ease.

### Use Cases:
- **Event-Driven Architecture**: This module is ideal for applications that follow an event-driven architecture, enabling them to publish events or data changes to RabbitMQ queues for consumption by other services or components.
- **Integration with External Systems**: Developers can use this module to integrate their applications with external systems that communicate via RabbitMQ, facilitating seamless data exchange and event handling.

### Example Usage:
```ts
import { Producer } from "@aerokit/sdk/rabbitmq";

// Send a message to a RabbitMQ queue
Producer.send("myQueue", "Hello, RabbitMQ!");
```

## Classes

### Producer

#### send()

Sends a message to the specified RabbitMQ queue.

> ```ts
> static send(queue: string, message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `queue` | `string` | The name of the RabbitMQ queue to send the message to. |
> | `message` | `string` | The content of the message to be sent (as a string). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

