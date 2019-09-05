---
layout: samples
title: Database Dynamic Datasource
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps


1. Create a project **database_project**.
2. Then create a JavaScript service named **database_dynamic.js**.
3. Within the service code, enter the following content:

#### Log Levels

```javascript

var response = require("http/v4/response");
var database = require("db/v4/database");

database.createDataSource("mydynamic", "org.h2.Driver", "jdbc:h2:~/mytest", "sa", "", null);

var connection = database.getConnection("dynamic", "mydynamic");
try {
    var statement = connection.prepareStatement("select current_date from dual");
    var resultSet = statement.executeQuery();
    while (resultSet.next()) {
        response.println("[date]: " + resultSet.getString(1));
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
