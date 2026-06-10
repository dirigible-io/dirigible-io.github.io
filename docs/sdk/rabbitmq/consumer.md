# Consumer

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.rabbitmq`
- source: [rabbitmq/Consumer.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/rabbitmq/Consumer.java)
:::

Subscribes a handler to a RabbitMQ queue. The `handler` string is the registry path of a handler script (matching the platform listener convention); the platform spawns a consumer thread, deserialises message bodies as strings, and invokes the handler per message.

For per-message ack control or for message inspection beyond the body, drop down to the bare RabbitMQ client through a `@Component` bean and a `.rabbitmq` configuration.

### Key Features:
- **Script-backed Handlers**: The `handler` argument points at a handler script in the platform registry &mdash; the same listener convention used elsewhere on the platform.
- **Long-lived Subscription**: The platform owns the consumer thread; messages flow until `stopListening` is called.
- **String Payloads**: Each message body is decoded as a `String` and passed to the handler. Drop down to the bare client for binary or header-rich messages.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.rabbitmq.Consumer;

// Subscribe a script handler to the 'orders.created' queue.
Consumer.startListening("orders.created", "/myproject/handlers/on-order.ts");

// ... later, on shutdown ...
Consumer.stopListening("orders.created", "/myproject/handlers/on-order.ts");
```

## Methods

### startListening()

Subscribes a registry handler script to the named RabbitMQ queue. The platform spawns a consumer thread that invokes the handler for each message.

> ```java
> public static void startListening(String queue, String handler);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `queue` | `String` | Name of the RabbitMQ queue to consume from. |
> | `handler` | `String` | Registry path of the handler invoked per message. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: Returns once the subscription has been registered. The consumer thread runs in the background until `stopListening` is called.
> :::

### stopListening()

Cancels the subscription previously created for the given queue + handler pair.

> ```java
> public static void stopListening(String queue, String handler);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `queue` | `String` | Name of the RabbitMQ queue the handler is bound to. |
> | `handler` | `String` | Registry path of the handler that was passed to the matching `startListening` call. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: Returns once the consumer thread has been signalled to stop and the subscription has been removed.
> :::
