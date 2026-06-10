# Workspace

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.platform`
- source: [platform/Workspace.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/platform/Workspace.java)
:::

IDE workspace operations — list, create, and delete the per-user workspaces that the IDE Projects perspective shows, and read or replace the content of files inside them. Unlike the JSON-string accessors elsewhere in the platform, this facade returns the platform's own `Workspace` and `File` domain types directly (`org.eclipse.dirigible.components.ide.workspace.domain.Workspace` / `...domain.File`) — the same objects the IDE renders, so the workspace tree stays consistent across UI and programmatic edits.

Use this from build / migration scripts and from IDE extensions that need to prepare or fix up a user's workspace. For published artefacts use [`Registry`](./registry.md) (read-only) or [`Repository`](./repository.md) (mutable); for filesystem paths outside the registry use `org.eclipse.dirigible.sdk.io.Files`.

### Key Features

- **Direct domain objects**: Returns platform `Workspace` and `File` types rather than JSON strings.
- **CRUD on workspaces**: Create, fetch by name, list, and delete.
- **File content access**: Read `byte[]` content; write text or `byte[]`.
- **IDE consistency**: Operations are visible to the running IDE without extra synchronization.

### Example Usage

```java
import org.eclipse.dirigible.components.ide.workspace.domain.File;
import org.eclipse.dirigible.components.ide.workspace.domain.Workspace;
import org.eclipse.dirigible.sdk.platform.Workspace;

// Create a workspace for the current user (if missing) and grab the existing one:
Workspace ws = Workspace.createWorkspace("workspace");
Workspace existing = Workspace.getWorkspace("workspace");

// Walk down to a file and replace its content:
File file = existing.getProject("demo").getFile("README.md");
Workspace.setContent(file, "# Demo\n\nHello, world.\n");

// Read it back as bytes:
byte[] bytes = Workspace.getContent(file);
```

## Methods

### createWorkspace()

Creates a new IDE workspace with the given name and returns its domain object.

> ```java
> public static org.eclipse.dirigible.components.ide.workspace.domain.Workspace createWorkspace(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | The workspace name. |
>
> ::: info Returns
> - **Type**: `org.eclipse.dirigible.components.ide.workspace.domain.Workspace`
> - **Description**: The created (or existing) workspace.
> :::

### getWorkspace()

Returns the domain object for an existing workspace.

> ```java
> public static org.eclipse.dirigible.components.ide.workspace.domain.Workspace getWorkspace(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | The workspace name. |
>
> ::: info Returns
> - **Type**: `org.eclipse.dirigible.components.ide.workspace.domain.Workspace`
> - **Description**: The workspace, or a wrapper that reports it doesn't exist.
> :::

### listWorkspaces()

Returns the names of all workspaces visible to the current user.

> ```java
> public static String listWorkspaces();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON-serialized list of workspace names.
> :::

### deleteWorkspace()

Removes the named workspace.

> ```java
> public static void deleteWorkspace(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | The workspace name. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### getContent()

Returns the raw bytes of the given workspace file.

> ```java
> public static byte[] getContent(File file);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `file` | `File` | The workspace file domain object. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The file's raw bytes.
> :::

### setContent()

Replaces the content of a workspace file with the given text.

> ```java
> public static void setContent(File file, String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `file` | `File` | The workspace file domain object. |
> | `input` | `String` | The new text content. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### setContent()

Replaces the content of a workspace file with the given raw bytes.

> ```java
> public static void setContent(File file, byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `file` | `File` | The workspace file domain object. |
> | `input` | `byte[]` | The new raw bytes. |
>
> ::: info Returns
> - **Type**: `void`
> :::
