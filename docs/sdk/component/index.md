# component/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.component`
- source: [component/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/component)
:::

This module provides Dirigible's Spring-style dependency-injection surface for client Java code. A class marked `@Component` becomes a managed bean (a singleton per `ClientClassLoader` generation); the runtime resolves its `@Inject` points - by field, constructor, or constructor parameter - from the other beans of the same generation. A `List<T>` / `Set<T>` / `Collection<T>` injection point receives every bean assignable to `T`.

Client classes are **not** Spring-scanned, so Spring's `@Autowired` would silently no-op here. Use these annotations instead.

The main components of this module are:
- **@Component**: Type annotation that registers a class as a managed bean (optional `value()` bean name).
- **@Inject**: Requests injection on a field, constructor, or constructor parameter (constructor injection preferred).
- **@Repository**: A managed bean that is a data repository (typically extends `JavaRepository<T>`); injectable like any bean.
- **Beans**: Static facade for looking up beans / platform services - `get(Class)`, `get(String, Class)`, `getAll(Class)`. The client-facing replacement for the platform-internal `BeanProvider`.

## Classes
