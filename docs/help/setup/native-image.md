---
title: GraalVM native image
description: Build a native-image binary of Dirigible for fast cold-start deployments.
---

# GraalVM native image

For container-image use cases where the JVM start-up cost matters, Dirigible can be built as a GraalVM native image.

## Prerequisites

- GraalVM 21+ with the `native-image` component installed.
- The Dirigible fat jar (`build/application/target/dirigible-application-*-executable.jar`).

## Build

```bash
native-image -jar build/application/target/dirigible-application-*-executable.jar -o dirigible
```

Result: a `./dirigible` binary that boots directly without a JVM.

## Run

```bash
./dirigible
```

Open `http://localhost:8080`. Default credentials: `admin` / `admin`.

## Caveats

- **GraalJS in native image** runs in interpreter mode unless the additional optimisations are explicitly built in - JS execution will be slower than on a JIT JVM. Suitable for low-traffic services, less so for hot CRUD endpoints.
- **Reflection / dynamic-classloading code paths** in the platform are configured for native image via the JVM's standard `META-INF/native-image/` hints, but user code that relies on heavy runtime reflection may need additional reachability metadata.
- The in-process **Java client compiler** (`engine-java`'s `javac` task) requires the JDK's `javax.tools` API, which is reachable from native image but slower to start. Cold publish-then-call sequences will pay a one-time cost the first time a `.java` artefact is reconciled.
- The IDE's [Java debugger](/help/ide/views/debugger-java) attaches over JDWP, which native-image binaries do **not** expose by default. JVM mode is the supported path for development.

## When to use it

- Container images optimised for startup.
- Read-only API gateways where JS hot-paths are not the bottleneck.
- Resource-constrained edge deployments.

For a developer setup stick with the JVM jar or Docker image. Native image is a production-optimisation tool, not a dev convenience.

## See also

- [Docker](/help/setup/docker)
- [Standalone JAR](/help/setup/tomcat)
