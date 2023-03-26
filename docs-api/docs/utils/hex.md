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


### Basic Usage

#### ECMA6

```javascript
import { hex } from "@dirigible/utils";
import { response } from "@dirigible/http";

response.println(hex.encode("Hex Encoded"));
response.println(hex.decode("48657820456e636f646564"));

response.flush();
response.close();
```

#### Require

```javascript
var hex = require("utils/hex");
var response = require("http/response");

response.println(hex.encode("Hex Encoded"));
response.println(hex.decode("48657820456e636f646564"));

response.flush();
response.close();
```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**decode(input)**   | Decode an input string from HEX | *string*
**encode(input)**   | Encode an input string to HEX | *string*
