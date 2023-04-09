---
title: RabbitMQ Consumer
---

RabbitMQ Consumer
===

The RabbitMQ is listening on a Queue destination to a [RabbitMQ](https://www.rabbitmq.com/) messaging server.

=== "Overview"
- Module: `rabbitmq/consumer`
- Alias: `rabbitmq/consumer`
- Definition: [https://github.com/eclipse/dirigible/issues/722](https://github.com/eclipse/dirigible/issues/722)
- Source: [/rabbitmq/consumer.js](https://github.com/eclipse/dirigible/tree/master/components/api-rabbitmq/src/main/resources/META-INF/dirigible/rabbitmq/consumer.js)
- Status: `NOT YET MIGRATED`
- Group: `ext`

### Getting Started

You will need RabbitMQ installed on your machine. You can find all relevant information in the official documentation below:

- [Debian/Ubuntu](https://www.rabbitmq.com/install-debian.html)
- [MacOS/Homebrew](https://www.rabbitmq.com/install-debian.html)
- [Windows](https://www.rabbitmq.com/install-windows.html)

### Basic Usage

#### Start listening on a queue

=== "ECMA6"

    ```javascript
    import { consumer } from "@dirigible/rabbitmq";
    consumer.startListening("rabbitmq-queue", "<rabbitmq-project>/<rabbitmq-handler>");
    ```

=== "CommonJS"

    ```javascript
    const consumer = require("rabbitmq/consumer");
    consumer.startListening("rabbitmq-queue", "<rabbitmq-project>/<rabbitmq-handler>");
    ```

File: `<rabbitmq-project>/<rabbitmq-handler>`

```javascript
exports.onMessage = function(message) {
    console.log("Hello from My RabbitMQ Listener! Message: " + message);
};

exports.onError = function(error) {
    console.error("Error from My RabbitMQ Listener! Error: " + error);
};
```

#### Stop listening on a queue

=== "ECMA6"

    ```javascript
    import { consumer } from "@dirigible/rabbitmq";
    consumer.stopListening("rabbitmq-queue", "<rabbitmq-project>/<rabbitmq-handler>");
    ```

=== "CommonJS"

    ```javascript
    const consumer = require("rabbitmq/consumer");
    consumer.stopListening("rabbitmq-queue", "<rabbitmq-project>/<rabbitmq-handler>");
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**startListening(queue, handler)**   | Start listening on a given queue and destination | *-*
**stopListening(queue, handler)**   | Stops listening for new messages | *-*


 
