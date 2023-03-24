---
title: UTF8
---

UTF8
===

UTF8 object is used to encode/decode strings in UTF8.

=== "Overview"
- Module: `utils/utf8`
- Definition: N/A
- Source: [/utils/utf8.js](https://github.com/eclipse/dirigible/blob/master/components/api-utils/src/main/resources/META-INF/dirigible/utils/utf8.js)
- Status: `stable`

### Basic Usage

```javascript
var utf8 = require("utils/utf8");
var response = require("http/response");

response.println(JSON.stringify(utf8.encode("mystring", "UTF8")));

response.flush();
response.close();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**encode(input, charset)**   | Encode an input string to UTF8 | *string*
**decode(input)**   | Escape an input string as UTF8 | *string*
**bytesToString(bytes, offset, length)**   | Translate bytes to string in UTF8 | *string*
