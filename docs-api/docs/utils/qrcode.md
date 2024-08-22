---
title: QR Code
---

QR Code
===

QRCode object is used to generate a JavaScript byte array based on an input string.

=== "Overview"
- Module: `utils/qrcode`
- Source: [/utils/qrcode.js](https://github.com/eclipse/dirigible/blob/master/components/api-utils/src/main/resources/META-INF/dirigible/utils/qrcode.js)
- Status: `stable`
- Group: `core`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { qrcode } from "sdk/utils";
    import { response } from "sdk/http";

    let qrCodeBytes = qrcode.generateQRCode("https://www.dirigible.io");

    console.log("QR Code Bytes: " + qrCodeBytes);

    response.setContentType('image/png')
    response.write(qrCodeBytes);
    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const qrCodeGenerator = require("utils/qrcode");
    const response = require("http/response");

    const qrCodeBytes = qrCodeGenerator.generateQRCode("https://www.dirigible.io");

    console.log("QR Code Bytes: " + qrCodeBytes);

    response.write(qrCodeBytes);
    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**generateQRCode(input)**   | Generate a byte array from the input string | *byte array*
