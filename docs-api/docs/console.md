---
title: Console
---

Console
===

Console object is used to write messages to the default logging output. It has several log levels `INFO`, `WARNING`, `ERROR`, `TRACE`. 

=== "Overview"
- Module: `built-in`
- Definition: [https://github.com/eclipse/dirigible/issues/46](https://github.com/eclipse/dirigible/issues/46)
- Source: [/core/v4/console.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/console.js)
- Facade: [ConsoleFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/ConsoleFacade.java)
- Status: `stable`

### Basic Usage


```javascript
console.info("Info message: %s", "Hello World!");
console.error("Error message.");
console.warn("Warning message.");
console.debug("Debug message.");
console.log("Log message.");
console.trace("Trace.");
```

### Functions

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
