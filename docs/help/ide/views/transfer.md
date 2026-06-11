---
title: Transfer
description: Status view for in-progress and recent data transfers between data sources.
---

# Transfer

Lists in-progress and recently completed data transfers between configured data sources. Read-only. Driven by the `data-transfer` module.

Use it to monitor a running transfer (row counts, current table) and to confirm a completed run.

## Columns

- **Id** - transfer identifier.
- **Source** - originating datasource name.
- **Target** - destination datasource name.
- **Tables** - table list (or pattern) being transferred.
- **Rows** - rows copied so far / total when known.
- **State** - `RUNNING`, `COMPLETED`, `FAILED`, `CANCELLED`.
- **Started** / **Finished** - timestamps.

## Lifecycle

- Transfers are initiated from the [Data Transfer page](/help/operate/data-transfer) (or programmatically via the data-transfer REST endpoint).
- Each transfer registers callbacks on a `DataTransferCallbackHandler`; this view subscribes and renders progress.
- Completed transfers stay in the list until the JVM restarts (no persistence).

## Related

- [Data Transfer (operations)](/help/operate/data-transfer)
- SPI: `DataTransferCallbackHandler`
- [Database perspective](/help/ide/perspectives/database)
