# Beans

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.component`
- source: [component/Beans.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/component/Beans.java)
:::

`Beans` is the client-facing facade for looking up managed beans and platform services from code. Use it when constructor or field [`@Inject`](/sdk/component/decorators) is not an option - for example inside a handler method that needs an `IRepository`, or to reach a platform service from a non-bean class.

::: warning Use `Beans`, not `BeanProvider`
Client code must use `Beans` for lookups. The platform-internal `BeanProvider` is not part of the client SDK and must not be referenced from client `.java` sources.
:::

### Example Usage:
```java
import org.eclipse.dirigible.sdk.component.Beans;

// by type
CountryRepository countries = Beans.get(CountryRepository.class);

// by name and type
CountryController controller = Beans.get("countryController", CountryController.class);

// every bean assignable to the type
List<OrderProcessor> processors = Beans.getAll(OrderProcessor.class);
```

Prefer [`@Inject`](/sdk/component/decorators) - and, for "all contributions of a type", `List<T>` injection - over `Beans.get` / `Beans.getAll` in classes that are themselves managed beans; reach for the facade only where injection cannot reach.

## Methods

### get()

Returns the single bean of the given type.

> ```java
> public static <T> T get(Class<T> type);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `type` | `Class<T>` | The bean type to resolve. |
>
> ::: info Returns
> - **Type**: `T`
> - **Description**: The bean assignable to `type`.
> :::

### get() (by name)

Returns the bean registered under the given name, cast to the given type.

> ```java
> public static <T> T get(String name, Class<T> type);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | The bean name (see [`@Component`](/sdk/component/decorators) `value()`). |
> | `type` | `Class<T>` | The expected bean type. |
>
> ::: info Returns
> - **Type**: `T`
> - **Description**: The named bean.
> :::

### getAll()

Returns every bean assignable to the given type.

> ```java
> public static <T> List<T> getAll(Class<T> type);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `type` | `Class<T>` | The type to match against. |
>
> ::: info Returns
> - **Type**: `List<T>`
> - **Description**: All beans assignable to `type`. Same set you would receive from `List<T>` injection.
> :::

## See also

- [Decorators](/sdk/component/decorators) - `@Component` / `@Inject` / `@Repository`.
