---
layout: api
title: Thread
icon: fa-check
---

Threads
===

Threads utility is used to implement multi-threading algorithms - creating and starting own threads, synchronize functions, wait and notify of lock objects.

- Module: **core/threads**
- Definition: [/core_api/issues/29](https://github.com/dirigiblelabs/core_api/issues/29)
- Source: [/core/threads.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/core/threads.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var threads = require('core/threads');
var response = require('net/http/response');

response.setContentType("text/plain; charset=UTF-8");

// Define a JavaScript function
function runnable() {
	response.println("Hello World from a Thread!");
};

// Pass a JavaScript function
var worker = threads.create(runnable, "I am a thread");
response.println(worker.getName());
worker.start();
worker.join(); // to be able to print to the response

response.flush();
response.close();
```

Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**create(runnable, name)**   | Creates a new thread by a callback function and a name | *Thread*
**sleep(millis)**    | Suspends the execution of the current thread | -
**current()**  | Returns the current thread | *Thread*
**sync(f)**  | Synchronize a function of an object | synchronized function


### Objects

---

#### Thread


Function     | Description | Returns
------------ | ----------- | --------
**start()**   | Starts the thread | -
**interrupt()**   | Interrupts the execution of a thread | -
**join()**   | Waits this thread to die | -
**getId()**  | Returns the ID of the thread | *long*
**getName()**  | Returns the Name of the thread | *string*
**isAlive()**  | Returns true if the thread is still alive | *boolean*


#### Object

Function     | Description | Returns
------------ | ----------- | --------
**wait(millis)**   | Waits a given period of time until continuing the execution of the current thread or until another thread call notify of this object | -
**notify()**   | Wakes up a single thread waiting for this object | -
**notifyAll()**   | Wakes up all the threads waiting for this object | -



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ❌  | ❌
