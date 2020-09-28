---
layout: samples
title: File Upload
icon: fa-caret-right
group: complex
---

{{ page.title }}
===

### Steps


1. Create a project **file_upload_project**
2. Then create a JavaScript service named **my_file_upload.js**
3. Replace the service code with the following content:

#### Log Levels

```javascript

var upload = require('http/v4/upload');
var request = require('http/v4/request');
var response = require('http/v4/response');

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

4. Then create a **HTML5** page named **my_upload.html**
5. Replace the content with the following HTML code:

```html

<html>
	<body>
		<form action="/services/v4/js/file_upload_project/my_file_upload.js" method="post" enctype="multipart/form-data">
			<label for="file">Filename:</label>
			<input type="file" name="file" id="file" multiple>
			<br>
			<input type="submit" name="submit" value="Submit">
		</form>
	</body>
</html>

```

6. Publish the project
7. Select the **my_upload.html** file in the *Workspace* view and try to test by uploading a file in the *Preview*

---

For more information, see the *[API](../api/)* documentation.
