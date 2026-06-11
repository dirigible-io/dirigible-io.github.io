# Database

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.db`
- source: [db/Database.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/db/Database.java)
:::

`Database` is the primary entry point for relational-database access in the Eclipse Dirigible Java SDK. It exposes both the JSON-shaped helpers used by scripted callers and a raw `Connection` for code that prefers `PreparedStatement`s.

Two style choices:

- **Pass-through SQL** (`query`, `update`) - the simplest form; results come back as a JSON string. Good for read-mostly endpoints and ad-hoc admin tools.
- **JDBC** (`getConnection()`) - full `PreparedStatement` / `ResultSet` control, transactions, type-safe parameter binding. Use this from Java controllers and anywhere correctness matters more than terseness.

The `datasourceName` parameter is optional on every method - when omitted, the default data source applies. Pass the logical name of any `.datasource` artefact present in the registry to target a non-default DB.

Sequence operations (`nextval`, `createSequence`, `dropSequence`) work across H2, PostgreSQL, Oracle, and MS SQL - the platform translates the call into the appropriate dialect.

### Key Features:
- **JSON helpers**: One-liner `query` and `update` calls that hand back JSON strings - ideal for HTTP endpoints.
- **Raw JDBC**: `getConnection()` returns a `DirigibleConnection` for full `PreparedStatement`/`ResultSet` control and explicit transactions.
- **Data-source aware**: Every operation accepts an optional `datasourceName` to target any registered `.datasource`.
- **Named parameters**: `queryNamed` / `updateNamed` variants support `:name`-style bindings.
- **Cross-dialect sequences**: `nextval`, `createSequence`, and `dropSequence` translate to the underlying database's dialect.
- **SqlFactory access**: `getDefaultSqlFactory` and `getNativeSqlFactory` expose the fluent SQL builder for dialect-aware query construction.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.db.Database;
import org.eclipse.dirigible.components.database.DirigibleConnection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// JSON-shaped pass-through query
String customers = Database.query("SELECT * FROM CUSTOMER WHERE ACTIVE = ?", "[true]");

// Raw JDBC for full control
try (DirigibleConnection conn = Database.getConnection()) {
    try (PreparedStatement ps = conn.prepareStatement("SELECT NAME FROM CUSTOMER WHERE ID = ?")) {
        ps.setLong(1, 42L);
        try (ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                String name = rs.getString("NAME");
            }
        }
    }
}

// Cross-dialect sequence
long nextId = Database.nextval("CUSTOMER_SEQ");
```

## Methods

### getConnection()
Returns a `DirigibleConnection` against the default data source.

> ```java
> public static DirigibleConnection getConnection() throws Throwable;
> ```
>
> ::: info Returns
> - **Type**: `DirigibleConnection`
> - **Description**: A connection against the default data source.
> :::

### getConnection(datasourceName)
Returns a `DirigibleConnection` against the named data source.

> ```java
> public static DirigibleConnection getConnection(String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `DirigibleConnection`
> - **Description**: A connection against the named data source.
> :::

### getDefaultDataSource()
Returns the default `DirigibleDataSource`.

> ```java
> public static DirigibleDataSource getDefaultDataSource();
> ```
>
> ::: info Returns
> - **Type**: `DirigibleDataSource`
> - **Description**: The default data source.
> :::

### getDataSource(datasourceName)
Returns the `DirigibleDataSource` with the given logical name.

> ```java
> public static DirigibleDataSource getDataSource(String datasourceName);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `DirigibleDataSource`
> - **Description**: The named data source.
> :::

### getDataSources()
Returns the list of available data source names as a JSON string.

> ```java
> public static String getDataSources();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON array of available data source names.
> :::

### getMetadata()
Returns database metadata for the default data source.

> ```java
> public static String getMetadata() throws Throwable;
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON-shaped metadata describing schemas, tables, and columns.
> :::

### getMetadata(datasourceName)
Returns database metadata for the named data source.

> ```java
> public static String getMetadata(String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON-shaped metadata describing schemas, tables, and columns.
> :::

### getProductName()
Returns the product name of the underlying default database system.

> ```java
> public static String getProductName() throws Throwable;
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The database product name (e.g. `H2`, `PostgreSQL`).
> :::

### getProductName(datasourceName)
Returns the product name of the named database system.

> ```java
> public static String getProductName(String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The database product name.
> :::

### query(sql)
Executes a SQL query against the default data source and returns the result set as a JSON string.

> ```java
> public static String query(String sql) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL `SELECT` statement. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON array of row objects. |
> :::

### query(sql, parametersJson)
Executes a parameterised SQL query against the default data source.

> ```java
> public static String query(String sql, String parametersJson) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL `SELECT` statement with positional `?` placeholders. |
> | `parametersJson` | `String` | JSON array of parameter values, in placeholder order. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON array of row objects.
> :::

### query(sql, parametersJson, datasourceName)
Executes a parameterised SQL query against the named data source.

> ```java
> public static String query(String sql, String parametersJson, String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL `SELECT` statement with positional `?` placeholders. |
> | `parametersJson` | `String` | JSON array of parameter values, in placeholder order. |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON array of row objects.
> :::

### queryNamed(sql, parametersJson)
Executes a SQL query with named parameters against the default data source.

> ```java
> public static String queryNamed(String sql, String parametersJson) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL `SELECT` statement with `:name`-style placeholders. |
> | `parametersJson` | `String` | JSON object mapping parameter names to values. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON array of row objects.
> :::

### queryNamed(sql, parametersJson, datasourceName)
Executes a SQL query with named parameters against the named data source.

> ```java
> public static String queryNamed(String sql, String parametersJson, String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL `SELECT` statement with `:name`-style placeholders. |
> | `parametersJson` | `String` | JSON object mapping parameter names to values. |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON array of row objects.
> :::

### update(sql)
Executes a SQL update against the default data source and returns the affected row count.

> ```java
> public static int update(String sql) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL `INSERT`, `UPDATE`, `DELETE`, or DDL statement. |
>
> ::: info Returns
> - **Type**: `int`
> - **Description**: Number of rows affected.
> :::

### update(sql, parametersJson)
Executes a parameterised SQL update against the default data source.

> ```java
> public static int update(String sql, String parametersJson) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL statement with positional `?` placeholders. |
> | `parametersJson` | `String` | JSON array of parameter values, in placeholder order. |
>
> ::: info Returns
> - **Type**: `int`
> - **Description**: Number of rows affected.
> :::

### update(sql, parametersJson, datasourceName)
Executes a parameterised SQL update against the named data source.

> ```java
> public static int update(String sql, String parametersJson, String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL statement with positional `?` placeholders. |
> | `parametersJson` | `String` | JSON array of parameter values, in placeholder order. |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `int`
> - **Description**: Number of rows affected.
> :::

### updateNamed(sql)
Executes a SQL update with no parameters against the default data source.

> ```java
> public static int updateNamed(String sql) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL statement. |
>
> ::: info Returns
> - **Type**: `int`
> - **Description**: Number of rows affected.
> :::

### updateNamed(sql, parametersJson)
Executes a SQL update with named parameters against the default data source.

> ```java
> public static int updateNamed(String sql, String parametersJson) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL statement with `:name`-style placeholders. |
> | `parametersJson` | `String` | JSON object mapping parameter names to values. |
>
> ::: info Returns
> - **Type**: `int`
> - **Description**: Number of rows affected.
> :::

### updateNamed(sql, parametersJson, datasourceName)
Executes a SQL update with named parameters against the named data source.

> ```java
> public static int updateNamed(String sql, String parametersJson, String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL statement with `:name`-style placeholders. |
> | `parametersJson` | `String` | JSON object mapping parameter names to values. |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `int`
> - **Description**: Number of rows affected.
> :::

### insert(sql, parametersJson, datasourceName)
Executes a parameterised `INSERT` and returns the generated keys.

> ```java
> public static List<Map<String, Object>> insert(String sql, String parametersJson, String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL `INSERT` statement with positional `?` placeholders. |
> | `parametersJson` | `String` | JSON array of parameter values, in placeholder order. |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `List<Map<String, Object>>`
> - **Description**: Auto-generated keys from the insert, one map per row.
> :::

### insertMany(sql, parametersJson, datasourceName)
Executes a batch `INSERT` over multiple parameter rows and returns the generated keys.

> ```java
> public static List<Map<String, Object>> insertMany(String sql, String parametersJson, String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL `INSERT` statement with positional `?` placeholders. |
> | `parametersJson` | `String` | JSON array of parameter-arrays - one inner array per row. |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `List<Map<String, Object>>`
> - **Description**: Auto-generated keys, one map per inserted row.
> :::

### insertNamed(sql, parametersJson, datasourceName)
Executes an `INSERT` with named parameters and returns generated identifiers.

> ```java
> public static List<Long> insertNamed(String sql, String parametersJson, String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `String` | A SQL `INSERT` statement with `:name`-style placeholders. |
> | `parametersJson` | `String` | JSON object mapping parameter names to values. |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `List<Long>`
> - **Description**: Auto-generated primary-key values.
> :::

### nextval(sequence)
Returns the next value of the named sequence against the default data source.

> ```java
> public static long nextval(String sequence) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `String` | Sequence name. |
>
> ::: info Returns
> - **Type**: `long`
> - **Description**: The next sequence value.
> :::

### nextval(sequence, datasourceName)
Returns the next value of the named sequence against the named data source.

> ```java
> public static long nextval(String sequence, String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `String` | Sequence name. |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `long`
> - **Description**: The next sequence value.
> :::

### nextval(sequence, datasourceName, tableName)
Returns the next value of the named sequence, associated with a specific table (used on platforms that emulate sequences via a table).

> ```java
> public static long nextval(String sequence, String datasourceName, String tableName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `String` | Sequence name. |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
> | `tableName` | `String` | Backing table name used by sequence emulation. |
>
> ::: info Returns
> - **Type**: `long`
> - **Description**: The next sequence value.
> :::

### createSequence(sequence)
Creates a new sequence on the default data source.

> ```java
> public static void createSequence(String sequence) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `String` | Sequence name. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### createSequence(sequence, start)
Creates a new sequence on the default data source with a specific starting value.

> ```java
> public static void createSequence(String sequence, Integer start) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `String` | Sequence name. |
> | `start` | `Integer` | Initial value for the sequence. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### createSequence(sequence, start, datasourceName)
Creates a new sequence on the named data source with a specific starting value.

> ```java
> public static void createSequence(String sequence, Integer start, String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `String` | Sequence name. |
> | `start` | `Integer` | Initial value for the sequence. |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### dropSequence(sequence)
Drops a sequence on the default data source.

> ```java
> public static void dropSequence(String sequence) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `String` | Sequence name. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### dropSequence(sequence, datasourceName)
Drops a sequence on the named data source.

> ```java
> public static void dropSequence(String sequence, String datasourceName) throws Throwable;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `String` | Sequence name. |
> | `datasourceName` | `String` | Logical name of a registered `.datasource` artefact. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### getDefaultSqlFactory()
Returns the default `SqlFactory` - a fluent SQL-builder bound to the default data source's dialect.

> ```java
> public static SqlFactory getDefaultSqlFactory();
> ```
>
> ::: info Returns
> - **Type**: `SqlFactory`
> - **Description**: Dialect-aware SQL builder.
> :::

### getNativeSqlFactory(connection)
Returns a `SqlFactory` bound to the dialect of the supplied connection.

> ```java
> public static SqlFactory getNativeSqlFactory(Connection connection);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `connection` | `Connection` | A live JDBC connection whose dialect drives the builder. |
>
> ::: info Returns
> - **Type**: `SqlFactory`
> - **Description**: Dialect-aware SQL builder bound to the connection's database.
> :::
