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

## Alternative: typed Java contributions

For typed contracts in Java there is no extension annotation. The **extension point is a plain Java interface**; a **contribution is a `@Component` bean that implements it** - the contribution's name is its `@Component` name. Consumers receive every contribution by type, either through collection injection (`List<MenuContribution>`) or via `Extensions.find(Class)`.

```java
import java.util.List;
import java.util.Map;

import org.eclipse.dirigible.sdk.component.Component;

// The contract: a plain interface, no annotation.
public interface MenuContribution {
    List<Map<String, Object>> getItems();
}

// The contribution: a @Component that implements the interface.
@Component("payments-menu")
public class PaymentsMenu implements MenuContribution {
    public List<Map<String, Object>> getItems() { /* ... */ }
}
```

A consumer receives all contributions by injecting a `List<MenuContribution>` (preferred) or by calling `Extensions.find(MenuContribution.class)`. The typed Java contributions and the string-keyed `*.extension` artefacts coexist - the `Extensions` facade exposes both lookup styles (see [`/sdk/extensions/extensions`](/sdk/extensions/extensions)).

## Editor

[Extensions editor](/help/ide/editors/extensions), or raw JSON in Monaco.

## See also

- [Extension point](/help/artefacts/extensibility/extensionpoint)
- [Extension providers (develop)](/help/develop/extension-providers)
- [`@aerokit/sdk/extensions`](/api/extensions/)
