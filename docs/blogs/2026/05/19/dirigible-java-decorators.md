---
title: "Return of the Java - Decorators Awaken in Eclipse Dirigible"
description: "Hot-reloadable @Entity, @Repository, @Controller, @Inject — the decorator order finally lands in Java. Drop a .java file into the registry and watch enterprise Java go declarative, typed, and live-reloaded in one breath."
author: Iliyan Velichkov
author_gh_user: iliyan-velichkov
author_avatar: https://avatars.githubusercontent.com/u/5058839?v=4
read_time: 7 min
publish_date: May 19, 2026
---

A long time ago, in an enterprise far, far away, Java developers spoke in `applicationContext.xml`. They lit candles for `web.xml`. They incanted `@SpringBootApplication`, then waited eight minutes for Maven to bless their incantation with a runnable jar.

Then came the Clone Army of [TypeScript decorators](../../../../2025/12/04/dirigible-decorators.md). They were quick. They were elegant. They were *typed*. And from the dusty Java temples, our brothers and sisters watched — silently, patiently — wondering when their turn would come.

The wait is over.

<img src="../../../../images/decorators/decorators-jedi.jpg" alt="decorators-jedi.jpg">

The same decorator order has crossed the language barrier. The Dirigible runtime now compiles, loads, and *hot-reloads* your client `.java` sources straight from the registry — with the same `@Entity` / `@Repository` / `@Controller` / `@Inject` surface the TypeScript Jedi already enjoy.

Java keeps its compile-time type safety. Java keeps its IDE autocomplete. Java keeps its Maven dependencies. What it gains is the **save-and-it-runs** loop that, until today, lived only in scripting languages.

This is not a port. This is a homecoming.

## Episode I: The Phantom Build

You used to write Java like this:

1. Edit code in your IDE.
2. Run `mvn package`.
3. Wait for Spring Boot to scan, autoconfigure, start Tomcat.
4. Test.
5. Repeat. (Coffee. Then more coffee.)

In Dirigible, you write Java like this:

1. Drop `Country.java` into `/registry/public/<project>/demo/`.
2. Save.
3. `curl /services/java/<project>/demo/Country...`

No `mvn package`. No Spring Boot bootstrap. No `target/` directory. The synchronizer notices the file, the engine batch-compiles every client `.java` in the project with one `javac` invocation, the resulting bytecode lands in a fresh `ClientClassLoader`, and consumers fan out to register your classes with the runtime. The previous classloader becomes unreachable; the JVM reclaims its Metaspace at the next GC. **No restart. Ever.**

The Force is strong with this one.

## Episode II: The Entity Strikes Back

The data layer first. Annotate a plain Java class and Hibernate will weave its tables behind the scenes.

```java
package demo;

import org.eclipse.dirigible.engine.java.annotations.*;

@Entity
@Table(name = "COUNTRIES")
@Documentation("Sample Country Entity")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "CODE2", length = 2)
    public String code2;

    @Column(name = "CODE3", length = 3)
    public String code3;

    @Column(name = "NAME", length = 128)
    @Documentation("Official short name")
    public String name;
}
```

That's it. No `persistence.xml`, no `EntityManagerFactoryBean`, no `@EnableJpaRepositories`. The Dirigible entity consumer reflects over the annotations, builds an HBM XML descriptor, and rebuilds the Hibernate `SessionFactory` to include `Country` — all on the same synchronization cycle that compiled your source.

Available decorators:

* `@Entity` `@Table`
* `@Id` `@GeneratedValue` (with `GenerationType.IDENTITY` / `SEQUENCE` / `AUTO`)
* `@Column` `@Transient`
* `@CreatedAt` `@UpdatedAt` `@CreatedBy` `@UpdatedBy`
* `@Documentation`

A whole Jedi Archive — typed, persisted, documented.

## Episode III: A New Repository

The recommended pattern is not to call `JavaEntityStore` directly. Subclass `JavaRepository<T>` and let the engine inject it where it's needed.

```java
package demo;

import org.eclipse.dirigible.components.data.store.java.repository.JavaRepository;
import org.eclipse.dirigible.engine.java.annotations.Repository;

@Repository
public class CountryRepository extends JavaRepository<Country> {
    public CountryRepository() { super(Country.class); }
}
```

`JavaRepository<T>` ships a typed CRUD surface — `save`, `update`, `findById`, `findOne`, `findAll`, `findAll(limit, offset)`, `delete`, `deleteById`, `count`, `query`. Add your own domain methods and they become available everywhere the repository is injected.

The `@Repository` consumer instantiates one singleton per class and stores it in a registry, ready to be handed out.

## Episode IV: Revenge of the Inject

Spring's `@Autowired` is famously powerful — and famously unavailable to client classes loaded by a foreign `ClassLoader`. So Dirigible brings its own DI resolver, shaped for the hot-reload world.

```java
package demo;

import org.eclipse.dirigible.engine.java.annotations.Inject;
import org.eclipse.dirigible.engine.java.annotations.http.*;

@Controller
@Roles({ "DEVELOPER" })
public class CountryController {

    @Inject
    private CountryRepository countries;     // ← engine injects the singleton at load time

    @Get("/")
    public List<Country> list() { return countries.findAll(); }

    @Get("/{id}")
    public Country byId(@PathParam("id") Long id) { return countries.findById(id); }

    @Post
    @Roles({ "ADMINISTRATOR" })
    public Country create(@Body Country country) { return countries.save(country); }

    @Delete("/{id}")
    public void remove(@PathParam("id") Long id) { countries.deleteById(id); }
}
```

When the controller class is loaded, the engine walks every `@Inject` field, queries each registered `DependencyResolver` in order, and writes the result back via reflection. Today the `RepositoryRegistry` is the only resolver — but the surface is open. Future modules can register their own without touching engine-java.

No `BeanFactory`. No component scan. Just a typed field that gets filled in.

## Episode V: The Controller Awakens

The HTTP surface follows the same JAX-RS / Spring-MVC vocabulary your team already speaks:

| Annotation | Where | What it does |
| - | - | - |
| `@Controller` | class | marks the class as a route holder; base path = its FQN |
| `@Get` `@Post` `@Put` `@Patch` `@Delete` | method | binds the method to an HTTP verb + path suffix |
| `@PathParam("id")` | parameter | binds a `{id}` placeholder |
| `@QueryParam("limit")` | parameter | binds a query-string value |
| `@Body` | parameter | binds the JSON request body (deserialised via Jackson) |
| `@Context` | parameter | injects the raw `HttpServletRequest` / `HttpServletResponse` |
| `@Roles({ "..." })` | class **or** method | role check before invocation (method-level overrides class-level) |
| `@Documentation` | class or method | OpenAPI `summary` / `description` |

`TypeCoercer` handles `String`, `int`/`long`, `UUID`, enums, and booleans at bind time. Parse failures become `400 Bad Request`. `void` returns let you write the response yourself; `String` / `CharSequence` returns become `text/plain`; everything else is Jackson-serialised JSON.

Routes are matched longest-prefix first — nested-package controllers win over outer namespaces — and within a controller, literal paths beat `{placeholder}` patterns. No surprises. Like droids marching in formation.

<img src="../../../../images/decorators/decorators-clones.jpg" alt="decorators-clones.jpg">

## Episode VI: The OpenAPI Menace

Every `@Controller` is reflected at load time into a minimal OpenAPI 3 fragment and stored alongside the controller. The existing `/services/openapi` aggregator merges these fragments with the TypeScript contributions automatically — your Swagger UI lights up the moment the file is saved, and goes dark the moment it is deleted.

```
GET    /services/java/sample-java-entity-decorators/demo/CountryController
GET    /services/java/sample-java-entity-decorators/demo/CountryController/{id}
POST   /services/java/sample-java-entity-decorators/demo/CountryController
DELETE /services/java/sample-java-entity-decorators/demo/CountryController/{id}
```

No `springdoc` config. No `@OpenAPIDefinition`. No build step. The documentation is a side-effect of the truth.

GitHub Sample: [dirigiblelabs/sample-java-entity-decorators](https://github.com/dirigiblelabs/sample-java-entity-decorators)

## Episode VII: Return of the Roles

Security takes the cleanest shape it has ever had in Java.

```java
@Controller
@Roles({ "DEVELOPER" })       // every method requires DEVELOPER…
public class CountryController {

    @Post
    @Roles({ "ADMINISTRATOR" }) // …except this one, which raises the bar
    public Country create(@Body Country country) {
        return countries.save(country);
    }
}
```

Method-level `@Roles` overrides class-level; an empty array means no restriction. The check short-circuits cleanly on the `DEVELOPER` / `ADMINISTRATOR` super-roles and falls back to standard servlet `isUserInRole`. No filter chain to wire. No security DSL to memorise. Just the annotation, on the surface where it belongs.

## Episode VIII: The Hot-Reload Awakens

This is the part Java has been missing for two decades.

Edit `Country.java` to add a new column. Save.

```java
@Column(name = "POPULATION")
public Long population;
```

The synchronizer notices the file change. `javac` rebuilds every client source. A new `ClientClassLoader` is installed. The entity consumer rebuilds the `SessionFactory` with the updated table. The repository consumer instantiates a fresh singleton. The controller consumer resolves `@Inject` against that fresh singleton. The OpenAPI fragment is rewritten. The previous generation becomes unreachable.

Your next HTTP request hits the new code. No `mvn`. No `restart`. No deploy pipeline. The same loop your TypeScript colleagues have been smugly demonstrating in standups — now yours.

<img src="../../../../images/decorators/decorators-dirigible.jpg" alt="decorators-dirigible.jpg">

## The Java Order is Here

With the arrival of Java decorators in Eclipse Dirigible:

* **Entities** become declarative — annotate the class, Hibernate handles the rest.
* **Repositories** become typed — `JavaRepository<Country>` is your CRUD surface; the rest stays out of sight.
* **Dependency Injection** becomes seamless — `@Inject` resolves cross-classloader, no Spring scan needed.
* **Controllers** become beautiful — `@Get`, `@Post`, `@Delete`, with `@PathParam` / `@Body` / `@QueryParam` parameter binding.
* **Security** becomes legible — `@Roles` on the class, overridden per method, enforced by the engine.
* **OpenAPI** becomes automatic — every controller emits its own fragment into `/services/openapi`.
* **Hot reload** becomes Java's birthright — save the file, hit the URL.

This is not an evolution of Java tooling. This is the *removal* of Java tooling. The build is gone. The deploy is gone. What's left is the code — typed, annotated, alive.

And the best part? Your Java sources sit next to your TypeScript sources in the same Dirigible project, talking to the same database, sharing the same `/services/openapi` document, secured by the same `@Roles`. Two languages, one platform, one Force.

The galaxy has changed.

May the Source be with you — *in Java this time*.
