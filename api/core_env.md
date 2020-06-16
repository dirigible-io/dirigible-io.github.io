---
layout: api
title: Env
icon: fa-check
---

{{ page.title }}
===

Env object is used for access of the environment variables.

Version 4.x
---

- Module: **core/v4/env**
- Alias: **core/env**
- Definition: [https://github.com/eclipse/dirigible/issues/29](https://github.com/eclipse/dirigible/issues/29)
- Source: [/core/v4/env.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/env.js)
- Facade: [EnvFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/EnvFacade.java)
- Status: **stable**

### Basic Usage

```javascript
var env = require("core/v4/env");
var response = require("http/v4/response");

var os = env.get("os.name");
response.println("[OS]: " + os);

response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the environments variables | *string*
**list()**   | Returns the list of the environments variables in JSON formatted string | *string*

### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---

Version 3.x
---

- Module: **core/v3/env**
- Alias: **core/env**
- Definition: [https://github.com/eclipse/dirigible/issues/29](https://github.com/eclipse/dirigible/issues/29)
- Source: [/core/v3/env.js](https://github.com/dirigiblelabs/api-v3-core/blob/master/core/v3/env.js)
- Facade: [EnvFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/EnvFacade.java)
- Status: **alpha**

### Basic Usage

```javascript
var env = require("core/v3/env");
var response = require("http/v3/response");

var os = env.get("os.name");
response.println("[OS]: " + os);

response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the environments variables | *string*
**list()**   | Returns the list of the environments variables in JSON formatted string | *string*

### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---

Version 2.x
---


- Module: **core/env**
- Definition: [/core_api/issues/33](https://github.com/dirigiblelabs/core_api/issues/33)
- Source: [/core/env.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/core/env.js)
- Status: **beta**

### Basic Usage

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var env = require('core/env');
var response = require('net/http/response');

var os = env.get("os.name");
response.println("[OS]: " + os);
response.println("[OS Name]: " + env.getOperatingSystemName());
response.println("[OS Arch]: " + env.getOperatingSystemArchitecture());
response.println("[OS Version]: " + env.getOperatingSystemVersion());
response.println("[File Separator]: " + env.getFileSeparator());
response.println("[Path Seprator]: " + env.getPathSeparator());
response.println("[Line Seprator]: " + env.getLineSeparator());
response.println("[User Dir]: " + env.getUserDirectory());
response.println("[User Home]: " + env.getUserHome());
response.println("[User Name]: " + env.getUserName());

response.println("[All]: " + env.getAll());

response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the environments variables | *string*
**set(key, value)**   | Sets the value per key to the environment variables | -
**getAll(key)**   | Returns the value per key form the environments variables | *array of key/value pairs*
**getOperatingSystemName()**   | Returns the 'os.name' value from the environments variables | *string*
**getOperatingSystemArchitecture()**   | Returns the 'os.arch' value from the environments variables | *string*
**getOperatingSystemVersion()**   | Returns the 'os.version' value from the environments variables | *string*
**getFileSeparator()**   | Returns the 'file.separator' value from the environments variables | *string*
**getPathSeparator()**   | Returns the 'path.separator' value from the environments variables | *string*
**getLineSeparator()**   | Returns the 'line.separator' value from the environments variables | *string*
**getUserDirectory()**   | Returns the 'user.dir' value from the environments variables | *string*
**getUserHome()**   | Returns the 'user.home' value from the environments variables | *string*
**getUserName()**   | Returns the 'user.name' value from the environments variables | *string*



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

---
