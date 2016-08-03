---
layout: api
title: Globals
icon: fa-check
---

{{ page.title }}
===

Globals object is used to store and manage properties in the global store.

- Module: **core/globals**
- Definition: [/core_api/issues/7](https://github.com/dirigiblelabs/core_api/issues/7)
- Source: [/core/globals.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/core/globals.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var globals = require('core/globals');
var response = require('net/http/response');

globals.set("attr1", "value1");
var attr = globals.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```


Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the global parameters | *string*
**set(key, value)**   | Sets the value per key to the global parameters | -



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
