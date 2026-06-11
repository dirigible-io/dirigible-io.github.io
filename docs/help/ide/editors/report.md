---
title: Report Editor
description: Report templates - bind a data-source query to a visual layout.
---

# Report Editor

Editor for report templates. Binds a data-source query (the data spine) to a visual layout (header, columns, grouping, totals). The runtime renders the output on demand against the live data source.

Component: `editor-report`.

## What it does

- **Data source** - pick a registered data source and write a SQL query (or reference a `*.view`). The query result columns become the available fields.
- **Layout** - drag fields onto bands (page header, group header, detail, group footer, page footer). Configure column widths, alignment, formatting, and aggregates (`sum`, `avg`, `count`, `min`, `max`).
- **Parameters** - declare named parameters that surface as prompts at render time and bind into the query (e.g. `WHERE region = :region`).
- **Save** - the editor persists the template (layout plus query metadata plus parameter declarations).

## Rendering

At runtime, the platform's rendering engine executes the bound query and applies the layout. The default output is HTML; other formats are template-specific.

## See also

- [Data source artefact](/help/artefacts/data/datasource)
- [Database perspective](/help/ide/perspectives/database)
