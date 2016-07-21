---
layout: samples
title: Http Upload
icon: fa-caret-right
group: simple
---

Http Upload
===

Develop
--

1. Create a new project and name it **http_upload_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **http_upload_basic.js**).
6. Replace the generated code in **http_upload_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

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

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git=https://github.com/dirigiblelabs/sample_net_http_http_upload_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/http_upload.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
