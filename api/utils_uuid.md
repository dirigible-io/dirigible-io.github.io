---
layout: api
title: UUID
icon: fa-ellipsis-h
---

{{ page.title }}
===

UUID object is used to generate random universally unique identifiers.

Version 4.x
---

- Module: **utils/v4/uuid**
- Alias: **utils/uuid**
- Definition: [https://github.com/eclipse/dirigible/issues/27](https://github.com/eclipse/dirigible/issues/27)
- Source: [/utils/v4/uuid.js](https://github.com/dirigiblelabs/api-utils/blob/master/utils/v4/uuid.js)
- Facade: [UuidFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/UuidFacade.java)
- Status: **stable**

### Basic Usage

```javascript
var uuid = require("utils/v4/uuid");
var response = require("http/v4/response");

response.println(uuid.random());
response.println(uuid.validate("14a3ddce-f86d-4f51-a2e0-6e497b94bbe5"));

response.flush();
response.close();
```

### Definition
---

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**random()**   | Returns a random UUID string | *string*
**validate(input)**   | Validates whether the provided input is a valid UUID string | *boolean*



### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---

Version 3.x
---

- Module: **utils/v3/uuid**
- Alias: **utils/uuid**
- Definition: [https://github.com/eclipse/dirigible/issues/27](https://github.com/eclipse/dirigible/issues/27)
- Source: [/utils/v3/uuid.js](https://github.com/dirigiblelabs/api-v3-utils/blob/master/utils/v3/uuid.js)
- Facade: [UuidFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/UuidFacade.java)
- Status: **alpha**

### Basic Usage

```javascript
var uuid = require("utils/v3/uuid");
var response = require("http/v3/response");

response.println(uuid.random());
response.println(uuid.validate("14a3ddce-f86d-4f51-a2e0-6e497b94bbe5"));

response.flush();
response.close();
```

### Definition
---

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**random()**   | Returns a random UUID string | *string*
**validate(input)**   | Validates whether the provided input is a valid UUID string | *boolean*



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---

Version 2.x
---


- Module: **utils/uuid**
- Definition: [/core_api/issues/22](https://github.com/dirigiblelabs/core_api/issues/22)
- Source: [/utils/uuid.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/utils/uuid.js)
- Status: **beta**


### Basic Usage


```javascript
var uuid = require('utils/uuid');
var response = require('net/http/response');

response.println(uuid.random());
response.println(uuid.validate('14a3ddce-f86d-4f51-a2e0-6e497b94bbe5'));

response.flush();
response.close();
```




### Definition


#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**validate(input)**   | Validates whether the provided input is a valid UUID string | *boolean*
**random()**   | Returns a random UUID string | *string*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

---
