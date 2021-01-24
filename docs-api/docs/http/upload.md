---
title: Upload
redirect_from:
  - /api/http_upload.html
---

Upload
===

HTTP Upload is used to consume files posted as multipart request.

=== "Overview"
- Module: `http/v4/upload`
- Alias: `http/upload`
- Definition: [https://github.com/eclipse/dirigible/issues/16](https://github.com/eclipse/dirigible/issues/16)
- Source: [/http/v4/upload.js](https://github.com/dirigiblelabs/api-http/blob/master/http/v4/upload.js)
- Facade: [HttpUploadFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-http/src/main/java/org/eclipse/dirigible/api/v3/http/HttpUploadFacade.java)
- Status: `stable`



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


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**isMultipartContent()**   | Returns true if the HTTP request contains files content and false otherwise | *boolean*
**parseRequest()**   | Returns a HttpFileItems object by parsing the HTTP request | *HttpFileItems*




### Objects

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
