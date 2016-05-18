---
layout: api
title: UUID
icon: fa-ellipsis-h
group: api-utils
---

UUID
===

UUID object is used to generate random universally unique identifiers.

- Module: **api/utils/uuid**
- Definition: [/core_api/issues/22](https://github.com/dirigiblelabs/core_api/issues/22)
- Source: [/api/utils/uuid.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/utils/uuid.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var uuid = require('api/utils/uuid');
var response = require('api/http/response');

response.println(uuid.randomUUID());
response.println(uuid.fromString('14a3ddce-f86d-4f51-a2e0-6e497b94bbe5'));

response.flush();
response.close();
```
