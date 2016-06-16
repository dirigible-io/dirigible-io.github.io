---
layout: api
title: Assert
icon: fa-check
---

Assert
===

Assert object is used to check given conditions or objects

- Module: **core/assert**
- Definition: [/core_api/issues/35](https://github.com/dirigiblelabs/core_api/issues/35)
- Source: [/core/assert.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/core/assert.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var assert = require('core/assert');
var response = require('net/http/response');

assert.assertTrue(true, "Failed assertTrue");
try {
	assert.assertTrue(false, "Failed assertTrue");
} catch(e) {
    response.println(e.message);
}

response.flush();
response.close();
```