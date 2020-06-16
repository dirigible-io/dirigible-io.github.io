---
layout: api
title: Logging
icon: fa-ellipsis-h
---

{{ page.title }}
===

Logging API using high-performance underlying framework - [logback](https://logback.qos.ch/).

Version 4.x
---

- Module: **log/v4/logging**
- Alias: **log/logging**
- Definition: [https://github.com/eclipse/dirigible/issues/121](https://github.com/eclipse/dirigible/issues/121)
- Source: [/log/v4/logging.js](https://github.com/dirigiblelabs/api-log/blob/master/log/v4/logging.js)
- Facade: [LogFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-log/src/main/java/org/eclipse/dirigible/api/v3/log/LogFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var logging = require("log/v4/logging");

var logger = logging.getLogger("org.eclipse.dirigible.mylogger");
logger.debug("Hello from {} {}!", "My", "Logger");
logger.error("Oops", new Error("Something wrong"));
```


### Definition

#### Functions

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



Compatibility
---

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---

Version 3.x
---

- Module: **log/v3/logging**
- Alias: **log/logging**
- Definition: [https://github.com/eclipse/dirigible/issues/121](https://github.com/eclipse/dirigible/issues/121)
- Source: [/log/v3/logging.js](https://github.com/dirigiblelabs/api-v3-log/blob/master/log/v3/logging.js)
- Facade: [LogFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-log/src/main/java/org/eclipse/dirigible/api/v3/log/LogFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var logging = require("log/v3/logging");

var logger = logging.getLogger("org.eclipse.dirigible.mylogger");
logger.debug("Hello from {} {}!", "My", "Logger");
logger.error("Oops", new Error("Something wrong"));
```


### Definition

#### Functions

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



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---
