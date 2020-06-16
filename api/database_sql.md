---
layout: api
title: Database SQL
icon: fa-ellipsis-h
---

{{ page.title }}
===

Type-safe SQL builders with multi-dialect support.

Version 4.x
---

- Module: **db/v4/sql**
- Alias: **db/sql**
- Definition: [https://github.com/eclipse/dirigible/issues/125](https://github.com/eclipse/dirigible/issues/125)
- Source: [/db/v4/sql.js](https://github.com/dirigiblelabs/api-db/blob/master/db/v4/sql.js)
- Facade: [DatabaseFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-database/src/main/java/org/eclipse/dirigible/api/v3/db/DatabaseFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var sql = require("db/v4/sql");
var response = require("http/v4/response");

var script = sql.getDialect().select().column("FIRST_NAME").column("LAST_NAME").from("CUSTOMERS").build();

response.println(script);

response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getDialect(connection?)**   | Returns the dialect based on the provided *connection* if any or the default one otherwise | *Dialect*




### Objects

---



#### Dialect


Function     | Description | Returns
------------ | ----------- | --------
**select()**   | Returns a Select SQL builder | *Select*
**insert()**   | Returns an Insert SQL builder | *Insert*
**update()**   | Returns an Update SQL builder | *Update*
**delete()**   | Returns a Delete SQL builder | *Delete*
**nextval(name)**   | Returns a Nextval SQL builder by a given *name* | *Nextval*
**create()**   | Returns a Create SQL builder | *Create*
**drop()**   | Returns a Drop SQL builder | *Drop*


#### Select


Function     | Description | Returns
------------ | ----------- | --------
**distinct()**   | Sets the *distinct* flag and returns the current Select SQL builder | *Select*
**forUpdate()**   | Sets the *forUpdate* flag and returns the current Select SQL builder | *Select*
**column(name)**   | Adds a column with the given *name* and returns the current Select SQL builder. Use * for all | *Select*
**from(table, alias?)**   | Adds a table with the given *table* name and *alias* and returns the current Select SQL builder | *Select*
**join(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**innerJoin(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**outerJoin(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**leftJoin(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**rightJoin(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**fullJoin(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**where(condition)**   | Adds a where clause with the given *condition* and returns the current Select SQL builder | *Select*
**order(column, asc?)**   | Adds an order clause with the given *column* and optionally the ascending or descending order and returns the current Select SQL builder | *Select*
**group(column)**   | Adds a *group by* clause and returns the current Select SQL builder | *Select*
**union(select)**   | Adds an *union* clause and returns the current Select SQL builder | *Select*
**having(condition)**   | Adds an *having* clause and returns the current Select SQL builder | *Select*
**limit()**   | Sets the *limit* number and returns the current Select SQL builder | *Select*
**offset()**   | Sets the *offset* number and returns the current Select SQL builder | *Select*
**build()**   | Generate and returns the Select SQL statement as a string | *String*


#### Insert


Function     | Description | Returns
------------ | ----------- | --------
**into(table)**   | Sets the *table* name and returns the current Insert SQL builder | *Insert*
**column(name)**   | Adds a column *name* and returns the current Insert SQL builder | *Insert*
**value(param)**   | Adds a value *param* and returns the current Insert SQL builder. Use *?* for prepared statements afterwards. | *Insert*
**select(statement)**   | Sets the *select* statement if needed and returns the current Insert SQL builder | *Insert*
**build()**   | Generate and returns the Insert SQL statement as a string | *String*


#### Update


Function     | Description | Returns
------------ | ----------- | --------
**table(name)**   | Sets the table *name* and returns the current Update SQL builder | *Update*
**set(column, value)**   | Adds a *column* - *value* pair and returns the current Update SQL builder | *Update*
**where(condition)**   | Adds a where clause with the given *condition* and returns the current Update SQL builder | *Update*
**build()**   | Generate and returns the Update SQL statement as a string | *String*


#### Delete


Function     | Description | Returns
------------ | ----------- | --------
**from(table)**   | Sets the *table* name and returns the current Delete SQL builder | *Delete*
**where(condition)**   | Adds a where clause with the given *condition* and returns the current Delete SQL builder | *Delete*
**build()**   | Generate and returns the Delete SQL statement as a string | *String*


#### Nextval


Function     | Description | Returns
------------ | ----------- | --------
**build()**   | Generate and returns the Nextval SQL statement as a string | *String*



#### Create


Function     | Description | Returns
------------ | ----------- | --------
**table(name)**   | Returns a CreateTable SQL builder | *CreateTable*
**view(name)**   | Returns a CreateView SQL builder | *CreateView*
**sequence(name)**   | Returns a CreateSequence SQL builder | *CreateSequence*


#### Drop


Function     | Description | Returns
------------ | ----------- | --------
**table(name)**   | Returns a DropTable SQL builder | *DropTable*
**view(name)**   | Returns a DropView SQL builder | *DropView*
**sequence(name)**   | Returns a DropSequence SQL builder | *DropSequence*



#### CreateTable


Function     | Description | Returns
------------ | ----------- | --------
**column(name, type, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnVarchar(name, length, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *VARCHAR* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnChar(name, length, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *CHAR* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnDate(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *DATE* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnTime(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *TIME* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnTimestamp(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *TIMESTAMP* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnInteger(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *INTEGER* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnTinyint(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *TINYINT* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnBigint(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *BIGINT* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnSmallint(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *SMALLINT* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnDate(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *DATE* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnReal(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *REAL* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnDouble(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *DOUBLE PRECISION* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnBoolean(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *BOOLEAN* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnBlob(name, isNullable?, args?)**   | Adds a *BLOB* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnDecimal(column, precision, scale, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *DECIMAL* column definition and returns the current CreateTable SQL builder | *CreateTable*
**primaryKey(columns, name?)**   | Sets a *primary key* definition and returns the current CreateTable SQL builder | *CreateTable*
**foreignKey(name, columns, referencedTable, referencedColumns)**   | Adds a *foreign key* definition and returns the current CreateTable SQL builder | *CreateTable*
**unique(name, columns)**   | Adds an *unique* index definition and returns the current CreateTable SQL builder | *CreateTable*
**check(name, expression)**   | Adds a *check* definition and returns the current CreateTable SQL builder | *CreateTable*
**build()**   | Generate and returns the CreateTable SQL statement as a string | *String*


#### CreateView


Function     | Description | Returns
------------ | ----------- | --------
**column(name)**   | Adds a column definition and returns the current VieweTable SQL builder | *VieweTable*
**asSelect(select)**   | Sets the *select* definition and returns the current VieweTable SQL builder | *VieweTable*
**build()**   | Generate and returns the VieweTable SQL statement as a string | *String*


#### CreateSequence


Function     | Description | Returns
------------ | ----------- | --------
**build()**   | Generate and returns the Sequence SQL statement as a string | *String*



#### DropTable


Function     | Description | Returns
------------ | ----------- | --------
**build()**   | Generate and returns the DropTable SQL statement as a string | *String*


#### DropView


Function     | Description | Returns
------------ | ----------- | --------
**build()**   | Generate and returns the DropView SQL statement as a string | *String*


#### DropSequence


Function     | Description | Returns
------------ | ----------- | --------
**build()**   | Generate and returns the DropSequence SQL statement as a string | *String*



Compatibility
---

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |


---

Version 3.x
---

- Module: **db/v3/sql**
- Alias: **db/sql**
- Definition: [https://github.com/eclipse/dirigible/issues/125](https://github.com/eclipse/dirigible/issues/125)
- Source: [/db/v3/sql.js](https://github.com/dirigiblelabs/api-v3-db/blob/master/db/v3/sql.js)
- Facade: [DatabaseFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-database/src/main/java/org/eclipse/dirigible/api/v3/db/DatabaseFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var sql = require("db/v3/sql");
var response = require("http/v3/response");

var script = sql.getDialect().select().column("FIRST_NAME").column("LAST_NAME").from("CUSTOMERS").build();

response.println(script);

response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getDialect(connection?)**   | Returns the dialect based on the provided *connection* if any or the default one otherwise | *Dialect*




### Objects

---



#### Dialect


Function     | Description | Returns
------------ | ----------- | --------
**select()**   | Returns a Select SQL builder | *Select*
**insert()**   | Returns an Insert SQL builder | *Insert*
**update()**   | Returns an Update SQL builder | *Update*
**delete()**   | Returns a Delete SQL builder | *Delete*
**nextval(name)**   | Returns a Nextval SQL builder by a given *name* | *Nextval*
**create()**   | Returns a Create SQL builder | *Create*
**drop()**   | Returns a Drop SQL builder | *Drop*


#### Select


Function     | Description | Returns
------------ | ----------- | --------
**distinct()**   | Sets the *distinct* flag and returns the current Select SQL builder | *Select*
**forUpdate()**   | Sets the *forUpdate* flag and returns the current Select SQL builder | *Select*
**column(name)**   | Adds a column with the given *name* and returns the current Select SQL builder. Use * for all | *Select*
**from(table, alias?)**   | Adds a table with the given *table* name and *alias* and returns the current Select SQL builder | *Select*
**join(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**innerJoin(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**outerJoin(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**leftJoin(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**rightJoin(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**fullJoin(table, on, alias?)**   | Adds a *join* clause and returns the current Select SQL builder | *Select*
**where(condition)**   | Adds a where clause with the given *condition* and returns the current Select SQL builder | *Select*
**order(column, asc?)**   | Adds an order clause with the given *column* and optionally the ascending or descending order and returns the current Select SQL builder | *Select*
**group(column)**   | Adds a *group by* clause and returns the current Select SQL builder | *Select*
**union(select)**   | Adds an *union* clause and returns the current Select SQL builder | *Select*
**having(condition)**   | Adds an *having* clause and returns the current Select SQL builder | *Select*
**limit()**   | Sets the *limit* number and returns the current Select SQL builder | *Select*
**offset()**   | Sets the *offset* number and returns the current Select SQL builder | *Select*
**build()**   | Generate and returns the Select SQL statement as a string | *String*


#### Insert


Function     | Description | Returns
------------ | ----------- | --------
**into(table)**   | Sets the *table* name and returns the current Insert SQL builder | *Insert*
**column(name)**   | Adds a column *name* and returns the current Insert SQL builder | *Insert*
**value(param)**   | Adds a value *param* and returns the current Insert SQL builder. Use *?* for prepared statements afterwards. | *Insert*
**select(statement)**   | Sets the *select* statement if needed and returns the current Insert SQL builder | *Insert*
**build()**   | Generate and returns the Insert SQL statement as a string | *String*


#### Update


Function     | Description | Returns
------------ | ----------- | --------
**table(name)**   | Sets the table *name* and returns the current Update SQL builder | *Update*
**set(column, value)**   | Adds a *column* - *value* pair and returns the current Update SQL builder | *Update*
**where(condition)**   | Adds a where clause with the given *condition* and returns the current Update SQL builder | *Update*
**build()**   | Generate and returns the Update SQL statement as a string | *String*


#### Delete


Function     | Description | Returns
------------ | ----------- | --------
**from(table)**   | Sets the *table* name and returns the current Delete SQL builder | *Delete*
**where(condition)**   | Adds a where clause with the given *condition* and returns the current Delete SQL builder | *Delete*
**build()**   | Generate and returns the Delete SQL statement as a string | *String*


#### Nextval


Function     | Description | Returns
------------ | ----------- | --------
**build()**   | Generate and returns the Nextval SQL statement as a string | *String*



#### Create


Function     | Description | Returns
------------ | ----------- | --------
**table(name)**   | Returns a CreateTable SQL builder | *CreateTable*
**view(name)**   | Returns a CreateView SQL builder | *CreateView*
**sequence(name)**   | Returns a CreateSequence SQL builder | *CreateSequence*


#### Drop


Function     | Description | Returns
------------ | ----------- | --------
**table(name)**   | Returns a DropTable SQL builder | *DropTable*
**view(name)**   | Returns a DropView SQL builder | *DropView*
**sequence(name)**   | Returns a DropSequence SQL builder | *DropSequence*



#### CreateTable


Function     | Description | Returns
------------ | ----------- | --------
**column(name, type, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnVarchar(name, length, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *VARCHAR* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnChar(name, length, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *CHAR* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnDate(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *DATE* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnTime(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *TIME* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnTimestamp(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *TIMESTAMP* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnInteger(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *INTEGER* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnTinyint(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *TINYINT* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnBigint(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *BIGINT* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnSmallint(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *SMALLINT* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnDate(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *DATE* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnReal(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *REAL* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnDouble(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *DOUBLE PRECISION* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnBoolean(name, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *BOOLEAN* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnBlob(name, isNullable?, args?)**   | Adds a *BLOB* column definition and returns the current CreateTable SQL builder | *CreateTable*
**columnDecimal(column, precision, scale, isPrimaryKey?, isNullable?, isUnique?, args?)**   | Adds a *DECIMAL* column definition and returns the current CreateTable SQL builder | *CreateTable*
**primaryKey(columns, name?)**   | Sets a *primary key* definition and returns the current CreateTable SQL builder | *CreateTable*
**foreignKey(name, columns, referencedTable, referencedColumns)**   | Adds a *foreign key* definition and returns the current CreateTable SQL builder | *CreateTable*
**unique(name, columns)**   | Adds an *unique* index definition and returns the current CreateTable SQL builder | *CreateTable*
**check(name, expression)**   | Adds a *check* definition and returns the current CreateTable SQL builder | *CreateTable*
**build()**   | Generate and returns the CreateTable SQL statement as a string | *String*


#### CreateView


Function     | Description | Returns
------------ | ----------- | --------
**column(name)**   | Adds a column definition and returns the current VieweTable SQL builder | *VieweTable*
**asSelect(select)**   | Sets the *select* definition and returns the current VieweTable SQL builder | *VieweTable*
**build()**   | Generate and returns the VieweTable SQL statement as a string | *String*


#### CreateSequence


Function     | Description | Returns
------------ | ----------- | --------
**build()**   | Generate and returns the Sequence SQL statement as a string | *String*



#### DropTable


Function     | Description | Returns
------------ | ----------- | --------
**build()**   | Generate and returns the DropTable SQL statement as a string | *String*


#### DropView


Function     | Description | Returns
------------ | ----------- | --------
**build()**   | Generate and returns the DropView SQL statement as a string | *String*


#### DropSequence


Function     | Description | Returns
------------ | ----------- | --------
**build()**   | Generate and returns the DropSequence SQL statement as a string | *String*



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---

