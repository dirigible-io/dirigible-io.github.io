---
layout: samples
title: Decode a String from Hexadecimal Format
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps

1. Create a project **utils_hex**.
2. Create a JavaScript service with the name **hex_decode.js**.
3. Enter the following content:

####

```javascript

var hex = require('utils/v3/hex');
var response = require('http/v3/response');

var input = '414243';
var result = hex.decode(input);

console.log('decoded: ' + result);
response.println(JSON.stringify(result));

response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
