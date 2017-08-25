---
layout: samples
title: Read and Write Streams
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

Version 2.x
---

### Develop


1. Create a new project and name it **stream_read_write_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **stream_read_write_basic.js**).
6. Replace the generated code in **stream_read_write_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var streams = require('io/streams');
	var response = require('net/http/response');

	var outputStream = streams.createByteArrayOutputStream();

	streams.writeText(outputStream, "Some text content");

	var bytes = outputStream.getBytes();
	response.println("[Stream Content as Bytes]: " + bytes);

	var text = String.fromCharCode.apply(String, bytes);
	response.println("[Stream Content as Text]: " + text);

	var inputStream = streams.createByteArrayInputStream(bytes);
	var outputStreamCopy = streams.createByteArrayOutputStream();
	streams.copy(inputStream, outputStreamCopy);
	var copiedBytes = outputStreamCopy.getBytes();
	var copiedText = String.fromCharCode.apply(String, copiedBytes);
	response.println("[Stream Copied Content as Text]: " + copiedText);

	response.flush();
	response.close();
	
```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/web/registry/anonymous.html?git=https://github.com/dirigiblelabs/sample_io_stream_read_write_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/streams.html">API</a>
</div>

### Discover

To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
