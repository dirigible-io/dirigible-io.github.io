---
layout: api
title: Files
icon: fa-ellipsis-h
---

{{ page.title }}
===

Files module provides an access to the underlying File System, where the Dirigible server is deployed on.

Version 4.x
---

- Module: **io/v4/files**
- Alias: **io/files**
- Definition: [https://github.com/eclipse/dirigible/issues/19](https://github.com/eclipse/dirigible/issues/19)
- Source: [/io/v4/files.js](https://github.com/dirigiblelabs/api-io/blob/master/io/v4/files.js)
- Facade: [FilesFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-io/src/main/java/org/eclipse/dirigible/api/v3/io/FilesFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var files = require("io/v4/files");

var tempFile = files.createTempFile("dirigible", ".txt");
console.log("Temp file: " + tempFile);
files.writeText(tempFile, "Eclipse Dirigible");
files.deleteFile(tempFile);
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
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
**readText(path)**   | Returns the content of the given file as string | *string*
**writeBytes(path, bytes)**   | Writes the given byte array content to the file | -
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


### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
 
---

Version 3.x
---


- Module: **io/v3/files**
- Alias: **io/files**
- Definition: [https://github.com/eclipse/dirigible/issues/19](https://github.com/eclipse/dirigible/issues/19)
- Source: [/io/v3/files.js](https://github.com/dirigiblelabs/api-v3-io/blob/master/io/v3/files.js)
- Facade: [FilesFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-io/src/main/java/org/eclipse/dirigible/api/v3/io/FilesFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var files = require("io/v3/files");

var tempFile = files.createTempFile("dirigible", ".txt");
console.log("Temp file: " + tempFile);
files.writeText(tempFile, "Eclipse Dirigible");
files.deleteFile(tempFile);
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
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
**readText(path)**   | Returns the content of the given file as string | *string*
**writeBytes(path, bytes)**   | Writes the given byte array content to the file | -
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


### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅
 
 
---

Version 2.x
---


- Module: **io/files**
- Definition: [/core_api/issues/21](https://github.com/dirigiblelabs/core_api/issues/21)
- Source: [/io/files.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/io/files.js)
- Status: **beta**

### Basic Usage

```javascript
var files = require('io/files');
var response = require('net/http/response');

var file = files.get("../temp/./..");

response.println("[File Exists?]: " + file.exists());
response.println("[File CanonicalPath]: " + file.getCanonicalPath());
response.println("[File Path]: " + file.getPath());
response.println("[File Name]: " + file.getName());
response.println("[File Parent]: " + file.getParent());
response.println("[File Is Directory?]: " + file.isDirectory());
response.println("[File Is File?]: " + file.isFile());
response.println("[File Is Hidden?]: " + file.isHidden());
response.println("[File Last Modified]: " + file.lastModified());
response.println("[File Length]: " + file.length());

response.flush();
response.close();
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(path)**   | Returns the local File by the path | *File*
**createDirectory(path)**   | Creates a new directory and all its parents if needed by the given path | -
**createFile(path)**   | Creates a new File and all its parents if needed by the given path | -
**copy(source, target)**   | Copies a source file to a target | -
**move(source, target)**   | Moves a source file to a target | -
**delete(path)**   | Deletes a file by the given path | -
**readText(path)**   | Returns the content of the given file as string | *string*
**writeText(path, text)**   | Writes the given text content to the file | -
**read(path)**   | Returns the content of the given file as byte array | *array of bytes*
**write(path, bytes)**   | Writes the given byte array content to the file | -




#### Objects

---

##### File


Function     | Description | Returns
------------ | ----------- | --------
**exists()**   | Returns true if the File exists and false otherwise | *boolean*
**isExecutable()**   | Returns true if the File is executable and false otherwise | *boolean*
**isReadable()**   | Returns true if the File is readable and false otherwise | *boolean*
**isWritable()**   | Returns true if the File is writable and false otherwise | *boolean*
**getCanonicalPath()**   | Returns the canonical path name of this File | *string*
**getPath()**   | Returns the path name of this File | *string*
**getName()**   | Returns the file name of this File | *string*
**getParent()**   | Returns the path representing the parent of this File | *string*
**getParentFile()**   | Returns the File representing the parent of this File | *File*
**isDirectory()**   | Returns true if the File represents a directory and false otherwise | *boolean*
**isFile()**   | Returns true if the File represents a file and false otherwise | *boolean*
**isHidden()**   | Returns true if the File is hidden and false otherwise | *boolean*
**lastModified()**   | Returns Date when the file has been last modified | *Date*
**length()**   | Returns the length in bytes of this File | *int*
**list()**   | Returns an array of strings naming the files and directories under this directory | *array of strings*
**listRoots()**   | Returns the filesystems roots | *array of strings*
**filter(pattern)**   | Returns an array of strings naming the files and directories under this directory and filtered matching the pattern | *array of strings*
**setExecutable(executable)**   | Makes the File executable depending on the parameter |
**setReadable(readable)**   | Makes the File readable depending on the parameter |
**setWritable(writable)**   | Makes the File writable depending on the parameter |




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

---
