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

Two discovery surfaces. The **typed** Java API (preferred for Java contracts):

```java
import org.eclipse.dirigible.sdk.extensions.Extensions;
import java.util.List;

List<ReportExporter> exporters = Extensions.find(ReportExporter.class);
for (ReportExporter e : exporters) {
    e.export(report);
}
```

The **string-keyed** API (for `.extension` artefacts shared across languages):

```ts
import { Extensions } from "@aerokit/sdk/extensions";

const modules = Extensions.getExtensions("reports.exporter");
for (const m of modules) {
    // m is the registry path of a contributing module
}
```

```java
import org.eclipse.dirigible.sdk.extensions.Extensions;

String[] modules = Extensions.getExtensions("reports.exporter");
```

## Contracts

For typed Java extension points the contract is the **interface** the contribution implements - a plain interface, no annotation. A contribution is a `@Component` bean that implements it; document expectations in the interface's Javadoc. Consumers receive typed instances by collection injection (`List<ReportExporter>`) or from `Extensions.find(Class)` and call contract methods directly.

For string-keyed extension points the point owner publishes the contract by convention (a README, an `*.extensionpoint` description, a `@Documentation` annotation). Common patterns:

- Export a default function with a known signature: `export default function exporter(input) { ... }`.
- Export a class with named methods: `export class Exporter { run(input) { ... } }`.

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
