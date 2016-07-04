---
layout: samples
title: Read and Write Files
icon: fa-list
group: simple
---

Read and Write Files
===

1. Create a new project and name it **files_read_write**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.

<br>

![Mail Service 2](images/mail_service/mail_service_2.png)

<br>

5. Give it a meaningful name (e.g **files_read_write.js**).
6. Replace the generated code in **files_read_write.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	var files = require('io/files');
	var response = require('net/http/response');
	
	files.createFile("../temp/test1/test5.txt");
	var file = files.get("../temp/test1/test2.txt");
	response.println("[File Exists?]: " + file.exists());
	response.println("[File Is File?]: " + file.isFile());
	
	var content = files.readText("../temp/test1/test5.txt");
	response.println("[File Content]: " + content);
	
	files.writeText("../temp/test1/test5.txt", "Some content");
	response.println("[File Write]: " + content);
	
	content = files.readText("../temp/test1/test5.txt");
	response.println("[File Content]: " + content);
	
	var bytes = files.read("../temp/test1/test5.txt");
	response.println("[File Content as Bytes]: " + bytes);
	
	bytes = [83, 84, 85];
	files.write("../temp/test1/test5.txt", bytes);
	
	content = files.readText("../temp/test1/test5.txt");
	response.println("[File Content]: " + content);
	
	response.flush();
	response.close();

```

<a class="btn btn-primary pull-right" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git=https://github.com/dirigiblelabs/sample_io_files_read_write.git">Run</a>
&nbsp;
<a class="btn btn-primary pull-right" href="http://www.dirigible.io/api/files.html">API</a>

