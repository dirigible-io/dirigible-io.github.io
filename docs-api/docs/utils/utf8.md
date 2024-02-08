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
- Group: `core`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { utf8 } from "sdk/utils";
    import { response } from "sdk/http";

    response.println(JSON.stringify(utf8.encode("mystring")));

    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const utf8 = require("utils/utf8");
    const response = require("http/response");

    response.println(JSON.stringify(utf8.encode("mystring")));

    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**encode(input, charset)**   | Encode an input string to UTF8 | *string*
**decode(input)**   | Decode an input string as UTF8 | *string*
**bytesToString(bytes, offset, length)**   | Translate bytes to string in UTF8 | *string*
