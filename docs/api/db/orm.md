# ORM

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/orm.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/orm.ts)
- last updated: 
:::

The `ORM` class provides a way to define an Object-Relational Mapping (ORM) schema for a database entity. It allows developers to specify the structure of their entities, including properties, associations, and constraints, in a declarative manner. The ORM definition can then be used by other modules (e.g., `DAO`, `Repository`) to perform database operations while ensuring data integrity and consistency with the defined schema.

::: warning
The `ORM` module is deprecated and will be removed in future releases. It is recommended to use the `Repository/Store` modules instead for managing database entities and operations.
:::

### Key Features
- **Declarative Schema Definition**: Define your entity's structure, properties, and associations in a clear and structured way.
- **Validation**: The ORM class includes validation logic to ensure that the defined schema is consistent and adheres to expected formats.
- **Association Management**: Supports defining associations between entities (e.g., one-to-one, one-to-many) to model complex relationships in the database.
- **Utility Methods**: Provides methods to retrieve primary keys, mandatory properties, unique properties, and to convert the ORM definition into a table schema format.

### Use Cases
- Defining the structure of database entities in a way that can be easily consumed by data access layers.
- Ensuring that database operations are performed in accordance with a well-defined schema, improving data integrity and reducing errors.
- Modeling complex entity relationships through associations, allowing for more sophisticated data interactions.

### Example Usage
```ts
import { ORM } from "@aerokit/sdk/db";

const userORM = {
 table: "Users",
  properties: [
    { name: "id", column: "ID", type: "INTEGER", id: true, autoIncrement: true },
    { name: "name", column: "NAME", type: "VARCHAR", required: true },
    { name: "email", column: "EMAIL", type: "VARCHAR", unique: true }
 ],
  associations: [
   { name: "profile", joinKey: "PROFILE_ID", type: "one-to-one", targetDao: () => profileDAO }
 ]
};

const userDAO = new DAO(get(userORM));
// Now you can use userDAO to perform CRUD operations on the Users table while adhering to the defined ORM schema.
```

## Classes

