# Extensions

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.extensions`
- source: [extensions/Extensions.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/extensions/Extensions.java)
:::

Discovers extensions contributed to a named extension point. Returns the list of `module` paths registered against the point - by user projects via `.extensionpoint` / `.extension` artefacts, or by Java client classes annotated with [`@Extension`](./decorators.md).

Resolution is dynamic: a new contribution becomes visible to the next call after its synchronizer cycle completes. The returned array is empty (never `null`) when no extensions match - callers can iterate directly without a null-guard.

### Key Features:
- **Dynamic resolution**: Newly added extensions are picked up on the next call once the synchronizer has run.
- **Union of sources**: Combines descriptor-based contributions (`.extension` files) with annotation-based contributions (`@Extension`-annotated Java classes).
- **Null-safe**: Always returns an array - empty when no contributions exist.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.extensions.Extensions;

String[] modules = Extensions.getExtensions("ide-menu");
for (String module : modules) {
    // load and invoke the contribution
}
```

## Methods

### getExtensions()

Returns every module path registered against the given extension point.

> ```java
> public static String[] getExtensions(String extensionPointName) throws Exception;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `extensionPointName` | `String` | Logical name of the extension point to query. |
>
> ::: info Returns
> - **Type**: `String[]`
> - **Description**: Module paths of every contribution currently registered against the point. Empty when no contributions match - never `null`.
> :::
