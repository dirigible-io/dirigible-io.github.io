---
title: REST with Java controllers
description: Build a REST endpoint in Java using @Controller / @Get / @Post + constructor injection.
---

# REST with Java controllers

A 5-minute walkthrough: a Java `@Controller` with a JPA-style entity, a constructor-injected repository, and full CRUD.

## 1. Create a project

In the IDE, open the [Workbench perspective](/help/ide/perspectives/workbench). Right-click in the [Projects view](/help/ide/views/projects) -> **New** -> **Project**. Name it `countries-java`.

## 2. Define an entity

Create `countries-java/com/acme/Country.java`:

```java
package com.acme;

import org.eclipse.dirigible.sdk.db.*;

@Entity
@Table(name = "ACME_COUNTRY")
public class Country {

    @Id
    @GeneratedValue(GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "CODE", length = 3)
    private String code;

    @Column(name = "NAME", length = 200)
    private String name;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

## 3. Add a repository

Create `countries-java/com/acme/CountryRepository.java`:

```java
package com.acme;

import org.eclipse.dirigible.sdk.component.Repository;
import org.eclipse.dirigible.components.data.store.java.repository.JavaRepository;

@Repository
public class CountryRepository extends JavaRepository<Country> {

    public CountryRepository() {
        super(Country.class);
    }
}
```

`JavaRepository<T>` ships typed CRUD out of the box - `findAll`, `findById`, `save`, `update`, `delete`, `deleteById`, `count`, `query`/HQL - so the repository needs no body unless you add domain methods.

## 4. Add a controller

Create `countries-java/com/acme/CountryController.java`:

Constructor injection is the preferred way to receive the repository:

```java
package com.acme;

import org.eclipse.dirigible.sdk.http.*;

import java.util.List;

@Controller("/countries")
public class CountryController {

    private final CountryRepository repository;

    public CountryController(CountryRepository repository) {
        this.repository = repository;
    }

    @Get
    public List<Country> list() { return repository.findAll(); }

    @Get("/{id}")
    public Country get(@PathParam("id") long id) { return repository.findById(id); }

    @Post
    public Country create(@Body Country country) { return repository.save(country); }

    @Put("/{id}")
    public Country update(@PathParam("id") long id, @Body Country country) {
        country.setId(id);
        return repository.update(country);
    }

    @Delete("/{id}")
    public void remove(@PathParam("id") long id) { repository.deleteById(id); }
}
```

Field injection with `@Inject` (`org.eclipse.dirigible.sdk.component.Inject`) is also valid; constructor injection is preferred.

## 5. Publish

Right-click the project -> **Publish**. The Java synchronizer compiles every client `.java` in one cycle and installs the controller into the routing table.

## 6. Try it

```bash
curl -X POST http://localhost:8080/services/java/countries-java/com/acme/CountryController/countries \
     -H 'content-type: application/json' \
     -d '{"code":"FR","name":"France"}'

curl http://localhost:8080/services/java/countries-java/com/acme/CountryController/countries
```

## 7. OpenAPI

`JavaControllerOpenApiPublisher` emits an OpenAPI fragment at `java-controller://countries-java::com.acme.CountryController`. It joins the aggregated document at `/services/openapi`.

## See also

- [Languages: Java](/help/develop/languages/java)
- [REST APIs (develop)](/help/develop/rest-apis)
- [`org.eclipse.dirigible.sdk.http`](/sdk/http/)
- [`org.eclipse.dirigible.sdk.db`](/sdk/db/)
- [REST with TypeScript decorators](/help/tutorials/rest-with-typescript-decorators)
