---
layout: api
title: Security User
icon: fa-ellipsis-h
---

{{ page.title }}
===

Security User gives the information about the currently logged in user, if any.

Version 4.x
---

- Module: **security/v4/user**
- Alias: **security/user**
- Definition: [https://github.com/eclipse/dirigible/issues/17](https://github.com/eclipse/dirigible/issues/17)
- Source: [/security/v4/user.js](https://github.com/dirigiblelabs/api-security/blob/master/security/v4/user.js)
- Facade: [UserFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-security/src/main/java/org/eclipse/dirigible/api/v3/security/UserFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var user = require("security/v4/user");
var response = require("http/v4/response");

response.println("[UserName]: " + user.getName());
response.println("[Is in Role]: " + user.isInRole("Developer"));
response.flush();
response.close();
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getName()**   | Returns the name of the currently logged in user, if any or null | *string*
**isInRole(role)**   | Returns true if the user has a given *role* and false otherwise | *boolean*



### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---

Version 3.x
---

- Module: **security/v3/user**
- Alias: **security/user**
- Definition: [https://github.com/eclipse/dirigible/issues/17](https://github.com/eclipse/dirigible/issues/17)
- Source: [/security/v3/user.js](https://github.com/dirigiblelabs/api-v3-security/blob/master/security/v3/user.js)
- Facade: [UserFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-security/src/main/java/org/eclipse/dirigible/api/v3/security/UserFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var user = require("security/v3/user");
var response = require("http/v3/response");

response.println("[UserName]: " + user.getName());
response.println("[Is in Role]: " + user.isInRole("Developer"));
response.flush();
response.close();
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getName()**   | Returns the name of the currently logged in user, if any or null | *string*
**isInRole(role)**   | Returns true if the user has a given *role* and false otherwise | *boolean*



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---

