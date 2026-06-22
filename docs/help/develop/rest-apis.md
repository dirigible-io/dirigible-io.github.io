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
package demo;

import java.util.List;

import org.eclipse.dirigible.sdk.component.Inject;
import org.eclipse.dirigible.sdk.http.Body;
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Delete;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.sdk.http.PathParam;
import org.eclipse.dirigible.sdk.http.Post;
import org.eclipse.dirigible.sdk.platform.Documentation;
import org.eclipse.dirigible.sdk.security.Roles;

@Controller
@Documentation("CRUD over the Country entity")
@Roles({"DEVELOPER"})
public class CountryController {

    @Inject
    private CountryRepository countries;

    @Get("/")
    @Documentation("Lists every Country")
    public List<Country> list() {
        return countries.findAll();
    }

    @Get("/{id}")
    @Documentation("Fetches a single country by id")
    public Country byId(@PathParam("id") Long id) {
        return countries.findById(id);
    }

    @Post
    @Documentation("Creates a new country from a JSON body")
    public Country create(@Body Country country) {
        return countries.save(country);
    }

    @Delete("/{id}")
    @Documentation("Deletes the country with the given id")
    public void remove(@PathParam("id") Long id) {
        countries.deleteById(id);
    }
}
```

A `@Controller` is a managed bean, so it receives its repository or service through the constructor or via field `@Inject` (shown above). See [Dependency injection](/help/develop/dependency-injection) for the full picture.

**Sample project:** [`dirigiblelabs/sample-java-entity-decorators`](https://github.com/dirigiblelabs/sample-java-entity-decorators) - `CountryController` over a `JavaRepository`-backed `CountryRepository`. SDK reference: [`/sdk/`](https://www.dirigible.io/sdk/).

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
