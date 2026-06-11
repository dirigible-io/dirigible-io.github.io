---
title: Schema artefact
description: Multi-table schema grouping declared as JSON. Synchronizer SchemasSynchronizer.
---

# Schema - `*.schema`

Groups tables, views, and constraints into one declarative file. Synchronizer: `SchemasSynchronizer` (`components/data/data-structures`).

Use a schema when several tables share a lifecycle and you want them created in lockstep with cross-table foreign keys. For one-off tables prefer the simpler [`*.table`](/help/artefacts/data/table).

## File format

```json
{
    "schema": {
        "name": "ORDERS",
        "structures": [
            {
                "name": "CUSTOMER",
                "type": "TABLE",
                "columns": [
                    { "name": "ID",   "type": "BIGINT",  "primaryKey": true, "identity": true },
                    { "name": "NAME", "type": "VARCHAR", "length": 200, "nullable": false }
                ]
            },
            {
                "name": "ORDER",
                "type": "TABLE",
                "columns": [
                    { "name": "ID",          "type": "BIGINT", "primaryKey": true, "identity": true },
                    { "name": "CUSTOMER_ID", "type": "BIGINT", "nullable": false },
                    { "name": "AMOUNT",      "type": "DECIMAL", "precision": 12, "scale": 2 }
                ],
                "constraints": {
                    "foreignKeys": [
                        { "name": "FK_ORDER_CUSTOMER", "columns": ["CUSTOMER_ID"],
                          "referencedTable": "CUSTOMER", "referencedColumns": ["ID"] }
                    ]
                }
            }
        ]
    }
}
```

## Editor

Visual designer: [Database Schema modeler](/help/ide/modelers/database-schema) (`*.dsm` -> generates `.schema`).

## Reconciliation

On CREATE / UPDATE the synchronizer emits the DDL through the active data source's `ISqlDialect`. DROP cascades on DELETE only when the cascade flag is on the artefact - by default the synchronizer is conservative.

## See also

- [Table](/help/artefacts/data/table)
- [View](/help/artefacts/data/view)
- [Database Schema modeler](/help/ide/modelers/database-schema)
