---
title: Repository and workspace
description: The on-disk Dirigible repository has two canonical roots - one for published artefacts the runtime reconciles, one for in-IDE drafts.
---

# Repository and workspace

Dirigible stores all user content in a single on-disk **repository** (also called the "registry" in older docs). The repository has two canonical roots: one for artefacts the runtime reconciles, and one for IDE workspaces where users edit.

## Canonical layout

```
/registry/public/<project>/...          # published artefacts (reconciled)
/users/<user>/workspace/<project>/...   # IDE workspaces (drafts)
```

Both roots are defined in `IRepositoryStructure` (`modules/repository/repository-api/`). Synchronizers scan only `/registry/public/...`; user edits in `/users/.../workspace/...` are invisible to the runtime until [published](/help/concepts/publish-and-reconcile).

## Storage backend

The default backend is the local filesystem, rooted at `./target/` (override via `DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER`). Other backends are pluggable via `IRepository` implementations in `modules/repository/`:

- `repository-local` - filesystem (default)
- `repository-master` - read-only mirror of an upstream repository
- `repository-cache` - optional caching layer
- `repository-search` - Lucene-backed search
- `repository-zip` - import / export as zip

All of them expose the same `IRepository` / `ICollection` / `IResource` API, so user code reaches them uniformly through [`@aerokit/sdk/platform/repository-client`](/api/platform).

## How a path resolves

A file authored at `MyProject/api/hello.ts` ends up at:

- **In the IDE workspace:** `/users/admin/workspace/MyProject/api/hello.ts`
- **After publishing:** `/registry/public/MyProject/api/hello.ts`
- **Served at:** `/services/ts/MyProject/api/hello.ts`

Publishing copies the file from the workspace to the registry; the synchronizer cycle then reconciles whatever it finds under `/registry/public/...` into runtime state.

## Multi-tenancy

With `DIRIGIBLE_MULTI_TENANT_MODE=true` (the default), tenant-scoped artefacts are reconciled per tenant - see [Multi-tenancy](/help/concepts/multi-tenancy). The repository layout itself is shared (one `/registry/public/...` tree), but the synchronizer infrastructure walks artefacts on behalf of each tenant.

## Programmatic access

From client code:

- JS / TS: [`@aerokit/sdk/platform/repository-client`](/api/platform), [`@aerokit/sdk/platform/workspace-client`](/api/platform).
- Java: `Beans.get(IRepository.class)` (`org.eclipse.dirigible.sdk.component.Beans`) then `repository.getResource(path)` / `getCollection(path)` / `createResource(...)`.

In HTTP-only integration tests, write fixture files directly via `IRepository.createResource(...)` and then call `SynchronizationProcessor.forceProcessSynchronizers()` to trigger reconciliation synchronously.

## Reference

- `IRepository` / `IRepositoryStructure` - `modules/repository/repository-api/`
- `WorkspaceEndpoint`, `TransportEndpoint`, `PublisherEndpoint` - `components/ide/ide-workspace/`
