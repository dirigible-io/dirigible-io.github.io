---
layout: api
title: Console
icon: fa-check
---

{{ page.title }}
===

Console object is used to write messages to the default logging output. It has several log levels INFO, WARNING, ERROR, TRACE. 

Version 4.x
---

- Module: **built-in**
- Definition: [https://github.com/eclipse/dirigible/issues/46](https://github.com/eclipse/dirigible/issues/46)
- Source: [/core/v4/console.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/console.js)
- Facade: [ConsoleFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/ConsoleFacade.java)
- Status: **stable**

### Basic Usage


```javascript
console.info("Info message: %s", "Hello World!");
console.error("Error message.");
console.warn("Warning message.");
console.debug("Debug message.");
console.log("Log message.");
console.trace("Trace.");
```

### Definition
---

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**info(message, parameters)**   | Logs a message with level INFO with formatting * | -
**error(message, parameters)**   | Logs a message with level ERROR with formatting * | -
**warn(message, parameters)**   | Logs a message with level WARN with formatting * | -
**debug(message, parameters)**   | Logs a message with level DEBUG with formatting * | -
**log(message)**   | Logs a raw message with level INFO | -
**trace(message, parameters)**   | Logs a message with level ERROR with the full stack trace | -

> * Formatting support is based on the standard Java [Formatter](https://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html#detail)

### Compatibility
---

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---

Version 3.x
---

- Module: **built-in**
- Definition: [https://github.com/eclipse/dirigible/issues/46](https://github.com/eclipse/dirigible/issues/46)
- Source: [/core/v3/console.js](https://github.com/dirigiblelabs/api-v3-core/blob/master/core/v3/console.js)
- Facade: [ConsoleFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/ConsoleFacade.java)
- Status: **alpha**

### Basic Usage


```javascript
console.info("Info message: %s", "Hello World!");
console.error("Error message.");
console.warn("Warning message.");
console.debug("Debug message.");
console.log("Log message.");
console.trace("Trace.");
```

### Definition
---

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**info(message, parameters)**   | Logs a message with level INFO with formatting * | -
**error(message, parameters)**   | Logs a message with level ERROR with formatting * | -
**warn(message, parameters)**   | Logs a message with level WARN with formatting * | -
**debug(message, parameters)**   | Logs a message with level DEBUG with formatting * | -
**log(message)**   | Logs a raw message with level INFO | -
**trace(message, parameters)**   | Logs a message with level ERROR with the full stack trace | -

> * Formatting support is based on the standard Java [Formatter](https://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html#detail)

### Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---

Version 2.x
---


- Module: **built-in**
- Definition: [/core_api/issues/2](https://github.com/dirigiblelabs/core_api/issues/2)
- Source: provided by the core
- Status: **beta**

### Basic Usage
---

```javascript
console.info("Info message: %s", "Hello World!");
console.error("Error message.");
console.warn("Warning message.");
console.debug("Debug message.");
console.log("Log message.");
console.trace("Trace.");
```

### Definition
---

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**info(message, parameters)**   | Logs a message with level INFO | -
**error(message, parameters)**   | Logs a message with level ERROR | -
**warn(message, parameters)**   | Logs a message with level WARN | -
**debug(message, parameters)**   | Logs a message with level DEBUG | -
**log(message, parameters)**   | Logs a message with level INFO | -
**trace(message, parameters)**   | Logs a message with level ERROR with the full stack trace | -



### Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

---
