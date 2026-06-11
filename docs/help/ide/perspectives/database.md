---
title: Database
description: Schemas, tables, views, SQL console, and reverse-engineering to artefacts.
---

# Database

`perspective-database` is the relational data surface. Inspect catalogs, browse schemas, run SQL, and reverse-engineer the live schema into source artefacts.

## Layout

- **Datasource switcher** - select among registered `.datasource` artefacts; the rest of the perspective rebinds to the chosen connection.
- **Schemas tree** - schemas, tables, views, columns, indexes, foreign keys.
- **SQL console** - free-form SQL editor + execute action.
- **Result grid** - tabular result of the last statement, with paging and export.

## Reverse-engineer to source

Right-click a schema, table, or view in the tree and pick **Generate** to materialise the live structure as Dirigible artefacts under the active workspace project:

- schema -> `.schema`
- table -> `.table`
- view -> `.view`

The generated files are then opened in the [Database Schema modeler](/help/ide/modelers/database-schema) and can be edited, version-controlled, and published like any other artefact.

## Running SQL

The SQL console is the same editor surface as the standalone [SQL view](/help/ide/perspectives/database). Statements run against the currently selected datasource; results land in the grid below. Multi-statement scripts run sequentially; the grid shows the last result set, the rest are logged.

## Datasources

Datasources are declared via `.datasource` artefacts (see [Datasources](/help/artefacts/data/datasource)). The default is the file-backed H2 at `./target/dirigible/h2/DefaultDB`. Override the default through `DIRIGIBLE_DATASOURCE_DEFAULT_*` env vars.

## Related

- [Database Schema modeler](/help/ide/modelers/database-schema)
- [SQL view](/help/ide/perspectives/database)
- [Datasource artefact](/help/artefacts/data/datasource)
- [`@aerokit/sdk/db`](/api/db/) (JavaScript / TypeScript)
- [`/sdk/db/`](/sdk/db/) (Java)
