---
layout: api
title: Url
icon: fa-ellipsis-h
---

{{ page.title }}
===

Url object is used to encode/decode text in the `application/x-www-form-urlencoded` MIME format.

Version 4.x
---

- Module: **utils/v4/url**
- Alias: **utils/url**
- Definition: [https://github.com/eclipse/dirigible/issues/25](https://github.com/eclipse/dirigible/issues/25)
- Source: [/utils/v4/url.js](https://github.com/dirigiblelabs/api-utils/blob/master/utils/v4/url.js)
- Facade: [UrlFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/UrlFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var url = require("utils/v4/url");
var response = require("http/v4/response");

response.println(url.encode('<![CDATA[<meta http-equiv="refresh" content="0;url=javascript:document.vulnerable=true;">]]>'));
response.println(url.decode('%3C%21%5BCDATA%5B%3Cmeta+http-equiv%3D%22refresh%22+content%3D%220%3Burl%3Djavascript%3Adocument.vulnerable%3Dtrue%3B%22%3E%5D%5D%3E'));

response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**decode(input)**   | Decode an input string from application/x-www-form-urlencoded format | *string*
**encode(input)**   | Encode an input string to application/x-www-form-urlencoded format | *string*
**escape(input)**   | Escape an input string to comply to URI RFC 3986 | *string*




### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---

Version 3.x
---

- Module: **utils/v3/url**
- Alias: **utils/url**
- Definition: [https://github.com/eclipse/dirigible/issues/25](https://github.com/eclipse/dirigible/issues/25)
- Source: [/utils/v3/url.js](https://github.com/dirigiblelabs/api-v3-utils/blob/master/utils/v3/url.js)
- Facade: [UrlFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/UrlFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var url = require("utils/v3/url");
var response = require("http/v3/response");

response.println(url.encode('<![CDATA[<meta http-equiv="refresh" content="0;url=javascript:document.vulnerable=true;">]]>'));
response.println(url.decode('%3C%21%5BCDATA%5B%3Cmeta+http-equiv%3D%22refresh%22+content%3D%220%3Burl%3Djavascript%3Adocument.vulnerable%3Dtrue%3B%22%3E%5D%5D%3E'));

response.flush();
response.close();
```




### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**decode(input)**   | Decode an input string from application/x-www-form-urlencoded format | *string*
**encode(input)**   | Encode an input string to application/x-www-form-urlencoded format | *string*
**escape(input)**   | Escape an input string to comply to URI RFC 3986 | *string*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---


Version 2.x
---

Not available.

---
