---
title: Building from source
description: Build the platform locally - Maven + Node toolchain.
---

# Building from source

The platform source lives at [eclipse/dirigible](https://github.com/eclipse/dirigible). Build it with Maven.

## Prerequisites

- **JDK 21** - the project compiles to Java 21. CI uses Corretto 21.
- **Maven 3.8.x**.
- **Node.js 22.x** with global `typescript` and `esbuild` (frontend WebJars are transpiled / bundled at Maven build time).
- **ttyd** on `PATH` - only needed at runtime for the in-IDE terminal on port 9000.

## Common commands

| Goal | Command |
| ---- | ------- |
| Full build with all unit tests | `mvn clean install` |
| Fast build (no tests / javadoc / license / format) | `mvn -T 1C clean install -P quick-build` |
| Unit tests only (no integration tests) | `mvn clean install -P unit-tests` |
| Run unit + integration tests | `mvn clean install -P tests` |
| Integration tests only | `mvn clean install -P integration-tests -D selenide.headless=true` |
| A specific IT (comma-separated) | `mvn clean install -P integration-tests -Dit.test="CsvimIT,CreateNewProjectIT" -D selenide.headless=true` |
| A single unit test | `mvn -pl <module-path> -am test -Dtest=ClassName#method` |
| Format Java code | `mvn formatter:format` (or `-P format`) |
| Validate formatting (what CI runs) | `mvn -T 1C formatter:validate` |
| Static analysis | `mvn clean install -P spotbugs` |
| Coverage report (JaCoCo) | `mvn clean -B package -P coverage` |
| Refresh license headers | `mvn license:format -P license -DskipExistingHeaders=false` |

## Run after build

```bash
java -jar build/application/target/dirigible-application-*-executable.jar
```

UI at `http://localhost:8080`. Default credentials: `admin` / `admin`.

For a remote-debug-attachable JVM:

```bash
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000 \
    -jar build/application/target/dirigible-application-*-executable.jar
```

## Repository layout

| Directory | Purpose |
| --------- | ------- |
| `modules/` | Low-level platform building blocks: `commons`, `database`, `engines`, `odata`, `parsers`, `repository`. |
| `components/` | The Spring application surface: `core`, `engine`, `api`, `data`, `ide`, `platform`, `security`, `ui`, `template`. |
| `build/application/` | The runnable jar - `DirigibleApplication.java`, Dockerfile. |
| `tests/tests-framework/` | Shared Selenide / Spring test base classes. |
| `tests/tests-integrations/` | `*IT.java` UI integration tests with project fixtures. |
| `cli/` | Standalone CLI that runs the jar against a given project path. |
| `dependencies/` | BOM-style version pins. |

## See also

- [Code style](/help/contributing/code-style)
- [Testing](/help/contributing/testing)
- [`CONTRIBUTING.md`](https://github.com/eclipse/dirigible/blob/master/CONTRIBUTING.md)
