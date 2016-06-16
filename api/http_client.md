---
layout: api
title: HTTP Client
icon: fa-ellipsis-h
---

HTTP Client
===

HTTP Client is used by scripting services to call external services via HTTP.

- Module: **net/http/client**
- Definition: [/core_api/issues/3](https://github.com/dirigiblelabs/core_api/issues/3)
- Source: [/net/http/client.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/net/http/client.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var httpClient = require('net/http/client');
var response = require('net/http/response');

var httpResponse = httpClient.get('http://services.odata.org/V4/Northwind/Northwind.svc/');

response.println(httpResponse.statusMessage);
response.println(httpResponse.data);
response.flush();
response.close();
```
