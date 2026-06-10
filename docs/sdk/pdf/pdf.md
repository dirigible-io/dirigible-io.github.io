# Pdf

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.pdf`
- source: [pdf/Pdf.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/pdf/Pdf.java)
:::

Renders a Mustache-style template against a JSON data document and returns the resulting PDF bytes. The platform handles font loading, page sizing, and basic CSS — useful for invoice, report, and certificate generation without spinning up a full reporting engine.

Write the returned bytes straight into an HTTP response with `Content-Type: application/pdf`, or into the repository / filesystem via `org.eclipse.dirigible.sdk.io.Files#writeBytesNative(String, byte[])`.

### Key Features:
- **Mustache-style Templating**: Templates use the familiar `{{ field }}` placeholder syntax.
- **JSON Data Binding**: The data document is passed as a JSON string, matching the shape consumed across the rest of the SDK.
- **Native Byte Output**: The result is returned as `byte[]` — stream directly to an HTTP response or persist via `Files.writeBytesNative`.
- **Platform-managed rendering**: Fonts, page sizing, and basic CSS are handled by the platform.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.pdf.Pdf;
import org.eclipse.dirigible.sdk.io.Files;

String template = """
    <html>
      <body>
        <h1>Invoice {{ invoiceNumber }}</h1>
        <p>Customer: {{ customer }}</p>
        <p>Total: {{ total }} EUR</p>
      </body>
    </html>
    """;

String data = """
    { "invoiceNumber": "INV-2026-0001", "customer": "Acme Ltd.", "total": "1240.00" }
    """;

byte[] pdf = Pdf.generate(template, data);
Files.writeBytesNative("/tmp/invoice.pdf", pdf);
```

## Methods

### generate()

Renders the given Mustache-style template with the supplied JSON data document and returns the resulting PDF as a byte array.

> ```java
> public static byte[] generate(String template, String dataJson);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `template` | `String` | The Mustache-style template body (HTML with `{{ field }}` placeholders). |
> | `dataJson` | `String` | The JSON document supplying values for the template placeholders. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The rendered PDF as a byte array — write directly to an HTTP response or persist via `Files.writeBytesNative`.
> :::
