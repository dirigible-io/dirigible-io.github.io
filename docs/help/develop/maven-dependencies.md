---
title: Maven dependencies
description: Declare third-party libraries in project.json - resolved and activated at runtime, no restart.
---

# Maven dependencies

A project declares the third-party Java libraries it needs as `maven` entries in its `project.json`. The platform resolves them from Maven repositories at runtime and activates them without a restart - registry `.java` sources can import the library the moment the resolution completes.

```json
{
    "guid": "invoice-app",
    "dependencies": [
        { "type": "maven", "id": "org.apache.poi:poi:5.4.0" },
        { "type": "maven", "id": "org.postgresql:postgresql:42.7.4", "scope": "platform" },
        { "type": "maven", "id": "com.example:widget:2.1.0",
          "exclusions": ["com.fasterxml.jackson.core:*"] }
    ]
}
```

- **`id`** - the `groupId:artifactId:version` coordinate. Exact versions only; version ranges are rejected as declaration errors.
- **`scope`** - `module` (default) or `platform`, see below.
- **`exclusions`** - transitive exclusions as `groupId:artifactId` entries; the artifactId may be the `*` wildcard.

`git` entries in the same `dependencies` array keep their existing meaning (workspace project cloning) and are ignored by the resolver.

## The two scopes

| | `module` (default) | `platform` |
| --- | --- | --- |
| Classloader | swappable modules classloader | system classloader |
| Add | restartless | restartless |
| Upgrade / remove | restartless | next launch |
| For | ordinary libraries | JDBC drivers, JNI / native-library jars |

**`module`** jars live in a swappable classloader generation. Adding, upgrading and removing all take effect immediately: the platform validates the arriving jars, swaps in a fresh generation, and rebuilds the registry Java sources against it. A jar containing native libraries is refused for this tier (the JVM binds a native library to exactly one classloader), with an error pointing at the platform scope.

**`platform`** jars are appended to the system classloader through the launcher agent, because two library families cannot live in a swappable loader: JDBC drivers (`DriverManager` applies a caller-classloader visibility check) and JNI-bearing libraries. The tier is append-only by JVM design - adding is restartless, while an upgrade or removal is reported as `pending-restart` and takes effect at the next launch. Requires the standard `java -jar` launch of the executable jar; without the agent, platform-scoped additions activate at the next launch from the seed directory.

## What happens on publish

A declaration watcher notices changed `project.json` files in the registry within a few seconds and runs the pipeline; `POST /services/core/dependencies/resolve` runs it on demand. All projects' declarations are resolved as **one union**, so Maven's standard version mediation applies across the whole instance - when two projects request different versions of the same library, one version wins and the outcome is reported (see [How dependency versions are decided](/help/concepts/dependency-resolution)).

The pipeline never half-applies: a declaration or resolution failure leaves the previously installed generation serving, and every failure is reported per coordinate on the endpoint, in the log and in the [Dependencies view](/help/ide/views/dependencies).

## Repositories and credentials

Repositories are **instance-level operator configuration**, never part of `project.json`:

```bash
# Maven Central is the default; an entry with id "central" overrides its URL,
# other entries are added to it
DIRIGIBLE_MAVEN_REPOSITORIES="central=https://repo1.maven.org/maven2,corp=https://maven.pkg.github.com/acme/libs"

# credentials per repository id (uppercased, non-alphanumerics become _)
DIRIGIBLE_MAVEN_CORP_USERNAME=ci-bot
DIRIGIBLE_MAVEN_CORP_PASSWORD=...
```

The user's `~/.m2/settings.xml` mirrors, proxies and server credentials are honored, so corporate setups work unmodified. `DIRIGIBLE_MAVEN_OFFLINE=true` restricts resolution to the local repository (`DIRIGIBLE_MAVEN_LOCAL_REPO`, defaulting to `~/.m2/repository` when present). Credentials never appear in `project.json` or in the logs.

## Inspecting the state

- `GET /services/core/dependencies` - declared coordinates, activated jars, per-artifact status report, mediations, failures, the lockfile path and the classloader generation.
- `POST /services/core/dependencies/resolve` - run the resolution now and return the state.
- The [Dependencies view](/help/ide/views/dependencies) in the Operations perspective renders the same report with status badges and an *Add Dependency* dialog.

## Production

Dynamic resolution is a development-time convenience. Production images should freeze the dependency set: the lockfile records every activated artifact with its checksum, and `DIRIGIBLE_DEPENDENCIES_FROZEN=true` activates exactly that set, verified, without consulting any repository. `DIRIGIBLE_DEPENDENCIES_DYNAMIC=false` switches the mechanism off entirely. See [How dependency versions are decided](/help/concepts/dependency-resolution).

## See also

- [How dependency versions are decided](/help/concepts/dependency-resolution) - mediation, shadowing, the lockfile and frozen mode.
- [Dependencies view](/help/ide/views/dependencies) - the IDE surface.
- [Environment variables](/help/reference/environment-variables) - the full `DIRIGIBLE_DEPENDENCIES_*` / `DIRIGIBLE_MAVEN_*` list.
