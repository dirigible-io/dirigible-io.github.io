# platform/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.platform`
- source: [platform/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/platform)
:::

This module exposes the Eclipse Dirigible platform itself - the runtime that hosts your code. It covers process execution, scripting-engine invocation, the application lifecycle (publish / unpublish), JVM and OS introspection, the problems table, and the three layered views over the on-disk Dirigible store: the read-only public `Registry`, the mutable `Repository`, and the per-user IDE `Workspace`.

All classes are stateless facades exposing `public static` methods that delegate to the corresponding `components/api/api-platform` Java facade. Use these from controllers, jobs, listeners, custom synchronizers, and build / migration tooling that needs to reach into the platform from inside a Dirigible project.

The main components of this module are:
- **Command**: Spawns OS-level processes from the JVM and captures their merged stdout/stderr.
- **Engine**: Invokes another scripting engine (GraalJS, Python, etc.) on a file in the registry.
- **Lifecycle**: Promotes a project from a user workspace into the public registry (and removes it again).
- **Os**: Read-only snapshot of the host JVM - OS name, architecture, processor count, memory budget.
- **Problems**: Add / fetch / resolve entries in the platform's problems table (the IDE Problems perspective).
- **Registry**: Read-only access to artefacts published under `/registry/public/`.
- **Repository**: Mutable access to the underlying Dirigible repository - resources, collections, copies, moves.
- **Workspace**: IDE workspace operations - create / list / delete workspaces and read or replace file content. Returns platform `Workspace` / `File` domain objects directly.
- **@Documentation**: Annotation that attaches a human-readable description to a type, field, or method (surfaced in the auto-generated OpenAPI).

## Classes

- [Command](./command.md)
- [Engine](./engines.md)
- [Lifecycle](./lifecycle.md)
- [Os](./os.md)
- [Problems](./problems.md)
- [Registry](./registry.md)
- [Repository](./repository.md)
- [Workspace](./workspace.md)

## Annotations

- [@Documentation](./documentation.md)
