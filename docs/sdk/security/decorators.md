# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.security`
- source: [security/Roles.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/security/Roles.java)
:::

The `@Roles` annotation gates controller classes and methods on the caller's role membership. Roles are checked at dispatch time against `UserFacade.isInRole(String)` — any-of semantics.

A method-level `@Roles` overrides the class-level one for that method only. An empty `value()` means "no restriction" (useful at the method level to open up a single endpoint on an otherwise restricted controller).

### Example Usage:
```java
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.sdk.security.Roles;

@Controller("/admin")
@Roles({"admin", "ops"})
public class AdminController {

    @Get("/users")
    public List<String> list() { ... }

    @Get("/health")
    @Roles({})
    public String health() { return "OK"; }
}
```

## @Roles

Restricts a controller class or method to users in any of the listed roles.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target({ElementType.TYPE, ElementType.METHOD})
> public @interface Roles { ... }
> ```

### Attributes

| Attribute | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| `value` | `String[]` | `{}` | Role names — any one of which grants access. Empty array means no restriction. |
