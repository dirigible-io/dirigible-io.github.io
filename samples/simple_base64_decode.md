---
layout: samples
title: Base64
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps

1. Create a project **utils_project**.
2. Create a JavaScript service with the name **utils_base64_decode.js**.
3. Enter the following content:

####

```javascript

var response = require('http/v3/response');
var base64 = require('utils/v3/base64');

var input = 'PT4/';
var result = base64.decode(input);

console.log('decoded: ' + result);
response.println(JSON.stringify('decoded: ' + result));

response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
