---
layout: samples
title: Database Update
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

Version 3.x
---

### Develop


1. Create a new project and name it **database_update**.
2. Choose *New* -> *Scripting Service*.
3. Choose **Server-Side JavaScript Service** from the list of available templates.
4. Give it a meaningful name (e.g **database_update.js**).
5. Replace the generated code in **database_update.js** with the following:

```javascript

	var update = require('db/v3/update');
	
	update.execute("CREATE TABLE MY_TABLE (COLUMN_A INT, COLUMN_B VARCHAR(10))");
	update.execute("INSERT INTO MY_TABLE VALUES (1, 'ABC')");
	update.execute("INSERT INTO MY_TABLE VALUES (2, 'DEF')");
	update.execute("DROP TABLE MY_TABLE");

```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/web/registry/anonymous.html?git=https://github.com/dirigiblelabs/sample_db_database_update.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/database_update.html">API</a>
</div>

