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
- Status: **stable**

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

assert.assertFalse(false, "Failed assertFalse");
try {
	assert.assertFalse(true, "Failed assertFalse");
} catch(e) {
    response.println(e.message);
}

assert.assertEquals("string", "string", "Failed assertEquals string");
try {
	assert.assertEquals("string1", "string2", "Failed assertEquals string");
} catch(e) {
    response.println(e.message);
}

assert.assertEquals({"key": "value"}, {"key": "value"}, "Failed assertEquals object");
try {
	assert.assertEquals({"key1": "value1"}, {"key2": "value2"}, "Failed assertEquals object");
} catch(e) {
    response.println(e.message);
}

assert.assertNull(null, "Failed assertNull");
try {
	assert.assertNull("", "Failed assertNull");
} catch(e) {
    response.println(e.message);
}

assert.assertNotNull("", "Failed assertNotNull");
try {
	assert.assertNotNull(null, "Failed assertNotNull");
} catch(e) {
    response.println(e.message);
}

try {
	assert.fail("Failed fail");
} catch(e) {
    response.println(e.message);
}

response.flush();
response.close();
```