# utils/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils)
:::

This module provides the general-purpose utility surface of the Eclipse Dirigible Java SDK. It bundles the encoding, hashing, escaping, identifier generation, URL manipulation, and structured-data conversion helpers that scripted and compiled extensions reach for most often. Every class is a static facade — no instances, no state — so the call sites stay short and the implementations stay swappable.

The helpers are deliberately thin wrappers over well-known libraries (Apache Commons Codec for Base64/Hex/URL, the JDK's `MessageDigest` and `SecureRandom`, ZXing for QR codes, Jackson for JSON, and Jackson XML for XML/JSON conversion). The wrapping centralises charset and encoding choices instead of leaving them scattered across user code, and keeps the behaviour consistent for every language running on Dirigible.

For password hashing, CSV parsing, and other concerns where a one-shot static helper isn't enough, the relevant class JavaDoc points to the appropriate dedicated library — these helpers cover the common case, not the long tail.

The main components of this module are:
- **Alphanumeric**: `SecureRandom`-backed random string generators for tokens, short identifiers, and one-shot secrets.
- **Base64**: Standard (non URL-safe) Base64 encode/decode helpers around Apache Commons Codec.
- **Converter**: Jackson-backed JSON serialization helpers (`toJson`, `fromJson`).
- **Digest**: One-shot cryptographic-digest helpers — MD5, SHA-1, SHA-256, SHA-384, SHA-512.
- **Escape**: Output escaping for CSV, HTML3/4, JavaScript, Java, JSON, and XML.
- **Hex**: Lower-case hexadecimal (base-16) encoding helpers.
- **QrCode**: ZXing-backed QR-code PNG renderer.
- **Url**: URL component encoding / percent-encoding helpers (named `Url` to avoid clashing with `java.net.URL`).
- **Utf8**: UTF-8 `byte[]` &harr; `String` conversion helpers.
- **Uuid**: Version 4 UUID generation and string-format validation.
- **Xml**: XML &harr; JSON conversion via the platform's Jackson XML mapper.

## Classes

- [`Alphanumeric`](./alphanumeric.md) — random string generators backed by `SecureRandom`.
- [`Base64`](./base64.md) — Base64 encode/decode helpers.
- [`Converter`](./converter.md) — Jackson-backed JSON serialization helpers.
- [`Digest`](./digest.md) — MD5/SHA-1/SHA-256/SHA-384/SHA-512 digest helpers.
- [`Escape`](./escape.md) — CSV, HTML, JS, Java, JSON, and XML escape/unescape helpers.
- [`Hex`](./hex.md) — base-16 encode/decode helpers.
- [`QrCode`](./qrcode.md) — QR-code PNG generator.
- [`Url`](./url.md) — URL component encoding helpers.
- [`Utf8`](./utf8.md) — UTF-8 `byte[]` &harr; `String` helpers.
- [`Uuid`](./uuid.md) — UUID generation and validation.
- [`Xml`](./xml.md) — XML &harr; JSON conversion helpers.
