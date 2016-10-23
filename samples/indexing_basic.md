---
layout: samples
title: Indexing Basic
icon: fa-caret-right
group: simple
---

Indexing Basic
===

Develop
--

1. Create a new project and name it **indexing_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **indexing_basic.js**).
6. Replace the generated code in **indexing_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	var indexing = require('service/indexing');
	var response = require('net/http/response');

	var index = indexing.getIndex("myIndex");
	var document1 = {
		"id": "1",
		"content": "some cool content 1"
	};
	var document2 = {
		"id": "2",
		"content": "some cool content 2"
	};

	index.add(document1);
	index.add(document2);

	var results = index.search("cool");
	for (var i = 0; i < results.length; i++) {
		var result = results[i];
		response.println("[Found for 'cool']: " + result.id);
	}

	results = index.search("1");
	for (var i = 0; i < results.length; i++) {
		result = results[i];
		response.println("[Found for '1']: " + result.id);
	}

	results = index.search("2");
	for (var i = 0; i < results.length; i++) {
		result = results[i];
		response.println("[Found for '2']: " + result.id);
	}

	index.clear();

	response.flush();
	response.close();

```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/web/registry/anonymous.html?git=https://github.com/dirigiblelabs/sample_service_indexing_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/indexing.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
