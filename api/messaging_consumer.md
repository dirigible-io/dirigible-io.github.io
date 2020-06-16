---
layout: api
title: Message Consumer
icon: fa-ellipsis-h
---

{{ page.title }}
===

The Messaging Consumer is an object which can send text messages to a Queue or Topic destination in the built-in Message Broker. This version is backed by the full fledged messaging broker [Apache ActiveMQ](http://activemq.apache.org/).

Version 4.x
---

- Module: **messaging/v4/consumer**
- Alias: **messaging/consumer**
- Definition: [https://github.com/eclipse/dirigible/issues/92](https://github.com/eclipse/dirigible/issues/92)
- Source: [/messaging/v4/consumer.js](https://github.com/dirigiblelabs/api-messaging/blob/master/messaging/v4/consumer.js)
- Facade: [MessagingFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-messaging/src/main/java/org/eclipse/dirigible/api/v3/messaging/MessagingFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var consumer = require("messaging/v4/consumer");
var message = consumer.queue("queue1").receive(1000);
```

### Definition

#### Functions

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



### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
 ---

Version 3.x
---

- Module: **messaging/v3/consumer**
- Alias: **messaging/consumer**
- Definition: [https://github.com/eclipse/dirigible/issues/92](https://github.com/eclipse/dirigible/issues/92)
- Source: [/messaging/v3/consumer.js](https://github.com/dirigiblelabs/api-v3-messaging/blob/master/messaging/v3/consumer.js)
- Facade: [MessagingFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-messaging/src/main/java/org/eclipse/dirigible/api/v3/messaging/MessagingFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var consumer = require("messaging/v3/consumer");
var message = consumer.queue("queue1").receive(1000);
```

### Definition

#### Functions

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



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅
 
 ---
 
