---
title: How dependency versions are decided
description: Declared, mediated, provided or shadowed, then locked - the trust chain behind runtime Maven dependencies.
---

# How dependency versions are decided

A [Maven dependency](/help/develop/maven-dependencies) declared in `project.json` passes through four decisions before a jar serves classes. Each decision is observable - nothing about the dependency layer is silent.

**declared → mediated → provided / shadowed → locked**

## 1. Declared

Every registry project's `maven` entries are collected into **one union resolution**. Exact versions only; a version range or malformed coordinate is a declaration error that blocks activation and is reported against the declaring project.

## 2. Mediated

The union is resolved as a single dependency graph, so Maven's standard version mediation applies across the whole instance. When more than one version of a `groupId:artifactId` is requested - by two projects directly, or transitively - one version wins: the nearest declaration, first-declaration-wins for direct conflicts. The chosen artifact carries the `mediated` status with every requested version in the report, and the lockfile records who requested what.

## 3. Provided or shadowed

The platform's fat jar already ships on the order of a thousand libraries, and the modules classloader is **parent-first**: a platform-shipped class always wins. To make that explicit instead of accidental, the application build embeds a **provided-BOM** (`META-INF/dirigible-provided-bom.xml`, a standard `dependencyManagement` POM generated from the build's own resolved dependencies), so even an air-gapped instance knows exactly what the platform provides.

The resolver treats every BOM coordinate as **provided** - never downloaded, pruned from the graph with its transitives:

- Declared at the platform's version: satisfied without a download, reported `active` ("provided by the platform").
- Declared at a **different** version: reported **`shadowed`** with both versions, in the log, on the endpoint and in the IDE view. The declared version is inert - parent-first delegation serves the platform's copy.

::: warning Shadowing is reported, not "fixed"
Child-first loading (giving the project the version it asked for) was deliberately rejected: the platform's own code keeps loading its version while module code loads another, and the two meet across every API boundary that passes such an object - `LinkageError`s and `ClassCastException`s of the same fully qualified name, at arbitrary call sites, at arbitrary times. A `shadowed` report naming the exact coordinate and both versions at resolution time is the feature.
:::

## 4. Locked

Every fully clean resolution writes **`project-lock.json`** into the resolved-modules directory - one directory then carries the whole reproducibility bundle (the seed jars plus the lock that verifies them):

```json
{
  "resolvedAt": "2026-08-18T13:57:55Z",
  "platform": "15.0.0",
  "artifacts": [
    {
      "id": "com.zaxxer:SparseBitSet:1.3",
      "sha256": "f76b85adb0c0...",
      "via": "org.apache.poi:poi:5.4.0",
      "scope": "module"
    },
    {
      "id": "org.apache.poi:poi:5.4.0",
      "sha256": "ace71e798730...",
      "requestedBy": ["invoice-app"],
      "scope": "module"
    }
  ],
  "mediated": []
}
```

A declared root carries the `requestedBy` projects; a transitive carries the `via` root that pulled it in. Entries are sorted, so two locks diff line by line.

Before anything activates, every resolved artifact is verified against the lock's SHA-256. A mismatch is a hard per-artifact failure: the artifact is reported `failed`, evicted from the launch seed and not activated, while the verified rest keeps serving. A pass with failures never rewrites the lock, so a tampered artifact cannot launder itself into the trusted set.

## Frozen mode

`DIRIGIBLE_DEPENDENCIES_FROZEN=true` is the mode immutable production images should run: **the lockfile is the resolution**. The locked set activates checksum-verified from the local repository, no remote repository is ever consulted, no version is re-mediated, and a declaration the lock does not carry is rejected as `frozen-mismatch` with a pointed error. Provided and shadowed declarations stay clean - the embedded BOM answers for them without any network.

Same declarations plus same lockfile means a byte-identical activated set across boots, verified by checksum.

## The status report

`GET /services/core/dependencies` carries one accurate status per artifact:

| Status | Meaning |
| --- | --- |
| `active` | serving in this process (resolved, or provided by the platform) |
| `mediated` | more than one version requested; this one won |
| `shadowed` | the platform provides a different version; the declared one is inert |
| `pending-restart` | platform-scoped upgrade or agent-less addition; takes effect next launch |
| `failed` | declaration, resolution, integrity or activation failure |
| `frozen-mismatch` | rejected in frozen mode; not part of the lockfile |

## Worked example

`invoice-app` declares `org.apache.poi:poi:5.2.5` and `com.google.code.gson:gson:2.8.9`. The resolution reports:

```
shadowed  com.google.code.gson:gson:2.8.9  requested: 2.8.9, provided: 2.13.2
active    org.apache.poi:poi:5.2.5         Declared
active    com.zaxxer:SparseBitSet:1.3      Via org.apache.poi:poi:5.2.5
```

gson is shadowed (the platform ships 2.13.2), poi activates, and poi's other transitives (commons-codec, commons-io, commons-collections4, commons-math3, log4j-api) were pruned as platform-provided - only SparseBitSet was actually new. Upgrading poi to 5.4.0 changes exactly two things in the lock diff: the poi entry (id and sha256) and SparseBitSet's `via`.

A frozen boot of the same instance with an extra `org.commonmark:commonmark:0.24.0` declared:

```
[WARN ] Declared [com.google.code.gson:gson] is SHADOWED: requested [2.8.9], the platform provides [2.13.2]
[ERROR] Frozen-mode mismatch: Declared as [org.commonmark:commonmark:0.24.0] but not part of [project-lock.json]
[INFO ] Dependency layer swapped to generation [1]: added [com.zaxxer:SparseBitSet:1.3, org.apache.poi:poi:5.4.0]
[INFO ] Maven dependency frozen activation completed: [3] declared, [2] jar(s) activated, [1] failure(s)
```

The locked set activated checksum-verified, the shadowed declaration stayed a report, and the new coordinate was rejected without being downloaded.

## See also

- [Maven dependencies](/help/develop/maven-dependencies) - declaring and configuring.
- [Dependencies view](/help/ide/views/dependencies) - the IDE surface for the report.
- [Environment variables](/help/reference/environment-variables) - `DIRIGIBLE_DEPENDENCIES_*`, `DIRIGIBLE_MAVEN_*`.
