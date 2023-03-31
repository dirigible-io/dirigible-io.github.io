---
title: Upload
---

Upload
===

HTTP Upload is used to consume files posted as multipart request.

=== "Overview"
- Module: `http/upload`
- Definition: [https://github.com/eclipse/dirigible/issues/16](https://github.com/eclipse/dirigible/issues/16)
- Source: [/http/upload.js](https://github.com/eclipse/dirigible/blob/master/components/api-http/src/main/resources/META-INF/dirigible/http/upload.js)
- Status: `stable`



### Basic Usage

=== "ECMA6"

	```javascript
	import { upload, request, response } from "@dirigible/http";

	if (request.getMethod() === "POST") {
		if (upload.isMultipartContent()) {
			let fileItems = upload.parseRequest();
			for (i = 0; i < fileItems.size(); i++) {
				let fileItem = fileItems.get(i);
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

=== "Require"

	```javascript
	var upload = require('http/upload');
	var request = require('http/request');
	var response = require('http/response');

	if (request.getMethod() === "POST") {
		if (upload.isMultipartContent()) {
			var fileItems = upload.parseRequest();
			for (i=0; i<fileItems.size(); i++) {
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

#### Sample HTML Page

```html
<!DOCTYPE html>
<html>
	<body>
		<form action="/services/js/http-tests/upload/upload.js" method="post" enctype="multipart/form-data">
			<label for="file">Filename:</label>
			<input type="file" name="file" id="file" multiple>
			<br>
			<input type="submit" name="submit" value="Submit">
		</form>
	</body>
</html>
```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**isMultipartContent()**   | Returns true if the HTTP request contains files content and false otherwise | *boolean*
**parseRequest()**   | Returns a HttpFileItems object by parsing the HTTP request | *HttpFileItems*




### Objects

---

#### HttpFileItems


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
**getHeaders()**   | The HttpFileItem's headers | *array of HttpFileItemHeaders*


#### HttpFileItemHeaders


Function     | Description | Returns
------------ | ----------- | --------
**getHeaderNames()**   | The HttpFileItemHeader's names | *array of strings*
**getHeader(headerName)**   | The HttpFileItemHeader's value for the given header name | *string*
