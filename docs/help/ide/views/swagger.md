---
title: Swagger
description: Interactive OpenAPI explorer for the aggregated platform document.
---

# Swagger

Interactive OpenAPI explorer. Loads the aggregated document from `/services/openapi` and renders Swagger UI. Try-it-out calls hit the running JVM.

The aggregate includes:

- TypeScript `*Controller.ts` fragments (engine-openapi).
- Java `@Controller` fragments published by `JavaControllerOpenApiPublisher` at `java-controller://<project>::<fqn>`.
- Classic JAX-RS endpoints registered through the platform.

## Refreshing

The view re-fetches `/services/openapi` on open and on explicit reload. After publishing a new controller (TS or Java), reload the view to see the new path group.

If a controller you just published is missing:

- Confirm the project published (Registry view).
- For Java controllers, check that `JavaSynchronizer` completed without compilation errors (Problems view, server log).
- For TS controllers, confirm the `*Controller.ts` file ran through the synchronizer.

## Authentication

Try-it-out uses the same session as the IDE. Anonymous mode is honoured. `@Roles` checks are enforced server-side - a 403 from try-it-out means the current user lacks the role, not that the route is broken.

## Related

- [REST in Java](/help/tutorials/rest-with-java-controllers)
- [REST in TypeScript](/help/tutorials/rest-with-typescript-decorators)
- HTTP roots: `/swagger-ui/index.html`, `/api-docs`
- API: [`@aerokit/sdk/http`](/api/http)
