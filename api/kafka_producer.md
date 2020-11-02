---
layout: api
title: Kafka Producer
icon: fa-ellipsis-h
---

{{ page.title }}
===

The Kafka Producer is sending message records to a Topic destination to a [Kafka](http://kafka.apache.org/) messaging server.

Version 4.x
---

- Module: **kafka/producer**
- Alias: **kafka/producer**
- Definition: [https://github.com/eclipse/dirigible/issues/640](https://github.com/eclipse/dirigible/issues/640)
- Source: [/kafka/producer.js](https://github.com/dirigiblelabs/ext-kafka/blob/master/kafka/producer.js)
- Facade: [KafkaFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-kafka/src/main/java/org/eclipse/dirigible/api/kafka/KafkaFacade.java)
- Status: **stable**


### Basic Usage

##### Send record to a given topic (implicitly create producer if needed):

```javascript
var producer = require("kafka/producer");
producer.topic("topic1", "{}").send("key1", "value1");
```

##### Close the producer:
```javascript
var producer = require("kafka/producer");
producer.close("{}");
```


### Definition

#### Functions

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



### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
 ---


 
