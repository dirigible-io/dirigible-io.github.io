---
layout: api
title: Globals
icon: fa-check
---

{{ page.title }}
===

Globals object is used to store and manage properties in the global store.

Version 4.x
---

- Module: **core/v4/globals**
- Alias: **core/globals**
- Definition: [https://github.com/eclipse/dirigible/issues/30](https://github.com/eclipse/dirigible/issues/30)
- Source: [/core/v4/globals.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/globals.js)
- Facade: [GlobalsFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/GlobalsFacade.java)
- Status: **stable**

### Basic Usage

```javascript
var globals = require("core/v4/globals");
var response = require("http/v4/response");

globals.set("attr1", "value1");
var attr = globals.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the global parameters | *string*
**set(key, value)**   | Sets the value per key to the global parameters | -



### Compatibility


Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
 ---

Version 3.x
---

- Module: **core/v3/globals**
- Alias: **core/globals**
- Definition: [https://github.com/eclipse/dirigible/issues/30](https://github.com/eclipse/dirigible/issues/30)
- Source: [/core/v3/globals.js](https://github.com/dirigiblelabs/api-v3-core/blob/master/core/v3/globals.js)
- Facade: [GlobalsFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/GlobalsFacade.java)
- Status: **alpha**

### Basic Usage

```javascript
var globals = require("core/v3/globals");
var response = require("http/v3/response");

globals.set("attr1", "value1");
var attr = globals.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the global parameters | *string*
**set(key, value)**   | Sets the value per key to the global parameters | -



### Compatibility


Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅
 
 ---
 
 Version 2.x
---
 
 
- Module: **core/globals**
- Definition: [/core_api/issues/7](https://github.com/dirigiblelabs/core_api/issues/7)
- Source: [/core/globals.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/core/globals.js)
- Status: **beta**

### Basic Usage

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


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the global parameters | *string*
**set(key, value)**   | Sets the value per key to the global parameters | -



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

---
