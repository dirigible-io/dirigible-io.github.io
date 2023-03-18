---
title: Session
---

Session
===

HTTP Session object provided to the scripting services implementation to hold session attributes for multiple client requests.

=== "Overview"
- Module: `http/session`
- Definition: [https://github.com/eclipse/dirigible/issues/14](https://github.com/eclipse/dirigible/issues/14)
- Source: [/http/session.js](https://github.com/eclipse/dirigible/blob/master/components/api-http/src/main/resources/META-INF/dirigible/http/session.js)
- Status: `stable`


### Basic Usage


```javascript
var session = require("http/session");
var response = require("http/response");

session.setAttribute("attr1", "value1");
var attr = session.getAttribute("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```



### Functions

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
