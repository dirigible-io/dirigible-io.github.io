---
title: Dependencies
description: Per-artifact state of the runtime Maven dependency layer.
---

# Dependencies

Renders the per-artifact report of `GET /services/core/dependencies` - every declared and resolved Maven dependency with its accurate status. Part of the Operations perspective, next to Artefacts.

## Columns

- **Coordinate** - `groupId:artifactId:version`.
- **Scope** - `module` (swappable classloader) or `platform` (system classloader).
- **Declared by** - the registry projects declaring the coordinate; `-` for transitives.
- **Status** - `active`, `mediated`, `shadowed`, `pending-restart`, `failed` or `frozen-mismatch` (see [How dependency versions are decided](/help/concepts/dependency-resolution)).
- **Details** - what happened, e.g. `requested: 2.8.9, provided: 2.13.2` on a shadowed declaration or `Via org.apache.poi:poi:5.4.0` on a transitive.

The header shows the mode (`DYNAMIC` or `FROZEN`), the installed classloader generation and the last resolution time; the footer shows the lockfile, local-repository and resolved-modules paths.

## Toolbar

- **Refresh** - re-read the state.
- **Resolve** - run the union resolution now (`POST /services/core/dependencies/resolve`). Requires the `ADMINISTRATOR` or `OPERATOR` role.
- **Add Dependency...** - a minimal dialog that validates the coordinate (exact versions only) and writes the `maven` entry into a selected workspace project's `project.json`. The descriptor stays the API - publish the project to activate the declaration.

## See also

- [Maven dependencies](/help/develop/maven-dependencies) - declaring and configuring.
- [How dependency versions are decided](/help/concepts/dependency-resolution) - mediation, shadowing, lockfile, frozen mode.
