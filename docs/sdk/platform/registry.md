# Registry

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.platform`
- source: [platform/Registry.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/platform/Registry.java)
:::

Read-only access to artefacts published under `/registry/public/`. Use this when a controller, job, or extension needs to consume content that ships with another project — configuration files, fixed templates, lookup tables — without going through HTTP or a custom service.

For mutable access (creating, updating, deleting resources or whole collections) use [`Repository`](./repository.md); for IDE workspace operations use [`Workspace`](./workspace.md).

### Key Features

- **Binary and text access**: `getContent` for bytes, `getText` for UTF-8 string content.
- **Existence check**: `exists` without forcing a full read.
- **Path conversions**: Translate between registry, repository, and resource paths.
- **Pattern search**: `find` walks a sub-tree and returns matches against a regex.

### Example Usage

```java
import org.eclipse.dirigible.sdk.platform.Registry;

// Read a JSON config that ships with the 'demo' project:
String json = Registry.getText("/demo/config/settings.json");

// Check whether a registry path exists before consuming it:
if (Registry.exists("/demo/config/settings.json")) {
    byte[] raw = Registry.getContent("/demo/config/settings.json");
    // ...
}

// Locate every .properties file under a project:
String matches = Registry.find("/demo", ".*\\.properties$");
```

## Methods

### getContent()

Returns the raw bytes of the registry resource at the given path.

> ```java
> public static byte[] getContent(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The registry path (e.g. `/demo/config/settings.json`). |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The raw bytes of the resource, or `null` if missing.
> :::

### getText()

Returns the UTF-8 text content of the registry resource at the given path.

> ```java
> public static String getText(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The registry path. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The text content of the resource.
> :::

### exists()

Returns whether something exists at the given registry path.

> ```java
> public static boolean exists(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The registry path. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if a resource or collection exists at that path.
> :::

### toRepositoryPath()

Converts a registry-relative path to its underlying repository path.

> ```java
> public static String toRepositoryPath(String path);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | A registry path. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The equivalent path inside the Dirigible repository store.
> :::

### toRegistryPath()

Converts a repository path back to its registry-relative path.

> ```java
> public static String toRegistryPath(String path);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | A repository path. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The equivalent path under `/registry/public/`.
> :::

### toResourcePath()

Converts a registry path to the platform's resource-relative path.

> ```java
> public static String toResourcePath(String path);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | A registry path. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The resource path (suitable for classpath-style lookups).
> :::

### find()

Walks the registry sub-tree at `path` and returns entries matching the regex `pattern`.

> ```java
> public static String find(String path, String pattern) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The root path to walk. |
> | `pattern` | `String` | A regular expression matched against entries. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON-serialized list of matching paths.
> :::
