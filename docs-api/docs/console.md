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
let text = "Hello World!";
console.info(`Info message ${text}.`);
console.error(`Error message ${text}.`);
console.warn(`Warning message ${text}.`);
console.debug(`Debug message ${text}.`);
console.log(`Log message ${text}.`);
console.trace(`Trace ${text}.`);
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**log(message)**   | Logs a raw message with level INFO | -
**info(message)**   | Logs a message with level INFO | -
**warn(message)**   | Logs a message with level WARN | -
**error(message)**   | Logs a message with level ERROR | -
**debug(message)**   | Logs a message with level DEBUG | -
**trace(message)**   | Logs a message with level ERROR with the full stack trace | -
