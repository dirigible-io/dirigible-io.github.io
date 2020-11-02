---
layout: api
title: Kafka Consumer
icon: fa-ellipsis-h
---

{{ page.title }}
===

The Kafka Consumer is listening on a Topic destination to a [Kafka](http://kafka.apache.org/) messaging server.

Version 4.x
---

- Module: **kafka/consumer**
- Alias: **kafka/consumer**
- Definition: [https://github.com/eclipse/dirigible/issues/641](https://github.com/eclipse/dirigible/issues/641)
- Source: [/kafka/consumer.js](https://github.com/dirigiblelabs/ext-kafka/blob/master/kafka/consumer.js)
- Facade: [KafkaFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-kafka/src/main/java/org/eclipse/dirigible/api/kafka/KafkaFacade.java)
- Status: **stable**


### Basic Usage

##### Start listening on a topic:

```javascript
var consumer = require("kafka/consumer");
consumer.topic("topic1", "{}").startListening("<kafka-project>/<kafka-handler>", 1000);
```

##### File: <kafka-project>/<kafka-handler.js>
```javascript
exports.onMessage = function(message) {
	console.log("Hello from My Kafka Listener! Message: " + message);
};

exports.onError = function(error) {
	console.error("Error from My Kafka Listener! Error: " + error);
};
```

##### Stop listening on a topic:
```javascript
var consumer = require("kafka/consumer");
consumer.topic("topic1", "{}").stopListening();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**topic(destination, configuration)**   | Returns an object representing a Kafka Topic | *Topic*

> Configuration object key-value pairs can be taken from [https://kafka.apache.org/documentation/#consumerconfigs](https://kafka.apache.org/documentation/#consumerconfigs)


### Objects

---

#### Topic

Function     | Description | Returns
------------ | ----------- | --------
**startListening(handler, timeout)**   | Receives a message from this Kafka Topic if any with the given handler and timeout in milliseconds | *-*
**stopListening()**   | Stops listening for new messages | *-*



### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
 ---


 
