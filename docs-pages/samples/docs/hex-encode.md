---
title: Hex - Encode
hide:
  - toc
---

Hex - Encode
===

### Steps

1. Create a project `utils-hex`.
2. Create a JavaScript service with the name `hex-encode.js`.
3. Enter the following content:

```javascript

var hex = require("utils/v4/hex");
var response = require("http/v4/response");

var input = [65, 66, 67];
var result = hex.encode(input);

console.log("encoded: " + result);
response.println(JSON.stringify(result));

response.flush();
response.close();

```

---

> For more information, see the *[API](../api/)* documentation.
