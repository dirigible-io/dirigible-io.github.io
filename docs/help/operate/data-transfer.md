---
title: Data transfer
description: Move schema and data between registered data sources.
---

# Data transfer

The `data-transfer` component copies schema and data between any two data sources Dirigible knows about. Run from the IDE's [Transfer view](/help/ide/views/transfer) or driven programmatically.

## When to use it

- Migrating an evaluation H2 deployment onto Postgres / MSSQL.
- Cloning a tenant from one cluster to another.
- Seeding a fresh data source from a reference one.

## From the IDE

1. Open the [Transfer view](/help/ide/views/transfer).
2. Pick source data source, target data source, source schema, target schema.
3. Optionally select a subset of tables.
4. Start. Progress, row counts, and any errors stream into the view.

The transfer is **incremental on table-list** - already-transferred tables are skipped on retry unless explicitly re-selected.

## Schema vs data

The transfer first creates the target schema (DDL emission via the target's `ISqlDialect`) and then copies row data via JDBC. Constraints are added after data load to minimise insertion order issues.

## Hooks

For programmatic transfers, plug in `DataTransferCallbackHandler` to observe per-table progress (`onTableStart`, `onRowsTransferred`, `onTableFinish`, `onError`). Useful for CI-driven migration jobs that need their own progress reporting.

## Limits

- Cross-RDBMS type coercion is conservative - JDBC's `getObject` is used to keep portability. Custom column types (`json`, `geometry`) may need manual remediation post-transfer.
- For Mongo-backed data sources, transfer treats collections as tables; nested documents become opaque values. Use the Mongo SDK directly for high-fidelity migrations.

## See also

- [Transfer view](/help/ide/views/transfer)
- [Working with data](/help/develop/working-with-data)
- [Data anonymisation](/help/operate/data-anonymization)
