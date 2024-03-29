---
title: Hex
---

Hex
===

Hex object is used to encode/decode text/binary in hexadecimal format.

=== "Overview"
- Module: `utils/hex`
- Definition: [https://github.com/eclipse/dirigible/issues/23](https://github.com/eclipse/dirigible/issues/23)
- Source: [/utils/hex.js](https://github.com/eclipse/dirigible/blob/master/components/api-utils/src/main/resources/META-INF/dirigible/utils/hex.js)
- Status: `stable`
- Group: `core`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { hex } from "sdk/utils";
    import { response } from "sdk/http";

    response.println(hex.encode("Hex Encoded"));
    response.println(hex.decode("48657820456e636f646564"));

    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const hex = require("utils/hex");
    const response = require("http/response");

    response.println(hex.encode("Hex Encoded"));
    response.println(hex.decode("48657820456e636f646564"));

    response.flush();
    response.close();
    ``` -->


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**decode(input)**   | Decode an input string from HEX | *string*
**encode(input)**   | Encode an input string to HEX | *string*
