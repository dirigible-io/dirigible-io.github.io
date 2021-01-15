---
layout: samples
title: Database Statement
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps


1. Create a project **database_project**.
2. Then create a JavaScript service named **database_basic.js**.
3. Within the service code, enter the following content:

#### Log Levels

```javascript

var database = require("db/v4/database");
var response = require("http/v4/response");

var connection = database.getConnection();
try {
    var statement = connection.prepareStatement("select * from DIRIGIBLE_EXTENSIONS where EXTENSION_EXTENSIONPOINT_NAME = ?");
    var i = 0;
    statement.setString(++i, "ide-view");
    var resultSet = statement.executeQuery();
    while (resultSet.next()) {
        response.println("[location]: " + resultSet.getString("EXTENSION_LOCATION"));
    }
    resultSet.close();
    statement.close();
} catch(e) {
    console.trace(e);
    response.println(e.message);
} finally {
    connection.close();
}

response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
