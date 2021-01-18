---
title: URL - UTF-8 Encoding
hide:
  - toc
---

URL - UTF-8 Encoding
===

### Steps

1. Create a project `utils-url`.
2. Create a JavaScript service with the name `url_encode.js`.
3. Enter the following content:

```javascript

var url = require("utils/v4/url");
var response = require("http/v4/response");

var input = "http://www.dirigible.io/";
var result = url.encode(input, "UTF-8");

console.log("Encoded URL: " + result);
response.println(JSON.stringify(result));

response.flush();
response.close();

```

---

> For more information, see the *[API](../api/)* documentation.
