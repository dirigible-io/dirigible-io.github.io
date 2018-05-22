---
layout: samples
title: UTF-8 Encoding of a URL
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps

1. Create a project **utils_url**.
2. Create a JavaScript service with the name **url_encode.js**.
3. Enter the following content:

```javascript

var url = require('utils/v3/url');
var response = require('http/v3/response');

var input = 'http://www.dirigible.io/';
var result = url.encode(input, 'UTF-8');

console.log(('Encoded URL: ' + result));
response.println(JSON.stringify(result));

response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
