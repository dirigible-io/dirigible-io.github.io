---
title: Repository
description: Tree browser for the full platform repository.
---

# Repository

Tree browser for the entire platform repository - registry plus workspaces plus system files. Read-only.

The repository is the storage layer behind `IRepository` (`modules/repository/`). Default backing is the local filesystem under `./target/dirigible/repository/`.

## Layout

```
/registry/public/         # published artefacts (reconciled by synchronizers)
/users/<user>/workspace/  # IDE workspaces (drafts, per user)
/system/                  # platform-managed content (configs, indexes, caches)
```

## What you see

- Collections (folders) and resources (files) under every root.
- Resource content (raw view, binary metadata for non-text).
- Path-copy for any node.

## Why use it over the Registry view

- The [Registry view](/help/ide/views/registry) shows only `/registry/public/`.
- Repository shows everything, including workspace drafts and platform internals. Useful when chasing "where did this file actually land", confirming workspace state, or inspecting cached indexes.

## Related

- [Registry view](/help/ide/views/registry)
- API: [`@aerokit/sdk/platform/repository-client`](/api/platform/repository)
- [`IRepository` SPI](/help/extend/custom-synchronizer)
