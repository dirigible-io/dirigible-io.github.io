---
title: Database - Query
hide:
  - toc
---

Database - Query
===

### Steps

1. Create a project `database-project`.
2. Then create a JavaScript service named `database-query.js`.
3. Within the service code, enter the following content:

```javascript

var query = require("db/v4/query");
var response = require("http/v4/response");

var sql = "SELECT * FROM DIRIGIBLE_EXTENSIONS WHERE EXTENSION_EXTENSIONPOINT_NAME = ?";
var resultset = query.execute(sql, ["ide-view"]);

response.println("<pre>" + JSON.stringify(resultset, null, 2) + "</pre>");

response.flush();
response.close();

```

---

> For more information, see the *[API](../api/)* documentation.
