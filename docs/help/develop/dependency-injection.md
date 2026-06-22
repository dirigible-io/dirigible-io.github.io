---
title: Dependency injection
description: "@Component + @Inject on Java, @Component on TypeScript."
---

# Dependency injection

Client code does not participate in Spring's component scan - it is loaded by `ClientClassLoader` (Java) or by the per-language engine (TS), not picked up by `@ComponentScan`. `@Autowired` on a client class is a **no-op**. The platform provides its own DI surface that is symmetric across the two languages.

## Java

The Java side is a Spring-style container over your client classes.

### `@Component` - the bean marker

`@Component` (`org.eclipse.dirigible.sdk.component.Component`) turns a class into a managed bean. The optional bean name defaults to the decapitalized simple class name (`CountryRepository` → `countryRepository`), following the Spring convention; pass `@Component("name")` to override.

```java
import org.eclipse.dirigible.sdk.component.Component;

@Component
public class GreetingService {
    public String greet(String who) { return "Hello, " + who; }
}
```

`@Repository`, `@Controller`, and `@Websocket` are beans in their own right - you do not add `@Component` to them; they already participate in injection.

### Constructor injection (preferred)

Declare the collaborators as constructor parameters. The container resolves each by type when it builds the bean:

```java
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;

@Controller
public class CountryController {

    private final CountryRepository countries;

    public CountryController(CountryRepository countries) {
        this.countries = countries;
    }

    @Get("/")
    public List<Country> list() {
        return countries.findAll();
    }
}
```

### Field injection

`@Inject` (`org.eclipse.dirigible.sdk.component.Inject`) is also valid on fields, constructors, and parameters. Field injection is the lighter-weight option when a constructor would be all boilerplate:

```java
import org.eclipse.dirigible.sdk.component.Inject;

@Controller
public class CountryController {

    @Inject
    private CountryRepository countries;

    @Get("/")
    public List<Country> list() { return countries.findAll(); }
}
```

### Collection injection

A `List<T>`, `Set<T>`, or `Collection<T>` parameter or field receives **every** bean assignable to `T`. This is the natural way to consume all implementations of an interface (for example, every provider of an extension point):

```java
@Component
public class OrderPipeline {

    private final List<OrderProcessor> processors;

    public OrderPipeline(List<OrderProcessor> processors) {
        this.processors = processors;
    }
}
```

### Lifecycle callbacks

`@PostConstruct` runs after all dependencies are injected; `@PreDestroy` runs when the bean's generation is torn down on hot-reload.

### Reaching platform beans - the `Beans` facade

To reach platform services from client code, use `Beans` (`org.eclipse.dirigible.sdk.component.Beans`) - the client-facing facade:

```java
import org.eclipse.dirigible.sdk.component.Beans;
import org.eclipse.dirigible.components.data.store.java.store.JavaEntityStore;

JavaEntityStore store = Beans.get(JavaEntityStore.class);
```

`Beans` exposes `get(Class)`, `get(name, Class)`, and `getAll(Class)`. Client code should **not** use the platform-internal `BeanProvider` - `Beans` is the supported entry point.

For entity CRUD the recommended pattern stays `@Repository extends JavaRepository<T>` (typed `findAll`, `findById`, `save`, `delete`, …); inject that repository rather than reaching for `JavaEntityStore` directly.

### How it is wired

You only declare the dependencies; the platform wires them. The guarantees you can rely on:

- Beans are **singletons** within the application.
- Every injection point - constructor parameter, `@Inject` field, or collection - is resolved **by type**, so a bean can depend on any other **regardless of declaration order**.
- Beans are **rebuilt automatically when you change client code** (hot reload); `@PostConstruct` runs once a bean is fully wired and `@PreDestroy` before the previous version is replaced.

### Example

A plain `@Component` service injected into a controller by constructor, with the `Beans` facade as the programmatic-lookup alternative:

```java
import org.eclipse.dirigible.sdk.component.Component;

@Component
public class GreetingService {

    public String greet(String name) {
        return "Hello, " + name + "!";
    }
}
```

```java
import org.eclipse.dirigible.sdk.component.Beans;
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.sdk.http.PathParam;

@Controller
public class GreetingController {

    private final GreetingService greetings;

    public GreetingController(GreetingService greetings) {
        this.greetings = greetings;
    }

    @Get("/greet/{name}")
    public String greet(@PathParam("name") String name) {
        return greetings.greet(name);
    }

    @Get("/greet-via-beans/{name}")
    public String greetViaBeans(@PathParam("name") String name) {
        return Beans.get(GreetingService.class)
                    .greet(name);
    }
}
```

**Sample project:** [`dirigiblelabs/sample-java-entity-decorators`](https://github.com/dirigiblelabs/sample-java-entity-decorators) - `GreetingService` + `GreetingController` (constructor injection and `Beans.get`), and `CountryController` with `@Inject` field injection. SDK reference: [`/sdk/`](https://www.dirigible.io/sdk/).

## TypeScript

`engine-di` reconciles `*Component.ts` files. A class annotated `@Component("Name")` is registered as a singleton; `@Inject("Name")` field injection resolves against the registry at class-load time.

```ts
import { Component, Inject, Injected } from "@aerokit/sdk/component";

@Component("CountryRepository")
export class CountryRepository { ... }

@Controller
@Injected()
class CountryController {

  @Inject("CountryRepository")
  private readonly repository!: CountryRepository;
}
```

`@Injected()` on the controller class enables field-level injection. The names passed to `@Component` and `@Inject` must match.

## See also

- [The decorator / annotation model](/help/develop/decorators-model).
- [Entities and persistence](/help/develop/entities-and-persistence) - the canonical use case.
- [Java SDK - component](/sdk/).
- [TypeScript API - component](/api/).
