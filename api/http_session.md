---
layout: api
title: HTTP Session
icon: fa-ellipsis-h
---

HTTP Session
===

HTTP Session object provided to the scripting services implementation to hold session attributes for multiple client requests.

- Module: **net/http/session**
- Definition: [/core_api/issues/5](https://github.com/dirigiblelabs/core_api/issues/5)
- Source: [/net/http/session.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/net/http/session.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var session = require('net/http/session');
var response = require('net/http/response');

session.setAttribute("attr1", "value1");
var attr = session.getAttribute("attr1");

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
**getAttribute(name)**   | Returns the HTTP session attribute by name | *string*
**setAttribute(name, value)**   | Sets the HTTP session attribute by name and value | *string*
**removeAttribute(name)**   | Removes the HTTP session attribute by name | *string*
**getAttributeNames()**   | Returns all the HTTP session attributes names | *array of string*
**getId()**   | Returns the HTTP session ID | *string*
**getCreationTime()**   | Returns the time when the HTTP session has been initialized | *Date*
**getLastAccessedTime()**   | Returns the time when the HTTP session has been last accessed | *Date*
**getMaxInactiveInterval()**   | Returns the maximum inactive interval of this HTTP session | *int*
**setMaxInactiveInterval(interval)**   | Sets the maximum inactive interval of this HTTP session | -
**invalidate()**   | Invalidates this HTTP session | -




Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌


