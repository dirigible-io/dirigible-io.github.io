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

## Defining an entity

### Java

```java
package demo;

import org.eclipse.dirigible.sdk.db.Column;
import org.eclipse.dirigible.sdk.db.Entity;
import org.eclipse.dirigible.sdk.db.GeneratedValue;
import org.eclipse.dirigible.sdk.db.GenerationType;
import org.eclipse.dirigible.sdk.db.Id;
import org.eclipse.dirigible.sdk.db.Table;
import org.eclipse.dirigible.sdk.platform.Documentation;

@Entity
@Table(name = "SAMPLE_COUNTRY")
@Documentation("Sample Country Entity")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COUNTRY_ID")
    @Documentation("Auto-generated primary key")
    public Long id;

    @Column(name = "COUNTRY_CODE2", length = 2)
    public String code2;

    @Column(name = "COUNTRY_CODE3", length = 3)
    public String code3;

    @Column(name = "COUNTRY_NAME", length = 128)
    @Documentation("Official short name")
    public String name;
}
```

### TypeScript / JavaScript

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

## Repository pattern

The recommended pattern is to subclass `JavaRepository<T>` (Java) or `Repository<T>` (TypeScript). Both deliver typed CRUD plus `findAll`, `findById`, `save`, `update`, `delete`, `deleteById`, `count`, and `query`/HQL out of the box.

### Java

`@Repository` registers the class as a singleton; `JavaRepository<T>` is the typed CRUD base:

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

Controllers inject the repository - constructor injection is preferred - and call typed methods directly, with no `JavaEntityStore` and no `BeanProvider`:

```java
@Controller
public class CountryController {

    private final CountryRepository countries;

    public CountryController(CountryRepository countries) {
        this.countries = countries;
    }

    @Get("/")        public List<Country> list()                          { return countries.findAll(); }
    @Get("/{id}")    public Country       byId(@PathParam("id") Long id)  { return countries.findById(id); }
    @Post            public Country       create(@Body Country c)         { return countries.save(c); }
    @Delete("/{id}") public void          remove(@PathParam("id") Long id) { countries.deleteById(id); }
}
```

Field `@Inject` on the repository works too; see [Dependency injection](/help/develop/dependency-injection). Working sample: [`dirigiblelabs/sample-java-entity-decorators`](https://github.com/dirigiblelabs/sample-java-entity-decorators).

### TypeScript / JavaScript

`Repository<T>` is auto-generated; subclass it via `@Component`:

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

## Transactions

Every repository call is its own transaction. That is right for a single write and wrong for an operation built out of several - creating a document header, its lines, and flipping the status of the record it was created from. If the third write fails, the first two are already durable: a document that exists, counts as the period's billing, and is missing exactly what it was for.

Wrap such an operation in a unit of work and it becomes one transaction - all of it, or none of it:

```java
import org.eclipse.dirigible.components.data.store.java.repository.UnitOfWork;

public Invoice createFrom(Integer timesheetId) {
    return UnitOfWork.call(() -> {
        Invoice invoice = invoices.save(header(timesheetId));
        for (TimesheetLine line : lines.findAll(Criteria.create().eq("Timesheet", timesheetId))) {
            items.save(item(invoice, line));
        }
        timesheets.updateProperty(timesheetId, "Status", INVOICED);
        return invoice;
    });
}
```

`UnitOfWork.run(...)` is the same thing for a block with no result. What to know:

- It is bound to the thread, so every repository the block reaches joins it - you do not pass anything around. Blocks nest, and the outermost one owns the commit.
- Reads inside the block see the block's own uncommitted writes, so a guard that re-reads the row it just wrote behaves as it would after a commit.
- The events the writes publish ride the same transaction and reach the broker only once the whole unit committed - never for work that was rolled back. An announcement about the unit's own outcome therefore belongs after the block, because the commit is what makes it true.
- The change history and document-number allocation deliberately stay outside the unit, each on its own connection: a rolled-back unit can leave a history row and consume a number. Both record an attempt, not business state.

### Required values

A write that leaves a `NOT NULL` column empty is refused before it reaches the database, with a `ValidationException` naming the property - `SalesInvoiceItem.Quantity is required` - which the controller runtime answers as `400`. The alternative is the driver's own constraint violation as a `500`, carrying a physical column name the caller cannot map back to anything they can fix.

A column carrying a `DEFAULT` is exempt: the database supplies its value, so leaving it empty is not the same as leaving it missing.

## See also

- Working sample: [`dirigiblelabs/sample-java-entity-decorators`](https://github.com/dirigiblelabs/sample-java-entity-decorators).
- [Java SDK - db](/sdk/db/).
- [TypeScript API - db](/api/db/).
- [SDK reference](https://www.dirigible.io/sdk/).
- [Dependency injection](/help/develop/dependency-injection).
- [Working with data](/help/develop/working-with-data).
