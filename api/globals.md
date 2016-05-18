---
layout: api
title: Globals
icon: fa-check
---

Globals
===

Globals object is used to store and manage properties in the global store.

- Module: **api/globals**
- Definition: [/core_api/issues/7](https://github.com/dirigiblelabs/core_api/issues/7)
- Source: [/api/globals.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/globals.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var globals = require('api/globals');

globals.set("attr1", "value1");
var attr = globals.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```