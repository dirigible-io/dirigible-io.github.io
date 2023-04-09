---
title: Kafka Consumer
---

Kafka Consumer
===

The Kafka Consumer is listening on a Topic destination to a [Kafka](http://kafka.apache.org/) messaging server.

=== "Overview"
- Module: `kafka/consumer`
- Alias: `kafka/consumer`
- Definition: [https://github.com/eclipse/dirigible/issues/641](https://github.com/eclipse/dirigible/issues/641)
- Source: [/kafka/consumer.js](https://github.com/eclipse/dirigible/tree/master/components/api-kafka/src/main/resources/META-INF/dirigible/kafka/consumer.js)
- Facade: [KafkaFacade](https://github.com/eclipse/dirigible/blob/master/components/api-kafka/src/main/java/org/eclipse/dirigible/components/api/kafka/KafkaFacade.java)
- Status: `NOT YET MIGRATED`
- Group: `ext`


### Basic Usage

#### Start listening on a topic

=== "ECMA6"

	```javascript
	import { consumer } from "@dirigible/kafka";
	consumer.topic("topic1", "{}").startListening("<kafka-project>/<kafka-handler>", 1000);
	```

=== "CommonJS"

	```javascript
	const consumer = require("kafka/consumer");
	consumer.topic("topic1", "{}").startListening("<kafka-project>/<kafka-handler>", 1000);
	```

File: `<kafka-project>/<kafka-handler.js>`
```javascript
exports.onMessage = function(message) {
	console.log("Hello from My Kafka Listener! Message: " + message);
};

exports.onError = function(error) {
	console.error("Error from My Kafka Listener! Error: " + error);
};
```

#### Stop listening on a topic

=== "ECMA6"

	```javascript
	import { consumer } from "@dirigible/kafka";
	consumer.topic("topic1", "{}").stopListening();
	```

=== "CommonJS"

	```javascript
	const consumer = require("kafka/consumer");
	consumer.topic("topic1", "{}").stopListening();
	```

### Functions

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


 
