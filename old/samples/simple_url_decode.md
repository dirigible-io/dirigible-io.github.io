---
layout: samples
title: UTF-8 Decoding of a URL
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps

1. Create a project **utils_url**.
2. Create a JavaScript service with the name **url_decode.js**.
3. Enter the following content:

```javascript

var url = require("utils/v4/url");
var response = require("http/v4/response");

var input = "http%3A%2F%2Fwww.dirigible.io%2F";
var result = url.decode(input, "UTF-8");

console.log("Decoded URL: " + result);
response.println(JSON.stringify(result));

response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
