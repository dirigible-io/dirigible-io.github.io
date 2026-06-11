---
title: View artefact
description: Database view DDL declared as JSON. Synchronizer ViewsSynchronizer.
---

# View - `*.view`

Declarative DDL for a database view. Synchronizer: `ViewsSynchronizer`. Same dialect-aware emission as [`*.table`](/help/artefacts/data/table).

## File format

```json
{
    "name": "ACTIVE_CUSTOMER",
    "type": "VIEW",
    "query": "SELECT ID, NAME FROM CUSTOMER WHERE ACTIVE = TRUE"
}
```

## Fields

| Field   | Notes |
| ------- | ----- |
| `name`  | View name. |
| `type`  | Always `"VIEW"`. |
| `query` | SQL `SELECT` body. Keep it dialect-portable - the platform supports H2, Postgres, MSSQL, MariaDB, MySQL, HANA, Snowflake. |

## Reconciliation

CREATE -> `CREATE VIEW`. UPDATE -> `DROP VIEW` + `CREATE VIEW` (views are not patched in place). DELETE -> `DROP VIEW`.

## Editor

Authored either through the [Database Schema modeler](/help/ide/modelers/database-schema) or as raw JSON in [Monaco](/help/ide/editors/monaco). For ad-hoc DDL experimentation use the SQL view in the [Database perspective](/help/ide/perspectives/database).

## See also

- [Table](/help/artefacts/data/table)
- [Schema](/help/artefacts/data/schema)
