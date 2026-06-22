---
title: Extensibility
description: Map of extension surfaces - declarative extension points, TS components, Java SPIs, custom synchronizers and engines, custom dialects and auth.
---

# Extensibility

Dirigible exposes a stack of extension surfaces, from declarative file-level hooks up to writing a new artefact type or a custom Spring Security configurator. Use the lowest-effort surface that solves the problem.

## Declarative extension points

The cheapest hook: declare an **extension point** in one project, register an **extension** that targets it from another.

- `*.extensionpoint` - declares a named hook (`name`, `description`).
- `*.extension` - registers a module against an extension point.

Reconciled by `ExtensionPointsSynchronizer` and `ExtensionsSynchronizer` (`core-extensions`). Discovered at runtime via [`@aerokit/sdk/extensions`](/api/extensions).

Use when: you want third-party projects to plug into your app without source changes.

## TS components and DI

Mark a TS class with `@Component(...)` (`*Component.ts`) and consume it elsewhere with `@Inject(...)`. Reconciled by `ComponentSynchronizer`; resolved by `engine-di`.

```ts
import { Component } from "@aerokit/sdk/component";

@Component("Greeter")
export class Greeter {
  public sayHi(name: string) { return `Hello, ${name}`; }
}
```

Use when: you want Spring-style DI inside user TypeScript.

## Java DI container

Every client `.java` class compiled by the platform is built into a single `ComponentContainer` per `ClientClassLoader` generation. `@Component` makes a class a managed bean - and `@Repository`, `@Controller`, `@Scheduled`, `@Listener`, `@Websocket`, and extension contributions are all `@Component`s. The container instantiates each bean, satisfies constructor / `@Inject` field / collection (`List<T>`) injection by type, and registers it with its service (`@Entity` to the entity manager, `@Controller` routes to the router + OpenAPI, scheduled / listener / websocket beans to their engines).

To consume all implementations of a contract from user code, inject a `List<MyInterface>` or call `Extensions.find(MyInterface.class)`.

Use when: you want Spring-style dependency injection inside user Java, or to wire one client class into another.

## Custom synchronizer (new artefact type)

To support a new file extension end to end:

1. Define an `Artefact` JPA entity.
2. Implement a `BaseSynchronizer` (or `MultitenantBaseSynchronizer`) that scans for the extension, parses the file, upserts the entity, and reacts to lifecycle hooks.
3. Wire the engine that consumes the live artefact.
4. Register the module in the matching `components/group/group-*/pom.xml`.

See [The synchronizer model](/help/concepts/synchronizer-model) for the lifecycle and ordering rules.

Use when: you are adding a brand-new artefact type to the platform.

## Custom engine

A "engine" in Dirigible is just a Spring-wired component module that:

- Implements `Engine` (`getName()`, `getProvider()`).
- Owns its lifecycle (`@Component`, `@Configuration`).
- Optionally hosts a synchronizer + endpoints.

Drop a new module under `components/engine/<name>/`, register it in `group-engines/pom.xml`, and the assembly picks it up.

Use when: you want a new runtime capability outside the existing engines.

## Custom `@aerokit/sdk` facade

To expose a Java capability to JavaScript / TypeScript user code:

1. Add a Java module under `components/api/<area>/` with a `<Area>Facade` class - static methods are what JS sees.
2. Mark the method surface with `@CalledFromJS` so refactors do not silently break the bridge.
3. Ship the matching TS bundle under `components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/` (will be published under `@aerokit/sdk/<area>`).

The facade is bridged into the GraalJS context by `engine-javascript` automatically.

## Custom database dialect

Implement `ISqlDialect` (and register via `ISqlDialectProvider`) under `modules/database/database-sql-<name>/`. The platform's SQL builder and DDL emitter pick the dialect up by the connection's product name.

Use when: adding support for a new RDBMS.

## Custom CMS provider

Implement `CmsProvider` and `CmsProviderFactory` (`components/engine/engine-cms`) for a new content-management backend. The existing in-tree examples are `engine-cms-internal`, `engine-cms-s3`, `engine-cms-sharepoint`.

## Custom authentication / security configuration

To add Spring Security configuration without forking the base setup, implement `CustomSecurityConfigurator`. Beans of this type are picked up by the `BasicSecurityConfig` chain and have a chance to register filters / providers / authorisation rules.

## WebJar UI modules

The IDE itself is composed of WebJar modules under `components/ui/`:

- Perspectives (`perspective-*`), editors (`editor-*`), views (`view-*`), menus (`menu-*`).
- Themes (`resources-theme-*`).
- Project templates (`components/template/template-*`).

To add a new perspective, view, editor, or template, follow the layout of an existing one - the assembly picks new modules up via the `group-*` aggregators.

## Decision table

| Goal                                                | Surface                                    |
| --------------------------------------------------- | ------------------------------------------ |
| Hook user code into a named platform event          | `.extensionpoint` / `.extension`           |
| DI inside user TypeScript                           | `*Component.ts`                            |
| DI / wiring inside user Java                        | `@Component` + `@Inject`                   |
| Add a new artefact type / file extension            | Custom synchronizer                        |
| Add a new runtime engine                            | New `components/engine/<name>/` module     |
| Expose Java capability to JS / TS                   | Custom `<Area>Facade` + TS bundle          |
| Support a new RDBMS                                 | `ISqlDialect` + `ISqlDialectProvider`      |
| Plug a CMS backend                                  | `CmsProvider` + `CmsProviderFactory`       |
| Configure Spring Security                           | `CustomSecurityConfigurator`               |
| Add IDE perspective / view / editor / template      | New WebJar module under `components/ui/` or `components/template/` |

## Reference

- [/help/extend/](/help/extend/) - extension-surface authoring guides
- [Dependency injection (develop)](/help/develop/dependency-injection) - the client-Java `@Component` container
- `Synchronizer` / `BaseSynchronizer` - `components/core/core-base/.../synchronizer/`
- `CmsProvider`, `ISqlDialect`, `CustomSecurityConfigurator`, `TemplateEngine` - platform SPIs
