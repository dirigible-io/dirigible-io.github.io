# Problems

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.platform`
- source: [platform/Problems.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/platform/Problems.java)
:::

Surfaces the platform's "problems" table — the source of truth for build, synchronization, and validation failures the IDE Problems perspective renders. Use this from custom synchronizers, validation jobs, or compile-time tooling to record entries that should reach the developer.

Each entry pins a location (`project/file:line:column`) plus a severity / category, so IDE navigation works without further wiring. `updateStatus(Long, String)` is the mechanism for marking a problem resolved without deleting it (preserving history for audits).

### Key Features

- **IDE-visible entries**: Anything added here appears in the Problems perspective.
- **Location-aware**: Each entry carries `project/file:line:column` for one-click navigation.
- **Status lifecycle**: Mark entries resolved without losing the historical record.
- **Bulk operations**: Delete or update many entries by id, or wipe the table entirely.

### Example Usage

```java
import java.util.List;
import org.eclipse.dirigible.sdk.platform.Problems;

// Record a problem found by a custom validator:
Problems.add(
    "demo/handlers/hello.ts",  // location
    "ERROR",                    // type / severity
    "12",                       // line
    "4",                        // column
    "Identifier 'foo' is not defined",  // cause
    "Did you mean 'bar'?",      // expected
    "TYPESCRIPT",               // category
    "platform-ts",              // module
    "type-checker",             // source
    "demo-validator"            // program
);

// Fetch all problems as a JSON string:
String all = Problems.fetchAll();

// Mark several resolved:
Problems.updateStatusMultiple(List.of(1L, 2L, 3L), "RESOLVED");
```

## Methods

### add()

Inserts a new entry into the problems table.

> ```java
> public static void add(String location, String type, String line, String column, String cause, String expected, String category, String module, String source, String program);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `location` | `String` | The `project/file` location of the problem. |
> | `type` | `String` | The severity / type (e.g. `"ERROR"`, `"WARNING"`). |
> | `line` | `String` | The line number within the file. |
> | `column` | `String` | The column number within the file. |
> | `cause` | `String` | A description of the problem. |
> | `expected` | `String` | A hint at what was expected (or how to resolve). |
> | `category` | `String` | Free-form category (e.g. `"TYPESCRIPT"`, `"BPM"`). |
> | `module` | `String` | The module that produced the entry. |
> | `source` | `String` | The component that detected the problem. |
> | `program` | `String` | The program / tool name. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### fetchAll()

Returns every entry in the problems table as a serialized string.

> ```java
> public static String fetchAll();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON serialization of all problems.
> :::

### fetchBatch()

Returns a paginated batch of problems matching the given SQL `WHERE`-style condition.

> ```java
> public static String fetchBatch(String condition, int limit);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `condition` | `String` | A SQL-style condition expression (without `WHERE`). |
> | `limit` | `int` | Maximum number of rows to return. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON serialization of the matching problems.
> :::

### find()

Looks up a single problem by id.

> ```java
> public static String find(Long id);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `Long` | The problem id. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON serialization of the matching problem, or empty if none.
> :::

### delete()

Removes a single problem by id.

> ```java
> public static void delete(Long id);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `Long` | The problem id. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### deleteMultiple()

Removes several problems by id in one call.

> ```java
> public static void deleteMultiple(List<Long> ids);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `ids` | `List<Long>` | The problem ids to remove. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### deleteByStatus()

Removes every problem whose status matches the given value.

> ```java
> public static void deleteByStatus(String status);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `status` | `String` | The status value to match (e.g. `"RESOLVED"`). |
>
> ::: info Returns
> - **Type**: `void`
> :::

### clear()

Removes every entry from the problems table.

> ```java
> public static void clear();
> ```
>
> ::: info Returns
> - **Type**: `void`
> :::

### updateStatus()

Sets the status of a single problem (e.g. to `"RESOLVED"`) without deleting the row.

> ```java
> public static void updateStatus(Long id, String status);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `Long` | The problem id. |
> | `status` | `String` | The new status value. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### updateStatusMultiple()

Sets the status of many problems in one call.

> ```java
> public static void updateStatusMultiple(List<Long> ids, String status);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `ids` | `List<Long>` | The problem ids. |
> | `status` | `String` | The new status value to apply to all of them. |
>
> ::: info Returns
> - **Type**: `void`
> :::
