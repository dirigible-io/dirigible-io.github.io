---
title: TypeScript
description: ".ts modules transpiled and executed by engine-javascript / engine-typescript."
---

# TypeScript

`*.ts` source files are first-class user code. They share the GraalJS runtime with [JavaScript](/help/artefacts/scripting/javascript) - `engine-typescript` transpiles on demand and `engine-javascript` runs the result.

## Lifecycle

TypeScript modules are **not synchronized**. Like JS, they are loaded on demand by `JavascriptEndpoint` / `TypeScriptEndpoint` for each request, transpiled in-process, and evaluated in a fresh Graalium context.

## URL surface

```
/services/ts/<project>/<file>     # authenticated
/public/ts/<project>/<file>       # anonymous (if enabled)
```

## Project setup

Place a `tsconfig.json` at the project root for full strong typing and editor type-checking. The platform's JS/TS bundle for `@aerokit/sdk/*` ships with type declarations, so imports resolve in Monaco out of the box.

```ts
import { response } from "@aerokit/sdk/http";
import { Configurations } from "@aerokit/sdk/core";

const env = Configurations.get("DIRIGIBLE_INSTANCE_NAME", "local");
response.println(`hello from ${env}`);
```

## Declarative TS artefacts

A few TS files participate in *additional* synchronization machinery based on their name suffix:

- [`*Component.ts`](/help/artefacts/extensibility/component) - DI singleton registered by `engine-di` via `ComponentSynchronizer`.
- [`*Entity.ts`](/help/develop/entities-and-persistence) - Hibernate entity registered by `data-store` via `EntitySynchronizer`.
- [`*Controller.ts`](/help/develop/rest-apis) - REST controller picked up by `engine-openapi` via `OpenAPISynchronizer`.

Plain `*.ts` modules are not synchronized - only the suffixed shapes are.

## Editor

Monaco editor; Java debugging coexists in the same workspace via [`ide-java-debug`](/help/ide/perspectives/workbench) but TS uses the Graalium JS debugger.
