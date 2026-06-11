---
title: JavaScript
description: ES6+ over GraalJS with a synchronous programming model, CommonJS and ESM.
---

# JavaScript

JavaScript user code runs in the JVM through `engine-javascript` (GraalJS via the Graalium runner). The execution model is **synchronous** - no event loop, no `await`, no Node-style `(err, result)` callbacks. A request thread enters the JS context, runs the module top-to-bottom, returns.

## File layout

Sources live under the project's registry path:

```
/registry/public/<project>/<file>.js
/registry/public/<project>/<file>.mjs
```

They are served at:

```
/services/js/<project>/<file>.{js,mjs}    # authenticated
/public/js/<project>/<file>.{js,mjs}      # anonymous variant
```

JS modules are **not** synchronized into a JPA artefact - `JavascriptEndpoint` loads them on demand on each request. Save the file, the next request sees the new version.

## Modules

Both formats are supported:

- **CommonJS** - `require(...)` / `module.exports = ...` - the historic default.
- **ESM** - `import ... from "..."` / `export ...` - use the `.mjs` extension or place an `import` at the top of a `.js`.

## Platform APIs

Import platform capabilities from `@aerokit/sdk/*`:

```js
import { rs } from "@aerokit/sdk/http/rs";
import { Database } from "@aerokit/sdk/db/database";
import { Logging } from "@aerokit/sdk/log/logging";
```

The legacy `@dirigible/*` aliases still resolve. See [the API reference](/api/) for the full module list.

## Hello, world

A 10-line REST endpoint using `@aerokit/sdk/http/rs`:

```js
import { rs } from "@aerokit/sdk/http/rs";

rs.service()
  .resource("hello")
    .get(function (ctx, request, response) {
      response.println("Hello, " + (request.getParameter("name") || "world"));
    })
  .execute();
```

Save as `/registry/public/demo/hello.js`. Hit `GET /services/js/demo/hello.js/hello?name=Dirigible`.

## See also

- [TypeScript](/help/develop/languages/typescript) - same model with types.
- [REST APIs](/help/develop/rest-apis) - the higher-level decorator approach.
- [The API reference](/api/) - every `@aerokit/sdk/*` module.
