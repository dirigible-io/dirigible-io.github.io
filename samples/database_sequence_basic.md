---
layout: samples
title: Database Sequence Basic
icon: fa-caret-right
group: simple
---

Database Sequence Basic
===

Develop
--

1. Create a new project and name it **database_sequence_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **database_sequence_basic.js**).
6. Replace the generated code in **database_sequence_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var database = require('db/database');
	var response = require('net/http/response');

	var datasource = database.getDatasource();

	var seq1 = datasource.getSequence("seq1");
	if (!seq1.exists()) {
		seq1.create(100); // start from
	}

	response.println(seq1.next());

	response.flush();
	response.close();
	
```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git=https://github.com/dirigiblelabs/sample_db_database_sequence_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/database.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
