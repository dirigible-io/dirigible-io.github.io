# @Documentation

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.platform`
- source: [platform/Documentation.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/platform/Documentation.java)
:::

`@Documentation` is a cross-cutting annotation that attaches a human-readable description to a type, field, or method. It is one of the few annotations in the SDK that doesn't change runtime behaviour - its sole purpose is to feed downstream documentation tooling.

The platform's OpenAPI generator picks `@Documentation` up on `@Controller` classes and their methods:

- **Class-level** `@Documentation` becomes the API description in the generated OpenAPI document.
- **Method-level** `@Documentation` becomes the operation summary for that endpoint.

It is also recognised on `@Entity` fields for future schema documentation (DDL comments, generated JSON-Schema descriptions, etc.). Because the annotation is `@Retention(RUNTIME)`, frameworks built on top of Dirigible can reflect on it at any point in the lifecycle.

### Targets

- `ElementType.TYPE` - classes, interfaces, annotations, enums
- `ElementType.FIELD` - instance and static fields
- `ElementType.METHOD` - methods

### Example Usage

```java
import org.eclipse.dirigible.sdk.platform.Documentation;
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;

@Controller
@Documentation("Customer master-data operations")
public class CustomerController {

    @Get("/customers/{id}")
    @Documentation("Fetch a single customer by id")
    public Customer findById(String id) {
        // ...
    }
}
```

The generated OpenAPI for the snippet above carries `"Customer master-data operations"` as the controller-level description and `"Fetch a single customer by id"` as the `summary` of the `GET /customers/{id}` operation.

## Attributes

### value()

The human-readable description string to attach to the annotated element.

> ```java
> String value();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The description text. Required - `@Documentation` has no default for `value`.
> :::

## Annotation Metadata

| Aspect | Value |
| ------ | ------ |
| Retention | `RUNTIME` |
| Targets | `TYPE`, `FIELD`, `METHOD` |
| Inherited | No |
| Repeatable | No |
