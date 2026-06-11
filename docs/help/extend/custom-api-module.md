---
title: Custom API module
description: Add a new @aerokit/sdk/* facade.
---

# Custom API module

Adding a new module to the JS / TS SDK surface (and a matching Java SDK class) takes two parallel pieces:

1. A **Java facade** under `components/api/api-<area>/` exposing static methods that user code can call.
2. A **TS bundle** under `components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/` declaring `@aerokit/sdk/<area>` and re-exporting the facade methods with full `.d.ts` types.

## 1. Java facade

```java
package org.eclipse.dirigible.components.api.reports;

import org.eclipse.dirigible.commons.annotation.CalledFromJS;
import org.springframework.stereotype.Component;

@Component
public class ReportsFacade {

    @CalledFromJS
    public static String render(String templateLocation, String parametersJson) {
        // build a report and return it
        return "...";
    }
}
```

The `@CalledFromJS` annotation marks the static surface that the GraalJS bridge exposes - it's a documentation marker that prevents accidental refactors from breaking script callers.

## 2. TS bundle

```ts
// components/api/api-modules-javascript/.../modules/src/reports/index.ts
const ReportsFacade = Java.type("org.eclipse.dirigible.components.api.reports.ReportsFacade");

export class Reports {
    public static render(templateLocation: string, parameters: object): string {
        return ReportsFacade.render(templateLocation, JSON.stringify(parameters));
    }
}
```

The build pipeline (esbuild + tsc) produces the `.d.ts` and the runtime bundle. Once published, user code imports it normally:

```ts
import { Reports } from "@aerokit/sdk/reports";

const html = Reports.render("/registry/public/reports/sales.tpl", { period: "2026Q2" });
```

## 3. Optional - matching Java SDK class

For Java callers, mirror the facade in `components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/<area>/Reports.java`. Same shape - a thin static class delegating to the underlying `*Facade`.

## Group registration

Add the API module to `components/group/group-api/pom.xml`.

## See also

- [`@aerokit/sdk/*`](/api/)
- [`org.eclipse.dirigible.sdk.*`](/sdk/)
- [Custom engine](/help/extend/custom-engine)
- [Polyglot runtime](/help/concepts/polyglot-runtime)
