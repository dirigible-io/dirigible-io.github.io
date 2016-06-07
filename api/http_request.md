---
layout: api
title: HTTP Request
icon: fa-ellipsis-h
group: api-http
---

HTTP Request
===

HTTP Request object provided to the scripting services implementation. It contains the headers and parameters coming as input from the HTTP call.

- Module: **net/http/request**
- Definition: [/core_api/issues/4](https://github.com/dirigiblelabs/core_api/issues/4)
- Source: [/net/http/request.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/net/http/request.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var request = require('net/http/request');
var response = require('net/http/response');

var method = request.getMethod();

response.println("[Method]: " + method);
response.flush();
response.close();
```
