---
layout: samples
title: Convert a String from XML to JSON
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps

1. Create a project **utils_xml**.
2. Create a JavaScript service with the name **xml2json.js**.
3. Enter the following content:

```javascript

var xml2json = require('utils/v3/xml');
var response = require('http/v3/response');

var input = '<a><b>text_b</b><c>text_c</c><d><e>text_e</e></d></a>';
var result = xml2json.toJson(input);

console.log(('JSON: ' + result));
response.println(JSON.stringify('JSON: ' + result));

response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
