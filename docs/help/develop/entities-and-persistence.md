---
title: Entities and persistence
description: "@Entity-based persistence backed by Hibernate."
---

# Entities and persistence

Persistence is decorator-driven on both languages. A class annotated `@Entity` becomes a managed table; the platform handles DDL emission, mapping, and CRUD.

## How it works

- **TypeScript** - `data-store` reflects `*Entity.ts` decorators into Hibernate HBM XML at synchronization time.
- **Java** - `data-store-java` reflects `@Entity` Java annotations into the same HBM XML. Hibernate runs in **dynamic-map mode** - `session.save(entityName, Map<String, Object>)` rather than typed beans - so it never has to load the user's class across classloaders. `EntityBeanMapper` handles bean ↔ map conversion respecting `@Column` and `@Transient`.

Both paths end up in the same Hibernate `SessionFactory`, rooted at the default user-data datasource (not SystemDB).

## Field annotations

| Annotation | Purpose |
| --- | --- |
| `@Id` | Primary key field. |
| `@GeneratedValue(strategy = GenerationType.SEQUENCE)` | Auto-generated PK (`AUTO`, `IDENTITY`, `SEQUENCE`, `TABLE`, `UUID`). |
| `@Column(name=..., length=..., nullable=...)` | Column mapping override. |
| `@Transient` | Skip the field during persistence. |
| `@CreatedAt` | Auto-populated with the current timestamp on insert. |
| `@UpdatedAt` | Auto-populated on every update. |
| `@CreatedBy` | Auto-populated with `UserFacade.getName()` on insert. |
| `@UpdatedBy` | Auto-populated with `UserFacade.getName()` on update. |
| `@Documentation("...")` | Free-text description; surfaces in OpenAPI. |

## TypeScript and Java side by side

```ts
import { Entity, Table, Id, Generated, Column } from "@aerokit/sdk/db/decorators";

@Entity("Country")
@Table("SAMPLE_COUNTRY")
export class Country {

  @Id()
  @Generated("sequence")
  @Column({ name: "COUNTRY_ID", type: "long" })
  public id?: number;

  @Column({ name: "COUNTRY_NAME", type: "string" })
  public name?: string;
}
```

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.db.Entity;
import org.eclipse.dirigible.sdk.db.Table;
import org.eclipse.dirigible.sdk.db.Id;
import org.eclipse.dirigible.sdk.db.GeneratedValue;
import org.eclipse.dirigible.sdk.db.GenerationType;
import org.eclipse.dirigible.sdk.db.Column;

@Entity
@Table(name = "SAMPLE_COUNTRY")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "COUNTRY_ID")
    private Long id;

    @Column(name = "COUNTRY_NAME")
    private String name;

    // getters and setters
}
```

## Repository pattern

The recommended pattern is to subclass `JavaRepository<T>` (Java) or `Repository<T>` (TypeScript). Both deliver typed CRUD plus `findAll`, `findById`, `save`, `update`, `delete`, `deleteById`, `count`, and `query`/HQL out of the box.

**Java** - `@Repository` registers the class as a singleton; `JavaRepository<T>` is the typed CRUD base:

```java
import org.eclipse.dirigible.sdk.component.Repository;
import org.eclipse.dirigible.components.data.store.java.repository.JavaRepository;

@Repository
public class CountryRepository extends JavaRepository<Country> {

    public CountryRepository() {
        super(Country.class);
    }
}
```

Controllers `@Inject` the repository and call typed methods directly - no `JavaEntityStore`, no `BeanProvider`:

```java
@Controller
public class CountryController {

    @Inject
    private CountryRepository countries;

    @Get("/")        public List<Country> list()                          { return countries.findAll(); }
    @Get("/{id}")    public Country       byId(@PathParam("id") Long id)  { return countries.findById(id); }
    @Post            public Country       create(@Body Country c)         { return countries.save(c); }
    @Delete("/{id}") public void          remove(@PathParam("id") Long id) { countries.deleteById(id); }
}
```

Working sample: [`dirigiblelabs/sample-java-entity-decorators`](https://github.com/dirigiblelabs/sample-java-entity-decorators).

**TypeScript** - `Repository<T>` is auto-generated; subclass it via `@Component`:

```ts
import { Repository } from "@aerokit/sdk/db";
import { Component } from "@aerokit/sdk/component";
import { Country } from "./Country";

@Component("CountryRepository")
export class CountryRepository extends Repository<Country> {
  constructor() {
    super(Country);
  }
}
```

## Tenancy

Entities are stored in the **default user-data datasource**, which is tenant-isolated when `DIRIGIBLE_MULTI_TENANT_MODE` is on. Each tenant has its own physical (or logical) database; the same `@Entity` is reconciled per tenant.

## See also

- [Java SDK - db](/sdk/db/).
- [TypeScript API - db](/api/db/).
- [Dependency injection](/help/develop/dependency-injection).
- [Working with data](/help/develop/working-with-data).
