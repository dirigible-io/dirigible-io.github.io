---
layout: api
title: Digest
icon: fa-ellipsis-h
group: api-utils
---

Digest
===

Digest object is used to encript binary/text with algorithms like md5, sha256 and sha512.

- Module: **api/utils/digest**
- Definition: [/core_api/issues/20](https://github.com/dirigiblelabs/core_api/issues/20)
- Source: [/api/utils/digest.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/utils/digest.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var digest = require('api/utils/digest');
var response = require('api/http/response');

response.println("" + digest.sha256('admin:admin'));
response.println("" + digest.sha512('YWRtaW46YWRtaW4='));

response.flush();
response.close();
```
