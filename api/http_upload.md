---
layout: api
title: HTTP Upload
icon: fa-ellipsis-h
---

{{ page.title }}
===

HTTP Upload is used to consume files posted as multipart request.

Version 4.x
---

- Module: **http/v4/upload**
- Alias: **http/upload**
- Definition: [https://github.com/eclipse/dirigible/issues/16](https://github.com/eclipse/dirigible/issues/16)
- Source: [/http/v4/upload.js](https://github.com/dirigiblelabs/api-http/blob/master/http/v4/upload.js)
- Facade: [HttpUploadFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-http/src/main/java/org/eclipse/dirigible/api/v3/http/HttpUploadFacade.java)
- Status: **stable**



### Basic Usage

```javascript
/* eslint-env node, dirigible */

var upload = require("http/v4/upload");
var request = require("http/v4/request");
var response = require("http/v4/response");

if (request.getMethod() === "POST") {
    if (upload.isMultipartContent()) {
        var fileItems = upload.parseRequest();
        for (i = 0; i < fileItems.size(); i++) {
            var fileItem = fileItems.get(i);
            if (!fileItem.isFormField()) {
                response.println("File Name: " + fileItem.getName());
                response.println("File Bytes (as text): " + String.fromCharCode.apply(null, fileItem.getBytes()));
            } else {
                 response.println("Field Name: " + fileItem.getFieldName());
                 response.println("Field Text: " + fileItem.getText());
            }
        }
    } else {
        response.println("The request's content must be 'multipart'");
    }
} else if (request.getMethod() === "GET") {
    response.println("Use POST request.");
}

response.flush();
response.close();
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**isMultipartContent()**   | Returns true if the HTTP request contains files content and false otherwise | *boolean*
**parseRequest()**   | Returns a HttpFileItems object by parsing the HTTP request | *HttpFileItems*




#### Objects

---

##### HttpFileItems


Function     | Description | Returns
------------ | ----------- | --------
**get(index)**   | The HttpFileItem object by the *index* | *HttpFileItem*
**size()**   | The size of the list of HttpFileItem objects | *HttpFileItem*



##### HttpFileItem


Function     | Description | Returns
------------ | ----------- | --------
**getContentType()**   | The HttpFileItem's data content type | *string*
**getName()**   | The HttpFileItem's name | *string*
**getSize()**   | The HttpFileItem's size | *long*
**getBytes()**   | Return the HttpFileItem's content as byte array | *array of byte*
**getText()**   | Return the HttpFileItem's content as string | *string*
**getInputStream()**   | Return the input stream of the HttpFileItem's content | *streams.InputStream*
**isFormField()**   | Whether the HttpFileItem represents a form field | *boolean*
**getFieldName()**   | The HttpFileItem's field name | *string*



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ❌  | ❌

---

Version 3.x
---

- Module: **http/v3/upload**
- Alias: **http/upload**
- Definition: [https://github.com/eclipse/dirigible/issues/16](https://github.com/eclipse/dirigible/issues/16)
- Source: [/http/v3/upload.js](https://github.com/dirigiblelabs/api-v3-http/blob/master/http/v3/upload.js)
- Facade: [HttpUploadFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-http/src/main/java/org/eclipse/dirigible/api/v3/http/HttpUploadFacade.java)
- Status: **alpha**



### Basic Usage

```javascript
/* eslint-env node, dirigible */

var upload = require("http/v3/upload");
var request = require("http/v3/request");
var response = require("http/v3/response");

if (request.getMethod() === "POST") {
    if (upload.isMultipartContent()) {
        var fileItems = upload.parseRequest();
        for (i = 0; i < fileItems.size(); i++) {
            var fileItem = fileItems.get(i);
            if (!fileItem.isFormField()) {
                response.println("File Name: " + fileItem.getName());
                response.println("File Bytes (as text): " + String.fromCharCode.apply(null, fileItem.getBytes()));
            } else {
                 response.println("Field Name: " + fileItem.getFieldName());
                 response.println("Field Text: " + fileItem.getText());
            }
        }
    } else {
        response.println("The request's content must be 'multipart'");
    }
} else if (request.getMethod() === "GET") {
    response.println("Use POST request.");
}

response.flush();
response.close();
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**isMultipartContent()**   | Returns true if the HTTP request contains files content and false otherwise | *boolean*
**parseRequest()**   | Returns a HttpFileItems object by parsing the HTTP request | *HttpFileItems*




#### Objects

---

##### HttpFileItems


Function     | Description | Returns
------------ | ----------- | --------
**get(index)**   | The HttpFileItem object by the *index* | *HttpFileItem*
**size()**   | The size of the list of HttpFileItem objects | *HttpFileItem*



##### HttpFileItem


Function     | Description | Returns
------------ | ----------- | --------
**getContentType()**   | The HttpFileItem's data content type | *string*
**getName()**   | The HttpFileItem's name | *string*
**getSize()**   | The HttpFileItem's size | *long*
**getBytes()**   | Return the HttpFileItem's content as byte array | *array of byte*
**getText()**   | Return the HttpFileItem's content as string | *string*
**getInputStream()**   | Return the input stream of the HttpFileItem's content | *streams.InputStream*
**isFormField()**   | Whether the HttpFileItem represents a form field | *boolean*
**getFieldName()**   | The HttpFileItem's field name | *string*



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---

Version 2.x
---

- Module: **net/http/upload**
- Definition: [/core_api/issues/24](https://github.com/dirigiblelabs/core_api/issues/24)
- Source: [/net/http/upload.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/net/http/upload.js)
- Status: **beta**


### Basic Usage

```javascript
var upload = require('net/http/upload');
var request = require('net/http/request');
var response = require('net/http/response');

if (request.getMethod() === "POST") {
	if (upload.isMultipartContent()) {
		var files = upload.parseRequest();
		files.forEach(function(file) {
			response.println("[File Name] " + file.name);
			response.println("[File Data]");
			// response.println(file.data); // as a raw byte array or as a string below
			response.println(String.fromCharCode.apply(null, file.data));
		});
	} else {
		response.println("The request's content must be 'multipart'");
	}
} else if (request.getMethod() === "GET") {
	response.println("Use POST request.");
}

response.flush();
response.close();
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**parseRequest(lazy)**   | Returns an array of HttpFileEntry objects by parsing the HTTP request. If lazy the data of the items is not preliminary loaded | *array of HttpFileEntry*
**isMultipartContent()**   | Returns true if the HTTP request contains files content and false otherwise | *boolean*



#### Objects

---

##### HttpFileEntry


Function     | Description | Returns
------------ | ----------- | --------
**name**   | The HttpFileEntry name | *string*
**lazy**   | Returns true is the file entry is lazy and false otherwise | *boolean*
**data**   | The HttpFileEntry binary data. If lazy use loadData() or copyData() instead | *array of byte*
**contentType**   | The HttpFileEntry's data content type | *string*
**size**   | The HttpFileEntry's data size | *int*
**loadData()**   | Loads the binary data from the file entry. If already loaded returns the data | *array of byte*
**copyData(outputStream)**   | Copies the binary data from the file entry to the provided output stream | *-*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
 
 ---
