# QrCode

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/QrCode.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils/QrCode.java)
:::

Renders a QR-code PNG for the given payload. Backed by ZXing under the hood with the platform's default size and error-correction settings; ideal for embedding small URLs, codes, or connection strings in receipts, emails, and IDE perspectives.

Returns the raw PNG bytes - write them straight to an HTTP response (with `Content-Type: image/png`) or into a file via `Files.writeBytesNative`.

### Key Features:
- **ZXing-backed**: Industry-standard QR-code generation with sensible defaults.
- **PNG output**: Returns raw PNG bytes ready to stream or persist.
- **Single-call surface**: No builder, no configuration object - just text in, bytes out.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.utils.QrCode;
import jakarta.servlet.http.HttpServletResponse;

// Stream a QR code as an image response
byte[] png = QrCode.generate("https://www.dirigible.io");
response.setContentType("image/png");
response.getOutputStream().write(png);

// Or persist to disk
java.nio.file.Files.write(java.nio.file.Paths.get("/tmp/qr.png"), png);
```

## Methods

### generate()
Renders a QR-code PNG for the supplied payload string.

> ```java
> public static byte[] generate(String text) throws WriterException, IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `text` | `String` | The payload to encode in the QR code. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The raw PNG bytes of the rendered QR code. Throws `com.google.zxing.WriterException` if the payload is too large for the default error-correction level, or `java.io.IOException` if PNG serialization fails.
> :::
