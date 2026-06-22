# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.component`
- source: [component/Component.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/component/Component.java) · [component/Inject.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/component/Inject.java) · [component/Repository.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/component/Repository.java)
:::

Dirigible's own Spring-style dependency-injection annotations. A client class marked `@Component` becomes a managed bean; the engine instantiates it once per `ClientClassLoader` generation (a singleton) and resolves its `@Inject` points from the other beans of the same generation.

Client classes are **not** Spring-scanned, so Spring's `@Autowired` would silently no-op - the annotations from this module are the load-bearing ones.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.component.Inject;
import org.eclipse.dirigible.sdk.component.Repository;
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.components.data.store.java.repository.JavaRepository;

// 1. A repository is a managed bean in its own right
@Repository
public class CountryRepository extends JavaRepository<Country> {
    public CountryRepository() { super(Country.class); }
}

// 2. A controller injects the repository through its constructor (preferred)
@Controller
public class CountryController {

    private final CountryRepository countries;

    @Inject
    public CountryController(CountryRepository countries) {
        this.countries = countries;
    }

    @Get("/")
    public List<Country> list() {
        return countries.findAll();
    }
}
```

## @Component

Marks a client class as a managed bean. The runtime instantiates it once per `ClientClassLoader` generation (a singleton) and makes it available to every `@Inject` point.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.TYPE)
> public @interface Component {
>     String value() default "";
> }
> ```

### Attributes

| Attribute | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| `value` | `String` | `""` | Optional bean name. When omitted the name is the decapitalized simple class name (`CountryController` → `countryController`), following the Spring convention. |

### Notes

- `@Controller`, `@Repository`, and the marker on a job / listener / websocket handler are all beans - they participate in the same container.
- Lifecycle callbacks `@PostConstruct` and `@PreDestroy` (`jakarta.annotation.*`) are honoured: `@PostConstruct` runs after the bean's dependencies are injected, `@PreDestroy` runs when its generation is torn down on hot-reload.

## @Inject

Requests dependency injection at the marked point. Valid on a **field**, a **constructor**, or a **constructor parameter**. Constructor injection is preferred - it keeps the collaborators `final` and the bean fully initialized before any method runs.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target({ElementType.FIELD, ElementType.CONSTRUCTOR, ElementType.PARAMETER})
> public @interface Inject { }
> ```

### Notes

- The declared type is matched against the beans of the current generation.
- **Collection injection**: an injection point typed as `List<T>`, `Set<T>`, or `Collection<T>` receives **every** bean assignable to `T`. This is the idiomatic way to gather all contributions to an interface (see the [extensions](/sdk/extensions/) model).
- Unlike Spring's `@Autowired`, this injection happens through the engine's own container - client classes are not Spring-scanned, so `@Autowired` would silently no-op.

## @Repository

Marks a `@Component` that is a data repository. The canonical use case is a concrete class that extends `JavaRepository<T>` from `data-store-java` to expose typed CRUD over a Dirigible `@Entity`.

A `@Repository` is a managed bean in its own right - it is injected exactly like any other bean (no separate registration mechanism).

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.TYPE)
> public @interface Repository { }
> ```

### Notes

- Inject a repository wherever you need it: `@Inject CountryRepository countries` (constructor or field).
- `JavaRepository<T>` provides `findAll`, `findAll(limit, offset)`, `findById(id)`, `findOne(id)`, `save(entity)`, `update(entity)`, `delete(entity)`, `deleteById(id)`, `count()`, and `query(hql, params)`. Sample: [`dirigiblelabs/sample-java-entity-decorators`](https://github.com/dirigiblelabs/sample-java-entity-decorators).
