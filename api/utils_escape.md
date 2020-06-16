---
layout: api
title: Escape Utils
icon: fa-ellipsis-h
---

{{ page.title }}
===

Escape object is used to escape/unescape text in CSV, HTML3, HTML4, Javascript, Java, JSON and XML format.


Version 4.x
---

- Module: **utils/v4/escape**
- Alias: **utils/escape**
- Definition: [https://github.com/eclipse/dirigible/issues/26](https://github.com/eclipse/dirigible/issues/26)
- Source: [/utils/v4/escape.js](https://github.com/dirigiblelabs/api-utils/blob/master/utils/v4/escape.js)
- Facade: [EscapeFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/EscapeFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var escape = require('utils/v4/escape');
var response = require('http/v4/response');

var input = "<script type='text/javascript'>alert('evil script')</script>";
var result = escape.escapeJavascript(input);

response.println(result);

response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**escapeCsv(input)**   | Escapes an input CSV string | *string*
**escapeJavascript(input)**   | Escapes an input Javascript string | *string*
**escapeHtml3(input)**   | Escapes an input HTML3 string | *string*
**escapeHtml4(input)**   | Escapes an input HTML4 string | *string*
**escapeJava(input)**   | Escapes an input Java string | *string*
**escapeJson(input)**   | Escapes an input JSON string | *string*
**escapeXml(input)**   | Escapes an input XML string | *string*
**unescapeCsv(input)**   | Unescapes an input CSV string | *string*
**unescapeJavascript(input)**   | Unescapes an input Javascript string | *string*
**unescapeHtml3(input)**   | Unescapes an input HTML3 string | *string*
**unescapeHtml4(input)**   | Unescapes an input HTML4 string | *string*
**unescapeJava(input)**   | Unescapes an input Java string | *string*
**unescapeJson(input)**   | Unescapes an input JSON string | *string*
**unescapeXml(input)**   | Unescapes an input XML string | *string*


Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
---


Version 3.x
---

- Module: **utils/v3/escape**
- Alias: **utils/escape**
- Definition: [https://github.com/eclipse/dirigible/issues/26](https://github.com/eclipse/dirigible/issues/26)
- Source: [/utils/v3/escape.js](https://github.com/dirigiblelabs/api-v3-utils/blob/master/utils/v3/escape.js)
- Facade: [EscapeFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/EscapeFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var escape = require('utils/v3/escape');
var response = require('http/v3/response');

var input = "<script type='text/javascript'>alert('evil script')</script>";
var result = escape.escapeJavascript(input);

response.println(result);

response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**escapeCsv(input)**   | Escapes an input CSV string | *string*
**escapeJavascript(input)**   | Escapes an input Javascript string | *string*
**escapeHtml3(input)**   | Escapes an input HTML3 string | *string*
**escapeHtml4(input)**   | Escapes an input HTML4 string | *string*
**escapeJava(input)**   | Escapes an input Java string | *string*
**escapeJson(input)**   | Escapes an input JSON string | *string*
**escapeXml(input)**   | Escapes an input XML string | *string*
**unescapeCsv(input)**   | Unescapes an input CSV string | *string*
**unescapeJavascript(input)**   | Unescapes an input Javascript string | *string*
**unescapeHtml3(input)**   | Unescapes an input HTML3 string | *string*
**unescapeHtml4(input)**   | Unescapes an input HTML4 string | *string*
**unescapeJava(input)**   | Unescapes an input Java string | *string*
**unescapeJson(input)**   | Unescapes an input JSON string | *string*
**unescapeXml(input)**   | Unescapes an input XML string | *string*



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---

---


Version 2.x
---

Use module - [utils/xss](utils_xss.html).

