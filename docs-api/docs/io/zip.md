---
title: Zip
---

Zip
===

Zip modules provides functionality for creating zip archive from files.

=== "Overview"
- Module: `io/zip`
- Definition: [https://github.com/eclipse/dirigible/issues/20](https://github.com/eclipse/dirigible/issues/20)
- Source: [/io/zip.js](https://github.com/eclipse/dirigible/blob/master/components/api-io/src/main/resources/META-INF/dirigible/io/zip.js)
- Status: `stable`


### Basic Usage

```javascript
var zip = require("io/zip");
var files = require("io/files");

var inputStream = files.createInputStream("test.zip");
if (inputStream.isValid()) {
    try {
        var zipInputStream = zip.createZipInputStream(inputStream);
        var zipEntry = zipInputStream.getNextEntry();
        while (zipEntry.isValid()) {
            console.error(zipEntry.getName());
            console.log(zipInputStream.read());
            zipEntry = zipInputStream.getNextEntry();
        }
    } finally {
        zipInputStream.close();
    }
} else {
    console.log('No such file');
}
```

```javascript
var zip = require("io/zip");
var files = require("io/files");

var outputStream = files.createOutputStream("test.zip");
if (outputStream.isValid()) {
        try {
            var zipOutputStream = zip.createZipOutputStream(outputStream);
            var zipEntry = zipOutputStream.createZipEntry("test1.txt");
            zipOutputStream.writeText("some text");
            zipOutputStream.createZipEntry("test2.bin");
            zipOutputStream.write([60, 61, 62, 63]);
        } finally {
            zipOutputStream.close();
        }
}
```

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
**read()**   | Reads from the zip input stream at the current entry point and returns the result as array of bytes | *array of bytes*
**readNative()**   | Reads from the zip input stream at the current entry point and returns the result as array of Java bytes | *array of Java bytes*
**readText()**   | Reads from the zip input stream at the current entry point and returns the result as text | *string*
**close()**   | Closes the zip input stream | -


#### ZipOutputStream


Function     | Description | Returns
------------ | ----------- | --------
**createZipEntry()**   | Returns a new entry for the archive | *ZipEntry*
**write(bytes)**   | Writes an array of bytes to the zip output stream at the current entry point | -
**writeNative(bytes)**   | Writes an array of Java bytes to the zip output stream at the current entry point | -
**writeText(text)**   | Writes a text to the zip output stream at the current entry point | -
**closeEntry()**   | Closes the current entry (optional) | -
**close()**   | Finishes, flushes and closes the zip output stream | -



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
**isValid()**   | Returns true if the entry is a valid one and false otherwise (after last) | *boolean*
