---
layout: api
title: Assert
icon: fa-check
---

{{ page.title }}
===

> ⚠ Deprecated

Assert object is used to check given conditions or objects

Version 3.x
---

None yet.

---


Version 2.x
---

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

Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**assertTrue(condition, message)**   | Asserts the condition is true and throws an Error with the message otherwise | -
**assertFalse(condition, message)**   | Asserts the condition is false and throws an Error with the message otherwise | -
**assertEquals(o1, o2, message)**   | Asserts the equality of the two objects is true and throws an Error with the message otherwise | -
**assertNull(o, message)**   | Asserts the object is null and throws an Error with the message otherwise | -
**assertNotNull(o, message)**   | Asserts the object is not null and throws an Error with the message otherwise | -
**assertFail(o, message)**   | Throws an Error with the message as convenience | -



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

