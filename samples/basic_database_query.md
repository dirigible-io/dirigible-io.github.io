---
layout: samples
title: Database Query
icon: fa-caret-right
group: basic
---

{{ page.title }}
===

### Steps


1. Create a project **DatabaseTest**.
2. Then create a JavaScript service named **database_query.js**.
3. Within the service code, enter the following content:

#### Log Levels

```javascript

var query = require('db/v3/query');
var response = require('http/v3/response');

var sql = "SELECT * FROM DIRIGIBLE_EXTENSIONS WHERE EXTENSION_EXTENSIONPOINT_NAME = ?";
var resultset = query.execute(sql, ['ide-view']);

response.println('<pre>' + JSON.stringify(resultset, null, 2) + '</pre>');

response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
