---
title: URL patterns
description: Path semantics for controllers and routing.
---

# URL patterns

## Java controllers

```
/services/java/<project>/<class-path>/<route-suffix>
/public/java/<project>/<class-path>/<route-suffix>
```

- `<class-path>` is the controller's fully-qualified Java class name with `.` replaced by `/`. `com.acme.CountryController` -> `com/acme/CountryController`.
- `<route-suffix>` is the value of the method-level `@Get` / `@Post` / etc. annotation.

Routing rules:

- Longest base-path wins (nested-package controllers shadow their outer namespaces).
- Within a controller, the most specific suffix wins. Literal paths beat `{placeholder}` patterns.
- Path placeholders compile to named regex groups. `TypeCoercer` handles `String` / `int` / `long` / `UUID` / `enum` / `boolean` at bind time and surfaces parse failures as `400`.
- `@Body` deserializes via Spring's primary Jackson `ObjectMapper`.
- Return values: `void` -> write yourself; `String`/`CharSequence` -> `text/plain`; everything else -> Jackson JSON.

## TypeScript / JavaScript controllers

```
/services/ts/<project>/<file>.ts/<route-suffix>
/services/js/<project>/<file>.{js,mjs}/<route-suffix>
```

The `*Controller.ts` decorator pattern from `@aerokit/sdk/http/decorators` builds the equivalent routing table at module load.

## OpenAPI aggregation

```
GET /services/openapi
```

Merges every published OpenAPI fragment - TS controller fragments and Java controller fragments produced by `JavaControllerOpenApiPublisher` (location `java-controller://<project>::<fqn>`).

## OData

```
/odata/v2/<service-name>/<entity-set>(<key>)
/odata/v2/<service-name>/$metadata
```

Driven by `*.odata` artefacts (see [`/help/artefacts/services/odata`](/help/artefacts/services/odata)).

## WebSockets

```
/websockets/stomp/<endpoint>
```

The `<endpoint>` segment is the value of the `endpoint` attribute on `@Websocket(...)`, or the `endpoint` field of a `*.websocket` artefact.

## See also

- [HTTP endpoints](/help/reference/http-endpoints)
- [REST APIs (develop)](/help/develop/rest-apis)
