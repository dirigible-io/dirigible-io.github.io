---
layout: api
title: UUID
icon: fa-ellipsis-h
---

UUID
===

UUID object is used to generate random universally unique identifiers.

- Module: **utils/uuid**
- Definition: [/core_api/issues/22](https://github.com/dirigiblelabs/core_api/issues/22)
- Source: [/utils/uuid.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/utils/uuid.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var uuid = require('utils/uuid');
var response = require('net/http/response');

response.println(uuid.random());
response.println(uuid.validate('14a3ddce-f86d-4f51-a2e0-6e497b94bbe5'));

response.flush();
response.close();
```




Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**validate(input)**   | Validates whether the provided input is a valid UUID string | *boolean*
**random()**   | Returns a random UUID string | *string*




Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

