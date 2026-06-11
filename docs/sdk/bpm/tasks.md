# Tasks

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.bpm`
- source: [bpm/Tasks.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/bpm/Tasks.java)
:::

Helpers for the Flowable user-task layer - list outstanding tasks for the calling user, read and write task-local variables, complete a task. Useful inside controllers backing a worklist UI or in script-style steps that finish off a workflow.

Task-level variables are scoped to the task and shadow process-level variables of the same name - `complete(taskId, variablesJson)` is what promotes them back to process scope (and decides which gateway path the engine takes next).

### Key Features:
- **Per-user task list** - pre-filtered by the platform's authentication context.
- **Task-scoped variables** - separate from the parent process's variable map until completion.
- **JSON in / JSON out** - consistent JSON shape across the platform.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.bpm.Tasks;

String json = Tasks.list();

Tasks.setVariable("task-123", "decision", "approve");
Tasks.complete("task-123", "{\"decision\":\"approve\",\"comment\":\"looks good\"}");
```

## Methods

### list()

Returns a JSON array of tasks the calling user is authorized to act on. The platform pre-filters by candidate user / group; deserialize the JSON in the caller.

> ```java
> public static String list();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON array of task descriptors.
> :::

### getVariable()

Reads a single task-scoped variable.

> ```java
> public static Object getVariable(String taskId, String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `String` | The Flowable task id. |
> | `name` | `String` | Variable name. |
>
> ::: info Returns
> - **Type**: `Object`
> - **Description**: The value, or `null` if not set.
> :::

### getVariables()

Returns all task-scoped variables.

> ```java
> public static Map<String, Object> getVariables(String taskId);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `String` | The Flowable task id. |
>
> ::: info Returns
> - **Type**: `Map<String, Object>`
> - **Description**: All task-local variables.
> :::

### setVariable()

Sets a single task-scoped variable.

> ```java
> public static void setVariable(String taskId, String name, Object value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `String` | The task id. |
> | `name` | `String` | Variable name. |
> | `value` | `Object` | Value. |

### setVariables()

Bulk-sets task-scoped variables.

> ```java
> public static void setVariables(String taskId, Map<String, Object> variables);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `String` | The task id. |
> | `variables` | `Map<String, Object>` | Variables to merge. |

### complete()

Marks the task complete and promotes the supplied JSON document onto process scope. Passing `null` for `variablesJson` leaves the existing scope untouched.

> ```java
> public static void complete(String taskId, String variablesJson);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `String` | The task id. |
> | `variablesJson` | `String` | JSON document promoted to process scope, or `null` to leave scope untouched. |
