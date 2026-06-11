---
title: Registry
description: Tree browser for the published-artefacts side of the repository.
---

# Registry

Tree browser for `/registry/public/...` - the published side of the repository, the same tree the synchronizers reconcile from. Read-only.

Use it to verify a publish landed where you expected: project name, file path, content.

## Layout

```
/registry/public/
  <project>/
    <artefacts...>
```

Every project published from a workspace is rooted directly under `/registry/public/`. Subfolders mirror the project source tree.

## What you can do

- Expand folders, click a resource to view raw content (binary resources show metadata only).
- Copy a resource path for use in URLs (`/services/js/<project>/<file>`, `/services/java/<project>/<class>`, etc).
- Download a resource.

Writes (create / rename / delete) are not exposed here - use a workspace and publish. To inspect non-registry content (workspaces, system files), use the [Repository view](/help/ide/views/repository).

## Related

- [Publishing](/help/concepts/publish-and-reconcile)
- [Repository view](/help/ide/views/repository)
- API: [`@aerokit/sdk/platform/registry`](/api/platform/registry)
