---
title: Extension providers
description: Declare extension points and contribute providers to them.
---

# Extension providers

The extensions mechanism lets one piece of code declare a pluggable point and any other piece of code contribute a provider. It is the canonical way the platform itself surfaces menu entries, perspectives, and views - and it is open to user projects.

## Two artefact kinds, plus an annotation

- `*.extensionpoint` - JSON descriptor declaring a named point.
- `*.extension` - JSON descriptor registering a contribution to a point, pointing at a JS/TS/Java module.
- `@Extension(name=..., to="point-name")` - annotation form on a class.

## Declaring a point

```json
{
  "name": "my-app-menu-items",
  "description": "Items shown under the My App menu"
}
```

Save as `my-app-menu-items.extensionpoint`.

## Contributing a provider

### `.extension` file

```json
{
  "extensionPoint": "my-app-menu-items",
  "module": "demo/extensions/customer-menu"
}
```

### Annotation

**Java:**

```java
import org.eclipse.dirigible.sdk.extensions.Extension;

@Extension(name = "customer-menu", to = "my-app-menu-items")
public class CustomerMenu {

    public Object provide() {
        return Map.of("label", "Customers", "href", "/customers");
    }
}
```

**TypeScript:**

```ts
import { Extension } from "@aerokit/sdk/extensions";

@Extension({ name: "customer-menu", to: "my-app-menu-items" })
export class CustomerMenu {

  public provide() {
    return { label: "Customers", href: "/customers" };
  }
}
```

## Consuming providers at runtime

Use `@aerokit/sdk/extensions` to discover every contribution to a point:

```ts
import { extensions } from "@aerokit/sdk/extensions";

const items = extensions.getExtensions("my-app-menu-items");
for (const e of items) {
  // e is the resolved provider instance
}
```

## When to use this

- IDE chrome - pluggable menu items, perspectives, views.
- Cross-project workflows - one project owns a flow, others contribute steps.
- Anywhere "find every provider of X" is the natural shape.

For typed wiring within a single project, prefer [dependency injection](/help/develop/dependency-injection) instead.

## See also

- [TypeScript API - extensions](/api/).
- [Java SDK - extensions](/sdk/).
