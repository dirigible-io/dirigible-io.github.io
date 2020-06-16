---
layout: api
title: Error
icon: fa-check
---

{{ page.title }}
===

> ⚠ Deprecated

Error object is used to create a JavaScript Error object with additional execution stack trace information.

- Module: **utils/error**
- Definition: [/core_api/issues/43](https://github.com/dirigiblelabs/core_api/issues/43)
- Source: [/utils/error.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/utils/error.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');
var errorUtils = require('utils/error');

processRequest();

function processRequest() {
	var error = createError();
	response.println(JSON.stringify(error, null, 2));
	response.flush();
	response.close();
}

function createError() {
	return errorUtils.createError('Error Message');
}
```

Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**createError(errorMessage)**   | Creates an Error with the error message argument and a execution stack trace | Error



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

