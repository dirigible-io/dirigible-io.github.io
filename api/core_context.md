---
layout: api
title: Context
icon: fa-check
---

{{ page.title }}
===

Context object is used to store and manage properties for a single execution flow (with or without HTTP request)


Version 4.x
---

- Module: **core/v4/context**
- Alias: **core/context**
- Definition: [https://github.com/eclipse/dirigible/issues/31](https://github.com/eclipse/dirigible/issues/31)
- Source: [/core/v4/context.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/context.js)
- Facade: [ContextFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/ContextFacade.java)
- Status: **stable**

### Basic Usage

```javascript
var context = require('core/v4/context');
var response = require('http/v4/response');

context.set("attr1", "value1");
var attr = context.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the context parameters | *string*
**set(key, value)**   | Sets the value per key to the context parameters | -



### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
 
 ---
 
 
Version 3.x
---

- Module: **core/v3/context**
- Alias: **core/context**
- Definition: [https://github.com/eclipse/dirigible/issues/31](https://github.com/eclipse/dirigible/issues/31)
- Source: [/core/v3/context.js](https://github.com/dirigiblelabs/api-v3-core/blob/master/core/v3/context.js)
- Facade: [ContextFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/ContextFacade.java)
- Status: **alpha**

### Basic Usage

```javascript
var context = require('core/v3/context');
var response = require('http/v3/response');

context.set("attr1", "value1");
var attr = context.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the context parameters | *string*
**set(key, value)**   | Sets the value per key to the context parameters | -



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅
 
 
 ---
 
 
Version 2.x
---
 
- Module: **core/context**
- Definition: [/core_api/issues/6](https://github.com/dirigiblelabs/core_api/issues/6)
- Source: [/core/context.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/core/context.js)
- Status: **beta**

### Basic Usage

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var context = require('core/context');
var response = require('net/http/response');

context.set("attr1", "value1");
var attr = context.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the context parameters | *string*
**set(key, value)**   | Sets the value per key to the context parameters | -



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
