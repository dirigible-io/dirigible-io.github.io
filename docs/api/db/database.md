# Database

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/database.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/database.ts)
- last updated: 
:::

This module provides a `Database` class that serves as an interface for interacting with relational databases in the Dirigible environment. It includes functionalities for executing SQL queries, managing database connections, and retrieving metadata about the database structure. The module also defines a set of SQL type constants and helper functions for handling specific data types like CLOBs and BLOBs.

### Key Features
- **SQL Execution**: Execute arbitrary SQL queries and updates against the connected database.
- **Metadata Retrieval**: Access detailed metadata about database schemas, tables, columns, and other structural elements.
- **Type Handling**: Provides utilities for working with various SQL data types, including CLOBs and BLOBs, with special handling for HANA databases.
- **Database System Detection**: Automatically detects the underlying database system to apply appropriate handling for specific data types and features.
- **Prepared Statements**: Support for prepared statements to enhance security and performance when executing parameterized queries.

### Use Cases
- Performing database operations such as querying, inserting, updating, and deleting records in a relational database.
- Retrieving and analyzing database metadata to understand the structure of the database and its components.
- Handling large data types like CLOBs and BLOBs in a way that is compatible with different database systems, including HANA.
- Implementing data access layers in applications that require interaction with relational databases, while abstracting away database-specific details.

### Example Usage
```ts
import { Database, SQLTypes } from "@aerokit/sdk/db";
// Execute a simple query
const resultSet = Database.executeQuery("SELECT * FROM Users WHERE age > ?", [30], [SQLTypes.INTEGER]);
while (resultSet.next()) {
 console.log(resultSet.getString("name"));
}
// Retrieve database metadata
const metadata = Database.getMetadata();
console.log(metadata.databaseProductName);
```

## Classes

### PreparedStatement

#### close()



> ```ts
> close(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getResultSet()



> ```ts
> getResultSet(): ResultSet;
> ```
>
>
> ::: info Returns
> - **Type**: `ResultSet`
> - **Description**: 
> :::

#### execute()



> ```ts
> execute(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### executeQuery()



> ```ts
> executeQuery(): ResultSet;
> ```
>
>
> ::: info Returns
> - **Type**: `ResultSet`
> - **Description**: 
> :::

#### executeUpdate()



> ```ts
> executeUpdate(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### setNull()



> ```ts
> setNull(index: number, sqlType: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `sqlType` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setBinaryStream()



> ```ts
> setBinaryStream(parameterIndex: number, inputStream: InputStream, length: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `inputStream` | `InputStream` |  |
> | `length` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setBoolean()



> ```ts
> setBoolean(index: number, value: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `boolean` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setByte()



> ```ts
> setByte(index: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setBlob()



> ```ts
> setBlob(index: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setClob()



> ```ts
> setClob(index: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setNClob()



> ```ts
> setNClob(index: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setBytesNative()



> ```ts
> setBytesNative(index: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setBytes()



> ```ts
> setBytes(index: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setDate()



> ```ts
> setDate(index: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setDouble()



> ```ts
> setDouble(index: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setFloat()



> ```ts
> setFloat(index: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setInt()



> ```ts
> setInt(index: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setLong()



> ```ts
> setLong(index: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setShort()



> ```ts
> setShort(index: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setString()



> ```ts
> setString(index: number, value: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setTime()



> ```ts
> setTime(index: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setTimestamp()



> ```ts
> setTimestamp(index: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setBigDecimal()



> ```ts
> setBigDecimal(index: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setNString()



> ```ts
> setNString(index: number, value: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` |  |
> | `value` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addBatch()



> ```ts
> addBatch(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### executeBatch()



> ```ts
> executeBatch(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getMetaData()



> ```ts
> getMetaData(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getMoreResults()



> ```ts
> getMoreResults(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getParameterMetaData()



> ```ts
> getParameterMetaData(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getSQLWarning()



> ```ts
> getSQLWarning(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### isClosed()



> ```ts
> isClosed(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

### CallableStatement

#### getResultSet()



> ```ts
> getResultSet(): ResultSet;
> ```
>
>
> ::: info Returns
> - **Type**: `ResultSet`
> - **Description**: 
> :::

#### executeQuery()



> ```ts
> executeQuery(): ResultSet;
> ```
>
>
> ::: info Returns
> - **Type**: `ResultSet`
> - **Description**: 
> :::

#### executeUpdate()



> ```ts
> executeUpdate(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### registerOutParameter()



> ```ts
> registerOutParameter(parameterIndex: number, sqlType: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `sqlType` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### registerOutParameterByScale()



> ```ts
> registerOutParameterByScale(parameterIndex: number, sqlType: any, scale: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `sqlType` | `any` |  |
> | `scale` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### registerOutParameterByTypeName()



> ```ts
> registerOutParameterByTypeName(parameterIndex: number, sqlType: any, typeName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `sqlType` | `any` |  |
> | `typeName` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### wasNull()



> ```ts
> wasNull(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getString()



> ```ts
> getString(parameterIndex: number): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getBoolean()



> ```ts
> getBoolean(parameterIndex: number): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getByte()



> ```ts
> getByte(parameterIndex: number): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getShort()



> ```ts
> getShort(parameterIndex: number): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getInt()



> ```ts
> getInt(parameterIndex: number): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getLong()



> ```ts
> getLong(parameterIndex: number): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getFloat()



> ```ts
> getFloat(parameterIndex: number): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getDouble()



> ```ts
> getDouble(parameterIndex: number): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getDate()



> ```ts
> getDate(parameterIndex: number): Date;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `Date`
> - **Description**: 
> :::

#### getTime()



> ```ts
> getTime(parameterIndex: number): Date;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `Date`
> - **Description**: 
> :::

#### getTimestamp()



> ```ts
> getTimestamp(parameterIndex: number): Date;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `Date`
> - **Description**: 
> :::

#### getObject()



> ```ts
> getObject(parameterIndex: number): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getBigDecimal()



> ```ts
> getBigDecimal(parameterIndex: number): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getRef()



> ```ts
> getRef(parameterIndex: number): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getBytes()



> ```ts
> getBytes(parameterIndex: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getBytesNative()



> ```ts
> getBytesNative(parameterIndex: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getBlob()



> ```ts
> getBlob(parameterIndex: number): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getBlobNative()



> ```ts
> getBlobNative(parameterIndex: number): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getClob()



> ```ts
> getClob(parameterIndex: number): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getNClob()



> ```ts
> getNClob(parameterIndex: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getNString()



> ```ts
> getNString(parameterIndex: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `any` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getArray()



> ```ts
> getArray(parameterIndex: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getURL()



> ```ts
> getURL(parameterIndex: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getRowId()



> ```ts
> getRowId(parameterIndex: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getSQLXML()



> ```ts
> getSQLXML(parameterIndex: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### setURL()



> ```ts
> setURL(parameterIndex: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setNull()



> ```ts
> setNull(parameterIndex: number, sqlTypeStr: any, typeName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `sqlTypeStr` | `any` |  |
> | `typeName` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setBoolean()



> ```ts
> setBoolean(parameterIndex: number, value: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `boolean` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setByte()



> ```ts
> setByte(parameterIndex: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setShort()



> ```ts
> setShort(parameterIndex: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setInt()



> ```ts
> setInt(parameterIndex: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setLong()



> ```ts
> setLong(parameterIndex: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setFloat()



> ```ts
> setFloat(parameterIndex: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setDouble()



> ```ts
> setDouble(parameterIndex: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setBigDecimal()



> ```ts
> setBigDecimal(parameterIndex: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setString()



> ```ts
> setString(parameterIndex: number, value: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setBytes()



> ```ts
> setBytes(parameterIndex: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setDate()



> ```ts
> setDate(parameterIndex: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setTime()



> ```ts
> setTime(parameterIndex: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setTimestamp()



> ```ts
> setTimestamp(parameterIndex: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setAsciiStream()



> ```ts
> setAsciiStream(parameterIndex: number, inputStream: InputStream, length: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `inputStream` | `InputStream` |  |
> | `length` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setBinaryStream()



> ```ts
> setBinaryStream(parameterIndex: number, inputStream: InputStream, length: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `inputStream` | `InputStream` |  |
> | `length` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setObject()



> ```ts
> setObject(parameterIndex: number, value: any, targetSqlType: number, scale: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `any` |  |
> | `targetSqlType` | `number` |  |
> | `scale` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setRowId()



> ```ts
> setRowId(parameterIndex: number, value: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setNString()



> ```ts
> setNString(parameterIndex: number, value: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setSQLXML()



> ```ts
> setSQLXML(parameterIndex: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setBlob()



> ```ts
> setBlob(parameterIndex: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setClob()



> ```ts
> setClob(parameterIndex: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setNClob()



> ```ts
> setNClob(parameterIndex: number, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parameterIndex` | `number` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### execute()



> ```ts
> execute(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getMoreResults()



> ```ts
> getMoreResults(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getParameterMetaData()



> ```ts
> getParameterMetaData(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### isClosed()



> ```ts
> isClosed(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### close()



> ```ts
> close(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

### ResultSet

#### toJson()

Converts the ResultSet into a JSON array of objects.

> ```ts
> toJson(limited: boolean, stringify: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `limited` | `boolean` | Whether to use limited JSON conversion (optimized). |
> | `stringify` | `boolean` | Whether to return the JSON as a string or a parsed array. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: A JavaScript array of objects representing the result set, or a string if stringify is true.
> :::

#### close()



> ```ts
> close(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getBigDecimal()



> ```ts
> getBigDecimal(identifier: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getBoolean()



> ```ts
> getBoolean(identifier: any): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getByte()



> ```ts
> getByte(identifier: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getBytes()



> ```ts
> getBytes(identifier: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getBytesNative()



> ```ts
> getBytesNative(identifier: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getBlob()



> ```ts
> getBlob(identifier: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getBlobNative()



> ```ts
> getBlobNative(identifier: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getClob()



> ```ts
> getClob(identifier: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getNClob()



> ```ts
> getNClob(identifier: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getDate()



> ```ts
> getDate(identifier: any): Date;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `Date`
> - **Description**: 
> :::

#### getDouble()



> ```ts
> getDouble(identifier: any): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getFloat()



> ```ts
> getFloat(identifier: any): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getInt()



> ```ts
> getInt(identifier: any): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getLong()



> ```ts
> getLong(identifier: any): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getShort()



> ```ts
> getShort(identifier: any): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getString()



> ```ts
> getString(identifier: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getTime()



> ```ts
> getTime(identifier: any): Date;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `Date`
> - **Description**: 
> :::

#### getTimestamp()



> ```ts
> getTimestamp(identifier: any): Date;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `identifier` | `any` |  |
>
> ::: info Returns
> - **Type**: `Date`
> - **Description**: 
> :::

#### isAfterLast()



> ```ts
> isAfterLast(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### isBeforeFirst()



> ```ts
> isBeforeFirst(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### isClosed()



> ```ts
> isClosed(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### isFirst()



> ```ts
> isFirst(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### isLast()



> ```ts
> isLast(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### next()



> ```ts
> next(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getMetaData()



> ```ts
> getMetaData(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getNString()



> ```ts
> getNString(columnIndex: number): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `columnIndex` | `number` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

### Connection

#### isOfType()

Checks if the connection is for a specific database system.

> ```ts
> isOfType(databaseSystem: DatabaseSystem): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `databaseSystem` | `DatabaseSystem` |  |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getDatabaseSystem()

Returns the type of the underlying database system as a DatabaseSystem enum.

> ```ts
> getDatabaseSystem(): DatabaseSystem;
> ```
>
>
> ::: info Returns
> - **Type**: `DatabaseSystem`
> - **Description**: 
> :::

#### prepareStatement()

Creates a new PreparedStatement object for sending parameterized SQL statements to the database.

> ```ts
> prepareStatement(sql: string): PreparedStatement;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `string` |  |
>
> ::: info Returns
> - **Type**: `PreparedStatement`
> - **Description**: 
> :::

#### prepareCall()

Creates a CallableStatement object for calling database stored procedures or functions.

> ```ts
> prepareCall(sql: string): CallableStatement;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `string` |  |
>
> ::: info Returns
> - **Type**: `CallableStatement`
> - **Description**: 
> :::

#### close()



> ```ts
> close(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### commit()



> ```ts
> commit(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getAutoCommit()



> ```ts
> getAutoCommit(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getCatalog()



> ```ts
> getCatalog(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getSchema()



> ```ts
> getSchema(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getTransactionIsolation()



> ```ts
> getTransactionIsolation(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### isClosed()



> ```ts
> isClosed(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### isReadOnly()



> ```ts
> isReadOnly(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### isValid()



> ```ts
> isValid(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### rollback()



> ```ts
> rollback(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setAutoCommit()



> ```ts
> setAutoCommit(autoCommit: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `autoCommit` | `boolean` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setCatalog()



> ```ts
> setCatalog(catalog: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `catalog` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setReadOnly()



> ```ts
> setReadOnly(readOnly: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `readOnly` | `boolean` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setSchema()



> ```ts
> setSchema(schema: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `schema` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setTransactionIsolation()



> ```ts
> setTransactionIsolation(transactionIsolation: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `transactionIsolation` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getMetaData()



> ```ts
> getMetaData(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

### Database

#### getDataSources()

Returns a list of available data source names.

> ```ts
> static getDataSources(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getMetadata()

Returns database metadata for the specified data source.

> ```ts
> static getMetadata(datasourceName: string): DatabaseMetadata;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `datasourceName` | `string` |  |
>
> ::: info Returns
> - **Type**: `DatabaseMetadata`
> - **Description**: 
> :::

#### getProductName()

Returns the product name of the underlying database system.

> ```ts
> static getProductName(datasourceName: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `datasourceName` | `string` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getConnection()

Gets a new database connection object.

> ```ts
> static getConnection(datasourceName: string): Connection;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `datasourceName` | `string` |  |
>
> ::: info Returns
> - **Type**: `Connection`
> - **Description**: 
> :::

