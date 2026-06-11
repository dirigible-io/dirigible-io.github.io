---
title: Backups and export
description: Export the platform repository as a ZIP; restore via import.
---

# Backups and export

Two layers to back up:

1. **The platform repository** - artefacts, user workspaces, system files.
2. **The data** - rows in the data sources backing the application.

## Exporting the repository

Use the platform's `IRepositoryExporter` to produce a ZIP of `/registry/public/...`, `/users/.../workspace/...`, and any other repository paths. Two ways:

- IDE: right-click a project / workspace in the [Projects view](/help/ide/views/projects) -> Export -> Download ZIP.
- REST: `GET /services/ide/transport/zip?path=/<path>` returns a ZIP stream.

The ZIP is restorable through the IDE's import flow or via the matching `POST /services/ide/transport/import` endpoint.

## Backing up the data

The platform itself does not snapshot the underlying database. Use the database's native backup tools:

- Postgres: `pg_dump` (logical) or filesystem-level snapshots.
- MSSQL: `BACKUP DATABASE`.
- HANA: HANA Backint / native backup.
- H2: copy the file under `<repo>/dirigible/h2/` while the JVM is stopped.

For multi-tenant deployments back up SystemDB and the per-tenant data sources independently.

## Disaster-recovery flow

1. Stop the runtime (or cordon ingress for zero-write).
2. Snapshot the database.
3. Export the repository ZIP.
4. Store both with the same timestamp - the repository state and the database state must be consistent.

A coupled restore replays both at the same timestamp.

## CI-driven export

A small scheduled job can produce ZIP snapshots:

```ts
import { Repository } from "@aerokit/sdk/platform";

const bytes = Repository.exportPath("/registry/public");
// store bytes wherever - S3, blob storage, etc.
```

## See also

- [Projects view](/help/ide/views/projects)
- [Data transfer](/help/operate/data-transfer)
