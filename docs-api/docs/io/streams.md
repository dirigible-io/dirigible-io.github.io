---
title: Streams
---

Streams
===

Streams module provides classes and utilities for working with streams.

=== "Overview"
- Module: `io/streams`
- Definition: [https://github.com/eclipse/dirigible/issues/51](https://github.com/eclipse/dirigible/issues/51)
- Source: [/io/streams.js](https://github.com/eclipse/dirigible/blob/master/components/api-io/src/main/resources/META-INF/dirigible/io/streams.js)
- Status: `stable`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { streams } from "@dirigible/io";
    import { response } from "@dirigible/http";

    let outputStream = streams.createByteArrayOutputStream();

    outputStream.writeText("Some text content");

    let bytes = outputStream.getBytes();
    response.println("[Stream Content as Bytes]: " + bytes);

    let text = String.fromCharCode.apply(String, bytes);
    response.println("[Stream Content as Text]: " + text);

    let inputStream = streams.createByteArrayInputStream(bytes);
    let outputStreamCopy = streams.createByteArrayOutputStream();
    streams.copy(inputStream, outputStreamCopy);
    let copiedBytes = outputStreamCopy.getBytes();
    let copiedText = String.fromCharCode.apply(String, copiedBytes);
    response.println("[Stream Copied Content as Text]: " + copiedText);

    response.flush();
    response.close();
    ```

=== "CommonJS"

    ```javascript
    const streams = require("io/streams");
    const response = require("http/response");

    let outputStream = streams.createByteArrayOutputStream();

    outputStream.writeText("Some text content");

    let bytes = outputStream.getBytes();
    response.println("[Stream Content as Bytes]: " + bytes);

    let text = String.fromCharCode.apply(String, bytes);
    response.println("[Stream Content as Text]: " + text);

    let inputStream = streams.createByteArrayInputStream(bytes);
    let outputStreamCopy = streams.createByteArrayOutputStream();
    streams.copy(inputStream, outputStreamCopy);
    let copiedBytes = outputStreamCopy.getBytes();
    let copiedText = String.fromCharCode.apply(String, copiedBytes);
    response.println("[Stream Copied Content as Text]: " + copiedText);

    response.flush();
    response.close();
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**copy(inputStream, outputStream)**   | Copies an InputStream to an OutputStream | -
**createByteArrayInputStream(bytes)**   | Creates an ByteArrayInputStream from the array of bytes | *ByteArrayInputStream*
**createByteArrayOutputStream()**   | Creates an ByteArrayOutputStream | *ByteArrayOutputStream*


### Objects

---

#### InputStream

Function     | Description | Returns
------------ | ----------- | --------
**readByte()**   | Reads a single byte from this InputStream | *byte*
**readBytes()**   | Returns the array of bytes contained in this InputStream | *array of byte*
**readText()**   | Returns a string representation of the array of bytes contained in this InputStream | *string*
**close()**   | Closes this InputStream to release the resources | -


#### OutputStream

Function     | Description | Returns
------------ | ----------- | --------
**writeByte(byte)**   | Writes a single byte to this OutputStream | -
**writeBytes(bytes)**   | Writes the array of bytes to this OutputStream | *array of byte*
**readText()**   | Returns a string representation of the array of bytes contained in this InputStream | *string*
**close()**   | Closes this OutputStream to release the resources | -


#### ByteArrayInputStream

> inherited from InputStream

#### ByteArrayOutputStream

> inherited from OutputStream and:

Function     | Description | Returns
------------ | ----------- | --------
**getBytes()**   | Returns the array of bytes contained in this ByteArrayOutputStream | *array of byte*
**getText()**   | Returns a string representation of the array of bytes contained in this ByteArrayOutputStream | *string*
