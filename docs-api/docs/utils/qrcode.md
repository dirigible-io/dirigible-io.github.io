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

### Basic Usage

=== "ECMA6"

    ```javascript
    import { qrcode } from "@dirigible/utils";
    import { response } from "@dirigible/http";

    let qrCodeBytes = qrcode.generateQRCode("https://www.dirigible.io");

    console.log("QR Code Bytes: " + qrCodeBytes);

    response.write(qrCodeBytes);
    response.flush();
    response.close();
    ```

=== "Require"

    ```javascript
    var qrCodeGenerator = require("utils/qrcode");
    var response = require("http/response");

    let qrCodeBytes = qrCodeGenerator.generateQRCode("https://www.dirigible.io");

    console.log("QR Code Bytes: " + qrCodeBytes);

    response.write(qrCodeBytes);
    response.flush();
    response.close();
    ```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**generateQRCode(input)**   | Generate a byte array from the input string | *byte array*
