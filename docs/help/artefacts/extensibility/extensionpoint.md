---
title: Extension point artefact
description: Declare a named hook other code can plug into. Synchronizer ExtensionPointsSynchronizer.
---

# Extension point - `*.extensionpoint`

Declares a named hook that other artefacts can contribute to. Synchronizer: `ExtensionPointsSynchronizer`. Discoverable at runtime via `@aerokit/sdk/extensions`.

## File format

```json
{
    "name":        "ide-menu",
    "description": "Top-bar IDE menu contributions"
}
```

## Fields

| Field         | Notes |
| ------------- | ----- |
| `name`        | The string used by contributors when they declare `extensionPoint: "<name>"` on a `*.extension`. Must be globally unique within the deployment. |
| `description` | Human-readable purpose statement. |

## Discovering contributions

At runtime, code asks the platform for every contribution registered against the point. String-keyed for `*.extension` artefacts:

```ts
import { Extensions } from "@aerokit/sdk/extensions";

const modules = Extensions.getExtensions("ide-menu");
for (const m of modules) {
    // m is the registry path of a contributing module
}
```

```java
import org.eclipse.dirigible.sdk.extensions.Extensions;

String[] modules = Extensions.getExtensions("ide-menu");
```

## Typed Java alternative

For Java, the preferred form is the annotation pair `@ExtensionPoint` (on the contract interface) + `@Extension(target = ContractInterface.class)` (on contributing classes). Consumers retrieve typed instances directly:

```java
@ExtensionPoint("Menu contributions")
public interface MenuContribution {
    List<Map<String, Object>> getItems();
}

@Extension(target = MenuContribution.class, name = "payments-menu")
public class PaymentsMenu implements MenuContribution { /* ... */ }

// Consumer:
List<MenuContribution> menus = Extensions.find(MenuContribution.class);
```

See [`/sdk/extensions/decorators`](/sdk/extensions/decorators) and [`/sdk/extensions/extensions`](/sdk/extensions/extensions).

## Editor

Authored either through the [Extensions editor](/help/ide/editors/extensions) or as raw JSON in [Monaco](/help/ide/editors/monaco).

## See also

- [Extension artefact](/help/artefacts/extensibility/extension)
- [Extension providers (develop)](/help/develop/extension-providers)
- [Extension points deep-dive](/help/extend/extension-points-deep-dive)
