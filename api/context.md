---
layout: api
title: Context
icon: fa-check
---

Context
===

Context object is used to store and manage properties for a single execution flow (with or without HTTP request)

- Module: **api/context**
- Definition: [/core_api/issues/6](https://github.com/dirigiblelabs/core_api/issues/6)
- Source: [/api/context.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/context.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var context = require('api/context');

context.set("attr1", "value1");
var attr = context.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```