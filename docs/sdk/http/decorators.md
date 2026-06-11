# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.http`
- source: [http/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http)
:::

This page documents the annotation set used to declare REST controllers in the Dirigible Java SDK. Annotated controller classes are discovered by the platform's `JavaEndpoint` dispatcher; each method's HTTP verb is taken from its annotation type, the URL is built from the class name plus the annotation's `value()`, and parameter binding (path, query, body, runtime context) is driven by the per-parameter annotations.

Return values are serialized to JSON by Jackson automatically - reach for the [`Response`](./response.md) facade only at the edges (file downloads, redirects, manual error shapes).

### Example Usage:

```java
package myproject.orders;

import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.sdk.http.Post;
import org.eclipse.dirigible.sdk.http.Body;
import org.eclipse.dirigible.sdk.http.PathParam;
import org.eclipse.dirigible.sdk.http.QueryParam;

@Controller
public class OrderService {

    @Get
    public List<Order> list(@QueryParam("status") String status) {
        return repository.findByStatus(status);
    }

    @Get("/{id}")
    public Order get(@PathParam("id") long id) {
        return repository.findById(id);
    }

    @Post
    public Order create(@Body Order order) {
        return repository.save(order);
    }
}
```

With this controller, the platform exposes:

- `GET  /services/java/myproject/orders/OrderService?status=open`
- `GET  /services/java/myproject/orders/OrderService/{id}`
- `POST /services/java/myproject/orders/OrderService`

## Annotations

### @Controller

::: tip Source
[http/Controller.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Controller.java) - target: `TYPE`
:::

Marks a Java class as a REST controller. Methods annotated with `@Get`, `@Post`, `@Put`, `@Patch`, `@Delete` are exposed as HTTP endpoints.

The base URL is derived from the class's fully-qualified name (the same path used by `JavaEndpoint`): `/services/java/<project>/<package-path>/<ClassName>`. Each method annotation contributes the trailing suffix; the HTTP method comes from the annotation type.

A controller class must be public, have a public no-arg constructor, and must not also implement `JavaHandler` - the two dispatch styles are mutually exclusive.

```java
@Controller
public class HelloService {
    @Get
    public String hello() { return "world"; }
}
```

### @Get

::: tip Source
[http/Get.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Get.java) - target: `METHOD`
:::

Maps a controller method to HTTP `GET`. The `value()` is appended to the controller's base URL; placeholders of the form `{name}` are bound via `@PathParam`.

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `value` | `String` | Path suffix relative to the controller's base URL. Empty matches the base URL itself. Defaults to `""`. |

```java
@Get("/{id}")
public Order get(@PathParam("id") long id) { ... }
```

### @Post

::: tip Source
[http/Post.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Post.java) - target: `METHOD`
:::

Maps a controller method to HTTP `POST`. The `value()` is appended to the controller's base URL; placeholders of the form `{name}` are bound via `@PathParam`.

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `value` | `String` | Path suffix relative to the controller's base URL. Empty matches the base URL itself. Defaults to `""`. |

```java
@Post
public Order create(@Body Order order) { ... }
```

### @Put

::: tip Source
[http/Put.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Put.java) - target: `METHOD`
:::

Maps a controller method to HTTP `PUT`. The `value()` is appended to the controller's base URL.

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `value` | `String` | Path suffix relative to the controller's base URL. Empty matches the base URL itself. Defaults to `""`. |

```java
@Put("/{id}")
public Order replace(@PathParam("id") long id, @Body Order order) { ... }
```

### @Patch

::: tip Source
[http/Patch.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Patch.java) - target: `METHOD`
:::

Maps a controller method to HTTP `PATCH`. The `value()` is appended to the controller's base URL.

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `value` | `String` | Path suffix relative to the controller's base URL. Empty matches the base URL itself. Defaults to `""`. |

```java
@Patch("/{id}")
public Order update(@PathParam("id") long id, @Body Map<String, Object> changes) { ... }
```

### @Delete

::: tip Source
[http/Delete.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Delete.java) - target: `METHOD`
:::

Maps a controller method to HTTP `DELETE`. The `value()` is appended to the controller's base URL.

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `value` | `String` | Path suffix relative to the controller's base URL. Empty matches the base URL itself. Defaults to `""`. |

```java
@Delete("/{id}")
public void delete(@PathParam("id") long id) { ... }
```

### @Body

::: tip Source
[http/Body.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Body.java) - target: `PARAMETER`
:::

Marks a controller-method parameter as the JSON-deserialized HTTP request body. The parameter type is the target of Jackson's `readValue`. At most one `@Body` parameter per method.

```java
@Post
public Order create(@Body Order order) { ... }
```

### @PathParam

::: tip Source
[http/PathParam.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/PathParam.java) - target: `PARAMETER`
:::

Binds a controller-method parameter to a path placeholder. The `value()` must match a `{name}` segment declared in the method's HTTP annotation path.

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `value` | `String` | Name of the path placeholder to bind. Required. |

```java
@Get("/{id}")
public Order get(@PathParam("id") long id) { ... }
```

### @QueryParam

::: tip Source
[http/QueryParam.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/QueryParam.java) - target: `PARAMETER`
:::

Binds a controller-method parameter to a request query-string parameter. Missing parameters resolve to `null` for boxed types and to the type's default value for primitives.

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `value` | `String` | Name of the query parameter to bind. Required. |

```java
@Get
public List<Order> list(@QueryParam("status") String status,
                        @QueryParam("page") int page) { ... }
```

### @Context

::: tip Source
[http/Context.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Context.java) - target: `PARAMETER`
:::

Marks a controller-method parameter as a request-scoped object supplied by the runtime. Supported parameter types are `jakarta.servlet.http.HttpServletRequest`, `jakarta.servlet.http.HttpServletResponse`, and `Map<String, String>` - the latter receives the merged path and query parameters (query overrides path on name collisions).

```java
@Get("/{id}")
public void download(@PathParam("id") long id,
                     @Context HttpServletResponse response,
                     @Context Map<String, String> params) { ... }
```
