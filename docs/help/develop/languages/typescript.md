---
title: TypeScript
description: Strongly typed source, transpiled on save by the platform.
---

# TypeScript

TypeScript is the default authoring language for new Dirigible projects. `engine-typescript` transpiles `.ts` files on save and serves them via the same JS endpoint machinery.

## File layout

```
/registry/public/<project>/tsconfig.json
/registry/public/<project>/<file>.ts
```

A `tsconfig.json` at the project root drives compilation. The platform reads it; you do not run `tsc` yourself.

Served at:

```
/services/ts/<project>/<file>.ts   # authenticated
/public/ts/<project>/<file>.ts     # anonymous variant
```

## Platform APIs

All `@aerokit/sdk/*` modules ship with full `.d.ts` definitions, so the IDE's TypeScript language server gives completion, signature help, and inline diagnostics against them out of the box.

```ts
import { Controller, Get } from "@aerokit/sdk/http/decorators";
```

## Hello, world

A REST endpoint via the decorators surface:

```ts
import { Controller, Get } from "@aerokit/sdk/http/decorators";

@Controller
class HelloController {

  @Get("/hello")
  public hello(): string {
    return "Hello, world";
  }
}
```

Save as `/registry/public/demo/HelloController.ts`. The `*Controller.ts` synchronizer registers the route - reach it at `/services/ts/demo/HelloController.ts/hello`.

## See also

- [Get started with the API](/api/get-started) - end-to-end TS example with entity, repository, and controller.
- [The decorator / annotation model](/help/develop/decorators-model).
- [REST APIs](/help/develop/rest-apis).
- [Entities and persistence](/help/develop/entities-and-persistence).
