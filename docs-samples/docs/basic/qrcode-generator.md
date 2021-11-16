---
title: QR Code Generator
hide:
- toc
---

# QR Code Generator

### Steps

1. Create a project `utils-qrcode`.
2. Then create a JavaScript service named `qr-generator.js`.
3. Within the service code, enter the following content:

#### QR Code Service

```javascript
var qrCodeGenerator = require("utils/v4/qrcode");
var response        = require("http/v4/response");

var result          = qrCodeGenerator.generateQRCode("Dirigible");

console.log("QR Code Byte Array: " + result);
response.println(JSON.stringify("QR Code Byte Array: " + result));

response.flush();
response.close();
```

> For more information, see the _[API](../../api/)_ documentation.