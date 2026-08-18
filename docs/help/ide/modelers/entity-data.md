---
title: Entity Data Modeler
description: Visual designer for the domain model (*.edm / *.model). Generates full CRUD applications.
---

# Entity Data Modeler

The Entity Data Modeler (EDM) is a diagram-driven designer for the domain model. It authors `*.edm` (XML) and `*.model` (JSON projection) artefacts. From those, the project-generation pipeline emits a complete CRUD application: tables, OData service, REST endpoints, and an Angular UI.

## Files

- `*.edm` - XML domain model, the source of truth edited in the modeler.
- `*.model` - JSON projection consumed by the application templates.

Both live under `/registry/public/<project>/` once published.

## Authoring

- Drag entities from the palette onto the canvas.
- Add properties; pick a type, length, nullability, key flag.
- Draw relations between entities to express associations and dependencies.
- Group entities into perspectives to control how they appear in the generated UI.

Save persists the `*.edm`. Regenerate the `*.model` projection from the same file when you need the JSON shape.

### Unique keys

A property's own **Unique** flag constrains one column. When what makes a row unique spans several -
one row per `(tenant, application)`, one price per `(product, priceList, validFrom)` - open the
**Unique keys** dialog from the toolbar and declare the key there: pick the entity, tick two or more
of its properties, and give the message a colliding write should be answered with.

The key is stored once for the model rather than on the entity, beside perspectives and navigation,
and it names **properties** - so renaming a property's column follows the key automatically. The
constraint name is derived as `<Entity>_<Property>_<Property>`, the same name an
[intent](/help/intent/dsl-reference#unique-a-business-key-over-more-than-one-field) derives, because
that name is what the generated REST controller matches against the database's error to answer
**409 Conflict** with your message.

::: tip The key is enforced by the database
That is the point of declaring it: the rule then holds for every writer at once - the generated UI,
an import, an arriving message - and not only for the ones that go through the application. The
constraint is created with the table, so a key added to an entity whose table already exists does not
retrofit itself.
:::

## What it generates

The `template-application-*` template family consumes the model and emits:

- `.table` artefacts for every entity.
- An OData v2 service exposing them.
- REST endpoints for CRUD operations.
- A generated Angular UI with master / detail / form views.

See [Modeling artefacts](/help/artefacts/) and the [Workbench perspective](/help/ide/perspectives/workbench).

## Underlying library

The canvas is rendered with [mxGraph](https://github.com/jgraph/mxgraph).
