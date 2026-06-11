---
title: CSV and CSVIM Editors
description: Grid editor for raw CSV files and JSON-model editor for bulk CSV-to-table imports.
---

# CSV and CSVIM Editors

Two complementary editors. The CSV editor manipulates `*.csv` files as a grid. The CSVIM editor manipulates `*.csvim` files, which are JSON import models that drive bulk CSV-to-database imports via the `CsvimSynchronizer`.

Components: `editor-csv`, `editor-csvim`.

## CSV editor (`*.csv`)

Grid editor backed by AG Grid.

- **Headers** - the first row is treated as a header by default. Toggle via the kebab menu (**Disable Header** / **Enable Header**).
- **Columns** - right-click the column band to **Add Column**, **Edit Column**, or **Delete Column**. Column type can be set per column (string / number / boolean / date).
- **Rows** - right-click any cell to **Add Row Before / After** or **Delete Row(s)**. Multi-select via `Shift + click` or `Cmd`/`Ctrl + click`; drag the row handle to reorder.
- **Filtering** - per-column filters: *Contains*, *Not Contains*, *Equals*, *Not Equal*, *Starts With*, *Ends With*.
- **Delimiter and quote** - configured per file in the kebab menu. Supported delimiters: `,`, `\t`, `|`, `;`, `#`. Supported quote characters: `'`, `"`, `` ` ``.
- **Export** - downloads the current view as CSV.

## CSVIM editor (`*.csvim`)

A `*.csvim` file is a JSON document - an array of file-to-table import descriptors.

```json
{
    "files": [
        {
            "table": "CUSTOMERS",
            "schema": "SALES",
            "file": "/sales-data/customers.csv",
            "header": true,
            "useHeaderNames": true,
            "delimField": ",",
            "delimEnclosing": "\"",
            "distinguishEmptyFromNull": true,
            "upsert": true
        }
    ]
}
```

The editor exposes each field as a form input.

| Field | Required | Notes |
| --- | --- | --- |
| `table` | yes | Target table. Letters, digits, `-`, `.`, `_`, `$`. |
| `schema` | yes | Target schema. Same character set as `table`. |
| `file` | yes | Repository path to the `*.csv` source, e.g. `/workspace/csv/data.csv`. |
| `header` | no | If true, the first CSV row is treated as a header. |
| `useHeaderNames` | no | Match CSV header names to table columns. Requires `header: true`. |
| `delimField` | no | Field delimiter. One of `,`, `\t`, `|`, `;`, `#`. |
| `delimEnclosing` | no | Quote character. One of `'`, `"`, `` ` ``. |
| `distinguishEmptyFromNull` | no | If true, quoted empty strings are imported as empty; unquoted empties become `null`. |
| `upsert` | no | If true, existing rows matched by primary key are updated; otherwise rows are inserted. |
| `version` | no | Free-form version string for change tracking. |

## Synchronizer

`CsvimSynchronizer` reconciles `*.csvim` artefacts. On change, it loads the referenced `*.csv` files and runs the import against the configured data source. See [artefacts](/help/artefacts/data/) for the full data-artefact set.
