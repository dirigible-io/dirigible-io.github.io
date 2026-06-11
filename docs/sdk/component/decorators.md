# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.component`
- source: [component/Inject.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/component/Inject.java) · [component/Repository.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/component/Repository.java)
:::

Dirigible's own dependency-injection annotations. The engine resolves `@Inject` fields through its `DependencyResolver` SPI at class-load time; `@Repository` registers a class as a singleton candidate for injection.

Client classes are **not** Spring-scanned, so Spring's `@Autowired` would silently no-op - `@Inject` from this module is the load-bearing annotation.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.component.Inject;
import org.eclipse.dirigible.sdk.component.Repository;
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.components.data.store.java.repository.JavaRepository;

// 1. Typed repository - subclasses JavaRepository<T> for free CRUD
@Repository
public class CountryRepository extends JavaRepository<Country> {
    public CountryRepository() { super(Country.class); }
}

// 2. Controller injects the repository by field type
@Controller
public class CountryController {

    @Inject
    private CountryRepository countries;

    @Get("/")
    public List<Country> list() {
        return countries.findAll();
    }
}
```

## @Inject

Marks a field on a client class as needing dependency injection. The field's declared type is resolved through the engine's `DependencyResolver` SPI at class-load time.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.FIELD)
> public @interface Inject { }
> ```

### Notes

- Unlike Spring's `@Autowired`, this injection happens through the engine's own SPI - client classes are not Spring-scanned, so `@Autowired` would silently no-op.
- Presently fulfilled by repositories from `data-store-java`, but the SPI is open for further consumers.

## @Repository

Marks a client class as a singleton repository discoverable via `@Inject`. The canonical use case is a class that extends `JavaRepository<T>` from `data-store-java` to expose typed CRUD over a Dirigible `@Entity`, but the annotation is engine-level so non-entity components can plug into the same injection mechanism.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.TYPE)
> public @interface Repository { }
> ```

### Notes

- The `data-store-java` module ships a `RepositoryClassConsumer` that instantiates annotated classes via the public no-arg constructor and registers them in a `RepositoryRegistry`.
- The registry implements `DependencyResolver`, so the controller consumer can satisfy `@Inject` field bindings.
- `JavaRepository<T>` provides `findAll`, `findAll(limit, offset)`, `findById(id)`, `findOne(id)`, `save(entity)`, `update(entity)`, `delete(entity)`, `deleteById(id)`, `count()`, and `query(hql, params)`. Sample: [`dirigiblelabs/sample-java-entity-decorators`](https://github.com/dirigiblelabs/sample-java-entity-decorators).
