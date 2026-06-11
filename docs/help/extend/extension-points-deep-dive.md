---
title: Extension points deep dive
description: How extension points and contributions work end-to-end.
---

# Extension points deep dive

The platform's first-class extension mechanism is the **extension point**. A point is a named hook; a contribution registers a module against that point; user code or the IDE asks for all contributions and acts on them.

## The artefacts

- `*.extensionpoint` - declares the point. See [`/help/artefacts/extensibility/extensionpoint`](/help/artefacts/extensibility/extensionpoint).
- `*.extension` - registers a contribution. See [`/help/artefacts/extensibility/extension`](/help/artefacts/extensibility/extension).

Both are reconciled by their synchronizers (`ExtensionPointsSynchronizer`, `ExtensionsSynchronizer`) into JPA tables.

## Discovery from user code

```ts
import { Extensions } from "@aerokit/sdk/extensions";

const contributions = Extensions.getExtensions("reports.exporter");
for (const c of contributions) {
    // c.module points at a JS / TS module; the contract decides what to call on it
}
```

```java
import org.eclipse.dirigible.sdk.extensions.Extensions;

String json = Extensions.getExtensions("reports.exporter");
// parse json -> array of { extensionPoint, module, description }
```

## Contracts

The extension point's name does not prescribe a contract - the point owner does. Document the expected exports somewhere reachable (a README in the project, an `*.extensionpoint` description, a `@Documentation` annotation). Common patterns:

- Export a default function with a known signature: `export default function exporter(input) { ... }`.
- Export a class with named methods: `export class Exporter { run(input) { ... } }`.

For Java contributors the same idea applies with `@Extension`-annotated classes - the consumer reflects over them.

## Ordering

Contributions are unordered unless the contract specifies otherwise. If you need deterministic ordering, include an `order` field on the contribution's exports and have the consumer sort by it before invoking.

## Lifecycle and hot-reload

When a new contribution is published, it shows up in the next discovery call without restart. The platform does not cache the result of `getExtensions` aggressively.

## Built-in extension points

Common platform-owned extension points worth knowing about:

- `platform-perspectives` - register a perspective.
- `platform-editors` - register a per-artefact editor.
- `platform-views` - register a view.
- `ide-menu` - contribute to the global IDE menu bar.

## See also

- [Extension point artefact](/help/artefacts/extensibility/extensionpoint)
- [Extension artefact](/help/artefacts/extensibility/extension)
- [Extension providers (develop)](/help/develop/extension-providers)
