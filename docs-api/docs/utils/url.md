---
title: Url
---

Url
===

Url object is used to encode/decode text in the `application/x-www-form-urlencoded` MIME format.

=== "Overview"
- Module: `utils/url`
- Definition: [https://github.com/eclipse/dirigible/issues/25](https://github.com/eclipse/dirigible/issues/25)
- Source: [/utils/url.js](https://github.com/eclipse/dirigible/blob/master/components/api-utils/src/main/resources/META-INF/dirigible/utils/url.js)
- Status: `stable`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { url } from "@dirigible/utils";
    import { response } from "@dirigible/http";

    response.println(url.encode('<![CDATA[<meta http-equiv="refresh" content="0;url=javascript:document.vulnerable=true;">]]>', 'UTF8'));
    response.println(url.decode('%3C%21%5BCDATA%5B%3Cmeta+http-equiv%3D%22refresh%22+content%3D%220%3Burl%3Djavascript%3Adocument.vulnerable%3Dtrue%3B%22%3E%5D%5D%3E', 'UTF8'));

    response.flush();
    response.close();
    ```

=== "CommonJS"

    ```javascript
    const url = require("utils/url");
    const response = require("http/response");

    response.println(url.encode('<![CDATA[<meta http-equiv="refresh" content="0;url=javascript:document.vulnerable=true;">]]>', 'UTF8'));
    response.println(url.decode('%3C%21%5BCDATA%5B%3Cmeta+http-equiv%3D%22refresh%22+content%3D%220%3Burl%3Djavascript%3Adocument.vulnerable%3Dtrue%3B%22%3E%5D%5D%3E', 'UTF8'));

    response.flush();
    response.close();
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**encode(input)**   | Encode an input string to application/x-www-form-urlencoded format | *string*
**decode(input)**   | Decode an input string from application/x-www-form-urlencoded format | *string*
**escape(input)**   | Escape an input string to comply to URI RFC 3986 | *string*
