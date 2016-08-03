---
layout: api
title: Console
icon: fa-check
---

{{ page.title }}
===

Console object is used to write messages to the default logging output. It has several log levels INFO, WARNING, ERROR, TRACE. 

- Module: **built-in**
- Definition: [/core_api/issues/2](https://github.com/dirigiblelabs/core_api/issues/2)
- Source: provided by the core
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

console.info("Info message: %s", "Hello World!");
console.error("Error message.");
console.warn("Warning message.");
console.log("Log message.");
console.trace("Trace.");
```

Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**info(message, parameters)**   | Logs a message with level INFO | -
**error(message, parameters)**   | Logs a message with level ERROR | -
**warn(message, parameters)**   | Logs a message with level WARN | -
**log(message, parameters)**   | Logs a message with level INFO | -
**trace(message, parameters)**   | Logs a message with level ERROR with the full stack trace | -



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
