# Lifecycle

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.platform`
- source: [platform/Lifecycle.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/platform/Lifecycle.java)
:::

Promotes a project from a user workspace into the public registry (and removes it again). Used by build pipelines, sample loaders, and admin tools that need to push prepared content into the live runtime without going through the IDE UI.

Publishing triggers the same synchronizer chain that hot-reload uses - any artefacts the project declares (`.bpmn`, `.listener`, `.csvim`, `.access`, etc.) come into effect immediately after the call returns.

### Key Features

- **Programmatic publish**: Move a workspace project into `/registry/public/` from code.
- **Symmetric unpublish**: Remove a previously published project by name.
- **Synchronizer-driven**: The same chain that powers IDE hot-reload runs automatically.

### Example Usage

```java
import org.eclipse.dirigible.sdk.platform.Lifecycle;

// Publish a workspace project to the public registry:
boolean published = Lifecycle.publish("admin", "workspace", "demo");

// Remove a published project later:
boolean removed = Lifecycle.unpublish("demo");
```

## Methods

### publish()

Publishes the project from the given user's workspace into the public registry, running the synchronizer chain.

> ```java
> public static boolean publish(String user, String workspace, String project);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `user` | `String` | The owner of the workspace. |
> | `workspace` | `String` | The workspace name (typically `"workspace"`). |
> | `project` | `String` | The project name to publish. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if the project was published successfully. |
> :::

### unpublish()

Removes a previously published project from the public registry.

> ```java
> public static boolean unpublish(String project);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `project` | `String` | The project name to remove from `/registry/public/`. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if the project was unpublished successfully.
> :::
