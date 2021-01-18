---
title: Converting JSON to XML
hide:
  - toc
---

Converting JSON to XML
===

### Steps

1. Create a project `utils-xml`.
2. Create a JavaScript service with the name `json-xml.js`.
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

> For more information, see the *[API](../api/)* documentation.
