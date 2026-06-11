---
title: Dependency injection
description: "@Inject + @Repository on Java, @Component on TypeScript."
---

# Dependency injection

Client code does not participate in Spring's component scan - it is loaded by `ClientClassLoader` (Java) or by the per-language engine (TS), not picked up by `@ComponentScan`. `@Autowired` on a client class is a **no-op**. The platform provides its own DI surface that is symmetric across the two languages.

## Java

Two annotations and one SPI:

- `@Repository` (`org.eclipse.dirigible.sdk.component.Repository`) - marks a class as a singleton candidate. `RepositoryClassConsumer` instantiates it via the public no-arg constructor and stores it in `RepositoryRegistry`.
- `@Inject` (`org.eclipse.dirigible.sdk.component.Inject`) - field-level injection request. Resolved at class-load time via the `DependencyResolver` SPI chain; `RepositoryRegistry` is the primary resolver.

### Resolution order (one rebuild cycle)

`JavaClassConsumer` implementations run in fixed Spring `@Order`:

1. `EntityClassConsumer` (`@Order(100)`).
2. `RepositoryClassConsumer` (`@Order(200)`).
3. `ControllerClassConsumer` (`@Order(300)`).
4. `HandlerClassConsumer` (lowest).

Because the loader drains consumer-outer / class-inner, every `@Repository` is in `RepositoryRegistry` before any `@Controller` is loaded. `@Inject CountryRepository` therefore always resolves.

### Reaching platform beans

For platform Spring beans that have no `@Repository` wrapper, use `BeanProvider.getBean(Class)`:

```java
import org.eclipse.dirigible.components.spring.BeanProvider;
import org.eclipse.dirigible.components.data.store.JavaEntityStore;

JavaEntityStore store = BeanProvider.getBean(JavaEntityStore.class);
```

### Example

```java
@Controller("/countries")
public class CountryController {

    @Inject
    private CountryRepository repository;

    @Get
    public List<Country> findAll() {
        return repository.findAll();
    }
}
```

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
