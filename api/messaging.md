---
layout: api
title: Messaging
icon: fa-ellipsis-h
---

{{ page.title }}
===

> ⚠ Deprecated

Version 3.x ⚠
---

Moved to different package in modules [messaging/producer](messaging_producer.html) and [messaging/consumer](messaging_consumer.html). The new version is backed by the full fledged messaging broker [Apache ActiveMQ](http://activemq.apache.org/).

---

---

Version 2.x
---

Messaging object is used to access the built-in passive messaging hub. One can registers as a client, subscribes to a topic and receives routed messages from the other clients.

- Module: **service/messaging**
- Definition: [/core_api/issues/11](https://github.com/dirigiblelabs/core_api/issues/11)
- Source: [/service/messaging.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/service/messaging.js)
- Status: **beta**

### Basic Usage

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var messaging = require('service/messaging');
var response = require('net/http/response');

messaging.registerClient("client1");
messaging.registerClient("client2");

messaging.registerTopic("topic1");
messaging.registerTopic("topic2");

messaging.subscribe("client1", "topic1");

messaging.send("client1", "topic1", "Subject on Topic 1 from Client 1", "Message from Client1");
messaging.send("client1", "topic2", "Subject on Topic 2 from Client 1", "Message from Client1");

messaging.route();
var messages = messaging.receive("client1");

for(var i = 0; i < messages.length; i ++) {
    var message = messages[i];
    response.println(message.subject + " -> " + message.body);
}
response.flush();
response.close();
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**registerClient(client)**   | Registers a client to the messaging service | -
**unregisterClient(client)**   | Unregisters a client from the messaging service | -
**isClientExists(client)**   | Returns true if the client has been already registered to the messaging service and false otherwise | *boolean*
**registerTopic(topic)**   | Registers a topic to the messaging service | -
**unregisterTopic(topic)**   | Unregisters a topic from the messaging service | -
**isTopicExists(topic)**   | Returns true if the topic has been already registered to the messaging service and false otherwise | *boolean*
**subscribe(client, topic)**   | Subscribes a client to the given topic | -
**unsubscribe(client, topic)**   | Unsubscribes a client from the given topic | -
**isSubscriptionExists(client, topic)**   | Returns true if the subscription has been already registered to the messaging service and false otherwise | *boolean*
**send(sender, topic, subject, body)**   | Sends a message to the messaging service | -
**receive(receiver)**   | Receives the messages routed to the given receiver | *array of Message*
**receiveByTopic(receiver, topic)**   | Receives the messages routed to the given receiver for the given topic | *array of Message*
**route()**   | Performs the routing process | -
**cleanup()**   | Performs the clean-up process | -


#### Objects

---

##### Message


Function     | Description | Returns
------------ | ----------- | --------
**id**   | The Message id | *long*
**topic**   | The Message topic | *string*
**subject**   | The Message subject | *string*
**body**   | The Message body | *string*
**sender**   | The Message sender | *string*
**createdBy**   | The user who has been created the Message | *string*
**createdAt**   | The time when the Message has been created | *Date*



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

