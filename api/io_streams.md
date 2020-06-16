---
layout: api
title: Streams
icon: fa-ellipsis-h
---

{{ page.title }}
===

Streams module provides classes and utilities for working with streams.

Version 4.x
---

- Module: **io/v4/streams**
- Alias: **io/streams**
- Definition: [https://github.com/eclipse/dirigible/issues/51](https://github.com/eclipse/dirigible/issues/51)
- Source: [/io/v4/streams.js](https://github.com/dirigiblelabs/api-io/blob/master/io/v4/streams.js)
- Facade: [StreamsFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-io/src/main/java/org/eclipse/dirigible/api/v3/io/StreamsFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var streams = require("io/v4/streams");
var response = require("http/v4/response");

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


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**copy(inputStream, outputStream)**   | Copies an InputStream to an OutputStream | -
**createByteArrayInputStream(bytes)**   | Creates an ByteArrayInputStream from the array of bytes | *ByteArrayInputStream*
**createByteArrayOutputStream()**   | Creates an ByteArrayOutputStream | *ByteArrayOutputStream*


#### Objects

---

##### InputStream

Function     | Description | Returns
------------ | ----------- | --------
**readByte()**   | Reads a single byte from this InputStream | *byte*
**readBytes()**   | Returns the array of bytes contained in this InputStream | *array of byte*
**readText()**   | Returns a string representation of the array of bytes contained in this InputStream | *string*
**close()**   | Closes this InputStream to release the resources | -


##### OutputStream

Function     | Description | Returns
------------ | ----------- | --------
**writeByte(byte)**   | Writes a single byte to this OutputStream | -
**writeBytes(bytes)**   | Writes the array of bytes to this OutputStream | *array of byte*
**readText()**   | Returns a string representation of the array of bytes contained in this InputStream | *string*
**close()**   | Closes this OutputStream to release the resources | -


##### ByteArrayInputStream

> inherited from InputStream

##### ByteArrayOutputStream

> inherited from OutputStream and:

Function     | Description | Returns
------------ | ----------- | --------
**getBytes()**   | Returns the array of bytes contained in this ByteArrayOutputStream | *array of byte*
**getText()**   | Returns a string representation of the array of bytes contained in this ByteArrayOutputStream | *string*




### Compatibility


Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |


---

Version 3.x
---

- Module: **io/v3/streams**
- Alias: **io/streams**
- Definition: [https://github.com/eclipse/dirigible/issues/51](https://github.com/eclipse/dirigible/issues/51)
- Source: [/io/v3/streams.js](https://github.com/dirigiblelabs/api-v3-io/blob/master/io/v3/streams.js)
- Facade: [StreamsFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-io/src/main/java/org/eclipse/dirigible/api/v3/io/StreamsFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var streams = require("io/v3/streams");
var response = require("http/v3/response");

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


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**copy(inputStream, outputStream)**   | Copies an InputStream to an OutputStream | -
**createByteArrayInputStream(bytes)**   | Creates an ByteArrayInputStream from the array of bytes | *ByteArrayInputStream*
**createByteArrayOutputStream()**   | Creates an ByteArrayOutputStream | *ByteArrayOutputStream*


#### Objects

---

##### InputStream

Function     | Description | Returns
------------ | ----------- | --------
**readByte()**   | Reads a single byte from this InputStream | *byte*
**readBytes()**   | Returns the array of bytes contained in this InputStream | *array of byte*
**readText()**   | Returns a string representation of the array of bytes contained in this InputStream | *string*
**close()**   | Closes this InputStream to release the resources | -


##### OutputStream

Function     | Description | Returns
------------ | ----------- | --------
**writeByte(byte)**   | Writes a single byte to this OutputStream | -
**writeBytes(bytes)**   | Writes the array of bytes to this OutputStream | *array of byte*
**readText()**   | Returns a string representation of the array of bytes contained in this InputStream | *string*
**close()**   | Closes this OutputStream to release the resources | -


##### ByteArrayInputStream

> inherited from InputStream

##### ByteArrayOutputStream

> inherited from OutputStream and:

Function     | Description | Returns
------------ | ----------- | --------
**getBytes()**   | Returns the array of bytes contained in this ByteArrayOutputStream | *array of byte*
**getText()**   | Returns a string representation of the array of bytes contained in this ByteArrayOutputStream | *string*




### Compatibility


Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---


Version 2.x
---


- Module: **io/streams**
- Definition: [/core_api/issues/34](https://github.com/dirigiblelabs/core_api/issues/34)
- Source: [/io/streams.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/io/streams.js)
- Status: **beta**

### Basic Usage

```javascript
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


### Definition

#### Functions

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
**textToByteArray(text)**   | Converts a string to a byte array | *array of byte*
**byteArrayToText(bytes)**   | Converts a byte array to a string | *string*

#### Objects

---

##### InputStream



##### OutputStream



##### ByteArrayInputStream



##### ByteArrayOutputStream


Function     | Description | Returns
------------ | ----------- | --------
**getBytes()**   | Returns the array of bytes contained in this ByteArrayOutputStream | *array of byte*
**getText()**   | Returns a string representation of the array of bytes contained in this ByteArrayOutputStream | *string*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

---
