---
layout: samples
title: Convert a String from JSON to XML
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps

1. Create a project **utils_xml**.
2. Create a JavaScript service with the name **json2xml.js**.
3. Enter the following content:

```javascript

var xml = require("utils/v4/xml");
var response = require("http/v4/response");

var input = {
	a: { 
      b: "text_b",
      c: "text_c",
      d: { 
         e: "text_e"
      }
   }
};

var result = xml.fromJson(input);

console.log("XML: " + result);
response.println(JSON.stringify("XML: " + result));

response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
