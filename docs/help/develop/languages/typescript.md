---
title: TypeScript
description: Strongly typed source, transpiled by the platform.
---

# TypeScript

::: warning Deprecated
Server-side JavaScript and TypeScript are deprecated and will be removed in 16.0. Write new back-end code in Java, and see [Migrating from TypeScript to Java](/help/develop/migrate-typescript-to-java) to move existing code. Browser-side JavaScript is not affected.
:::

TypeScript is the default authoring language for new Dirigible projects. `engine-typescript` transpiles published `.ts` files and serves them via the same JS endpoint machinery.

## File layout

```
/registry/public/tsconfig.json          # written by the platform
/registry/public/<project>/<file>.ts
```

A `tsc --watch` process over the registry transpiles every published `.ts` file to the `.js` the engine runs. The platform writes its `tsconfig.json` at the registry root whenever it starts the watcher. You do not run `tsc` yourself, but it must be on the `PATH` (`npm install -g typescript`; the Docker image ships it).

::: tip Java-only instances
The watcher starts only when the registry holds TypeScript sources: at startup, after a project is published, or within 30 seconds of sources arriving another way. An instance running only Java projects starts no Node process. Set `DIRIGIBLE_TSC_WATCH_SERVICE_ENABLED=false` to keep the watcher off even when TypeScript sources are present.
:::

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
