---
layout: api
title: XSS
icon: fa-ellipsis-h
---

{{ page.title }}
===

> ⚠ Deprecated

Version 3.x ⚠
---

Moved to different module - [utils/escape](utils_escape.html).

---

---

Version 2.x
---

XSS object is used to escape special symbols in order to prevent XSS attacks.

- Module: **utils/xss**
- Definition: [/core_api/issues/10](https://github.com/dirigiblelabs/core_api/issues/10)
- Source: [/utils/xss.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/utils/xss.js)
- Status: **beta**

### Basic Usage

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var xss = require('utils/xss');
var response = require('net/http/response');

var raw = 'a\'b,c|d;e"f';
var escaped = xss.escapeCsv(raw);
response.println("CSV");
response.println(raw);
response.println(escaped);

raw = '<br><lt>';
escaped = xss.escapeHtml(raw);
response.println();
response.println("HTML");
response.println(raw);
response.println(escaped);

raw = '"hi" I\'m John';
escaped = xss.escapeJavaScript(raw);
response.println();
response.println("JavaScript");
response.println(raw);
response.println(escaped);

raw = "John's bag";
escaped = xss.escapeSql(raw);
response.println();
response.println("SQL");
response.println(raw);
response.println(escaped);

raw = "<tag>";
escaped = xss.escapeXml(raw);
response.println();
response.println("XML");
response.println(raw);
response.println(escaped);


response.flush();
response.close();
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**escapeCsv(data)**   | Escapes the CSV string | *string*
**escapeHtml(data)**   | Escapes the CSV string | *string*
**escapeJava(data)**   | Escapes the CSV string | *string*
**escapeJavaScript(data)**   | Escapes the CSV string | *string*
**escapeSql(data)**   | Escapes the CSV string | *string*
**escapeXml(data)**   | Escapes the CSV string | *string*
**unescapeCsv(data)**   | Unescapes the CSV string | *string*
**unescapeHtml(data)**   | Unescapes the CSV string | *string*
**unescapeJava(data)**   | Unescapes the CSV string | *string*
**unescapeJavaScript(data)**   | Unescapes the CSV string | *string*
**unescapeSql(data)**   | Unescapes the CSV string | *string*
**unescapeXml(data)**   | Unescapes the CSV string | *string*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌


