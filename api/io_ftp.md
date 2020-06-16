---
layout: api
title: FTP Client
icon: fa-ellipsis-h
---

{{ page.title }}
===

FTP Client API provides utility functions for working with FTP servers.


Version 4.x
---


- Module: **io/v4/ftp**
- Alias: **io/ftp**
- Definition: n/a
- Source: [/io/v4/ftp.js](https://github.com/dirigiblelabs/api-io/blob/master/io/v4/ftp.js)
- Facade: n/a
- Status: **stable**


### Basic Usage

```javascript
var response = require("http/v4/response");
var ftp = require("io/v4/ftp");

var host = "test.rebex.net";
var port = 21;
var userName = "demo";
var password = "password";

var ftpClient = ftp.getClient(host, port, userName, password);
var file = ftpClient.getFileText("/", "readme.txt");

response.println(file);
```

### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getClient(host, port, userName, password)**   | Returns a FTP Client instance | *FTPClient*


#### Objects

---

##### FTPClient

Function     | Description | Returns
------------ | ----------- | --------
**getRootFolder()** | Gets the root folder | *FTPFolder*
**getFile(path, fileName)**   | Gets the file content as an input stream | *InputStream*
**getFileBinary(path, fileName)** | Gets the file content as byte array | *byte array*
**getFileText(path, fileName)** | Gets the file content as string | *string*
**getFolder(path, folderName)** | Gets the folder | *FTPFolder*
**createFile(path, fileName, inputStream)** | Creates file from InputStream and return true if the file was created successfully | *boolean*
**createFileBinary(path, fileName, bytes)** | Creates file from byte array and return true if the file was created successfully | *boolean*
**createFileText(path, fileName, text)** | Creates file from string and return true if the file was created successfully | *boolean*
**appendFile(path, fileName, inputStream)** | Appends InputStream to file and return true if the file was created successfully | *boolean*
**appendFileBinary(path, fileName, bytes)** | Appends byte array to file and return true if the file was created successfully | *boolean*
**appendFileText(path, fileName, text)** | Appends string to file and return true if the file was created successfully | *boolean*
**createFolder(path, folderName)** | Creates folder | *FTPFolder*
**deleteFile(path, fileName)** | Deletes file | *boolean*
**deleteFolder(path, folderName)** | Deletes folder | *boolean*
**close()** | Closes the FPT client | *-*

##### FTPFolder

Function     | Description | Returns
------------ | ----------- | --------
**getPath()** | Gets the folder path | *string*
**getName()**   | Gets the folder name | *string*
**getFile(fileName)** | Gets FTPFile by fileName | *FTPFile*
**getFolder(folderName)** | Gets FTPFolder by folderName | *FTPFolder*
**list()** | Gets array of FTPObjects | *FTPObject array*
**listFiles()** | Gets array of FTPFiles | *FTPFile array*
**listFolders()** | Gets array of FTPFolder | *FTPFolder array*
**createFile(fileName, inputStream)** | Creates file from InputStream and return true if the file was created successfully | *boolean*
**createFileBinary(fileName, bytes)** | Creates file from byte array and return true if the file was created successfully | *boolean*
**createFileText(fileName, text)** | Creates file from string and return true if the file was created successfully | *boolean*
**createFolder(folder)** | Creates FTPFolder | *FTPFolder*
**delete()** | Deletes the current folder | *boolean*
**deleteFile(fileName)** | Deletes FTPFile | *boolean*
**deleteFolder(folderName)** | Deletes FTPFolder | *boolean*

##### FTPFile

Function     | Description | Returns
------------ | ----------- | --------
**getPath()** | Gets the folder path | *string*
**getName()**   | Gets the folder name | *string*
**getContent()** | Gets the file content | *InputStream*
**getContentBinary()** | Gets the file content | *byte array*
**getContentText()** | Gets the file content | *string*
**setContent(inputStream)** | Sets the file content from an InputStream | *boolean*
**setContentBinary(bytes)** | Sets the file content from byte array | *boolean*
**setContentText(text)** | Sets the file content from string | *boolean*
**appendContent(inputStream)** | Appends file content from an InputStream | *boolean*
**appendContentBinary(bytes)** | Appends file content from an byte array | *boolean*
**appendContentText(text)** | Appends file content from string | *boolean*
**delete()** | Deletes the file | *boolean*

##### FTPObject

Function     | Description | Returns
------------ | ----------- | --------
**getPath()** | Gets the object path | *string*
**getName()**   | Gets the object name | *string*
**isFile()**   | Returns true if the object is file | *boolean*
**isFolder()**   | Returns true if the object is folder | *boolean*
**getFile()**   | Gets object as FTPFile | *FTPFile*
**getFolder()**   | Gets object as FTPFolder | *FTPFolder*

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---
