# DAO

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/dao.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/dao.ts)
- last updated: 
:::

::: warning
The `DAO` module is deprecated and will be removed in future releases. It is recommended to use the `Repository/Store` modules instead for managing database entities and operations.
:::

The `DAO` class provides a generic Data Access Object implementation for performing CRUD operations on database entities defined by an ORM (Object-Relational Mapping) definition. It abstracts the underlying database interactions and allows developers to work with entities as JavaScript objects, while handling the conversion to and from database records seamlessly.

### Key Features
- **Generic CRUD Operations**: Supports create, read, update, and delete operations for any entity defined by an ORM.
- **Association Management**: Handles entity associations (e.g., one-to-one, one-to-many) and allows for cascading operations on related entities.
- **Validation**: Validates entities against mandatory properties defined in the ORM before performing database operations.
- **Customizable Logging**: Provides detailed logging of database operations, with configurable logger names based on the ORM table name.

### Use Cases
- Managing database entities in a structured and consistent manner across different tables and relationships.
- Abstracting database interactions to allow for easier maintenance and potential database engine changes in the future.
- Handling complex entity relationships and ensuring data integrity through validation and association management.

### Example Usage
```ts
import { DAO } from "@aerokit/sdk/db";
const userORM = {
		table: "Users",
		properties: [
			{name: "id", column: "ID", type: "INTEGER", mandatory: true},
			{name: "name", column: "NAME", type: "VARCHAR", mandatory: true},
			{name: "email", column: "EMAIL", type: "VARCHAR", mandatory: true, unique: true}
		],
		getPrimaryKey: function() { return this.properties[0]; },
		getMandatoryProperties: function() { return this.properties.filter(p => p.mandatory); },
		getUniqueProperties: function() { return this.properties.filter(p => p.unique); }
};
const userDAO = new DAO(userORM);
// Insert a new user
const newUserId = userDAO.insert({ name: "Alice", email: "alice@example.com" });
// Update an existing user
userDAO.update({ id: newUserId, name: "Alice Smith", email: "alice.smith@example.com" });
// Delete a user
userDAO.delete({ id: newUserId });

## Classes

