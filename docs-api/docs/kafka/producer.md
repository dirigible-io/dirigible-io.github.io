---
title: Kafka Producer
---

Kafka Producer
===

The Kafka Producer is sending message records to a Topic destination to a [Kafka](http://kafka.apache.org/) messaging server.

=== "Overview"
- Module: `kafka/producer`
- Alias: `kafka/producer`
- Definition: [https://github.com/eclipse/dirigible/issues/640](https://github.com/eclipse/dirigible/issues/640)
- Source: [/kafka/producer.js](https://github.com/eclipse/dirigible/tree/master/components/api-kafka/src/main/resources/META-INF/dirigible/kafka/producer.js)
- Facade: [KafkaFacade](https://github.com/eclipse/dirigible/blob/master/components/api-kafka/src/main/java/org/eclipse/dirigible/components/api/kafka/KafkaFacade.java)
- Status: `NOT YET MIGRATED`


### Basic Usage

Send record to a given topic _(implicitly create producer if needed)_:

=== "ECMA6"

    ```javascript
    import { producer } from "@dirigible/producer";
    producer.topic("topic1", "{}").send("key1", "value1");
    ```

=== "CommonJS"

    ```javascript
    const producer = require("kafka/producer");
    producer.topic("topic1", "{}").send("key1", "value1");
    ```

Close the producer:

=== "ECMA6"

    ```javascript
    import { producer } from "@dirigible/producer";
    producer.close("{}");
    ```

=== "CommonJS"

    ```javascript
    const producer = require("kafka/producer");
    producer.close("{}");
    ```
    

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**topic(destination, configuration)**   | Returns an object representing a Kafka Topic | *Topic*
**close(configuration)**   | Closes the Producer | *-*

> Configuration object key-value pairs can be taken from [https://kafka.apache.org/documentation/#producerconfigs](https://kafka.apache.org/documentation/#producerconfigs)


### Objects

---

#### Topic

Function     | Description | Returns
------------ | ----------- | --------
**send(key, value)**   | Send a message record by a key and value to a Kafka Topic | *-*
