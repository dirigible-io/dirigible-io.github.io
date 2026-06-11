---
title: Extensions
description: Read-only inspector for discovered extension points and their registered contributions.
---

# Extensions

Lists every discovered extension point and the contributions registered against it. Useful for diagnosing "my extension didn't fire" - if the contributing artefact isn't here, it never reached the registry.

The view is read-only. Authoring is done through `*.extensionpoint` and `*.extension` artefacts under `/registry/public/<project>/...`.

## Backing data

- Artefact tables `DIRIGIBLE_EXTENSION_POINT` and `DIRIGIBLE_EXTENSION`, populated by `ExtensionPointsSynchronizer` and `ExtensionsSynchronizer`.
- Source descriptors live in the project source tree as `*.extensionpoint` and `*.extension` files.

## What you see

For each extension point:

- Extension point name and location (path of the `.extensionpoint` descriptor).
- Description.
- The list of contributing `.extension` records: module path, description, ordering.

A point with zero contributions is still listed - the row collapses to a header.

## Common diagnosis

- Contribution missing: confirm the `.extension` lives under `/registry/public/...`, that the project published successfully, and that `SynchronizationProcessor` ran (see [Synchronization](/help/concepts/synchronizer-model)).
- Wrong target: the `extensionPoint` field in the `.extension` must match the registered name exactly.
- Stale entry: republish the project; the synchronizer removes orphaned rows on the next pass.

## Related

- [Extension artefacts](/help/develop/extension-providers)
- API: [`@aerokit/sdk/extensions`](/api/extensions)
- [Repository view](/help/ide/views/repository)
