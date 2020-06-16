---
layout: api
title: Digest
icon: fa-ellipsis-h
---

{{ page.title }}
===

Digest object is used to encript binary/text with algorithms like md5, sha256 and sha512.

Version 4.x
---

- Module: **utils/v4/digest**
- Alias: **utils/digest**
- Definition: [https://github.com/eclipse/dirigible/issues/24](https://github.com/eclipse/dirigible/issues/24)
- Source: [/utils/v4/digest.js](https://github.com/dirigiblelabs/api-utils/blob/master/utils/v4/digest.js)
- Facade: [DigestFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/DigestFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var digest = require("utils/v4/digest");
var response = require("http/v4/response");

response.println("" + digest.sha256("admin:admin"));
response.println("" + digest.sha512("YWRtaW46YWRtaW4="));

response.flush();
response.close();
```

### Definition

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**md5(input)**   | Calculates the MD5 digest and returns the value as a 16 element byte array | *array of byte*
**md5Hex(input)**   | Calculates the MD5 digest and returns the value as a 32 character hex string | *string*
**sha1(input)**   | Returns an SHA-1 digest | *array of byte*
**sha256(input)**   | Returns an SHA-256 digest | *array of byte*
**sha384(input)**   | Returns an SHA-384 digest | *array of byte*
**sha512(input)**   | Returns an SHA-512 digest | *array of byte*
**sha1Hex(input)**   | Calculates the SHA-1 digest and returns the value as a hex string | *string*


### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
---

Version 3.x
---

- Module: **utils/v3/digest**
- Alias: **utils/digest**
- Definition: [https://github.com/eclipse/dirigible/issues/24](https://github.com/eclipse/dirigible/issues/24)
- Source: [/utils/v3/digest.js](https://github.com/dirigiblelabs/api-v3-utils/blob/master/utils/v3/digest.js)
- Facade: [DigestFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/DigestFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var digest = require("utils/v3/digest");
var response = require("http/v3/response");

response.println("" + digest.sha256("admin:admin"));
response.println("" + digest.sha512("YWRtaW46YWRtaW4="));

response.flush();
response.close();
```

### Definition

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**md5(input)**   | Calculates the MD5 digest and returns the value as a 16 element byte array | *array of byte*
**md5Hex(input)**   | Calculates the MD5 digest and returns the value as a 32 character hex string | *string*
**sha1(input)**   | Returns an SHA-1 digest | *array of byte*
**sha256(input)**   | Returns an SHA-256 digest | *array of byte*
**sha384(input)**   | Returns an SHA-384 digest | *array of byte*
**sha512(input)**   | Returns an SHA-512 digest | *array of byte*
**sha1Hex(input)**   | Calculates the SHA-1 digest and returns the value as a hex string | *string*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅
 
---
 
Version 2.x
---


- Module: **utils/digest**
- Definition: [/core_api/issues/20](https://github.com/dirigiblelabs/core_api/issues/20)
- Source: [/utils/digest.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/utils/digest.js)
- Status: **beta**

### Basic Usage

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var digest = require('utils/digest');
var response = require('net/http/response');

response.println("" + digest.sha256('admin:admin'));
response.println("" + digest.sha512('YWRtaW46YWRtaW4='));

response.flush();
response.close();
```





### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**md5(input)**   | Calculates the MD5 digest and returns the value as a 16 element byte array | *array of byte*
**md5Hex(input)**   | Calculates the MD5 digest and returns the value as a 32 character hex string | *string*
**sha(input)**   | Returns an SHA-1 digest | *array of byte*
**sha1(input)**   | Returns an SHA-1 digest | *array of byte*
**sha256(input)**   | Returns an SHA-256 digest | *array of byte*
**sha384(input)**   | Returns an SHA-384 digest | *array of byte*
**sha512(input)**   | Returns an SHA-512 digest | *array of byte*
**shaHex(input)**   | Calculates the SHA-1 digest and returns the value as a hex string | *string*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

---
