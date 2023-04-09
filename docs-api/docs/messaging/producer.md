---
title: Message Producer
---

Message Producer
===

The Messaging Producer is an object which can send text messages to a Queue or Topic destination in the built-in Message Broker. This version is backed by the full fledged messaging broker [Apache ActiveMQ](http://activemq.apache.org/).

=== "Overview"
- Module: `messaging/producer`
- Definition: [https://github.com/eclipse/dirigible/issues/91](https://github.com/eclipse/dirigible/issues/91)
- Source: [/messaging/producer.js](https://github.com/eclipse/dirigible/blob/master/components/api-messaging/src/main/resources/META-INF/dirigible/messaging/producer.js)
- Status: `stable`
- Group: `platform`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { producer } from "@dirigible/messaging"

    producer.queue("queue1").send("Text Message");
    ```

=== "CommonJS"

    ```javascript
    const producer = require("messaging/producer");

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
