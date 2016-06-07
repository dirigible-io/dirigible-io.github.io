---
layout: api
title: Context
icon: fa-check
---

Context
===

Context object is used to store and manage properties for a single execution flow (with or without HTTP request)

- Module: **core/context**
- Definition: [/core_api/issues/6](https://github.com/dirigiblelabs/core_api/issues/6)
- Source: [/core/context.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/core/context.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var context = require('core/context');
var response = require('net/http/response');

context.set("attr1", "value1");
var attr = context.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```