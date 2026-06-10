# Store

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.db`
- source: [db/Store.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/db/Store.java)
:::

`Store` is the untyped, Hibernate-backed CRUD facade for dynamic entities. Each call addresses an entity by its logical name (matching the `name()` attribute of an `@Entity` annotation on a registered client class) and exchanges data as JSON strings — a convenient shape for scripted callers and for endpoints that proxy arbitrary entity names.

For typed CRUD over an `@Entity`-annotated client class with compile-time field checks, prefer `org.eclipse.dirigible.components.data.store.java.JavaEntityStore` (resolve it through `BeanProvider.getBean(JavaEntityStore.class)` inside a controller method). The two stores sit on the same Hibernate session — changes from one are immediately visible to the other.

### Key Features:
- **Entity-by-name addressing**: Operate on any registered `@Entity` without compile-time coupling to its class.
- **JSON wire shape**: Reads and writes use JSON strings — friendly to HTTP boundaries.
- **Shared session**: Backed by the same Hibernate session as `JavaEntityStore`, so typed and untyped calls interleave safely.
- **Listing options**: `list`, `count`, and `find` accept an options JSON for filtering, paging, sorting, and example-based search.
- **Metadata helpers**: `getEntityName`, `getTableName`, `getIdName`, and `getIdColumn` resolve the physical mapping for a logical entity.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.db.Store;

// Insert
Object savedId = Store.save("Customer", "{\"name\":\"Acme\",\"active\":true}");

// Read by ID
String json = Store.get("Customer", savedId.toString());

// List with options (paging, ordering)
String page = Store.list("Customer", "{\"$limit\":50,\"$offset\":0,\"$orderBy\":\"name\"}");

// Count
long total = Store.count("Customer", null);

// Update (existing ID inside the JSON)
Store.update("Customer", "{\"id\":\"42\",\"name\":\"Acme Corp\"}");

// Delete
Store.deleteEntry("Customer", "42");
```

## Methods

### save(entityName, json)
Persists a new entity instance from its JSON representation.

> ```java
> public static Object save(String entityName, String json);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entityName` | `String` | Logical name of the entity (matches `@Entity.name()` or the simple class name). |
> | `json` | `String` | JSON object describing the new entity. |
>
> ::: info Returns
> - **Type**: `Object`
> - **Description**: The generated identifier of the saved entity.
> :::

### upsert(entityName, json)
Inserts or updates an entity instance from its JSON representation, depending on whether its identifier already exists.

> ```java
> public static void upsert(String entityName, String json);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entityName` | `String` | Logical name of the entity. |
> | `json` | `String` | JSON object describing the entity; must include the ID for an update. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### update(entityName, json)
Updates an existing entity instance from its JSON representation.

> ```java
> public static void update(String entityName, String json);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entityName` | `String` | Logical name of the entity. |
> | `json` | `String` | JSON object describing the entity; must include the ID. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### list(entityName, optionsJson)
Lists entity instances, optionally filtered by an options JSON (paging, sorting, projections).

> ```java
> public static String list(String entityName, String optionsJson);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entityName` | `String` | Logical name of the entity. |
> | `optionsJson` | `String` | JSON object with listing options (limit, offset, order, filter); may be `null`. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON array of matching entity instances.
> :::

### count(entityName, optionsJson)
Counts entity instances matching the supplied options.

> ```java
> public static long count(String entityName, String optionsJson);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entityName` | `String` | Logical name of the entity. |
> | `optionsJson` | `String` | JSON object with filter options; may be `null` for a total count. |
>
> ::: info Returns
> - **Type**: `long`
> - **Description**: The number of matching entities.
> :::

### find(entityName, exampleJson, limit, offset)
Finds entity instances by example — non-null fields of `exampleJson` form equality predicates.

> ```java
> public static String find(String entityName, String exampleJson, int limit, int offset);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entityName` | `String` | Logical name of the entity. |
> | `exampleJson` | `String` | JSON object whose populated fields are treated as equality filters. |
> | `limit` | `int` | Maximum number of results to return. |
> | `offset` | `int` | Number of results to skip. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON array of matching entity instances.
> :::

### get(entityName, id)
Loads a single entity instance by its primary key.

> ```java
> public static String get(String entityName, java.io.Serializable id);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entityName` | `String` | Logical name of the entity. |
> | `id` | `java.io.Serializable` | Primary-key value of the entity to load. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON object for the entity, or `null` if no row matches.
> :::

### deleteEntry(entityName, id)
Deletes an entity instance by its primary key.

> ```java
> public static void deleteEntry(String entityName, java.io.Serializable id);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entityName` | `String` | Logical name of the entity. |
> | `id` | `java.io.Serializable` | Primary-key value of the entity to delete. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### getEntityName(name)
Resolves the canonical entity name for a logical name (mainly useful for tooling).

> ```java
> public static String getEntityName(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Logical entity name. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The canonical entity name as registered in the metamodel.
> :::

### getTableName(name)
Returns the physical table name for a logical entity name.

> ```java
> public static String getTableName(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Logical entity name. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The physical database table name.
> :::

### getIdName(name)
Returns the name of the ID field on the entity.

> ```java
> public static String getIdName(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Logical entity name. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The Java field name marked with `@Id`.
> :::

### getIdColumn(name)
Returns the physical column name backing the entity's ID field.

> ```java
> public static String getIdColumn(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Logical entity name. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The database column backing the ID field.
> :::
