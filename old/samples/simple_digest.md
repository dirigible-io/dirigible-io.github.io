---
layout: samples
title: Encrypt a Text with SHA512
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps

1. Create a project **digest_project**.
2. Create a JavaScript service with the name **digest_sha512.js**.
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

For more information, see the *[API](../api/)* documentation.
