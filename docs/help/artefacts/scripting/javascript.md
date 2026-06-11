---
title: JavaScript
description: ".js / .mjs modules executed by engine-javascript over GraalJS."
---

# JavaScript

`*.js` and `*.mjs` source files are user-authored modules executed by the [`engine-javascript`](https://github.com/eclipse/dirigible/tree/master/components/engine/engine-javascript) component over the GraalJS / GraalVM polyglot runtime (Graalium). The model is synchronous (in contrast to Node.js); CommonJS and ESM are both accepted.

## Lifecycle

JavaScript modules are **not synchronized**. There is no `Artefact` entity for them and no synchronizer scans the registry for `*.js` files. They are read off the repository and evaluated on demand by `JavascriptEndpoint` whenever an inbound request hits the JS URL space.

The runner is `DirigibleJavascriptCodeRunner`, backed by Graalium. Each request runs in its own context; module caching and polyfill registration go through `JavascriptSourceProvider` / `JavascriptPolyfill`.

## URL surface

```
/services/js/<project>/<file>     # authenticated
/public/js/<project>/<file>       # anonymous (if enabled)
```

The file path after the project segment maps 1:1 to the on-disk path under `/registry/public/<project>/...`. Path placeholders, query parameters, and request bodies are read from the bound request via [`@aerokit/sdk/http`](/sdk/http/).

## Module imports

User code imports the platform SDK through the `@aerokit/sdk/*` root. Pre-built TS/JS bundles ship from `components/api/api-modules-javascript`; the GraalJS context bridges them onto the corresponding Java facades.

```js
import { response } from "@aerokit/sdk/http";
import { Query } from "@aerokit/sdk/db";

const rows = Query.execute("SELECT 1 AS one FROM DUAL");
response.println(JSON.stringify(rows));
```

The legacy `@dirigible/*` aliases still resolve. See [`/sdk/`](/sdk/) for the full module index.

## Editor

Authored in the IDE through the Monaco-based [`editor-monaco`](/help/ide/perspectives/workbench) editor. JS debugging is exposed on `DIRIGIBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT` (default `8081`).

## Notes

- No tenant-isolated reconciliation - execution is gated by the standard URL access rules ([`.access`](/help/artefacts/security/access) / [`.roles`](/help/artefacts/security/roles)).
- For declarative REST / entity / DI shapes from JS/TS, see [`*Controller.ts`](/help/develop/rest-apis), [`*Entity.ts`](/help/develop/entities-and-persistence), and [`*Component.ts`](/help/artefacts/extensibility/component).
