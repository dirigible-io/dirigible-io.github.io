---
layout: api
title: HTTP User
icon: fa-ellipsis-h
---

{{ page.title }}
===

HTTP User gives the information about the currently logged in user, if any.

- Module: **net/http/user**
- Definition: [/core_api/issues/40](https://github.com/dirigiblelabs/core_api/issues/40)
- Source: [/net/http/user.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/net/http/user.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var user = require('net/http/user');
var response = require('net/http/response');

response.println("[UserName]: " + user.getName());
response.println("[Is in Role]: " + user.isInRole("some_role"));
response.flush();
response.close();
response.flush();
response.close();
```



Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getName()**   | Returns the name of the currently logged in user, if any or null | *string*
**isInRole(role)**   | Returns true if the user has a given *role* and false otherwise | *boolean*



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
