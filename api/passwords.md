---
layout: api
title: Passwords
icon: fa-ellipsis-h
---

{{ page.title }}
===

> ⚠ Deprecated

Passwords object is used for a secure store of a confidential data

Version 3.x
---

None yet.

---


Version 2.x
---

- Module: **service/passwords**
- Definition: [/core_api/issues/50](https://github.com/dirigiblelabs/core_api/issues/50)
- Source: [/service/passwords.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/service/passwords.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */
var passwordStorage = require('password/api');

var response = require('net/http/response');

passwordStorage.setPassword('myPassword', 'Abcd1234');
var password = passwordStorage.getPassword('myPassword');

response.println(password);

response.flush();
response.close();
```


Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getPassword(alias)** | Returns the stored password for this *alias* or null, if there is no such record | *string*
**setPassword(alias, password)** | Stores a *password* under this *alias* | -
**deletePassword(alias)** | Deletes the *password* for this *alias* | -

Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
