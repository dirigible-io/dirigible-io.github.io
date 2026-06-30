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

`@Component` makes a class a managed bean - and `@Repository`, `@Controller`, and `@Websocket` are `@Component`s too. Every bean is built once per generation, with constructor, field (`@Inject`), and collection (`List<T>`) injection satisfied by type, independent of declaration order - so `CountryRepository` resolves whether you inject it in the constructor or via a field. Constructor injection is preferred.

```java
@Controller("/countries")
public class CountryController {

    private final CountryRepository repository;

    public CountryController(CountryRepository repository) {
        this.repository = repository;
    }

    @Get
    public List<Country> findAll() {
        return repository.findAll();
    }
}
```

Client classes are loaded by `ClientClassLoader`, not Spring-scanned, so `@Autowired` is a no-op. To reach platform beans from client code, use the `Beans` facade - `Beans.get(Class)`, `Beans.get(name, Class)`, `Beans.getAll(Class)` - rather than the platform-internal `BeanProvider`:

```java
import org.eclipse.dirigible.sdk.component.Beans;
import org.eclipse.dirigible.components.data.store.java.store.JavaEntityStore;

JavaEntityStore store = Beans.get(JavaEntityStore.class);
```

See [Dependency injection](/help/develop/dependency-injection) for the full model.

## Compilation and publishing gotchas

Three consequences of the in-process, one-batch compile model that bite in practice:

- **Every class needs a named package.** A type in the default package (no `package` declaration) cannot be imported or referenced from another client class - including from a generated repository. This matters for intent [calculated-field actions](/help/intent/intent-file#calculated-fields): the action class the repository calls (e.g. `custom.sales_invoices.SalesInvoiceNumberAction`) must declare a package, and the entity's `imports:` must import it by that fully-qualified name.
- **One bad file fails the whole batch.** All client `.java` across all projects compile in a **single `javac` task** per synchronization cycle. A single file that does not compile fails the batch, so **every project's Java endpoints return 404** until it is fixed - not just the broken file's own routes. When Java routes vanish wholesale, look for one uncompilable source.
- **Deleting a file from the workspace does not unpublish it.** Removing a `.java` from your workspace project leaves the already-published copy in the **registry**, where the synchronizer still compiles and serves it (and a broken lingering copy keeps 404-ing the batch per the point above). You must remove it from the registry too - delete it in the Projects / registry view (or re-publish the project) - or it lingers.

## See also

- [Java SDK reference](/sdk/) - the full `org.eclipse.dirigible.sdk.*` surface.
- [The decorator / annotation model](/help/develop/decorators-model).
- [REST APIs](/help/develop/rest-apis).
- [Entities and persistence](/help/develop/entities-and-persistence).
- [Dependency injection](/help/develop/dependency-injection).
- [Debugging Java](/help/develop/debugging-java).
