# Bytes

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.io`
- source: [io/Bytes.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/io/Bytes.java)
:::

Byte-buffer conversions that don't fit cleanly into a single JDK call - text-to-bytes with a named charset and integer / byte-array conversion with explicit byte order. The byte-order constants `BIG_ENDIAN` and `LITTLE_ENDIAN` match the values the underlying facade accepts; use them as the `byteOrder` argument rather than passing raw strings.

For straight ASCII / UTF-8 conversion you can use `org.eclipse.dirigible.sdk.utils.Utf8` or the standard library directly; this class earns its keep when you actually need a specific charset or a known endianness.

### Key Features:
- **Charset-aware text to bytes**: Convert a `String` to a `byte[]` with the platform default or a named charset.
- **Endian-aware integer conversion**: Pack and unpack `int` values to/from byte arrays in big- or little-endian order.
- **Byte-order constants**: `BIG_ENDIAN` and `LITTLE_ENDIAN` string constants for use as the `byteOrder` argument.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.io.Bytes;

// text -> bytes with a specific charset
byte[] utf16 = Bytes.textToByteArray("hello", "UTF-16");

// int -> bytes (network byte order)
byte[] header = Bytes.intToByteArray(42, Bytes.BIG_ENDIAN);

// bytes -> int
int value = Bytes.byteArrayToInt(header, Bytes.BIG_ENDIAN);
```

## Fields

### BIG_ENDIAN
String constant identifying big-endian byte order. Pass to methods that take a `byteOrder` argument.

> ```java
> public static final String BIG_ENDIAN = "BIG_ENDIAN";
> ```

### LITTLE_ENDIAN
String constant identifying little-endian byte order. Pass to methods that take a `byteOrder` argument.

> ```java
> public static final String LITTLE_ENDIAN = "LITTLE_ENDIAN";
> ```

## Methods

### textToByteArray()
Converts a string to a byte array. The first overload uses the platform default charset; the second uses a named charset and throws `UnsupportedEncodingException` when the name is unknown.

> ```java
> public static byte[] textToByteArray(String text);
> public static byte[] textToByteArray(String text, String charset) throws UnsupportedEncodingException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `text` | `String` | The string to encode. |
> | `charset` | `String` | The charset name (e.g. `"UTF-8"`, `"UTF-16"`). Optional. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The encoded byte array.
> :::

### intToByteArray()
Encodes an integer into a byte array using the given byte order.

> ```java
> public static byte[] intToByteArray(int value, String byteOrder);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `int` | The integer value to encode. |
> | `byteOrder` | `String` | One of `BIG_ENDIAN` or `LITTLE_ENDIAN`. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The encoded byte array.
> :::

### byteArrayToInt()
Decodes a byte array into an integer using the given byte order.

> ```java
> public static int byteArrayToInt(byte[] data, String byteOrder);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `data` | `byte[]` | The byte array to decode. |
> | `byteOrder` | `String` | One of `BIG_ENDIAN` or `LITTLE_ENDIAN`. |
>
> ::: info Returns
> - **Type**: `int`
> - **Description**: The decoded integer value.
> :::
