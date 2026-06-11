# Repository

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.platform`
- source: [platform/Repository.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/platform/Repository.java)
:::

Mutable access to the Dirigible repository - resources (files), collections (folders), copies and moves, content-typed creates and updates. Returns the platform's `IResource` / `ICollection` domain types so callers can chain further operations (lock, version, set properties).

The "repository" here is the on-disk Dirigible store (see `IRepository` / `IRepositoryStructure`), *not* a JPA repository or a Git repository. For workspace-scoped operations (per-user folders under `/users/<u>/workspace/<proj>`) prefer [`Workspace`](./workspace.md); for the read-only public registry view prefer [`Registry`](./registry.md).

### Key Features

- **Resource CRUD**: Create, read, update, and delete files with either text or binary content.
- **Collection CRUD**: Create and delete folder-like collections.
- **Content typing**: `createResource` lets you tag a resource with a MIME type up front.
- **Native variants**: `*Native` overloads take `byte[]` directly to avoid string encoding.
- **Pattern search**: `find` walks a sub-tree and returns matches against a regex.

### Example Usage

```java
import org.eclipse.dirigible.repository.api.ICollection;
import org.eclipse.dirigible.repository.api.IResource;
import org.eclipse.dirigible.sdk.platform.Repository;

// Create a new text resource under the repository:
IResource res = Repository.createResource(
    "/registry/public/demo/notes/intro.txt",
    "hello",
    "text/plain"
);

// Update its content later:
Repository.updateResource(
    "/registry/public/demo/notes/intro.txt",
    "hello world"
);

// Create a collection (folder):
ICollection col = Repository.createCollection("/registry/public/demo/notes/2026");

// Search for resources by name pattern:
String matches = Repository.find("/registry/public/demo", ".*\\.txt$");
```

## Methods

### getResource()

Looks up a resource (file) at the given repository path.

> ```java
> public static IResource getResource(String path);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The repository path to the resource. |
>
> ::: info Returns
> - **Type**: `IResource`
> - **Description**: The platform resource domain object, or a wrapper that reports `exists() == false`.
> :::

### createResource()

Creates a new resource with text content and the given MIME content type.

> ```java
> public static IResource createResource(String path, String content, String contentType);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The repository path of the new resource. |
> | `content` | `String` | The text content. |
> | `contentType` | `String` | The MIME content type to record (e.g. `"text/plain"`). |
>
> ::: info Returns
> - **Type**: `IResource`
> - **Description**: The created resource.
> :::

### createResourceNative()

Creates a new resource with binary content and the given MIME content type.

> ```java
> public static IResource createResourceNative(String path, byte[] content, String contentType);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The repository path of the new resource. |
> | `content` | `byte[]` | The raw bytes to store. |
> | `contentType` | `String` | The MIME content type to record. |
>
> ::: info Returns
> - **Type**: `IResource`
> - **Description**: The created resource.
> :::

### updateResource()

Replaces the text content of an existing resource.

> ```java
> public static IResource updateResource(String path, String content);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The repository path of the resource. |
> | `content` | `String` | The new text content. |
>
> ::: info Returns
> - **Type**: `IResource`
> - **Description**: The updated resource.
> :::

### updateResourceNative()

Replaces the binary content of an existing resource.

> ```java
> public static IResource updateResourceNative(String path, byte[] content);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The repository path of the resource. |
> | `content` | `byte[]` | The new raw bytes. |
>
> ::: info Returns
> - **Type**: `IResource`
> - **Description**: The updated resource.
> :::

### deleteResource()

Removes a resource from the repository.

> ```java
> public static void deleteResource(String path);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The repository path of the resource. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### getCollection()

Looks up a collection (folder) at the given repository path.

> ```java
> public static ICollection getCollection(String path);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The repository path of the collection. |
>
> ::: info Returns
> - **Type**: `ICollection`
> - **Description**: The platform collection domain object, or a wrapper that reports `exists() == false`.
> :::

### createCollection()

Creates a new collection (folder) at the given repository path.

> ```java
> public static ICollection createCollection(String path);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The repository path of the new collection. |
>
> ::: info Returns
> - **Type**: `ICollection`
> - **Description**: The created collection.
> :::

### deleteCollection()

Removes a collection from the repository.

> ```java
> public static void deleteCollection(String path);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The repository path of the collection. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### find()

Walks the repository sub-tree at `path` and returns entries matching the regex `pattern`.

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
