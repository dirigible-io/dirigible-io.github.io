---
title: Testing (contributing)
description: Surefire vs Failsafe, Selenide ITs, HTTP-only ITs.
---

# Testing the platform

## Naming convention

Test type is decided by class name:

| Suffix | Phase | Runner | Notes |
| ------ | ----- | ------ | ----- |
| `*Test.java` | unit | surefire | Fast, isolated. |
| `*IT.java` | integration | failsafe | Boots the full Spring application. |

Putting an integration test under a `*Test` name runs it during the wrong phase (and usually without the test app context). Get the suffix right.

## Profiles

| Profile | Effect |
| ------- | ------ |
| `unit-tests` | Surefire only. CI's `tests` job. |
| `integration-tests` | Failsafe only. Disables surefire. |
| `tests` | Surefire + failsafe. |
| `quick-build` | Skips tests, javadoc, license check, formatter. |

## UI integration tests

The default integration-test base is `UserInterfaceIntegrationTest` (`tests/tests-framework/`). It boots the platform, opens Chrome via Selenide, and exercises the running IDE. Slow but high-fidelity.

```bash
mvn clean install -P integration-tests -D selenide.headless=true
```

Screenshots end up in `tests/tests-integrations/build/reports/tests`.

## HTTP-only integration tests

For features you can exercise purely over HTTP, extend `IntegrationTest` instead. Write fixture files directly through `IRepository.createResource(...)`, call `SynchronizationProcessor.forceProcessSynchronizers()` to trigger reconciliation synchronously, and assert via `RestAssuredExecutor.execute(callable, timeoutSeconds)`. See `JavaEngineIT` for the canonical pattern.

These run headless without Chrome - much faster, much more reliable on CI.

## Sample-project ITs

`tests/ui/tests/sample/` holds sample-project ITs - each extends `SampleProjectRepositoryIT` and overrides `getRepositoryURL()` + `verifyProject()`. The base class clones the repo through the IDE Git perspective, publishes the project, runs `forceProcessSynchronizers()`, and delegates to `verifyProject()`.

Inventory of sample repos under `dirigiblelabs/*`: `sample-entity-decorators`, `sample-java-entity-decorators`, `sample-roles-decorator`, `sample-job-decorator`, `sample-listener-decorator`, `sample-extension-decorator`, `sample-component-decorator`, `sample-websocket-decorator`, `sample-store-api`.

When adding a new sample-project IT, drop the project in its own `dirigiblelabs/*` repo first; the dirigible-side IT will fail CI if it clones an empty `master`.

## DB-specific CI

`build.yml` runs the integration suite three times - **H2**, **PostgreSQL 16**, **MSSQL 2022** - by varying `DIRIGIBLE_DATASOURCE_DEFAULT_*` env vars. When touching SQL or schema-emission code, replicate locally on the affected DB rather than assuming H2 generalises.

## See also

- [Building from source](/help/contributing/building-from-source)
- [Code style](/help/contributing/code-style)
