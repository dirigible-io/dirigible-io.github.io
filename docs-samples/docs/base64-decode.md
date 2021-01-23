---
title: Base64 - Decode
hide:
  - toc
---

Base64 - Decode
===

### Steps

1. Create a project `utils-project`.
2. Create a JavaScript service with the name `base64-decode.js`
3. Enter the following content:

```javascript

var base64 = require("utils/v4/base64");
var response = require("http/v4/response");

var input = "PT4/";
var result = base64.decode(input);

console.log("decoded: " + result);
response.println(JSON.stringify("decoded: " + result));

response.flush();
response.close();

```

---

> For more information, see the *[API](../api/)* documentation.
