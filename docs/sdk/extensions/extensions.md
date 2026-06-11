# Extensions

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.extensions`
- source: [extensions/Extensions.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/extensions/Extensions.java)
:::

Static facade for discovering registered contributions. The preferred entry point is the **typed** `find(Class)` / `findFirst(Class)` API - it returns instances cast to the contract interface, so callers invoke contract methods directly with no reflection.

`getExtensions(String)` is the legacy string-keyed lookup retained for compatibility with `.extension` artefacts that pre-date the typed annotations. New code should use `find(Class)`.

### Key Features:
- **Typed discovery**: `find(Class)` returns `List<T>` where `T` is the contract interface.
- **Per-request lookup**: returns the live set of registered contributions; safe to call from controllers and listeners.
- **Legacy compatibility**: string-keyed `getExtensions(String)` still works for older artefact-based extensions.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.extensions.Extensions;
import java.util.List;
import java.util.Optional;

// Typed - the preferred API
List<OrderProcessor> processors = Extensions.find(OrderProcessor.class);
for (OrderProcessor p : processors) {
    p.process(order);
}

Optional<OrderProcessor> first = Extensions.findFirst(OrderProcessor.class);
first.ifPresent(p -> p.process(order));

// Legacy - string-keyed lookup
String[] modules = Extensions.getExtensions("ide-menu");
```

## Methods

### find()

Returns every class registered against the given extension point, instantiated and cast to the contract interface.

> ```java
> public static <T> List<T> find(Class<T> extensionPointType) throws Exception;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `extensionPointType` | `Class<T>` | The contract interface, marked with `@ExtensionPoint`. |
>
> ::: info Returns
> - **Type**: `List<T>`
> - **Description**: Every registered contribution that implements the contract.
> :::

### findFirst()

Returns the first registered contribution, or `Optional.empty()` if none.

> ```java
> public static <T> Optional<T> findFirst(Class<T> extensionPointType) throws Exception;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `extensionPointType` | `Class<T>` | The contract interface. |
>
> ::: info Returns
> - **Type**: `Optional<T>`
> - **Description**: The first registered contribution, or empty.
> :::

### getExtensions()

Legacy lookup by string-named extension point. Returns the module paths registered via `.extension` artefacts.

> ```java
> public static String[] getExtensions(String extensionPointName) throws Exception;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `extensionPointName` | `String` | The string identifier of the extension point. |
>
> ::: info Returns
> - **Type**: `String[]`
> - **Description**: Module paths registered against the named point.
> :::

## See also

- [`@Extension` / `@ExtensionPoint`](/sdk/extensions/decorators) - the annotations side.
- Sample: [`dirigiblelabs/sample-java-extension-decorator`](https://github.com/dirigiblelabs/sample-java-extension-decorator).
