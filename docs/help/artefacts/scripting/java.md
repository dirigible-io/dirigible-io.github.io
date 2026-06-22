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
3. A single `ComponentContainer` builds every bean for the new generation. `@Component` makes a class a managed bean - and `@Repository`, `@Controller`, `@Scheduled`, `@Listener`, `@Websocket`, and extension contributions are all `@Component`s. The container instantiates each bean, satisfies constructor, field (`@Inject`), and collection (`List<T>`) injection by type, then registers it with its service: `@Entity` classes with the entity manager (Hibernate dynamic-map mode), `@Controller` routes with the router (plus an OpenAPI fragment), scheduled / listener / websocket beans with their engines.

Injection is order-independent and cross-file references resolve in user code because every client class shares the same `ClientClassLoader` and the same container generation.

## URL surface

```
/services/java/{project}/{*classPath}   # authenticated
/public/java/{project}/{*classPath}     # anonymous (if enabled)
```

`JavaEndpoint.dispatch` matches a `@Controller` route first (longest basePath wins, then most-specific path), then falls through to a `JavaHandler`, then returns 404.

## Annotations

The Java SDK annotations under `org.eclipse.dirigible.sdk.*` are on the compile-time classpath of every client `.java`:

- `org.eclipse.dirigible.sdk.db.*` - persistence: `@Entity`, `@Table`, `@Id`, `@GeneratedValue` (+ `GenerationType`), `@Column`, `@Transient`, `@CreatedAt`, `@UpdatedAt`, `@CreatedBy`, `@UpdatedBy`, `@Documentation`.
- `org.eclipse.dirigible.sdk.component.*` - DI: `@Component`, `@Inject`, `@Repository`, plus the `Beans` facade.
- `org.eclipse.dirigible.sdk.http.*` - REST: `@Controller`, `@Get`, `@Post`, `@Put`, `@Patch`, `@Delete`, `@Body`, `@PathParam`, `@QueryParam`, `@Context`, `@Roles`.
- `org.eclipse.dirigible.sdk.job.*`, `.listener.*`, `.websocket.*` - method-level `@Scheduled(expression = …)`, `@Listener(name = …, kind = …)`, the `@Websocket` class marker with `@OnOpen` / `@OnMessage` / `@OnClose` / `@OnError`, and the self-describing `JobHandler` / `MessageHandler` / `WebsocketHandler` interfaces.
- `org.eclipse.dirigible.sdk.extensions.*` - the `Extensions` facade. (A typed Java extension point is just a plain interface; a contribution is a `@Component` that implements it.)

## Reaching platform beans

Client classes are loaded via `ClientClassLoader`, not Spring-scanned, so `@Autowired` is a no-op. To reach platform services from client code use the `Beans` facade - `Beans.get(Class)`, `Beans.get(name, Class)`, `Beans.getAll(Class)` (`org.eclipse.dirigible.sdk.component.Beans`). For entity CRUD the recommended pattern is a `@Repository extends JavaRepository<T>` injected by constructor (or `@Inject` field) into the controller.

## Example

```java
package demo;

import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;

import java.util.List;

@Controller
public class CountryController {

    private final CountryRepository repository;

    public CountryController(CountryRepository repository) {
        this.repository = repository;
    }

    @Get("/list")
    public List<Country> list() {
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
