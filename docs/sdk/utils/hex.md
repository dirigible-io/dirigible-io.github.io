# Hex

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/Hex.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils/Hex.java)
:::

Hex (base-16) encoding helpers. Lower-case alphabet, no separators — useful for rendering digests, fingerprints, and binary identifiers as printable strings.

`decode(String)` throws `DecoderException` for invalid input (odd length, non-hex character); reach for it when input is user-supplied and you want to surface a client-friendly error rather than crash on a corrupt byte.

### Key Features:
- **Lower-case alphabet**: Matches the most common digest fingerprint format.
- **No separators**: Compact output — pair with `Digest.sha256` for printable hashes.
- **Bytes-first variants**: `encodeNative` / `decodeNative` skip the `String` round-trip.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.utils.Hex;
import org.eclipse.dirigible.sdk.utils.Digest;

// Hex-encode a SHA-256 digest
String fingerprint = Hex.encode(Digest.sha256("payload"));

// Decode a hex string back to bytes — surfaces DecoderException on bad input
byte[] bytes = Hex.decode(fingerprint);
```

## Methods

### encode()
Encodes the input as a lower-case hex string. Overloaded for `String` (encoded as bytes by the underlying facade) and raw `byte[]` payloads.

> ```java
> public static String encode(String input);
> public static String encode(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` or `byte[]` | The data to encode. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The hex-encoded representation (lower-case, no separators).
> :::

### decode()
Decodes a hex string back into raw bytes. Throws `DecoderException` if the input has odd length or contains non-hex characters.

> ```java
> public static byte[] decode(String input) throws DecoderException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The hex-encoded text to decode. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The decoded raw bytes. Throws `DecoderException` on invalid input.
> :::

### encodeNative()
Bytes-in, bytes-out hex encoding — returns the ASCII hex representation as a `byte[]` instead of a `String`.

> ```java
> public static byte[] encodeNative(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `byte[]` | The raw bytes to encode. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The hex-encoded bytes (ASCII, lower-case).
> :::

### decodeNative()
Bytes-in, bytes-out hex decoding — accepts the ASCII hex representation as a `byte[]` and returns the decoded raw bytes.

> ```java
> public static byte[] decodeNative(byte[] input) throws DecoderException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `byte[]` | The hex-encoded bytes (ASCII) to decode. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The decoded raw bytes. Throws `DecoderException` on invalid input.
> :::
