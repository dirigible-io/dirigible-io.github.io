---
title: Base64 - Encode
hide:
  - toc
---

# Base64 - Encode

### Steps

1. Create a project `utils-base64`.
2. Create a JavaScript service with the name `base64-encode.js`.
3. Enter the following content:

```javascript
var base64 = require("utils/v4/base64");
var response = require("http/v4/response");

var input = [61, 62, 63];
var result = base64.encode(input);

console.log("encoded: " + result);
response.println(JSON.stringify("encoded: " + result));

response.flush();
response.close();
```

---

> For more information, see the _[API](../../api/)_ documentation.
