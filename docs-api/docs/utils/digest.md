---
title: Digest
---

Digest
===

Digest object is used to encript binary/text with algorithms like md5, sha256 and sha512.

=== "Overview"
- Module: `utils/digest`
- Definition: [https://github.com/eclipse/dirigible/issues/24](https://github.com/eclipse/dirigible/issues/24)
- Source: [/utils/digest.js](https://github.com/eclipse/dirigible/blob/master/components/api-utils/src/main/resources/META-INF/dirigible/utils/digest.js)
- Status: `stable`


### Basic Usage

#### ECMA6

```javascript
import { digest } from "@dirigible/utils";
import { response } from "@dirigible/http";

response.println("" + digest.sha256("admin:admin"));
response.println("" + digest.sha512("YWRtaW46YWRtaW4="));

response.flush();
response.close();
```

#### Require

```javascript
var digest = require("utils/digest");
var response = require("http/response");

response.println("" + digest.sha256("admin:admin"));
response.println("" + digest.sha512("YWRtaW46YWRtaW4="));

response.flush();
response.close();
```

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
