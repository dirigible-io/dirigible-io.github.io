---
title: Table artefact
description: Single-table DDL declared as JSON. Synchronizer TablesSynchronizer.
---

# Table - `*.table`

Declarative DDL for a single table. Synchronizer: `TablesSynchronizer` (`components/data/data-structures`). DDL is emitted through the data source's `ISqlDialect` so the same artefact runs on H2, PostgreSQL, MSSQL, MariaDB, MySQL, HANA, and Snowflake.

## File format

```json
{
    "name": "COUNTRY",
    "type": "TABLE",
    "columns": [
        { "name": "ID",   "type": "BIGINT",  "primaryKey": true, "identity": true, "nullable": false },
        { "name": "CODE", "type": "VARCHAR", "length": 3,        "nullable": false, "unique": true },
        { "name": "NAME", "type": "VARCHAR", "length": 200,      "nullable": false }
    ],
    "constraints": {
        "uniqueIndices": [
            { "name": "UX_COUNTRY_CODE", "columns": ["CODE"] }
        ]
    }
}
```

## Column fields

| Field | Notes |
| ----- | ----- |
| `name`       | Column name. |
| `type`       | SQL type. Use a dialect-agnostic form: `BIGINT`, `VARCHAR`, `DECIMAL`, `BOOLEAN`, `DATE`, `TIMESTAMP`, `BLOB`, `CLOB`. |
| `length`     | For `VARCHAR` / `CHAR`. |
| `precision`, `scale` | For `DECIMAL`. |
| `primaryKey` | Marks the primary key column. Multiple `primaryKey: true` -> composite key. |
| `identity`   | DB-generated identity. |
| `nullable`   | Defaults to `true`. |
| `defaultValue` | SQL default expression. |
| `unique`     | Shorthand for a single-column unique constraint. |

## Reconciliation

CREATE -> `CREATE TABLE`. UPDATE -> incremental `ALTER TABLE` for additive changes; destructive changes log a warning and are skipped. DELETE -> `DROP TABLE` (cascade off by default).

## Editor

The [Database Schema modeler](/help/ide/modelers/database-schema) emits `.table` files. The raw JSON is editable in [Monaco](/help/ide/editors/monaco).

## See also

- [Schema](/help/artefacts/data/schema)
- [View](/help/artefacts/data/view)
- [Working with data](/help/develop/working-with-data)
