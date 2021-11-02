---
title: QR Code Generator
---

QR Code Generator
===

QRCode object is used to generate a JavaScript byte array based on an input string.

=== "Overview"
- Module: `utils/v4/qrcode`
- Alias : `utils/qrcode`
- Source: [/utils/v4/qrcode.js](https://github.com/dirigiblelabs/api-utils/blob/master/utils/v4/qrcode.js)
- Facade: [QRCodeFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/QRCodeFacade.java)
- Status: `stable`

### Basic Usage

```javascript
var qrCodeGenerator = require("utils/v4/qrcode");
var response        = require("http/v4/response");

var result          = qrCodeGenerator.generateQRCode("Dirigible");

console.log("QR Code Byte Array: " + result);
response.println(JSON.stringify("QR Code Byte Array: " + result));

response.flush();
response.close();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**generateQRCode(input)**   | Generate a byte array from the input string | *byte[ ]*
