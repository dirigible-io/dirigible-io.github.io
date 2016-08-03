---
layout: api
title: Files
icon: fa-ellipsis-h
---

{{ page.title }}
===

Files module provides an access to the underlying File System, where the Dirigible server is deployed on.

- Module: **io/files**
- Definition: [/core_api/issues/21](https://github.com/dirigiblelabs/core_api/issues/21)
- Source: [/io/files.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/io/files.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

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



Definition
---

### Functions

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




### Objects

---

#### File


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




Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
