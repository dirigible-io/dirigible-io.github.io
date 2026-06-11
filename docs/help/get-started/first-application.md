---
title: Your First Application
description: Build, publish, and call a REST endpoint end-to-end.
---

# Your First Application

Walks through creating a TypeScript REST endpoint inside the IDE and hitting it over HTTP. Assumes Dirigible is running on `http://localhost:8080` ([Docker](/help/get-started/installation/docker) or [Standalone JAR](/help/get-started/installation/jar)).

## 1. Create a workspace project

1. Log in at [http://localhost:8080](http://localhost:8080) with `admin` / `admin`.
2. Open the **Workbench** perspective.
3. Right-click the **workspace** node in the project tree, choose **New > Project**, name it `hello`.

## 2. Add a controller

Right-click `hello`, choose **New > File**, name it `HelloController.ts`. Paste:

```ts
import { Controller, Get } from "@aerokit/sdk/http";

@Controller
class HelloController {

  @Get("/")
  public hello() {
    return { message: "Hello from Dirigible" };
  }

  @Get("/echo/{name}")
  public echo(name: string) {
    return { message: `Hello, ${name}` };
  }
}
```

Save the file. The TypeScript engine picks it up; the controller route is registered automatically. No build step.

## 3. Publish

Right-click the `hello` project and choose **Publish**. The file moves from `/users/admin/workspace/hello/` into `/registry/public/hello/` and the synchronizers reconcile it into runtime state.

## 4. Call the endpoint

```bash
curl http://localhost:8080/services/ts/hello/HelloController.ts
# {"message":"Hello from Dirigible"}

curl http://localhost:8080/services/ts/hello/HelloController.ts/echo/world
# {"message":"Hello, world"}
```

The URL pattern is `/services/ts/<project>/<file>[/<route>]`. The unauthenticated variant is `/public/ts/...`.

## 5. Check the OpenAPI document

The controller's OpenAPI fragment is published automatically and aggregated under:

```
http://localhost:8080/services/openapi
```

Swagger UI is at `http://localhost:8080/swagger-ui/index.html`.

## Java equivalent

The same endpoint in client Java (`HelloController.java`):

```java
import org.eclipse.dirigible.engine.java.annotations.http.Controller;
import org.eclipse.dirigible.engine.java.annotations.http.Get;
import org.eclipse.dirigible.engine.java.annotations.http.PathParam;

import java.util.Map;

@Controller
public class HelloController {

    @Get("/")
    public Map<String, String> hello() {
        return Map.of("message", "Hello from Dirigible");
    }

    @Get("/echo/{name}")
    public Map<String, String> echo(@PathParam("name") String name) {
        return Map.of("message", "Hello, " + name);
    }
}
```

Served at `/services/java/<project>/<fqn-with-slashes>`. See [Client Java](/help/develop/languages/) for the full annotation set.

## Next

- [Tour the IDE](/help/get-started/ide-tour)
- [Next steps](/help/get-started/next-steps)
