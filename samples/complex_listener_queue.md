---
layout: samples
title: Listener of a Queue
icon: fa-caret-right
group: complex
---

{{ page.title }}
===

### Steps


1. Create a project **message_queue_listener_project**.
2. Then create a JavaScript service named **my_listener_handler.js**.
3. Within the service code, enter the following content:

#### Log Levels

```javascript

exports.onMessage = function(message) {
	console.log("Hello from My Listener! Message: " + message);
};

exports.onError = function(error) {
	console.error("Error from My Listener! Error: " + error);
};

```

4. Then create a **listener** descriptor file **my_listener.listener**
5. Enter the following JSON content in it:

```json

{
    "name":"message_queue_listener_project/my_queue",
    "type":"Q",
    "handler":"message_queue_listener_project/my_listener_handler.js",
    "description":"My Listener"
}

```

6. Then create another back-end service which will play the role of a trigger **my_trigger.js**
7. Enter the following code:

```javascript

var producer = require('messaging/v3/producer');
var message = "*** I am a message created at: " + new Date() + " ***";
producer.queue("message_queue_listener_project/my_queue").send(message);
console.log("Hello from My Trigger! Message: " + message);

```

8. Publish the project
9. Select the **my_trigger.js** file in the *Workspace* view to be able to trigger the invocation of this service via the *Preview* view
10. In the *Console* view you chould see the following lines:

	[2018-05-14T11:57:13.197Z] [INFO] Hello from My Listener! Message: *** I am a message created at: Mon May 14 2018 14:57:13 GMT+0300 (EEST) ***
	
	[2018-05-14T11:57:13.174Z] [INFO] Hello from My Trigger! Message: *** I am a message created at: Mon May 14 2018 14:57:13 GMT+0300 (EEST) ***

---

For more information, see the *[API](../api/)* documentation.
