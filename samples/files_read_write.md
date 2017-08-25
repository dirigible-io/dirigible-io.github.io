---
layout: samples
title: Read and Write Files
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

Version 2.x
---

### Develop


1. Create a new project and name it **files_read_write**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
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

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/web/registry/anonymous.html?git=https://github.com/dirigiblelabs/sample_io_files_read_write.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/files.html">API</a>
</div>

### Discover

To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
