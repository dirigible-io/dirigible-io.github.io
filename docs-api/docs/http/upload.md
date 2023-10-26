---
title: Upload
---

Upload
===

HTTP Upload is used to consume files posted as multipart request.

=== "Overview"
- Module: `http/upload`
- Definition: [https://github.com/eclipse/dirigible/issues/16](https://github.com/eclipse/dirigible/issues/16)
- Source: [/http/upload.ts](https://github.com/eclipse/dirigible/blob/master/components/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/upload.ts)
- Status: `stable`
- Group: `core`



### Basic Usage

=== "ECMA6"

	```javascript
	import { upload, request, response } from "@dirigible/http";

	if (request.getMethod() === "POST") {
		if (upload.isMultipartContent()) {
			const fileItems = upload.parseRequest();
			for (let i = 0; i < fileItems.size(); i++) {
				const fileItem = fileItems.get(i);
				const contentType = fileItem.getContentType();
				console.log(`Content Type: ${contentType}`);
				console.log(`Filename: ${fileItem.getOriginalFilename()}`);
				// console.log(`Text: ${fileItem.getText()}`);

				response.setContentType(contentType);
				response.write(fileItem.getBytesNative());
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

=== "CommonJS"

	```javascript
	const upload = require("http/upload");
	const request = require("http/request");
	const response = require("http/response");

	if (request.getMethod() === "POST") {
		if (upload.isMultipartContent()) {
			const fileItems = upload.parseRequest();
			for (let i = 0; i < fileItems.size(); i++) {
				const fileItem = fileItems.get(i);
				const contentType = fileItem.getContentType();
				console.log(`Content Type: ${contentType}`);
				console.log(`Filename: ${fileItem.getOriginalFilename()}`);
				// console.log(`Text: ${fileItem.getText()}`);

				response.setContentType(contentType);
				response.write(fileItem.getBytesNative());
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


#### HttpFileItem


Function     | Description | Returns
------------ | ----------- | --------
**getName()**   | The HttpFileItem's name | *string*
**getOriginalFilename()**   | The original file name | *string*
**getContentType()**   | The HttpFileItem's data content type | *string*
**isEmpty()**   | Returns whether the file is empty | *boolean*
**getSize()**   | The HttpFileItem's size | *long*
**getBytes()**   | Return the HttpFileItem's content as byte array | *array of byte*
**getBytesNative()**   | Return the HttpFileItem's content as Java byte array | *array of Java byte*
**getText()**   | Return the HttpFileItem's content as string | *string*
**getInputStream()**   | Return the input stream of the HttpFileItem's content | *streams.InputStream*
