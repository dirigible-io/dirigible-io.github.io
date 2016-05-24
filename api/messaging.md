---
layout: api
title: Messaging
icon: fa-check
---

Messaging
===

Messaging object is used to access the built-in passive messaging hub. One can registers as a client, subscribes to a topic and receives routed messages from the other clients.

- Module: **api/messaging**
- Definition: [/core_api/issues/11](https://github.com/dirigiblelabs/core_api/issues/11)
- Source: [/api/messaging.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/messaging.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var messaging = require('api/messaging');

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
