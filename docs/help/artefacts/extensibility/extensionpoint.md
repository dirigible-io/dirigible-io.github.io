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

For Java there is no extension annotation. The **extension point is a plain Java interface**; a **contribution is a `@Component` bean that implements it**. Consumers retrieve typed instances directly - by collection injection (preferred) or `Extensions.find(Class)`:

```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.extensions.Extensions;

// The contract: a plain interface, no annotation.
public interface MenuContribution {
    List<Map<String, Object>> getItems();
}

// The contribution: a @Component that implements the interface.
@Component("payments-menu")
public class PaymentsMenu implements MenuContribution { /* ... */ }

// Consumer - collection injection (preferred): inject a List<MenuContribution>
// into a @Controller / @Component constructor, or look them up programmatically:
List<MenuContribution> menus = Extensions.find(MenuContribution.class);
```

See [`/sdk/extensions/extensions`](/sdk/extensions/extensions) and [Extension providers](/help/develop/extension-providers).

## Editor

Authored either through the [Extensions editor](/help/ide/editors/extensions) or as raw JSON in [Monaco](/help/ide/editors/monaco).

## See also

- [Extension artefact](/help/artefacts/extensibility/extension)
- [Extension providers (develop)](/help/develop/extension-providers)
- [Extension points deep-dive](/help/extend/extension-points-deep-dive)
