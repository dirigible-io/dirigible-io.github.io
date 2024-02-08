---
title: Message Consumer
---

Message Consumer
===

The Messaging Consumer is an object which can send text messages to a Queue or Topic destination in the built-in Message Broker. This version is backed by the full fledged messaging broker [Apache ActiveMQ](http://activemq.apache.org/).

=== "Overview"
- Module: `messaging/consumer`
- Definition: [https://github.com/eclipse/dirigible/issues/92](https://github.com/eclipse/dirigible/issues/92)
- Source: [/messaging/consumer.js](https://github.com/eclipse/dirigible/blob/master/components/api-messaging/src/main/resources/META-INF/dirigible/messaging/consumer.js)
- Status: `stable`
- Group: `platform`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { consumer } from "sdk/messaging";

    let message = consumer.queue("queue1").receive(1000);

    console.log(message)
    ```

<!-- === "CommonJS"

    ```javascript
    const consumer = require("messaging/consumer");

    let message = consumer.queue("queue1").receive(1000);

    console.log(message)
    ``` -->


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
**receive(timeout)**   | Receives a message from this Message Queue if any or null with the given timeout in milliseconds | *string*


#### Topic

Function     | Description | Returns
------------ | ----------- | --------
**receive(timeout)**   | Receives a message from this Message Topic if any or null with the given timeout in milliseconds | *string*
