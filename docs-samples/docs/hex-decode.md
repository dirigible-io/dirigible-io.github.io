---
title: Hex - Decode
hide:
  - toc
---

Hex - Decode
===


### Steps

1. Create a project `utils-hex`.
2. Create a JavaScript service with the name `hex-decode.js`.
3. Enter the following content:

```javascript

var hex = require("utils/v4/hex");
var response = require("http/v4/response");

var input = "414243";
var result = hex.decode(input);

console.log("decoded: " + result);
response.println(JSON.stringify(result));

response.flush();
response.close();

```

---

> For more information, see the *[API](../../api/)* documentation.
