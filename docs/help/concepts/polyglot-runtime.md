---
title: Polyglot runtime
description: JavaScript, TypeScript, Java, and Python all run in the same JVM and share the same data sources, message broker, scheduler, and security context.
---

# Polyglot runtime

A Dirigible project can mix JavaScript, TypeScript, Java, and Python files freely. They all execute inside the **same JVM process** and share the same platform services - there is no separate bus and no inter-process boundary between them.

## Languages and engines

| Language       | File extensions       | Engine                       | Notes                                                                 |
| -------------- | --------------------- | ---------------------------- | --------------------------------------------------------------------- |
| JavaScript     | `.js`, `.mjs`         | `engine-javascript`          | GraalJS via the Graalium runner (`DirigibleJavascriptCodeRunner`). ES6+, synchronous model, CommonJS + ESM. |
| TypeScript     | `.ts`                 | `engine-typescript`          | Transpiled on demand; full strong typing via `tsconfig.json` at the project root. |
| Java (client)  | `.java`               | `engine-java`                | Compiled in-process by a single `javac` task per cycle; loaded into one fresh `ClientClassLoader`. |
| Python         | `.py`                 | `engine-python`              | Subset; served at `/services/python/...`.                              |

JS and TS sources are **not synchronized** - they are loaded on demand by `JavascriptEndpoint` / `TypeScriptEndpoint` at `/services/js/<project>/<file>` (and `/public/js/...` for anonymous). Java sources **are** synchronized; see [Lifecycle and hot-reload](/help/concepts/lifecycle-and-hot-reload).

## What "same JVM" buys you

Because every language runs in-process, cross-language interop is **transparent through the platform services**, not through an RPC bus:

- **Data sources.** JS, TS, and Java all reach the same JDBC pool via `DataSourcesManager`. A connection acquired from JavaScript hits the same H2 / PostgreSQL / HANA / Snowflake instance that a `@Repository` Java class would.
- **Message broker.** The embedded ActiveMQ broker (`engine-listeners`) is shared. Any language can produce to or consume from the same queues and topics.
- **Scheduler.** Quartz jobs declared as `.job` artefacts run alongside JS-defined and TS-defined schedules - one scheduler, one thread pool.
- **BPMN runtime.** Flowable is a single engine; a process started from TS can complete tasks invoking Java controllers.
- **Security context.** `UserFacade.getName()` / `isInRole()` resolves to the same authenticated principal in every language. The `@Roles` annotation on a Java `@Controller` and the `@RoleAllowed` decorator on a TS controller both call through `HttpServletRequest.isUserInRole`.
- **Registry / repository.** All languages see the same `/registry/public/...` tree.

## Calling Java from JS / TS

The `@aerokit/sdk/*` modules are TypeScript / JavaScript shells over Java facades (`<Area>Facade` classes under `components/api/api-*/`). They are bridged into the GraalJS context by `engine-javascript`; pre-built TS / JS bundles live under `components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/`.

```ts
import { Connection } from "@aerokit/sdk/db";

const rs = Connection.executeQuery("SELECT 1");
```

The same `DatabaseFacade` backs that call whether it comes from JS, TS, or a Java handler reaching `DataSourcesManager.getDefaultDataSource()`.

## Calling Java from Java (client to platform)

Client `.java` classes are loaded by `ClientClassLoader`, not Spring-scanned, so `@Autowired` is a no-op on them. Use `BeanProvider.getBean(...)` to pull platform beans from a `@Controller` or `JavaHandler`:

```java
import org.eclipse.dirigible.components.base.spring.BeanProvider;
import org.eclipse.dirigible.components.data.store.java.store.JavaEntityStore;

JavaEntityStore store = BeanProvider.getBean(JavaEntityStore.class);
```

## Reference

- JS / TS API surface: [`@aerokit/sdk/*`](/api/)
- Java surface: [`engine-java` annotations + SPI](/help/concepts/extensibility)
