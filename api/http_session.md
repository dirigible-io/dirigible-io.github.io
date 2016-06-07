---
layout: api
title: HTTP Session
icon: fa-ellipsis-h
group: api-http
---

HTTP Session
===

HTTP Session object provided to the scripting services implementation to hold session attributes for multiple client requests.

- Module: **net/http/session**
- Definition: [/core_api/issues/5](https://github.com/dirigiblelabs/core_api/issues/5)
- Source: [/net/http/session.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/net/http/session.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var session = require('net/http/session');
var response = require('net/http/response');

session.setAttribute("attr1", "value1");
var attr = session.getAttribute("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```
