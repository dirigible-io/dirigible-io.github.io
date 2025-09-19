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
- Group: `core`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { logging } from "sdk/log";

    let logger = logging.getLogger("org.eclipse.dirigible.mylogger");

    logger.debug("Hello from {}!", "MyLogger");
    logger.error("Oops", new Error("Something wrong happened"));
    logger.error("Oops! Param 1: {}, param 2: {}", "param1Value", "param2Value", new Error("Something wrong happened"));
    ```

<!-- === "CommonJS"

    ```javascript
    const logging = require("log/logging");

    let logger = logging.getLogger("org.eclipse.dirigible.mylogger");

    logger.debug("Hello from {}!", "MyLogger");
    logger.error("Oops", new Error("Something wrong happened"));
    logger.error("Oops! Param 1: {}, param 2: {}", "param1Value", "param2Value", new Error("Something wrong happened"));
    ``` -->


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
**isDebugEnabled()**   | Is the logger instance enabled for the **DEBUG** level | *boolean*
**isErrorEnabled()**   | Is the logger instance enabled for the **ERROR** level | *boolean*
**isWarnEnabled()**   | Is the logger instance enabled for the **WARN** level | *boolean*
**isInfoEnabled()**   | Is the logger instance enabled for the **INFO** level | *boolean*
**isTraceEnabled()**   | Is the logger instance enabled for the **TRACE** level | *boolean*
**setLevel(level)**   | Sets the log level ('INFO', 'WARN', 'ERROR', 'DEBUG', 'TRACE') | -
