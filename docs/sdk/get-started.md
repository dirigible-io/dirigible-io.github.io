# Get Started

Welcome to the **Eclipse Dirigible Java SDK** - the Java surface for building services, entities, jobs, and integrations inside a Dirigible runtime.

This guide walks through how Java is loaded by the platform, the development model, and a minimal end-to-end example.

## How the Java SDK Works

The SDK is **bundled with the platform**:

* No build configuration required - the SDK is already on the classpath
* `.java` source files are compiled in-process by `engine-java` when synchronized into the registry
* The same `org.eclipse.dirigible.sdk.*` classes are used by both production and IDE-time compilation

A simple example using the `log` and `io` modules:

```java
import org.eclipse.dirigible.sdk.log.Logging;
import org.eclipse.dirigible.sdk.log.Logger;
import org.eclipse.dirigible.sdk.io.Files;

Logger log = Logging.getLogger("demo");
log.info("file size: {}", Files.size("/users/admin/workspace/proj/foo.txt"));
```

## Development Model

The SDK follows an **annotation-driven, code-as-configuration** approach:

* Declare REST endpoints with `@Controller` + `@Get / @Post / @Put / @Patch / @Delete`
* Model data with `@Entity` + `@Table` + `@Column` + `@Id`
* Inject collaborators with `@Inject`
* Schedule background work with `@Scheduled`
* Subscribe to queues/topics with `@Listener`
* Authorize endpoints with `@Roles`

Annotations live under `org.eclipse.dirigible.sdk.*` (the same root as the facade classes), so a typical client `.java` source has a single import root.

## Minimal Example

A typical service is a controller + repository + entity.

### 1. Entity

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.db.Entity;
import org.eclipse.dirigible.sdk.db.Table;
import org.eclipse.dirigible.sdk.db.Column;
import org.eclipse.dirigible.sdk.db.Id;
import org.eclipse.dirigible.sdk.db.GeneratedValue;
import org.eclipse.dirigible.sdk.db.GenerationType;

@Entity
@Table(name = "SAMPLE_COUNTRY")
public class Country {

    @Id
    @GeneratedValue(GenerationType.SEQUENCE)
    @Column(name = "COUNTRY_ID")
    private Long id;

    @Column(name = "COUNTRY_NAME")
    private String name;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

### 2. Repository

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.component.Repository;
import org.eclipse.dirigible.components.data.store.JavaEntityStore;

@Repository
public class CountryRepository {

    private final JavaEntityStore store;

    public CountryRepository(JavaEntityStore store) {
        this.store = store;
    }

    public Country save(Country country) {
        store.save(country);
        return country;
    }
}
```

### 3. Controller

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.sdk.http.Post;
import org.eclipse.dirigible.sdk.http.Body;
import org.eclipse.dirigible.sdk.component.Inject;

import java.util.List;

@Controller("/countries")
public class CountryController {

    @Inject
    private CountryRepository repository;

    @Get
    public List<Country> findAll() {
        return List.of();
    }

    @Post
    public Country create(@Body Country country) {
        return repository.save(country);
    }
}
```

## Where Java Sources Live

Java sources are placed inside any Dirigible project under the platform registry:

```
/registry/public/<project>/<package>/<ClassName>.java
```

`engine-java` synchronizes and compiles them in-process. The platform classpath - including the SDK - is automatically visible to `javac`.

## Key Concepts

* **Facades** - Static classes like `HttpClient`, `Files`, `Configurations`, `Logging` that wrap the platform's runtime services
* **Annotations** - Declarative `@Controller`, `@Entity`, `@Scheduled`, `@Listener`, `@Inject`, `@Roles` for plugging classes into the runtime
* **Pass-through clients** - Modules like `mongodb`, `redis`, `etcd`, `kafka`, `rabbitmq` return native upstream client objects so advanced features remain reachable
* **Polyglot runtime** - Java sources coexist with other languages in the same project and the same JVM; all share data sources, message queues, jobs, and security context

## What to Do Next

* Explore individual **SDK modules** from the sidebar
* Start with:
  * `org.eclipse.dirigible.sdk.http` for REST APIs
  * `org.eclipse.dirigible.sdk.db` for persistence
  * `org.eclipse.dirigible.sdk.component` for dependency injection
* Build your first:
  * REST controller
  * Entity with a repository
  * Scheduled job
  * Queue listener

## Tip

Start small: a single `@Controller` with one `@Get` method that returns a hard-coded value. Once that's live, layer in an `@Entity`, an `@Inject`ed repository, and a `@Scheduled` background job.

You're now ready to start building with the **Eclipse Dirigible Java SDK**.
