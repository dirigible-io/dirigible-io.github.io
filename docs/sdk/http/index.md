# http/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.http`
- source: [http/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http)
:::

This module provides the HTTP surface of the Eclipse Dirigible Java SDK. It bundles together the synchronous outbound HTTP client used to call third-party APIs, the per-request helpers (`Request`, `Response`, `Session`, `Upload`) that read and write the inbound HTTP exchange bound to the current thread, and the annotation set used to declare REST endpoints on plain Java classes.

The annotations (`@Controller`, `@Get`, `@Post`, `@Put`, `@Patch`, `@Delete`, `@Body`, `@PathParam`, `@QueryParam`, `@Context`) follow the familiar JAX-RS / Spring-Web shape so existing knowledge transfers, but the runtime is owned by Dirigible - controller classes are discovered and dispatched by the platform's `JavaEndpoint` and method return values are serialized to JSON by Jackson automatically.

The main components of this module are:

- [`HttpClient`](./client.md) - synchronous outbound HTTP client (GET, POST, PUT, PATCH, DELETE, HEAD) for calling third-party APIs.
- [`HttpUtils`](./utils.md) - small content-type and query-string helpers.
- [`Request`](./request.md) - reads the inbound HTTP request bound to the calling thread.
- [`Response`](./response.md) - writes the outbound HTTP response bound to the calling thread.
- [`Session`](./session.md) - reads and writes the HTTP session attached to the current request.
- [`Upload`](./upload.md) - parses `multipart/form-data` bodies for file uploads.
- [Decorators](./decorators.md) - annotation set used to declare REST controllers and bind their parameters:
  - `@Controller` - marks a class as a REST controller
  - `@Get` - maps a method to HTTP GET
  - `@Post` - maps a method to HTTP POST
  - `@Put` - maps a method to HTTP PUT
  - `@Patch` - maps a method to HTTP PATCH
  - `@Delete` - maps a method to HTTP DELETE
  - `@Body` - binds the JSON-deserialized request body
  - `@PathParam` - binds a path placeholder
  - `@QueryParam` - binds a query-string parameter
  - `@Context` - binds a request-scoped runtime object

## Classes
