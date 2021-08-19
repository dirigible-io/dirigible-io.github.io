---
title: Encrypt - SHA-512
hide:
  - toc
---

# Encrypy - SHA-512

### Steps

1. Create a project `digest`.
2. Create a JavaScript service with the name `digest-sha512.js`.
3. Enter the following content:

```javascript
var digest = require("utils/v4/digest");
var response = require("http/v4/response");

var input = [61, 62, 63];
var result = digest.sha512(input);

console.log(result);
response.println(JSON.stringify(result));

response.flush();
response.close();
```

---

> For more information, see the _[API](../../api/)_ documentation.
