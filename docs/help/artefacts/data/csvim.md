---
title: CSVIM artefact
description: Bulk CSV import model. Synchronizer CsvimSynchronizer.
---

# CSV import model - `*.csvim` + `*.csv`

The `*.csvim` file is the **import model**: it lists CSV files to load, the target table for each, column mappings, and transformations. The matching `*.csv` files hold the data. Synchronizer: `CsvimSynchronizer` (`components/data/data-csvim`).

## File format

```json
{
    "files": [
        {
            "name": "COUNTRY",
            "table": "COUNTRY",
            "schema": "PUBLIC",
            "file": "data/COUNTRY.csv",
            "header": true,
            "delimField": ",",
            "delimEnclosing": "\"",
            "distinguishEmptyFromNull": false,
            "keys": [
                { "column": "ID", "values": [] }
            ],
            "version": "1.0.0"
        }
    ]
}
```

## Fields

| Field | Notes |
| ----- | ----- |
| `name`             | Logical entry name. |
| `table`            | Target table. |
| `schema`           | Target schema (optional, dialect-dependent). |
| `file`             | Path to the CSV, relative to the project root. |
| `header`           | `true` if the first CSV row is the column list. |
| `delimField`       | Field delimiter. |
| `delimEnclosing`   | Field-quote character. |
| `distinguishEmptyFromNull` | `true` -> empty string stays empty; `false` -> empty -> `NULL`. |
| `keys`             | Composite primary key spec for idempotent re-imports. |
| `version`          | Caller-managed version label. |

## Reconciliation

On CREATE / UPDATE the synchronizer loads each referenced CSV into the target table. Re-imports use `keys` to decide insert vs update. DELETE removes the imported rows when the artefact is deleted.

## Editor

CSVIM has a dedicated editor in the IDE - see [`/help/ide/editors/csv-and-csvim`](/help/ide/editors/csv-and-csvim).

## Tenant isolation

CSV imports land in the **tenant-isolated** data source. Multi-tenant deployments get one materialised copy of the data per tenant.

## See also

- [Table](/help/artefacts/data/table)
- [Schema](/help/artefacts/data/schema)
- [Data transfer](/help/operate/data-transfer)
