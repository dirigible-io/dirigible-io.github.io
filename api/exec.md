---
layout: api
title: Exec
icon: fa-check
---

Exec
===

Exec object is used for executing a scripting service programmatically.

- Module: **service/exec**
- Definition: [/core_api/issues/36](https://github.com/dirigiblelabs/core_api/issues/36)
- Source: [/service/exec.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/service/exec.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var exec = require('service/exec');
var response = require('net/http/response');

var context = {"input_param": "input_param_value"};

// Test execution
var result = exec.test("/service/exec_target_test.js", context);

response.println("Printing output parameter: " + result.context.output_param);

// use also exec.js(), exec.flow(), exec.job(), exec.sql(), exec.command() ...

response.flush();
response.close();
```
