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

        ```javascript
        var qrCodeGenerator = require("utils/v4/qrcode");
        var response = require("http/v4/response");

        let qrCodeBytes = qrCodeGenerator.generateQRCode("https://www.dirigible.io");

        console.log("QR Code Bytes: " + qrCodeBytes);

        response.write(qrCodeBytes);
        response.flush();
        response.close();
        ```

> For more information, see the _[API](https://www.dirigible.io/api/utils/qrcode/)_ documentation.
