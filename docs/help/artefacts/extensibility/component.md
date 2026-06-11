---
title: Component artefact
description: TypeScript dependency-injected components - the *Component.ts convention.
---

# Component - `*Component.ts`

A file naming convention rather than a JSON descriptor. Any TypeScript file whose name ends in `Component.ts` is treated as a dependency-injected component by `engine-di`. Used by other TypeScript code through `@aerokit/sdk/component`.

## File pattern

```ts
import { Component } from "@aerokit/sdk/component";

@Component("CountryComponent")
export class CountryComponent {
    public list() {
        return ["US", "DE", "BG"];
    }
}
```

The decorator argument is the **bean name** used for lookup. The component class is singleton-scoped.

## Looking up components

```ts
import { lookup } from "@aerokit/sdk/component";

const countries = lookup("CountryComponent");
countries.list();
```

Inside another component the canonical pattern is field injection via `@Inject`:

```ts
import { Component, Inject } from "@aerokit/sdk/component";

@Component("OrderController")
export class OrderController {

    @Inject("CountryComponent")
    private readonly countries!: CountryComponent;
}
```

## Java equivalent

The Java counterpart is `@Repository` + `@Inject`, processed by `engine-java` and `data-store-java`. See [`/help/develop/dependency-injection`](/help/develop/dependency-injection).

## See also

- [`@aerokit/sdk/component`](/api/component/)
- [Dependency injection (develop)](/help/develop/dependency-injection)
- [Extensibility (concepts)](/help/concepts/extensibility)
