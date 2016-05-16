---
layout: api
title: HTTP Session
icon: fa-ellipsis-v
group: api-http
---

HTTP Session
===

HTTP Session object provided to the scripting services implementation to hold session attributes for multiple client requests.

- Module: **api/http/session**
- Definition: [https://github.com/dirigiblelabs/core_api/issues/5](https://github.com/dirigiblelabs/core_api/issues/5)
- Source: [https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/http/session.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/http/session.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');
var session = require('api/session');

session.setAttribute("attr1", "value1");
var attr = session.getAttribute("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```
