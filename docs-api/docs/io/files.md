---
title: Files
---

Files
===

Files module provides an access to the underlying File System, where the Dirigible server is deployed on.

=== "Overview"
- Module: `io/v4/files`
- Alias: `io/files`
- Definition: [https://github.com/eclipse/dirigible/issues/19](https://github.com/eclipse/dirigible/issues/19)
- Source: [/io/v4/files.js](https://github.com/dirigiblelabs/api-io/blob/master/io/v4/files.js)
- Facade: [FilesFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-io/src/main/java/org/eclipse/dirigible/api/v3/io/FilesFacade.java)
- Status: `stable`


### Basic Usage

```javascript
var files = require("io/v4/files");

var tempFile = files.createTempFile("dirigible", ".txt");
console.log("Temp file: " + tempFile);
files.writeText(tempFile, "Eclipse Dirigible");
files.deleteFile(tempFile);
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**list(path)**   | List files under this *path* | *array of string*
**exists(path)**   | Whether a file by this *path* exists | *boolean*
**isExecutable(path)**   | Whether the file by this *path* is executable | *boolean*
**isReadable(path)**   | Whether the file by this *path* is readable | *boolean*
**isWritable(path)**   | Whether the file by this *path* is writable | *boolean*
**isHidden(path)**   | Whether the file by this *path* is hidden | *boolean*
**isDirectory(path)**   | Whether the file by this *path* is directory | *boolean*
**isFile(path)**   | Whether the file by this *path* is file | *boolean*
**isSameFile(path1, path2)**   | Whether the files by these *path1* and *path2* are pointing to the same file | *boolean*
**getCanonicalPath(path)**   | Returns the canonical path of the file by this *path* | *string*
**getName(path)**   | Returns the name of the file by this *path* | *string*
**getParentPath(path)**   | Returns the parent's path of the file by this *path* | *string*
**readBytes(path)**   | Returns the content of the given file as byte array | *array of bytes*
**readBytesNative(path)**   | Returns the content of the given file as array of Java bytes | *array of Java bytes*
**readText(path)**   | Returns the content of the given file as string | *string*
**writeBytes(path, bytes)**   | Writes the given byte array content to the file | -
**writeBytesNative(path, bytes)**   | Writes the given array of Java bytes content to the file | -
**writeText(path, text)**   | Writes the given text content to the file | -
**getLastModified(path)**   | Returns the last modification date of the file by this *path* | *Date*
**setLastModified(path, date)**   | Sets the last modification date of the file by this *path* | -
**getOwner(path)**   | Returns the owner of the file by this *path* | *string*
**setOwner(path, owner)**   | Sets the owner of the file by this *path* | -
**getPermissions(path)**   | Returns the POSIX permissions of the file by this *path* | *string*
**setPermissions(path, owner)**   | Sets the POSIX permissions of the file by this *path* | -
**size(path)**   | Returns the size of the file by this *path* | *long*
**createFile(path)**   | Creates a new file by the given path | -
**createDirectory(path)**   | Creates a new directory by the given path | -
**copy(source, target)**   | Copies a source file to a target | -
**move(source, target)**   | Moves a source file to a target | -
**deleteFile(path)**   | Deletes the file by the given path | -
**deleteDirectory(path)**   | Deletes the directory by the given path | -
**createTempFile(prefix, suffix)**   | Creates a new temporary file by the given prefix and suffix | -
**createTempDirectory(prefix)**   | Creates a new temporary directory by the given prefix | -
**createInputStream(path)**   | Creates an InputStream pointing to a file by the given path | *streams.InputStream*
**createOutputStream(path)**   | Creates an OutputStream pointing to a file by the given path | *streams.OutputStream*
