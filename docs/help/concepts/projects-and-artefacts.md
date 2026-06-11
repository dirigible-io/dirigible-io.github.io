---
title: Projects and artefacts
description: A project is a folder under the repository; every file inside it is an artefact with a runtime meaning derived from its extension.
---

# Projects and artefacts

In Dirigible, a **project is a folder** under `/registry/public/<project>/`. Every file inside that folder is an **artefact** whose runtime meaning is fully determined by its extension and contents - there is no separate manifest binding files to behavior.

## What makes a project

The minimal project is just a folder with files. A `project.json` at the project root is optional; when present, it carries metadata used by the IDE and by some templates - description, license, repository, generation parameters. It is not required for the runtime to reconcile the project.

```
MyProject/
├── project.json                # optional
├── api/
│   └── HelloController.ts      # *Controller.ts -> REST endpoint + OpenAPI
├── data/
│   ├── orders.table            # *.table -> DDL emitted to default DB
│   └── seed.csvim              # *.csvim -> CSV import driver
├── jobs/
│   └── nightly.job             # *.job -> Quartz schedule
└── routes/
    └── pipeline.camel          # *.camel -> Apache Camel route
```

The IDE's project tree, the Operations perspective, the Database perspective, the Processes perspective, and the BPMN modeler all read the same files - there is one source of truth on disk.

## Artefact categories

Artefacts split by purpose:

- **Runtime / execution** - `.js`, `.mjs`, `.ts`, `.java`, `.py`, `.bpmn`, `.camel`, `.job`, `.listener`, `.websocket`, `.odata`, `.proxy`, `.extensionpoint`, `.extension`, `.access`, `.roles`, `expose`.
- **Data** - `.datasource`, `.schema`, `.table`, `.view`, `.csvim`, `.csv`.
- **Documentation** - `.md`, `.confluence`.
- **Design-time modelers** - `.edm`, `.model`, `.dsm`, `.form`, `.command`. These generate runtime artefacts via templates rather than being reconciled directly.

The full catalogue with the synchronizer, engine, and authoring editor for each type lives under [`/help/artefacts/`](/help/artefacts/).

## How an artefact reaches the runtime

For every reconciled artefact type the platform provides three collaborating pieces:

1. A **JPA entity** extending `Artefact` (`components/core/core-base`) - the persisted projection of the file.
2. A **synchronizer** extending `BaseSynchronizer` / `MultitenantBaseSynchronizer` - parses the file, upserts the entity, drives lifecycle.
3. An **engine or service** that consumes the live artefact (Quartz for `.job`, Flowable for `.bpmn`, Spring MVC for TS / Java controllers, etc.).

See [The synchronizer model](/help/concepts/synchronizer-model) for the lifecycle and ordering rules.

## Cross-references

- Full artefact catalogue: [/help/artefacts/](/help/artefacts/)
- File extension to engine mapping: [/help/concepts/synchronizer-model](/help/concepts/synchronizer-model)
- Template / generation surface: `components/template/template-*` (reached via the IDE *Generate* action and `GenerationEndpoint`).
