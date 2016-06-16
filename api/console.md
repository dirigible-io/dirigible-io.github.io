---
layout: api
title: Console
icon: fa-check
---

Console
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
