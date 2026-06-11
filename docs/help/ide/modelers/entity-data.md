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

## What it generates

The `template-application-*` template family consumes the model and emits:

- `.table` artefacts for every entity.
- An OData v2 service exposing them.
- REST endpoints for CRUD operations.
- A generated Angular UI with master / detail / form views.

See [Modeling artefacts](/help/artefacts/) and the [Workbench perspective](/help/ide/perspectives/workbench).

## Underlying library

The canvas is rendered with [mxGraph](https://github.com/jgraph/mxgraph).
