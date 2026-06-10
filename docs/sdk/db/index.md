# db/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.db`
- source: [db/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/db)
:::

This module provides the relational-database access surface of the Eclipse Dirigible Java SDK. It exposes a small, opinionated facade for executing SQL, managing connections, and persisting Java entities through a Hibernate-backed dynamic store. The annotation set mirrors the familiar `jakarta.persistence` shape so existing JPA knowledge transfers, but the runtime is owned by Dirigible — the annotations are processed by the `data-store-java` module which builds Hibernate mappings on the fly.

The module covers two styles of database interaction:

- **Pass-through SQL and raw JDBC** through the `Database` facade — JSON-shaped helpers (`query`, `update`, `insert`) for scripted endpoints, and `getConnection()` returning a `DirigibleConnection` for code that prefers `PreparedStatement`/`ResultSet` control.
- **Entity-based persistence** through the `Store` facade and the annotation set (`@Entity`, `@Table`, `@Column`, `@Id`, `@GeneratedValue`, `@CreatedAt`, `@CreatedBy`, `@UpdatedAt`, `@UpdatedBy`, `@Transient`) — declarative mapping over a Hibernate session that the data-store-java module maintains.

### Classes and Annotations

- [`Database`](./database.md) — primary entry point for relational-database access; JSON helpers, raw JDBC, sequences, and data-source lookup.
- [`Store`](./store.md) — untyped Hibernate-backed CRUD over named entities, exchanging data as JSON.
- [Decorators](./decorators.md) — annotation set used to declare persistent entities:
  - `@Entity` — marks a class as a persistent entity
  - `@Table` — overrides the physical table name
  - `@Column` — maps a field to a database column
  - `@Id` — marks the primary-key field
  - `@GeneratedValue` — declares an ID-generation strategy
  - `GenerationType` — enum of ID-generation strategies (`AUTO`, `IDENTITY`, `SEQUENCE`, `TABLE`)
  - `@CreatedAt` — auto-populated insert timestamp
  - `@CreatedBy` — auto-populated insert user
  - `@UpdatedAt` — auto-refreshed update timestamp
  - `@UpdatedBy` — auto-refreshed update user
  - `@Transient` — excludes a field from the database mapping
