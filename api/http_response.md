---
layout: api
title: HTTP Response
icon: fa-ellipsis-h
group: api-http
---

HTTP Response
===

HTTP Response object provided to the scripting services implementation to create the result, which will be sent back to the client.

- Module: **api/http/response**
- Definition: [/core_api/issues/1](https://github.com/dirigiblelabs/core_api/issues/1)
- Source: [/api/http/response.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/http/response.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');

response.println("Hello World!");
response.flush();
response.close();
```
