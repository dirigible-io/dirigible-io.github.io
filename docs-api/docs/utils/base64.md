---
title: Base64
---

Base64
===

Base64 object is used to encode/decode in base64.

=== "Overview"
- Module: `utils/base64`
- Definition: [https://github.com/eclipse/dirigible/issues/22](https://github.com/eclipse/dirigible/issues/22)
- Source: [/utils/base64.js](https://github.com/eclipse/dirigible/blob/master/components/api-utils/src/main/resources/META-INF/dirigible/utils/base64.js)
- Status: `stable`
- Group: `core`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { base64 } from "sdk/utils";
    import { response } from "sdk/http";

    response.println(base64.encode("admin:admin"));
    response.println(base64.decode("YWRtaW46YWRtaW4="));

    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const base64 = require("utils/base64");
    const response = require("http/response");

    response.println(base64.encode("admin:admin"));
    response.println(base64.decode("YWRtaW46YWRtaW4="));

    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**encode(input)**   | Encode an input string to Base64 | *string*
**decode(input)**   | Decode an input string from Base64 | *string*
