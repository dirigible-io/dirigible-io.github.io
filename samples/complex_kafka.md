---
layout: samples
title: Kafka Producer and Consumer
icon: fa-caret-right
group: complex
---

{{ page.title }}
===

### Steps


1. Create a project **kafka_project**
2. Then create a JavaScript service named **my_kafka_handler.js**
3. Replace the service code with the following content:

#### Handler

```javascript

exports.onMessage = function(message) {
	console.log("Hello from My Kafka Listener! Message: " + message);
};

exports.onError = function(error) {
	console.error("Error from My Kafka Listener! Error: " + error);
};

```

4. Then create a **Kafka Consumer** named  **my_kafka_consumer.js**
5. Replace the file content with the following code:

```javascript

var consumer = require("kafka/consumer");
consumer.topic("topic1", "{}").startListening("kafka_project/my_kafka_handler", 1000);

```

6. Then create another back-end service which will play the role of a trigger **my_kafka_producer.js**
7. Replace the trigger content with the following code:

```javascript

var producer = require("kafka/producer");
producer.topic("topic1", "{}").send("key1", "value1");

```

8. Publish the project
9. Select the **my_kafka_producer.js** file in the *Workspace* view to be able to trigger the invocation of this service via the *Preview* view
10. In the *Console* view you should see the following lines:

	2020-11-01 23:33:54.272 [INFO ] [Thread-275] o.e.dirigible.api.v3.core.Console - Hello from My Kafka Listener! Message: {"topic":"topic1","partition":0,"offset":29,"timestamp":1604266434251,"timestampType":"CREATE_TIME","serializedKeySize":4,"serializedValueSize":6,"headers":{"headers":[],"isReadOnly":false},"key":"key1","value":"value1","leaderEpoch":{"value":0}}

> Note: the log messages in the Console view are in a reverse order - the newest are on top

---

For more information, see the *[API](../api/)* documentation.
