---
title: Message Producer
redirect_from:
  - /api/messaging_producer.html
---

Message Producer
===

The Messaging Producer is an object which can send text messages to a Queue or Topic destination in the built-in Message Broker. This version is backed by the full fledged messaging broker [Apache ActiveMQ](http://activemq.apache.org/).

=== "Overview"
- Module: `messaging/v4/producer`
- Alias: `messaging/producer`
- Definition: [https://github.com/eclipse/dirigible/issues/91](https://github.com/eclipse/dirigible/issues/91)
- Source: [/messaging/v4/producer.js](https://github.com/dirigiblelabs/api-messaging/blob/master/messaging/v4/producer.js)
- Facade: [MessagingFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-messaging/src/main/java/org/eclipse/dirigible/api/v3/messaging/MessagingFacade.java)
- Status: `stable`


### Basic Usage

```javascript
var producer = require("messaging/v4/producer");
producer.queue("queue1").send("Text Message");
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**queue()**   | Returns an object representing a Message Queue | *Queue*
**topic()**   | Returns an object representing a Message Topic | *Topic*


### Objects

---

#### Queue

Function     | Description | Returns
------------ | ----------- | --------
**send(message)**   | Send a message to this Message Queue | -


#### Topic

Function     | Description | Returns
------------ | ----------- | --------
**send(message)**   | Send a message to this Message Topic | -
