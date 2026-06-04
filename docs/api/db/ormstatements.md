# ORMStatements

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/ormstatements.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/ormstatements.ts)
- last updated: 
:::

The `ORMStatements` class provides a set of methods to generate SQL statements based on an ORM (Object-Relational Mapping) definition. It abstracts the SQL generation logic and allows developers to work with high-level ORM definitions while the class handles the conversion to SQL statements for various operations such as creating tables, inserting records, updating records, deleting records, and querying records. The class supports different SQL dialects through the use of a `SQLBuilder` instance, enabling compatibility with various database engines.

::: warning
The `ORMStatements` module is deprecated and will be removed in future releases. It is recommended to use the `Repository/Store` modules instead for managing database entities and operations.
:::

### Key Features
- **SQL Generation**: Generates SQL statements for common database operations based on the provided ORM definition.
- **Dialect Support**: Supports multiple SQL dialects through the use of a `SQLBuilder`, allowing for compatibility with different database engines.
- **ORM Abstraction**: Allows developers to work with high-level ORM definitions without needing to write raw SQL, improving productivity and reducing the likelihood of SQL syntax errors.
- **Flexible Querying**: Provides methods for building complex queries with filtering, sorting, pagination, and selection of specific fields.

### Use Cases
- Managing database schema and performing CRUD operations based on an ORM definition.
- Abstracting database interactions to allow for easier maintenance and potential database engine changes in the future.
- Generating SQL statements dynamically based on application logic and user input while ensuring proper handling of parameters and preventing SQL injection.

### Example Usage
```ts
import { ORMStatements } from "@aerokit/sdk/db";
const userORM = {
  table: "Users",
  properties: [
    {name: "id", column: "ID", type: "INTEGER", mandatory: true},
    {name: "name", column: "NAME", type: "VARCHAR", length: 255},
    {name: "email", column: "EMAIL", type: "VARCHAR", length: 255, unique: true}
  ],
  getPrimaryKey: function() { return this.properties[0]; },
  getMandatoryProperties: function() { return this.properties.filter(p => p.mandatory); },
  getUniqueProperties: function() { return this.properties.filter(p => p.unique); }
};
const ormStatements = new ORMStatements(userORM);
// Create table SQL
const createTableSQL = ormStatements.createTable().toString();
console.log(createTableSQL); // Output: SQL statement for creating the Users table
// Insert record SQL
const insertSQL = ormStatements.insert().toString();
console.log(insertSQL); // Output: SQL statement for inserting a record into the Users table
// Update record SQL
const updateSQL = ormStatements.update({ id: 1, name: "Alice", email: "
console.log(updateSQL); // Output: SQL statement for updating a record in the Users table
// Delete record SQL
const deleteSQL = ormStatements.delete().toString();
console.log(deleteSQL); // Output: SQL statement for deleting a record from the Users table
// Query records SQL
const querySQL = ormStatements.list({ $filter: { name: "Alice" }, $sort: "email", $limit: 10 }).toString();
console.log(querySQL); // Output: SQL statement for querying records from the Users table with filtering, sorting, and pagination
```

## Classes

