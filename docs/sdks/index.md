---
title: SDKs
description: Choose the SDK that fits your stack — Eclipse Dirigible ships both a TypeScript/JavaScript SDK and a Java SDK on the same polyglot runtime.
---

# Eclipse Dirigible SDKs

Eclipse Dirigible is **polyglot by design**. The platform exposes the same underlying runtime services through dedicated SDKs in multiple languages, so teams pick the language that fits the task and the engineer — not the platform.

Every SDK runs in the same JVM, shares the same data sources, message queues, jobs, security context, and registry. Code written in one language can call into, listen to, and exchange data with code written in any other — transparently.

Two first-class SDKs ship with every Dirigible runtime:

## TypeScript / JavaScript SDK

The original Aerokit SDK — a fast-feedback authoring experience for services, controllers, entities, and integrations written in TypeScript or JavaScript. Imports from `@aerokit/sdk/*`; runs on GraalJS inside the platform.

<div class="sdk-card">

[**Browse the TypeScript / JavaScript SDK →**](/api/)

[Get Started with TypeScript / JavaScript](/api/get-started)

</div>

Typical entry points:

- `@aerokit/sdk/http` — REST controllers and HTTP client
- `@aerokit/sdk/db` — database access and entity persistence
- `@aerokit/sdk/component` — dependency injection
- `@aerokit/sdk/job` — scheduled background work

## Java SDK

The Java surface of the Dirigible platform. `.java` source files dropped into a project are compiled in-process by `engine-java`; classes under `org.eclipse.dirigible.sdk.*` give you the same capabilities as the TypeScript SDK with the full Java type system, IDE tooling, and ecosystem behind them.

<div class="sdk-card">

[**Browse the Java SDK →**](/sdk/)

[Get Started with Java](/sdk/get-started)

</div>

Typical entry points:

- `org.eclipse.dirigible.sdk.http` — REST controllers and HTTP client
- `org.eclipse.dirigible.sdk.db` — database access and JPA-style entity persistence
- `org.eclipse.dirigible.sdk.component` — dependency injection
- `org.eclipse.dirigible.sdk.job` — scheduled background work

## Picking a language

Both SDKs cover the same problem space; the choice comes down to ergonomics.

| When you want…                                                       | Pick           |
|----------------------------------------------------------------------|----------------|
| The fastest authoring loop, hot-reload, lightest syntax              | TypeScript / JavaScript |
| Static typing on the entire stack, the Java ecosystem, JVM tooling   | Java           |
| Quick scripts, glue code, controllers backed by short async logic    | TypeScript / JavaScript |
| Tight integration with existing Java libraries (CXF, JGit, JPA, etc.) | Java           |
| To mix and match — listener in one language, producer in another     | Either         |

You don't have to choose project-wide. A single Dirigible project can contain both `.ts` and `.java` sources side by side — they share the same registry, the same data sources, the same broker, and the same security context.

## Shared development model

Regardless of language, the development model stays the same:

- **Annotation- / decorator-driven** wiring for controllers, entities, jobs, listeners, and security
- **Static facades** for runtime services — no DI plumbing needed to use `Files`, `Logging`, `HttpClient`, `Configurations`
- **Pre-bundled platform** — no build configuration, no classpath setup, no `package.json` install step inside the platform
- **Hot-reload** — edit a source, save, the runtime picks it up

Pick an SDK above to start exploring its modules.

<style scoped>
.sdk-card {
  padding: 1rem 1.25rem;
  margin: 1rem 0 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}
.sdk-card p:first-child {
  margin-top: 0;
}
.sdk-card p:last-child {
  margin-bottom: 0;
}
.sdk-card a {
  font-weight: 600;
}
</style>
