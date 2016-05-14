---
layout: api
title: HTTP Request
icon: fa-check
---

HTTP Request
===

HTTP Request object provided to the server side service implementation.

- Module: **api/http/request**
- Definition: [https://github.com/dirigiblelabs/core_api/issues/4](https://github.com/dirigiblelabs/core_api/issues/4)
- Source: [https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/http/request.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/http/request.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var request = require('api/http/request');
var response = require('api/http/response');

var method = request.getMethod();

response.println("[Method]: " + method);
response.flush();
response.close();
```
