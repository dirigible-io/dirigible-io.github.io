---
layout: samples
title: Encode a String to Base64
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps

1. Create a project **utils_project**.
2. Create a JavaScript service with the name **base64_encode.js**.
3. Enter the following content:

```javascript

var base64 = require('utils/v3/base64');
var response = require('http/v3/response');

var input = [61, 62, 63];
var result = base64.encode(input);

console.log('encoded: ' + result);
response.println(JSON.stringify('encoded: ' + result));

response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
