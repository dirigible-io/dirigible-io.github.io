---
layout: api
title: Base64
icon: fa-ellipsis-h
---

Base64
===

Base64 object is used to encode/decode in base64.

- Module: **utils/base64**
- Definition: [/core_api/issues/18](https://github.com/dirigiblelabs/core_api/issues/18)
- Source: [/utils/base64.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/utils/base64.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var base64 = require('utils/base64');
var response = require('net/http/response');

response.println(base64.encode('admin:admin'));
response.println(base64.decode('YWRtaW46YWRtaW4='));

response.flush();
response.close();
```
