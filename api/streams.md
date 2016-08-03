---
layout: api
title: Streams
icon: fa-ellipsis-h
---

{{ page.title }}
===

Streams module provides classes and utilities for working with streams.

- Module: **io/streams**
- Definition: [/core_api/issues/34](https://github.com/dirigiblelabs/core_api/issues/34)
- Source: [/io/streams.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/io/streams.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var streams = require('io/streams');
var response = require('net/http/response');

var outputStream = streams.createByteArrayOutputStream();

streams.writeText(outputStream, "Some text content");

var bytes = outputStream.getBytes();
response.println("[Stream Content as Bytes]: " + bytes);

var text = String.fromCharCode.apply(String, bytes);
response.println("[Stream Content as Text]: " + text);

var inputStream = streams.createByteArrayInputStream(bytes);
var outputStreamCopy = streams.createByteArrayOutputStream();
streams.copy(inputStream, outputStreamCopy);
var copiedBytes = outputStreamCopy.getBytes();
var copiedText = String.fromCharCode.apply(String, copiedBytes);
response.println("[Stream Copied Content as Text]: " + copiedText);

response.flush();
response.close();
```




Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**read(inputStream)**   | Reads an InputStream to an array of bytes | *array of byte*
**write(outputStream, bytes)**   | Writes an array of bytes to an OutputStream | -
**read(inputStream)**   | Reads an InputStream and returns the result as a string representation | *string*
**write(outputStream, text)**   | Writes a string to an OutputStream | -
**copy(inputStream, outputStream)**   | Copies an InputStream to an OutputStream | -
**copyLarge(inputStream, outputStream)**   | Copies an InputStream to an OutputStream optimized for large data | -
**createByteArrayInputStream(bytes)**   | Creates an ByteArrayInputStream from the array of bytes | *ByteArrayInputStream*
**createByteArrayOutputStream()**   | Creates an ByteArrayOutputStream | *ByteArrayOutputStream*

### Objects

---

#### InputStream



#### OutputStream



#### ByteArrayInputStream



#### ByteArrayOutputStream


Function     | Description | Returns
------------ | ----------- | --------
**getBytes()**   | Returns the array of bytes contained in this ByteArrayOutputStream | *array of byte*
**getText()**   | Returns a string representation of the array of bytes contained in this ByteArrayOutputStream | *string*




Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
