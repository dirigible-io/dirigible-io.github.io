# Extensions

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.extensions`
- source: [extensions/Extensions.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/extensions/Extensions.java)
:::

Static facade for discovering registered contributions. The preferred entry point is the **typed** `find(Class)` / `findFirst(Class)` API - it returns the contributions cast to the contract interface, so callers invoke contract methods directly with no reflection. `find(Class)` returns the same beans you would receive from `List<T>` injection; **prefer collection injection** in beans that can take it (see [Component / @Inject](/sdk/component/decorators)) and reach for `find` only where injection cannot.

`getExtensions(String)` is the legacy string-keyed lookup, retained for TypeScript/JavaScript `.extension` artefacts. New Java code should use `find(Class)`.

### Key Features:
- **Typed discovery**: `find(Class)` returns `List<T>` where `T` is the contract interface.
- **Per-request lookup**: returns the live set of registered contributions; safe to call from controllers and listeners.
- **Legacy compatibility**: string-keyed `getExtensions(String)` still works for older artefact-based extensions.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.extensions.Extensions;
import java.util.List;
import java.util.Optional;

// Typed - the preferred API (same set as List<OrderProcessor> injection)
List<OrderProcessor> processors = Extensions.find(OrderProcessor.class);
for (OrderProcessor p : processors) {
    p.process(order);
}

Optional<OrderProcessor> first = Extensions.findFirst(OrderProcessor.class);
first.ifPresent(p -> p.process(order));

// Legacy - string-keyed lookup (TypeScript/JavaScript artefacts)
String[] modules = Extensions.getExtensions("ide-menu");
```

## Methods

### find()

Returns every contribution registered for the given extension-point interface, cast to the contract interface.

> ```java
> public static <T> List<T> find(Class<T> extensionPointType);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `extensionPointType` | `Class<T>` | The contract interface implemented by the contributing `@Component`s. |
>
> ::: info Returns
> - **Type**: `List<T>`
> - **Description**: Every registered contribution that implements the contract. Same set as `List<T>` injection.
> :::

### findFirst()

Returns the first registered contribution, or `Optional.empty()` if none.

> ```java
> public static <T> Optional<T> findFirst(Class<T> extensionPointType);
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

Legacy lookup by string-named extension point, kept for compatibility with TypeScript/JavaScript `.extension` artefacts. Returns the module paths registered against the named point.

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

- [Extension model](/sdk/extensions/decorators) - plain-interface extension points and `@Component` contributions.
- [Component](/sdk/component/) - `@Component` / `@Inject`, including collection injection.
