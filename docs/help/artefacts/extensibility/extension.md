---
title: Extension artefact
description: Register a contribution to a named extension point. Synchronizer ExtensionsSynchronizer.
---

# Extension - `*.extension`

Registers a single contribution to a named extension point. Synchronizer: `ExtensionsSynchronizer`. Listed by `@aerokit/sdk/extensions.getExtensions(point)`.

## File format

```json
{
    "extensionPoint": "ide-menu",
    "module":         "myproject/ide-menu/payments-menu",
    "description":    "Adds the Payments dropdown to the IDE menu bar"
}
```

## Fields

| Field             | Notes |
| ----------------- | ----- |
| `extensionPoint`  | Name of the matching `*.extensionpoint`. |
| `module`          | Path to the implementation script (`.ts`, `.js`, or `.mjs`), relative to `/registry/public/`. The contracting point decides what the module must export. |
| `description`     | Optional. |

## Alternative: `@Extension` annotation (Java)

A Java class can declare the contribution inline:

```java
import org.eclipse.dirigible.sdk.extensions.Extension;

@Extension(name = "payments-menu", to = "ide-menu")
public class PaymentsMenu {
    public List<Map<String, Object>> getItems() { /* ... */ }
}
```

The platform stores an equivalent `Extension` record at class-load time, so the contribution is discovered the same way as a `*.extension` artefact.

## Editor

[Extensions editor](/help/ide/editors/extensions), or raw JSON in Monaco.

## See also

- [Extension point](/help/artefacts/extensibility/extensionpoint)
- [Extension providers (develop)](/help/develop/extension-providers)
- [`@aerokit/sdk/extensions`](/api/extensions/)
