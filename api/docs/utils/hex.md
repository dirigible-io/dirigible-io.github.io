---
title: Hex
---

Hex
===

Hex object is used to encode/decode text/binary in hexadecimal format.

=== "Overview"
- Module: `utils/v4/hex`
- Alias: `utils/hex`
- Definition: [https://github.com/eclipse/dirigible/issues/23](https://github.com/eclipse/dirigible/issues/23)
- Source: [/utils/v4/hex.js](https://github.com/dirigiblelabs/api-utils/blob/master/utils/v4/hex.js)
- Facade: [HexFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/HexFacade.java)
- Status: `stable`


### Basic Usage

```javascript
var hex = require("utils/v4/hex");
var response = require("http/v4/response");

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
