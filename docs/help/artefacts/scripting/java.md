---
title: Java
description: "Client .java sources compiled and dispatched by engine-java."
---

# Java

Client `*.java` sources placed under a project are compiled in-process by [`engine-java`](https://github.com/eclipse/dirigible/tree/master/components/engine/engine-java) and dispatched via `JavaEndpoint`. Unlike [JavaScript](/help/artefacts/scripting/javascript) and [TypeScript](/help/artefacts/scripting/typescript), Java sources **are** synchronized.

## Lifecycle

`JavaSynchronizer` reconciles `*.java` files into `JavaFile` artefacts on every cycle. The expensive work happens once per cycle in `finishing()`:

1. One `javac` task over every client source in the registry.
2. A single fresh `ClientClassLoader` (parent = platform classloader) replaces the previous generation; old metaspace is GC-reclaimed.
3. Every loaded class is offered to each `JavaClassConsumer` SPI implementation in `@Order`:
   - `EntityClassConsumer` (`@Order(100)`) - `@Entity` classes register with Hibernate dynamic-map mode.
   - `RepositoryClassConsumer` (`@Order(200)`) - `@Repository` classes become singletons in `RepositoryRegistry`.
   - `ControllerClassConsumer` (`@Order(300)`) - `@Controller` classes register with `ControllerRouter` and publish an OpenAPI fragment.
   - `HandlerClassConsumer` - `implements JavaHandler` classes register catch-all URL handlers.

Cross-file references resolve in user code because every client class shares the same `ClientClassLoader`.

## URL surface

```
/services/java/{project}/{*classPath}   # authenticated
/public/java/{project}/{*classPath}     # anonymous (if enabled)
```

`JavaEndpoint.dispatch` tries `ControllerRouter.match` first (longest basePath wins, then most-specific path), then falls through to a `JavaHandler`, then returns 404.

## Annotations

Two annotation packages are on the compile-time classpath of every client `.java`:

- `org.eclipse.dirigible.engine.java.annotations.*` - persistence: `@Entity`, `@Table`, `@Id`, `@GeneratedValue` (+ `GenerationType`), `@Column`, `@Transient`, `@CreatedAt`, `@UpdatedAt`, `@CreatedBy`, `@UpdatedBy`, `@Documentation`, `@Repository`, `@Inject`.
- `org.eclipse.dirigible.engine.java.annotations.http.*` - REST: `@Controller`, `@Get`, `@Post`, `@Put`, `@Patch`, `@Delete`, `@Body`, `@PathParam`, `@QueryParam`, `@Context`, `@Roles`.

A class may be exactly one of `{handler, controller}`; carrying both shapes is rejected.

## Reaching platform beans

Client classes are loaded via `ClientClassLoader`, not Spring-scanned, so `@Autowired` is a no-op. Use `BeanProvider.getBean(...)` from `components-core-base` to fetch `JavaEntityStore`, `IRepository`, etc. The recommended pattern is `@Inject CountryRepository` - resolved by the `DependencyResolver` chain (`RepositoryRegistry` is the only resolver today).

## Example

```java
package demo;

import org.eclipse.dirigible.engine.java.annotations.http.Controller;
import org.eclipse.dirigible.engine.java.annotations.http.Get;
import org.eclipse.dirigible.engine.java.annotations.Inject;

@Controller
public class CountryController {

    @Inject
    private CountryRepository repository;

    @Get("/list")
    public Object list() {
        return repository.findAll();
    }
}
```

The base path is the class FQN with `.` → `/` - the example serves `GET /services/java/<project>/demo/CountryController/list`.

## Editor & language server

Monaco editor backed by `ide-java-lsp` (JDT.LS) for completion, navigation, refactor. The `ide-java-debug` view bridges the browser to a JDWP target via DAP (default JDWP port `DIRIGIBLE_JAVA_DEBUG_JDWP_PORT=8000`).

## See also

- [Java SDK reference](/sdk/get-started)
- [`engine-java` overview](/help/develop/languages/java)
- [`@Roles` semantics](/help/artefacts/security/roles)
