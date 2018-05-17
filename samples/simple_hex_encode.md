---
layout: samples
title: Encode a String to Hexadecimal Format
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps

1. Create a project **utils_hex**.
2. Create a JavaScript service with the name **hex_encode.js**.
3. Enter the following content:

####

```javascript

var hex = require('utils/v3/hex');
var response = require('http/v3/response');

var input = [65, 66, 67];
var result = hex.encode(input);

console.log('encoded: ' + result);
response.println(JSON.stringify(result));

response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
