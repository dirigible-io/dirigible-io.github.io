# Digest

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/Digest.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils/Digest.java)
:::

One-shot cryptographic-digest helpers - MD5, SHA-1, SHA-256, SHA-384, SHA-512. Each algorithm exposes overloads for `byte[]` or `String` input; MD5 and SHA-1 additionally expose `Hex` variants that return the digest as a printable hex string. Use the `Hex` variants when you want a printable identifier (cache keys, ETags, fingerprints) and the raw-byte variants when you'll feed the digest into another cryptographic step.

MD5 and SHA-1 are kept for compatibility with file fingerprinting / ETag use cases but should not be used for any new security-sensitive purpose - prefer `sha256` or `sha512`. For password hashing use a dedicated PBKDF2 / bcrypt / Argon2 library, not these helpers.

### Key Features:
- **Five algorithms**: MD5, SHA-1, SHA-256, SHA-384, SHA-512.
- **Bytes or string input**: Each algorithm has overloads for `String` and `byte[]` payloads.
- **Hex string output for fingerprints**: `md5Hex` / `sha1Hex` return a printable lower-case hex digest.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.utils.Digest;

// Hex-encoded MD5 - fine for ETags, not for security
String etag = Digest.md5Hex("payload");

// Raw SHA-256 bytes - feed into HMAC, signatures, etc.
byte[] sha = Digest.sha256("payload");

// Long-form SHA-512
byte[] sha512 = Digest.sha512("payload");
```

## Methods

### md5()
Computes the MD5 digest of the input and returns the raw 16-byte digest.

> ```java
> public static byte[] md5(String input);
> public static byte[] md5(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` or `byte[]` | The payload to hash. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The 16-byte MD5 digest.
> :::

### md5Hex()
Computes the MD5 digest of the input and returns it as a lower-case hex string.

> ```java
> public static String md5Hex(String input);
> public static String md5Hex(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` or `byte[]` | The payload to hash. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The MD5 digest, lower-case hex-encoded (32 characters).
> :::

### sha1()
Computes the SHA-1 digest of the input and returns the raw 20-byte digest.

> ```java
> public static byte[] sha1(String input);
> public static byte[] sha1(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` or `byte[]` | The payload to hash. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The 20-byte SHA-1 digest.
> :::

### sha1Hex()
Computes the SHA-1 digest of the input and returns it as a lower-case hex string.

> ```java
> public static String sha1Hex(String input);
> public static String sha1Hex(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` or `byte[]` | The payload to hash. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The SHA-1 digest, lower-case hex-encoded (40 characters).
> :::

### sha256()
Computes the SHA-256 digest of the input and returns the raw 32-byte digest.

> ```java
> public static byte[] sha256(String input);
> public static byte[] sha256(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` or `byte[]` | The payload to hash. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The 32-byte SHA-256 digest.
> :::

### sha384()
Computes the SHA-384 digest of the input and returns the raw 48-byte digest.

> ```java
> public static byte[] sha384(String input);
> public static byte[] sha384(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` or `byte[]` | The payload to hash. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The 48-byte SHA-384 digest.
> :::

### sha512()
Computes the SHA-512 digest of the input and returns the raw 64-byte digest.

> ```java
> public static byte[] sha512(String input);
> public static byte[] sha512(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` or `byte[]` | The payload to hash. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The 64-byte SHA-512 digest.
> :::
