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
| `name`        | The string used by contributors when they declare `to: "<name>"` on a `*.extension`. Must be globally unique within the deployment. |
| `description` | Human-readable purpose statement. |

## Discovering contributions

At runtime, code asks the platform for every contribution registered against a given point:

```ts
import { Extensions } from "@aerokit/sdk/extensions";

const contributions = Extensions.getExtensions("ide-menu");
for (const c of contributions) {
    // c.location is the registry path; load and invoke as appropriate
}
```

```java
import org.eclipse.dirigible.sdk.extensions.Extensions;

String json = Extensions.getExtensions("ide-menu");
// parse json - each entry has location + module path
```

## Editor

Authored either through the [Extensions editor](/help/ide/editors/extensions) or as raw JSON in [Monaco](/help/ide/editors/monaco).

## See also

- [Extension artefact](/help/artefacts/extensibility/extension)
- [Extension providers (develop)](/help/develop/extension-providers)
- [Extension points deep-dive](/help/extend/extension-points-deep-dive)
