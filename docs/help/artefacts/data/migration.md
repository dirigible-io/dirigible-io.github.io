---
title: Migration artefact
description: Versioned SQL data migration applied once per tenant schema, recorded in the DIRIGIBLE_MIGRATIONS ledger. Synchronizer MigrationsSynchronizer.
---

# Migration - `*.migration`

A `*.migration` file is a **data migration**: SQL that changes existing rows once, after the structure it needs is in place. It covers the third kind of change a long-lived application ships, next to structure ([tables](/help/artefacts/data/table), [schemas](/help/artefacts/data/schema)) and reference data ([CSV import](/help/artefacts/data/csvim)): backfill a new column from existing rows, split a field, recompute a roll-up after a rule change, move rows between tables before a contract step.

Each migration is applied **exactly once per database** and recorded in a ledger table in that same database, in the same transaction as its statements. Synchronizer: `MigrationsSynchronizer` (`components/data/data-migrations`), available since Dirigible 15.0.

## File name

```
<project>/<any folder>/<version>__<description>.migration
```

| Part | Rule |
| ---- | ---- |
| `<version>` | One or more dot-separated numbers, optionally prefixed with `V`: `1`, `001`, `V2`, `V1.2`, `20261006`. Versions order **numerically** per segment, so `2` precedes `10` and `1` precedes `1.0`. |
| `__` | Two underscores separate the version from the description. |
| `<description>` | Letters, digits, `_`, `.` and `-`; starts with a letter or digit. Not interpreted. |

The file must live inside a project (any folder under it, `migrations/` by convention). Two files of one project may not claim the same version. Examples:

```
orders/migrations/V1__backfill_status.migration
orders/migrations/V2__split_customer_name.migration
```

## File format

Plain SQL, optionally headed by comment lines that declare how the migration applies:

```sql
-- tenant: each
-- idempotent: false
UPDATE "ORDERS" SET "STATUS" = 'OPEN' WHERE "STATUS" IS NULL;
UPDATE "ORDERS" SET "CLOSED_AT" = "UPDATED_AT" WHERE "STATUS" = 'CLOSED' AND "CLOSED_AT" IS NULL;
```

| Header | Values | Meaning |
| ------ | ------ | ------- |
| `-- tenant:` | `each` (default) | Applied once in **every tenant's schema**, through the tenant-routed default data source. |
|  | `system` | Applied once, on the **system database**. |
| `-- idempotent:` | `false` (default) | An edit of the file after it was applied **fails** the artefact. The migration is not re-run. |
|  | `true` | An edit of the file after it was applied **re-applies** it, and the ledger row is updated with the new checksum. Declare it only when running the statements again is safe. |

Headers are read from the comment lines **before the first statement**; a `--` comment after a statement is SQL, not a header. A header with an unknown value (`-- tenant: all`) is a parse error.

Statements are split on `;`, with comments and quoted literals handled. The whole file runs in **one transaction**: a failing statement rolls back the statements before it and records nothing, and the artefact is `FAILED` with the database's message.

::: warning SQL only
A migration is SQL. JavaScript or Java variants are not available. PostgreSQL dollar-quoted bodies (`$$ ... $$`) are not supported by the statement splitter.
:::

## When it runs

The synchronizer runs at `SynchronizersOrder.MIGRATION` (260): **after** every synchronizer that evolves structure (`.schema`, `.table`, `.view`, entities), so the columns a backfill needs exist, and **before** BPMN (300) and CSV import (400), so a seed lands on migrated data.

One exception: the tables of **brand-new client-Java entities** are created at the end of the synchronization pass, after every phase. A migration targeting such a table fails its first pass and heals on the retry of `FAILED` artefacts (`DIRIGIBLE_SYNCHRONIZER_FAILED_RETRY_INTERVAL_SECONDS`, default 30 s) once the generation is installed.

## The ledger

Every database a migration changes carries its own ledger table, `DIRIGIBLE_MIGRATIONS`: each tenant schema for `tenant: each`, the system database for `tenant: system`. It is created on first use.

| Column | Content |
| ------ | ------- |
| `MIGRATION_KEY` | `<project>/<version>`, the primary key. |
| `MIGRATION_PROJECT`, `MIGRATION_VERSION` | The project and the version from the file name. |
| `MIGRATION_LOCATION` | The registry-relative path of the file that was applied. |
| `MIGRATION_CHECKSUM` | SHA-256 of the content that was applied. Line-ending conversion is ignored, so a checkout that converts them is not an edit. |
| `MIGRATION_TENANT` | The tenant id, or `system`. |
| `MIGRATION_APPLIED_AT`, `MIGRATION_DURATION_MILLIS` | When it was applied, and how long it took. |

The ledger, not the artefact's lifecycle, decides whether a database has a migration. That is what makes every re-run safe:

- **A second boot** against a system database that already has the artefacts re-parses the files and finds every database done.
- **A new tenant** is provisioned: the platform applies every multitenant artefact to that tenant alone, which migrates the new tenant's schema and leaves the existing tenants' schemas as they are.
- **Two nodes** apply the same migration at the same time: the ledger's primary key lets only one record it, and the other node's transaction, statements included, rolls back.
- **A restored backup** carries the ledger that matches its data.

## Lifecycle and failure

| Situation | Result |
| --------- | ------ |
| Not yet in a database's ledger | Applied and recorded there. The artefact is `CREATED` once every database its scope names took it. |
| Recorded with the same checksum | Nothing runs. |
| Recorded, file edited afterwards, `idempotent: false` | `FAILED`, with a message naming the tenant, the date it was applied and both checksums. Restore the file to heal it, and ship the change as a new version. |
| Recorded, file edited afterwards, `idempotent: true` | Re-applied, ledger row updated. |
| A failing statement | Rolled back with its ledger row; `FAILED` with the database's message. Retried on the next pass and on the periodic retry of `FAILED` artefacts. |
| An earlier version of the same project has not applied yet | Waits in the same pass until the earlier one has completed; `FAILED` if the earlier one failed. |
| One tenant fails, the others succeed | `FAILED`. The tenants that succeeded keep their ledger rows and are skipped on the retry. |
| File deleted | The **artefact** is removed. Applied data changes and ledger rows stay: a migration that ran is history. |

A `FAILED` migration is a failed artefact like any other: it shows in the [Problems view](/help/ide/views/problems), it counts in the `artefacts` and `migrations` [health components](/help/operate/health-checks#health-components), and with `DIRIGIBLE_READINESS_REQUIRE_CLEAN_BOOT=true` it withholds readiness. While the first pass after boot is still applying migrations, readiness is held by the boot latch.

## Reading the ledger

`GET /services/core/migrations` (roles `ADMINISTRATOR` or `OPERATOR`) returns the ledger of the caller's tenant as a JSON array of rows (`project`, `version`, `location`, `checksum`, `tenant`, `appliedAt`, `durationMillis`). A caller in the default tenant also receives the system ledger. A deployment's smoke test can assert "version N shipped three migrations and all three are applied once":

```bash
curl -s -u admin:admin http://localhost:8080/services/core/migrations | jq '.[] | select(.project == "orders") | {version, tenant, appliedAt}'
```

## See also

- [Table](/help/artefacts/data/table)
- [CSV import model](/help/artefacts/data/csvim)
- [Synchronizer model](/help/concepts/synchronizer-model)
- [Health checks](/help/operate/health-checks)
- [Tenants](/help/operate/tenants)
