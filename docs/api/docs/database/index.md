---
title: Database
---

Database
===

Standard access to the registered relational data sources.

=== "Overview"
- Module: `db/v4/database`
- Alias: `db/database`
- Definition: [https://github.com/eclipse/dirigible/issues/21](https://github.com/eclipse/dirigible/issues/21)
- Source: [/db/v4/database.js](https://github.com/dirigiblelabs/api-db/blob/master/db/v4/database.js)
- Facade: [DatabaseFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-database/src/main/java/org/eclipse/dirigible/api/v3/db/DatabaseFacade.java)
- Status: `stable`


### Basic Usage

```javascript
var database = require("db/v4/database");
var response = require("http/v4/response");

var connection = database.getConnection();
try {
    var statement = connection.prepareStatement("select * from DIRIGIBLE_EXTENSIONS");
    var resultSet = statement.executeQuery();
    while (resultSet.next()) {
        response.println("[path]: " + resultSet.getString("EXTENSION_LOCATION"));
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


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getDatabaseTypes()**   | Returns the list of the available databases in this instance | *list of string*
**getDataSources(databaseType)**    | Returns the list of the available data-sources in this instance for the given *databaseType*. In case the *databaseType* is not present, the data-sources of the default database type are listed  | *list of string*
**createDataSource(name, driver, url, username, password, properties)**   | Creates a named dynamic datasource based on the provided parameters | *-*
**getMetadata(databaseType, datasourceName)**   | Returns the metadata of the selected *databaseType* and *datasourceName*. In case the *datasourceName* parameter is omitted, then the default data-source for the selected database is taken. In case the *databaseType* is omitted, then the default data-source of the default database type is taken | *metadata object*
**getConnection(databaseType, datasourceName)**   | Establishes a connection to the selected data-source. Both parameters are optional | *Connection* 


### Objects

---

#### Connection

Function     | Description | Returns
------------ | ----------- | --------
**prepareStatement(sql)**   | Creates a prepared statement by the given SQL script | *Statement*
**close()**   | Closes the Connection and returns it to the pool | -
**commit()**   | Commits the current transaction | -
**getAutoCommit()**   | Returns the value of the auto commit setting | *boolean*
**getCatalog()**   | Returns the Catalog name, which the Connection is related to | *string*
**getSchema()**   | Returns the Schema name, which the Connection is related to | *string*
**getTransactionIsolation()**   | Returns the value of the transaction isolation setting | *int*
**isClosed()**   | Returns true if the Connection is already closed and false otherwise | *boolean*
**isReadOnly()**   | Returns true if the Connection is opened in a read only state and false otherwise | *boolean*
**isValid()**   | Returns true if the Connection is still valid and false otherwise | *boolean*
**rollback()**   | Rolls the current transaction back | -
**setAutoCommit(autoCommit)**   | Sets the value of the auto commit setting | -
**setCatalog(catalog)**   | Sets the Catalog name, which the Connection is related to | -
**setSchema(schema)**   | Sets the Schema name, which the Connection is related to | -
**setReadOnly(readOnly)**   | Sets the value of the read only state | -
**setTransactionIsolation(transactionIsolation)**   | Sets the value of the transaction isolation setting | -


#### Statement


Function     | Description | Returns
------------ | ----------- | --------
**close()**   | Closes the Statement | -
**executeQuery()**   | Executes a query and returns a ResultSet | *ResultSet*
**executeUpdate()**   | Executes an update SQL statement | -
**setNull(index, value)**   | Sets a parameter as null | -
**setBoolean(index, value)**   | Sets a parameter of type boolean | -
**setDate(index, value)**   | Sets a parameter of type date | -
**setDouble(index, value)**   | Sets a parameter of type double | -
**setFloat(index, value)**   | Sets a parameter of type float | -
**setInt(index, value)**   | Sets a parameter of type integer | -
**setLong(index, value)**   | Sets a parameter of type long | -
**setShort(index, value)**   | Sets a parameter of type short | -
**setString(index, value)**   | Sets a parameter of type string | -
**setTime(index, value)**   | Sets a parameter of type time | -
**setTimestamp(index, value)**   | Sets a parameter of type timestamp | -


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
