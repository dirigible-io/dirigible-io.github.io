# pdf/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.pdf`
- source: [pdf/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/pdf)
:::

This module renders Mustache-style templates against a JSON data document and returns the resulting PDF bytes. The platform handles font loading, page sizing, and basic CSS — useful for invoice, report, and certificate generation without spinning up a full reporting engine.

Write the returned bytes straight into an HTTP response with `Content-Type: application/pdf`, or into the repository or filesystem via `org.eclipse.dirigible.sdk.io.Files#writeBytesNative(String, byte[])`.

The main components of this module are:

- [`Pdf`](./pdf.md) — renders a Mustache-style template with a JSON data document into PDF bytes.

## Classes
