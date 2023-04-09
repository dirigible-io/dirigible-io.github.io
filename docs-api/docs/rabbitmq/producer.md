---
title: RabbitMQ Producer
---

RabbitMQ Producer
===

The RabbitMQ Producer is sending message records to a Queue destination to a [RabbitMQ](https://www.rabbitmq.com/) messaging server.

=== "Overview"
- Module: `rabbitmq/producer`
- Alias: `rabbitmq/producer`
- Definition: [https://github.com/eclipse/dirigible/issues/722](https://github.com/eclipse/dirigible/issues/722)
- Source: [/rabbitmq/producer.js](https://github.com/eclipse/dirigible/tree/master/components/api-rabbitmq/src/main/resources/META-INF/dirigible/rabbitmq/producer.js)
- Status: `NOT YET MIGRATED`
- Group: `ext`


### Basic Usage

Send record to a given topic

=== "ECMA6"

    ```javascript
    import { producer } from "@dirigible/rabbitmq";
    producer.send("rabbitmq-queue", "My RabbitMQ message");
    ```

=== "CommonJS"

    ```javascript
    const producer = require("rabbitmq/producer");
    producer.send("rabbitmq-queue", "My RabbitMQ message");
    ```


### Functions
---

Function     | Description | Returns
------------ | ----------- | --------
**send(queue, value)**   | Send a message record by a queue and value to a RabbitMQ Queue | *-*
