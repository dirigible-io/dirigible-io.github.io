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

## Alternative: typed `@Extension` annotation (Java)

For typed contracts in Java, prefer the annotation pair `@ExtensionPoint` (on the contract interface) + `@Extension(target = ContractInterface.class, name = "...")` (on the contributing class). The runtime validates that the contributing class implements the contract, and consumers receive typed instances via `Extensions.find(Class)` - no string-keyed lookup.

```java
import org.eclipse.dirigible.sdk.extensions.Extension;
import org.eclipse.dirigible.sdk.extensions.ExtensionPoint;

@ExtensionPoint("Menu contributions")
public interface MenuContribution {
    List<Map<String, Object>> getItems();
}

@Extension(target = MenuContribution.class, name = "payments-menu")
public class PaymentsMenu implements MenuContribution {
    public List<Map<String, Object>> getItems() { /* ... */ }
}
```

The typed Java annotations and the string-keyed `*.extension` artefacts coexist - the `Extensions` facade exposes both lookup styles (see [`/sdk/extensions/extensions`](/sdk/extensions/extensions)).

## Editor

[Extensions editor](/help/ide/editors/extensions), or raw JSON in Monaco.

## See also

- [Extension point](/help/artefacts/extensibility/extensionpoint)
- [Extension providers (develop)](/help/develop/extension-providers)
- [`@aerokit/sdk/extensions`](/api/extensions/)
