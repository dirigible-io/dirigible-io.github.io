---
title: Console
---

Console
===

Console object is used to write messages to the default logging output. It has several log levels `INFO`, `WARNING`, `ERROR` and `DEBUG`. 

=== "Overview"
- Module: `built-in`
- Status: `stable`
- Group: `core`

### Basic Usage


```javascript
const text = "Hello World!";
console.info(`Info message ${text}.`);
console.error(`Error message ${text}.`);
console.warn(`Warning message ${text}.`);
console.debug(`Debug message ${text}.`);
console.log(`Log message ${text}.`);
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
