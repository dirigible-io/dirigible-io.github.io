---
layout: api
title: Zip
icon: fa-ellipsis-h
---

{{ page.title }}
===

Zip module provides compress and uncompress functionality for ZIP archives.

- Module: **io/zip**
- Definition: [/core_api/issues/48](https://github.com/dirigiblelabs/core_api/issues/48)
- Source: [/io/zip.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/io/zip.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var streams = require('io/streams');
var zip = require('io/zip');

var response = require('net/http/response');

const TEST_ZIP_BYTES = [80,75,3,4,20,0,8,0,8,0,74,-126,99,73,0,0,0,0,0,0,0,0,0,0,0,0,9,0,16,0,104,101,108,108,111,46,116,120,116,85,88,12,0,90,71,27,88,43,71,27,88,-28,-103,0,0,-13,72,-51,-55,-55,87,8,-49,47,-54,73,81,4,0,80,75,7,8,-93,28,41,28,14,0,0,0,12,0,0,0,80,75,1,2,21,3,20,0,8,0,8,0,74,-126,99,73,-93,28,41,28,14,0,0,0,12,0,0,0,9,0,12,0,0,0,0,0,0,0,0,64,-92,-127,0,0,0,0,104,101,108,108,111,46,116,120,116,85,88,8,0,90,71,27,88,43,71,27,88,80,75,5,6,0,0,0,0,1,0,1,0,67,0,0,0,85,0,0,0,0,0];

var zipInputStream = zip.createZipInputStream(streams.createByteArrayInputStream(TEST_ZIP_BYTES));
var zipEntry = null;
try {
    while ((zipEntry = zipInputStream.getNextEntry()) !== null) {
		var path = zipEntry.getName();
		console.info(path);
		var bytes = zipEntry.readData();
		var text = streams.byteArrayToText(bytes);
		console.info(text);
	}
} finally {
    zipInputStream.close();
}

response.flush();
response.close();
```


```javascript
/* globals $ */
/* eslint-env node, dirigible */

var streams = require('io/streams');
var zip = require('io/zip');

var response = require('net/http/response');

var baos = streams.createByteArrayOutputStream();
var zipOutputStream = zip.createZipOutputStream(baos);
try {
	var zipEntry = zipOutputStream.createZipEntry("hello.txt");
	zipEntry.writeData(streams.textToByteArray("Hello World!"));
	zipOutputStream.putNextEntry(zipEntry);
} finally {
	zipOutputStream.close();
}

console.info(baos.getBytes());

response.setContentType("application/zip");
response.addHeader("Content-Disposition", "attachment;filename=\"myzip.zip\"");
response.writeStream(streams.createByteArrayInputStream(baos.getBytes()));

response.flush();
response.close();
```



Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**createZipInputStream(inputStream)**   | Returns the Zip archive reader object | *ZipInputStream*
**createZipOutputStream(outputStream)**   | Returns the Zip archive writer object | *ZipOutputStream*



### Objects

---

#### ZipInputStream


Function     | Description | Returns
------------ | ----------- | --------
**getNextEntry()**   | Returns the next entry from the archive or null if no more entries found | *ZipEntry*
**close()**   | Closes the zip input stream | *-*


#### ZipOutputStream


Function     | Description | Returns
------------ | ----------- | --------
**createZipEntry()**   | Returns a new entry for the archive | *ZipEntry*
**putNextEntry()**   | Puts the next entry to the archive | *-*
**close()**   | Finishes, flushes and closes the zip output stream | *-*


#### ZipEntry


Function     | Description | Returns
------------ | ----------- | --------
**getName()**   | Returns the name of the entry | *ZipEntry*
**close()**   | Closes the input stream | *-*


#### ZipEntry


Function     | Description | Returns
------------ | ----------- | --------
**getName()**   | Returns the name of the entry | *string*
**getSize()**   | Returns the size of the entry | *integer*
**getCompressedSize()**   | Returns the compressed size of the entry | *integer*
**getTime()**   | Returns the time stamp of the entry | *integer*
**getCrc()**   | Returns the CRC sum of the entry | *integer*
**getComment()**   | Returns the comment text of the entry | *integer*
**isDirectory()**   | Returns true if the entry represents a directory and false otherwise | *integer*
**readData()**   | Loads and returns the data of this entry | *array of byte*
**writeData(bytes)**   | Stores the data to this entry | *-*



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
