---
title: Procedure
---

Procedure
===


Simplified procedure functionality, accepts SQL script and query parameters and returns the result-set as a JSON object.

=== "Overview"
- Module: `db/v4/procedure`
- Alias: `db/procedure`
- Definition: [https://github.com/eclipse/dirigible/issues/773](https://github.com/eclipse/dirigible/issues/773)
- Source: [/db/v4/update.js](https://github.com/dirigiblelabs/api-db/blob/master/db/v4/procedure.js)
- Facade: none
- Status: `stable`


### Basic Usage

Create Procedure:

```javascript
var response = require("http/v4/response");
var procedure = require("db/v4/procedure");

let sql = " \
CREATE PROCEDURE GET_DIRIGIBLE_EXTENSIONS_BY_EXTENSIONPOINT_NAME (in extensionName varchar(255), out extensions DIRIGIBLE_EXTENSIONS, out extensionPoints DIRIGIBLE_EXTENSION_POINTS) \
AS \
  BEGIN \
    extensions = SELECT * FROM DIRIGIBLE_EXTENSIONS WHERE EXTENSION_EXTENSIONPOINT_NAME = :extensionName; \
    extensionPoints = SELECT * FROM DIRIGIBLE_EXTENSION_POINTS WHERE  EXTENSIONPOINT_NAME = :extensionName; \
  END; \
";

procedure.create(sql);

response.println("Procedure created");
response.flush();
response.close();
```

Call Procedure:

```javascript
var response = require("http/v4/response");
var procedure = require("db/v4/procedure");

let sql = "CALL GET_DIRIGIBLE_EXTENSIONS_BY_EXTENSIONPOINT_NAME(extensionName => ?, extensions => ?, extensionPoints => ?)";
let result = procedure.execute(sql, ["api-modules"]);

response.println(JSON.stringify(result));
response.flush();
response.close();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**create(sql, databaseType?, datasourceName?)**   | Creates a SQL Stored Procedure in the selected *databaseType* and *datasourceName*, throws Error, if issue occur | *-*
**execute(sql, parameters?, databaseType?, datasourceName?)**   | Execute SQL Stored Procedure in the selected *databaseType* and *datasourceName* with the provided parameters and returns the result, if any | *array of arrays*

Sample Parameters Array:

```javascript
let parameters = [1, 'John', 34.56];
```

or
```javascript
let parameters = [
  {
    value: 1,
    type: "int"
  }, {
    value: 'John',
    type: "string"
  }, {
    value: 34.56
    type: "double"
  }
];
```
