---
layout: api
title: Database
icon: fa-ellipsis-h
---

Database
===

Standard access to the registered relational data sources.

- Module: **db/database**
- Definition: [/core_api/issues/9](https://github.com/dirigiblelabs/core_api/issues/9)
- Source: [/db/database.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/db/database.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');
var response = require('net/http/response');

var datasource = database.getDatasource(); // default
//var datasource = db.getNamedDatasource("name-of-the-datasource");

var connection = datasource.getConnection();
try {
    var statement = connection.prepareStatement("select * from DGB_FILES where FILE_PATH like ?");
    var i = 0;
    statement.setString(++i, "%");
    var resultSet = statement.executeQuery();
    while (resultSet.next()) {
        response.println("[path]: " + resultSet.getString("FILE_PATH"));
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


Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getDatasource()**   | Returns the default data source set of this instance | *Datasource*
**getNamedDatasource(name)**    | Returns a named data source pre-configured in this instance | *Datasource*


### Objects

---

#### Datasource


Function     | Description | Returns
------------ | ----------- | --------
**getConnection()**   | Returns a connection to the data source from the pool | *Connection*
**getSequence(name)**   | Returns a sequence by name from this data source. Creates one, if such does not exist. | *Sequence*
**getPaging()**   | Returns the page script generator depending on the database dialect | *Paging*


#### Connection


Function     | Description | Returns
------------ | ----------- | --------
**prepareStatement(sql)**   | Creates a prepared statement by the given SQL script | *Statement*
**close()**   | Closes the Connection and returns it to the pool | -
**commit()**   | Commits the current transaction | -
**rollback()**   | Rolls the current transaction back | -
**getAutoCommit()**   | Returns the value of the auto commit setting | *boolean*
**getCatalog()**   | Returns the Catalog name, which the Connection is related to | *string*
**getSchema()**   | Returns the Schema name, which the Connection is related to | *string*
**getTransactionIsolation()**   | Returns the value of the transaction isolation setting | *int*
**isClosed()**   | Returns true if the Connection is already closed and false otherwise | *boolean*
**isReadOnly()**   | Returns true if the Connection is opened in a read only state and false otherwise | *boolean*
**isValid()**   | Returns true if the Connection is still valid and false otherwise | *boolean*
**setAutoCommit(autoCommit)**   | Sets the value of the auto commit setting | -
**setCatalog(catalog)**   | Sets the Catalog name, which the Connection is related to | -
**setSchema(schema)**   | Sets the Schema name, which the Connection is related to | -
**setReadOnly(readOnly)**   | Sets the value of the read only state | -
**setTransactionIsolation(transactionIsolation)**   | Sets the value of the transaction isolation setting | -


#### Statement


Function     | Description | Returns
------------ | ----------- | --------
**close()**   | Closes the Statement | -
**execute()**   | Executes a query or an update SQL statement | -
**executeQuery()**   | Executes a query and returns a ResultSet | *ResultSet*
**executeUpdate()**   | Executes an update SQL statement | -
**setBoolean(value)**   | Sets a parameter of type boolean | -
**setDate(value)**   | Sets a parameter of type date | -
**setDouble(value)**   | Sets a parameter of type double | -
**setFloat(value)**   | Sets a parameter of type float | -
**setInt(value)**   | Sets a parameter of type integer | -
**setLong(value)**   | Sets a parameter of type long | -
**setShort(value)**   | Sets a parameter of type short | -
**setString(value)**   | Sets a parameter of type string | -
**setTime(value)**   | Sets a parameter of type time | -
**setTimestamp(value)**   | Sets a parameter of type timestamp | -


#### ResultSet


Function     | Description | Returns
------------ | ----------- | --------
**close()**   | Closes the ResultSet | -
**getBoolean(identifier)**   | Returns a value of type boolean | *boolean*
**getDate(identifier)**   | Returns a value of type date | *Date*
**getDouble(identifier)**   | Returns a value of type double | *double*
**getFloat(identifier)**   | Returns a value of type float | *float*
**getInt(identifier)**   | Returns a value of type integer | *int*
**getLong(identifier)**   | Returns a value of type long | *long*
**getShort(identifier)**   | Returns a value of type short | *short*
**getString(identifier)**   | Returns a value of type string | *string*
**getTime(identifier)**   | Returns a value of type time | *Date*
**getTimestamp(identifier)**   | Returns a value of type timestamp | *Date*
**isAfterLast()**   | Returns true if the ResultSet is iterated at the end and false otherwise | *boolean*
**isBeforeFirst()**   | Returns true if the ResultSet is iterated at the beginning and false otherwise | *boolean*
**isFirst()**   | Returns true if the ResultSet is iterated at the first row and false otherwise | *boolean*
**isLast()**   | Returns true if the ResultSet is iterated at the last row and false otherwise | *boolean*
**isClosed()**   | Returns true if the ResultSet is already closed and false otherwise | *boolean*
**next()**   | Iterates the ResultSet to the next row and returns true if it is successful. Returns false if no more rows remain. | *boolean*



#### Sequence


Function     | Description | Returns
------------ | ----------- | --------
**getName()**   | Returns the name of this Sequence | *string*
**create(start)**   | Creates a Sequence starting by a given number | -
**next()**   | Increase the value of this Sequence | *int*
**drop()**   | Deletes the Sequence | -
**exists()**   | Returns true if the Sequence already exists and false otherwise | *boolean*


#### Paging


Function     | Description | Returns
------------ | ----------- | --------
**genLimitAndOffset(limit, offset)**   | Returns the SQL snippet for paging depending of the database dialect | *string*
**genTopAndStart(limit, offset)**   | Returns the SQL snippet for paging depending of the database dialect | *string*



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
