---
title: REST APIs
description: Build HTTP endpoints with @Controller and the method verbs.
---

# REST APIs

A REST endpoint is a class annotated `@Controller` plus methods annotated with `@Get` / `@Post` / `@Put` / `@Patch` / `@Delete`. The platform routes URLs to the methods, binds parameters from path / query / body, runs the role check, and writes the return value.

## Class and method annotations

- `@Controller("/base")` - class marker. The base path defaults to the class FQN with `.` replaced by `/`; the explicit string overrides that.
- `@Get(value)` / `@Post(value)` / `@Put(value)` / `@Patch(value)` / `@Delete(value)` - method-level. `value` is the path suffix and supports `{name}` placeholders.

## Parameter binding

- `@Body` - bind the request body. JSON is deserialized via Jackson into the parameter type.
- `@PathParam("name")` - bind a `{name}` placeholder.
- `@QueryParam("name")` - bind a query-string parameter.
- `@Context` - bind the raw `HttpServletRequest` / `HttpServletResponse`.

Type coercion handles `String`, primitive numerics, `UUID`, enums, and `boolean` at bind time. A parse failure surfaces as `400 Bad Request`.

## Routing

`ControllerRouter` picks the longest matching base path first, then the most specific route within it - literal paths beat `{placeholder}` patterns. Nested-package controllers therefore win over their outer namespaces.

## Return value

- `void` - the method writes the response itself via `@Context HttpServletResponse`.
- `String` / `CharSequence` - written as `text/plain`.
- Anything else - serialized as JSON via Jackson.

## TypeScript and Java side by side

```ts
import { Controller, Get, Post, Body, PathParam } from "@aerokit/sdk/http/decorators";

@Controller("/countries")
class CountryController {

  @Get("/{id}")
  public byId(@PathParam("id") id: number) {
    return { id, name: "..." };
  }

  @Post("/")
  public create(@Body country: { name: string }) {
    return country;
  }
}
```

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.sdk.http.Post;
import org.eclipse.dirigible.sdk.http.Body;
import org.eclipse.dirigible.sdk.http.PathParam;

@Controller("/countries")
public class CountryController {

    @Get("/{id}")
    public Country byId(@PathParam("id") long id) {
        return new Country(id, "...");
    }

    @Post
    public Country create(@Body Country country) {
        return country;
    }
}
```

## Role-protected endpoints

`@Roles` accepts a list of role names. The check is **any-of** - the caller needs at least one matching role.

```java
@Roles({"admin", "operator"})
@Delete("/{id}")
public void delete(@PathParam("id") long id) { ... }
```

See [Security and roles](/help/develop/security-and-roles) for the full rules.

## OpenAPI

Each controller publishes an OpenAPI 3 fragment to the platform. The aggregator at `/services/openapi` merges all TS-controller and Java-controller fragments into a single document. The Swagger UI at `/swagger-ui/index.html` renders it.

Method-level `@Documentation("Free text")` (Java) surfaces as the operation summary in the generated fragment.

## See also

- [The decorator / annotation model](/help/develop/decorators-model).
- [Java SDK - http](/sdk/http/).
- [TypeScript API - http](/api/http/).
- [Security and roles](/help/develop/security-and-roles).
