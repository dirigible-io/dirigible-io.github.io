---
layout: api
title: Base64
icon: fa-ellipsis-h
---

{{ page.title }}
===

Base64 object is used to encode/decode in base64.

Version 4.x
---

- Module: **utils/v4/base64**
- Alias: **utils/base64**
- Definition: [https://github.com/eclipse/dirigible/issues/22](https://github.com/eclipse/dirigible/issues/22)
- Source: [/utils/v4/base64.js](https://github.com/dirigiblelabs/api-utils/blob/master/utils/v4/base64.js)
- Facade: [Base64Facade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/Base64Facade.java)
- Status: **stable**


### Basic Usage

```javascript
var base64 = require("utils/v4/base64");
var response = require("http/v4/response");

response.println(base64.encode("admin:admin"));
response.println(base64.decode("YWRtaW46YWRtaW4="));

response.flush();
response.close();
```



### Definition


#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**encode(input)**   | Encode an input string to Base64 | *string*
**decode(input)**   | Decode an input string from Base64 | *string*




### Compatibility


Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---

Version 3.x
---

- Module: **utils/v3/base64**
- Alias: **utils/base64**
- Definition: [https://github.com/eclipse/dirigible/issues/22](https://github.com/eclipse/dirigible/issues/22)
- Source: [/utils/v3/base64.js](https://github.com/dirigiblelabs/api-v3-utils/blob/master/utils/v3/base64.js)
- Facade: [Base64Facade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/Base64Facade.java)
- Status: **alpha**


### Basic Usage

```javascript
var base64 = require("utils/v3/base64");
var response = require("http/v3/response");

response.println(base64.encode("admin:admin"));
response.println(base64.decode("YWRtaW46YWRtaW4="));

response.flush();
response.close();
```



### Definition


#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**encode(input)**   | Encode an input string to Base64 | *string*
**decode(input)**   | Decode an input string from Base64 | *string*




### Compatibility


Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---


Version 2.x
---


- Module: **utils/base64**
- Definition: [/core_api/issues/18](https://github.com/dirigiblelabs/core_api/issues/18)
- Source: [/utils/base64.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/utils/base64.js)
- Status: **beta**

### Basic Usage

```javascript
var base64 = require('utils/base64');
var response = require('net/http/response');

response.println(base64.encode('admin:admin'));
response.println(base64.decode('YWRtaW46YWRtaW4='));

response.flush();
response.close();
```




### Definition


#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**decode(input)**   | Decode an input string from Base64 | *string*
**encode(input)**   | Encode an input string to Base64 | *string*




### Compatibility


Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

---
