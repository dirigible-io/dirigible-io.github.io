---
title: Sequence
redirect_from:
  - /api/database_sequence.html
---

Sequence
===

Functionality for manipulating the database sequence objects.

=== "Overview"
- Module: `db/v4/sequence`
- Alias: `db/sequence`
- Definition: [https://github.com/eclipse/dirigible/issues/124](https://github.com/eclipse/dirigible/issues/124)
- Source: [/db/v4/sequence.js](https://github.com/dirigiblelabs/api-db/blob/master/db/v4/sequence.js)
- Facade: [DatabaseFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-database/src/main/java/org/eclipse/dirigible/api/v3/db/DatabaseFacade.java)
- Status: `stable`


### Basic Usage

```javascript
var sequence = require("db/v4/sequence");
var response = require("http/v4/response");

var value = sequence.nextval("MYSEQUENCE");

response.println(value);
response.flush();
response.close();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**nextval(name, databaseType?, datasourceName?)**   | Increment the sequence with the given *name* and returns the value. Creates the sequence implicitly if it deos not exist. | *integer*
**create(name, databaseType?, datasourceName?)**   | Creates the sequence by the given *name*. | -
**drop(name, databaseType?, datasourceName?)**   | Remove the sequence by the given *name*. | -
