---
layout: api
title: Hex
icon: fa-ellipsis-h
---

{{ page.title }}
===

Hex object is used to encode/decode text/binary in hexadecimal format.

Version 4.x
---

- Module: **utils/v4/hex**
- Alias: **utils/hex**
- Definition: [https://github.com/eclipse/dirigible/issues/23](https://github.com/eclipse/dirigible/issues/23)
- Source: [/utils/v4/hex.js](https://github.com/dirigiblelabs/api-utils/blob/master/utils/v4/hex.js)
- Facade: [HexFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/HexFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var hex = require("utils/v4/hex");
var response = require("http/v4/response");

response.println(hex.encode("Hex Encoded"));
response.println(hex.decode("48657820456e636f646564"));

response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**decode(input)**   | Decode an input string from HEX | *string*
**encode(input)**   | Encode an input string to HEX | *string*


### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---

Version 3.x
---

- Module: **utils/v3/hex**
- Alias: **utils/hex**
- Definition: [https://github.com/eclipse/dirigible/issues/23](https://github.com/eclipse/dirigible/issues/23)
- Source: [/utils/v3/hex.js](https://github.com/dirigiblelabs/api-v3-utils/blob/master/utils/v3/hex.js)
- Facade: [HexFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/HexFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var hex = require("utils/v3/hex");
var response = require("http/v3/response");

response.println(hex.encode("Hex Encoded"));
response.println(hex.decode("48657820456e636f646564"));

response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**decode(input)**   | Decode an input string from HEX | *string*
**encode(input)**   | Encode an input string to HEX | *string*


### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---

Version 2.x
---

- Module: **api/utils/hex**
- Definition: [/core_api/issues/19](https://github.com/dirigiblelabs/core_api/issues/19)
- Source: [/api/utils/base64.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/utils/hex.js)
- Status: **beta**

### Basic Usage

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var hex = require('utils/hex');
var response = require('net/http/response');

response.println(hex.encode('Hex Encoded'));
response.println(hex.decode('48657820456e636f646564'));

response.flush();
response.close();
```




### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**decode(input)**   | Decode an input string from HEX | *string*
**encode(input)**   | Encode an input string to HEX | *string*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

---
