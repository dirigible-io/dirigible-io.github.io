---
layout: samples
title: XSS
icon: fa-user-times
group: simple
---

XSS
===

Develop
--

1. Create a new project and name it **xss_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **xss_basic.js**).
6. Replace the generated code in **xss_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var xss = require('utils/xss');
	var response = require('net/http/response');

	var raw = 'a\'b,c|d;e"f';
	var escaped = xss.escapeCsv(raw);
	response.println("CSV");
	response.println(raw);
	response.println(escaped);

	raw = '<br><lt>';
	escaped = xss.escapeHtml(raw);
	response.println();
	response.println("HTML");
	response.println(raw);
	response.println(escaped);

	raw = '"hi" I\'m John';
	escaped = xss.escapeJavaScript(raw);
	response.println();
	response.println("JavaScript");
	response.println(raw);
	response.println(escaped);

	raw = "John's bag";
	escaped = xss.escapeSql(raw);
	response.println();
	response.println("SQL");
	response.println(raw);
	response.println(escaped);

	raw = "<tag>";
	escaped = xss.escapeXml(raw);
	response.println();
	response.println("XML");
	response.println(raw);
	response.println(escaped);


	response.flush();
	response.close();
	
```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git=https://github.com/dirigiblelabs/sample_utils_xss_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/utils_xss.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
