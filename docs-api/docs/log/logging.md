---
title: Logging
---

Logging
===

Logging API using high-performance underlying framework - [logback](https://logback.qos.ch/).

=== "Overview"
- Module: `log/logging`
- Definition: [https://github.com/eclipse/dirigible/issues/121](https://github.com/eclipse/dirigible/issues/121)
- Source: [/log/logging.js](https://github.com/eclipse/dirigible/blob/master/components/api-log/src/main/resources/META-INF/dirigible/log/logging.js)
- Status: `stable`


### Basic Usage

```javascript
var logging = require("log/logging");

var logger = logging.getLogger("org.eclipse.dirigible.mylogger");
logger.debug("Hello from {} {}!", "My", "Logger");
logger.error("Oops", new Error("Something wrong happened"));
```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getLogger(name)**   | Returns the Logger object by this name | *Logger*


### Objects

---


#### Logger


Function     | Description | Returns
------------ | ----------- | --------
**info(message, args?)**   | Logs the *message* with the INFO log level | -
**warn(message, args?)**   | Logs the *message* with the WARN log level | -
**error(message, args?)**   | Logs the *message* with the ERROR log level | -
**debug(message, args?)**   | Logs the *message* with the DEBUG log level | -
**trace(message, args?)**   | Logs the *message* with the TRACE log level | -
**log(message, level, args?)**   | Logs the *message* with the provided log *level* and optional message parameters | -
**infoError(message, error)**   | Logs the *error* with the stack trace with the INFO log level | -
**warnError(message, error)**   | Logs the *error* with the stack trace with the WARN log level | -
**errorError(message, error)**   | Logs the *error* with the stack trace with the ERROR log level | -
**debugError(message, error)**   | Logs the *error* with the stack trace with the DEBUG log level | -
**traceError(message, error)**   | Logs the *error* with the stack trace with the TRACE log level | -
**setLevel(level)**   | Sets the log level ('INFO', 'WARN', 'ERROR', 'DEBUG', 'TRACE') | -
