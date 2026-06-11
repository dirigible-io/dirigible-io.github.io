---
title: Expose
description: Publish project folders as static HTTP resources. expose file.
---

# Expose

The `expose` file at a project root lists folders to publish as static HTTP resources under `/services/web/<project>/...`.

- **File format.** JSON descriptor at `<project>/expose` (no extension).
- **Synchronizer.** `ExposesSynchronizer`.
- **Engine.** `engine-web`.
- **URL.** `/services/web/<project>/<folder>/...`.

## File format

```json
{
    "guid": "myproject",
    "exposes": [
        "ui",
        "assets",
        "public"
    ]
}
```

| Field | Purpose |
| --- | --- |
| `guid` | Project identifier. Matches the project folder name. |
| `exposes[]` | Folder names (relative to the project root) to publish. |

A file at `myproject/ui/index.html` is reachable at `/services/web/myproject/ui/index.html`. Folders not listed in `exposes[]` are not served.

## Authentication

The static-resources endpoint sits under `/services/**` and is therefore subject to Spring Security. Use [`*.access`](/help/artefacts/security/access) rules to relax / tighten access for individual paths under `/services/web/<project>/...`, or publish through `/public/web/<project>/...` for anonymous access.
