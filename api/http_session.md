---
layout: api
title: HTTP Session
icon: fa-ellipsis-h
---

{{ page.title }}
===

HTTP Session object provided to the scripting services implementation to hold session attributes for multiple client requests.

Version 4.x
---

- Module: **http/v4/session**
- Alias: **http/session**
- Definition: [https://github.com/eclipse/dirigible/issues/14](https://github.com/eclipse/dirigible/issues/14)
- Source: [/http/v4/session.js](https://github.com/dirigiblelabs/api-http/blob/master/http/v4/session.js)
- Facade: [HttpSessionFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-http/src/main/java/org/eclipse/dirigible/api/v3/http/HttpSessionFacade.java)
- Status: **alpha**


### Basic Usage


```javascript
var session = require("http/v4/session");
var response = require("http/v4/response");

session.setAttribute("attr1", "value1");
var attr = session.getAttribute("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**isValid()**   | Returns true if the current execution context is in a HTTP call | *boolean*
**getAttribute(name)**   | Returns the HTTP session attribute by name | *string*
**getAttributeNames()**   | Returns all the HTTP session attributes names | *array of string*
**getCreationTime()**   | Returns the time when the HTTP session has been initialized | *Date*
**getId()**   | Returns the HTTP session ID | *string*
**getLastAccessedTime()**   | Returns the time when the HTTP session has been last accessed | *Date*
**getMaxInactiveInterval()**   | Returns the maximum inactive interval of this HTTP session | *int*
**invalidate()**   | Invalidates this HTTP session | -
**isNew()**   | Returns true, if the HTTP session is created during this HTTP call and false otherwise | *boolean*
**setAttribute(name, value)**   | Sets the HTTP session attribute by name and value | *string*
**removeAttribute(name)**   | Removes the HTTP session attribute by name | *string*
**setMaxInactiveInterval(interval)**   | Sets the maximum inactive interval of this HTTP session | -



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ❌  | ❌


---

Version 3.x
---

- Module: **http/v3/session**
- Alias: **http/session**
- Definition: [https://github.com/eclipse/dirigible/issues/14](https://github.com/eclipse/dirigible/issues/14)
- Source: [/http/v3/session.js](https://github.com/dirigiblelabs/api-v3-http/blob/master/http/v3/session.js)
- Facade: [HttpSessionFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-http/src/main/java/org/eclipse/dirigible/api/v3/http/HttpSessionFacade.java)
- Status: **alpha**


### Basic Usage


```javascript
var session = require("http/v3/session");
var response = require("http/v3/response");

session.setAttribute("attr1", "value1");
var attr = session.getAttribute("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**isValid()**   | Returns true if the current execution context is in a HTTP call | *boolean*
**getAttribute(name)**   | Returns the HTTP session attribute by name | *string*
**getAttributeNames()**   | Returns all the HTTP session attributes names | *array of string*
**getCreationTime()**   | Returns the time when the HTTP session has been initialized | *Date*
**getId()**   | Returns the HTTP session ID | *string*
**getLastAccessedTime()**   | Returns the time when the HTTP session has been last accessed | *Date*
**getMaxInactiveInterval()**   | Returns the maximum inactive interval of this HTTP session | *int*
**invalidate()**   | Invalidates this HTTP session | -
**isNew()**   | Returns true, if the HTTP session is created during this HTTP call and false otherwise | *boolean*
**setAttribute(name, value)**   | Sets the HTTP session attribute by name and value | *string*
**removeAttribute(name)**   | Removes the HTTP session attribute by name | *string*
**setMaxInactiveInterval(interval)**   | Sets the maximum inactive interval of this HTTP session | -



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---


Version 2.x
---


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



### Definition

#### Functions

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




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

---
