---
layout: api
title: HTTP Client
icon: fa-check
---

HTTP Client
===

HTTP Client is used by scripting services to call external services via HTTP.

- Module: **api/http/client**
- Definition: [https://github.com/dirigiblelabs/core_api/issues/3](https://github.com/dirigiblelabs/core_api/issues/3)
- Source: [https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/http/client.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/http/client.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var httpClient = require('api/http/client');
var response = require('api/http/response');

var httpResponse = httpClient.get('http://services.odata.org/V4/Northwind/Northwind.svc/');

response.println(httpResponse.statusMessage);
response.println(httpResponse.data);
response.flush();
response.close();
```
