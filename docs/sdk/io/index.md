# io/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.io`
- source: [io/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/io)
:::

This module provides input/output utilities for the Eclipse Dirigible Java SDK. It groups everything related to moving bytes in and out of the platform - filesystem operations against the host OS, stream-shaped reading and writing, byte-buffer conversions with explicit charset and endianness, ZIP archive creation and extraction, and image resizing.

All classes in this module are stateless facades exposing `public static` methods that delegate to the underlying Dirigible platform - there is nothing to instantiate. They sit on top of the same in-process platform facades used by every supported language, so I/O behaviour stays consistent regardless of which language a file is written in.

The main components of this module are:
- **Bytes**: Byte-buffer conversions - text-to-bytes with a named charset, and integer / byte-array conversion with explicit byte order.
- **Files**: Filesystem operations against the host OS - read/write content, query metadata, change permissions, copy or move entries.
- **Image**: Image resize helper. Reads an `InputStream`, scales to requested dimensions, returns a new stream.
- **Streams**: Stream-shaped I/O - read text or bytes, write to an `OutputStream`, copy between streams, build in-memory buffers.
- **Zip**: ZIP archive creation and extraction with folder-level shortcuts and streaming overloads for entry-level control.

## Classes

- [Bytes](./bytes.md)
- [Files](./files.md)
- [Image](./image.md)
- [Streams](./streams.md)
- [Zip](./zip.md)
