---
title: Base64
redirect_from:
  - /api/utils_base64.html
---

Base64
===

Base64 object is used to encode/decode in base64.

=== "Overview"
- Module: `utils/v4/base64`
- Alias: `utils/base64`
- Definition: [https://github.com/eclipse/dirigible/issues/22](https://github.com/eclipse/dirigible/issues/22)
- Source: [/utils/v4/base64.js](https://github.com/dirigiblelabs/api-utils/blob/master/utils/v4/base64.js)
- Facade: [Base64Facade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/Base64Facade.java)
- Status: `stable`

### Basic Usage

```javascript
var base64 = require("utils/v4/base64");
var response = require("http/v4/response");

response.println(base64.encode("admin:admin"));
response.println(base64.decode("YWRtaW46YWRtaW4="));

response.flush();
response.close();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**encode(input)**   | Encode an input string to Base64 | *string*
**decode(input)**   | Decode an input string from Base64 | *string*
