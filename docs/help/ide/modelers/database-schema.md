---
title: Database Schema Modeler
description: Visual designer for database schemas (*.dsm). Generates .schema / .table / .view artefacts.
---

# Database Schema Modeler

The Database Schema Modeler (DSM) is a diagram-driven designer for the physical database schema. It authors `*.dsm` files. On generation it emits the runtime DDL artefacts: `.schema`, `.table`, `.view`, plus their constraints.

## Files

- `*.dsm` - XML schema model edited in the modeler.

Generated outputs:

- `.schema` - schema definition reconciled by the schema synchronizer.
- `.table` - table definitions (columns, types, primary key, indices).
- `.view` - view definitions.
- Foreign-key and unique constraints attached to the relevant tables.

## Authoring

- Drag tables and views from the palette.
- Add columns with type, length, nullability, default, primary-key flag.
- Draw foreign-key relations between tables (one-to-many, many-to-many).
- Define indices and unique constraints per table.

On save the `*.dsm` is persisted. Generation produces the `.schema` / `.table` / `.view` artefacts under the same project; the data-structures synchronizer then materialises them in the target database.

## Underlying library

The canvas is rendered with [mxGraph](https://github.com/jgraph/mxgraph).

## See also

- [Database perspective](/help/ide/perspectives/database)
- [Data artefacts](/help/artefacts/)
