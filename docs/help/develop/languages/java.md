---
title: Java
description: Client .java compiled in-process by engine-java.
---

# Java

Client Java sources dropped under a project are compiled in-process by `engine-java` - one `javac` task and one fresh `ClientClassLoader` per synchronization cycle. The same JVM hosts platform code and client code; cross-file references between user classes resolve because every client class shares one classloader.

## File layout

```
/registry/public/<project>/<package>/<ClassName>.java
```

The package on disk has to match the `package` declaration in the file. Once published, `JavaSynchronizer` parses, compiles, loads, and dispatches.

URL pattern:

```
/services/java/{project}/{*classPath}     # authenticated
/public/java/{project}/{*classPath}       # anonymous variant
```

## Platform API

All client annotations and the facade classes live under `org.eclipse.dirigible.sdk.*`. See the [Java SDK reference](/sdk/) for the full surface.

## Hello, world

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;

@Controller("/hello")
public class HelloController {

    @Get
    public String hello() {
        return "Hello, world";
    }
}
```

Save as `/registry/public/demo/com/acme/demo/HelloController.java`. The next synchronization cycle compiles the class, registers the route, and emits an OpenAPI fragment. Reach it at `/services/java/demo/hello`.

## Dependency injection

`@Inject` resolves against the chain of `DependencyResolver` SPIs - `RepositoryRegistry` (built from `@Repository`-annotated classes) is the primary one. The fan-out order inside one rebuild cycle is `@Entity` → `@Repository` → `@Controller`, so `@Inject CountryRepository` is guaranteed to resolve when the controller is loaded.

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

Client classes are loaded by `ClientClassLoader`, not Spring-scanned, so `@Autowired` is a no-op. For platform beans that have no `@Repository` wrapper, use `BeanProvider.getBean(SomeBean.class)`:

```java
import org.eclipse.dirigible.components.spring.BeanProvider;
import org.eclipse.dirigible.components.data.store.JavaEntityStore;

JavaEntityStore store = BeanProvider.getBean(JavaEntityStore.class);
```

## See also

- [Java SDK reference](/sdk/) - the full `org.eclipse.dirigible.sdk.*` surface.
- [The decorator / annotation model](/help/develop/decorators-model).
- [REST APIs](/help/develop/rest-apis).
- [Entities and persistence](/help/develop/entities-and-persistence).
- [Dependency injection](/help/develop/dependency-injection).
- [Debugging Java](/help/develop/debugging-java).
