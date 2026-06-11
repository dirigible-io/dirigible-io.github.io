---
title: Testing
description: Lightweight in-platform assertions vs proper test suites.
---

# Testing

Two tiers.

## In-platform smoke tests

`@aerokit/sdk/junit` (JavaScript / TypeScript) and `org.eclipse.dirigible.sdk.junit` (Java) ship a tiny `Assert` surface for ad-hoc verification inside Dirigible projects. Every helper throws a plain `AssertionError`, so the assertion fires whether the calling code is invoked by a runner, by a controller, by a scheduled job, or by a manual HTTP call.

```ts
import { assertTrue, assertEquals, assertNotNull } from "@aerokit/sdk/junit";

const token = login("admin", "pwd");
assertNotNull(token);

const result = fetch(token);
assertTrue("result should be ok", result.isOk());
assertEquals("answer", 42, compute());
```

```java
import static org.eclipse.dirigible.sdk.junit.Assert.*;

String token = login("admin", "pwd");
assertNotNull(token);

Result result = fetch(token);
assertTrue("result should be ok", result.isOk());
assertEquals("answer", 42, compute());
```

Methods: `assertTrue` / `assertFalse`, `assertEquals` / `assertNotEquals`, `assertNull` / `assertNotNull`, `fail` - each with a string-message overload.

The Java side covers only the small overlap with the JS surface so a smoke test reads the same in either language.

See [`@aerokit/sdk/junit`](/api/junit/junit) and [`org.eclipse.dirigible.sdk.junit`](/sdk/junit/junit).

## Proper test suites

For fixtures, parameterised tests, lifecycle hooks, parallel execution - drop down to the language's standard test framework.

- **Java** - pull JUnit Jupiter (`org.junit.jupiter.api`) into the project. Use it the same way you would in any JVM project.
- **JavaScript / TypeScript** - QUnit via `@aerokit/sdk/qunit`, or any third-party runner you mount via npm.

## When to use each

| Need | Reach for |
| ---- | --------- |
| One assertion mid-script | `@aerokit/sdk/junit` / `org.eclipse.dirigible.sdk.junit` |
| Verify a controller still answers `200` after a deploy | `@aerokit/sdk/junit` |
| Multi-method test class with `@BeforeEach`, parameterised inputs, parallel execution | JUnit Jupiter |
| Browser-driven integration test of the IDE | The Selenide / Spring tooling in the platform repo (`tests/tests-framework`) - relevant for contributors, not application authors. |

## Integration testing the platform itself

Contributors writing tests against the platform: see [`/help/contributing/testing`](/help/contributing/testing) for surefire vs failsafe, Selenide-driven UI tests, and the HTTP-only `IntegrationTest` pattern.
