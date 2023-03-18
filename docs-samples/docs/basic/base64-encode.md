---
title: Base64 - Encode
hide:
  - toc
---

# Base64 - Encode

### Steps

1. Create a project `sample-api-utils-base64`.
2. Create a JavaScript service with the name `base64-encode.js`.
3. Enter the following content:

```javascript
var base64 = require("utils/base64");
var response = require("http/response");

var input = [61, 62, 63];
var result = base64.encode(input);

console.log("encoded: " + result);
response.println(JSON.stringify("encoded: " + result));

response.flush();
response.close();
```

---

> For more information, see the _[API](https://www.dirigible.io/api/utils/base64/)_ documentation.
