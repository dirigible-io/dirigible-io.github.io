---
title: Custom engine
description: Add a new execution engine to the platform.
---

# Custom engine

An "engine" in Dirigible is any runtime that executes user-authored content. The shipping engines cover JavaScript (Graalium), Java (`engine-java`), Python, BPMN (Flowable), Camel, Quartz jobs, message listeners, OData, WebSockets, CMS, templating, and more. Add a new one with a Spring-auto-configured module under `components/engine/engine-<name>/`.

## Module layout

```
components/engine/engine-<name>/
  pom.xml
  src/main/java/.../<engine>/
    config/<Engine>Config.java
    service/<Engine>Service.java
    endpoint/<Engine>Endpoint.java
    synchronizer/<Engine>Synchronizer.java   (if reconciled)
```

## Spring auto-configuration

Each engine is a Spring `@Configuration` (or just one or more `@Component` / `@Service` beans). Spring Boot wires it up automatically when the JAR is on the classpath - there is no manual feature toggle.

## Pairing with a synchronizer

Most engines pair with a synchronizer that reconciles an artefact extension. See [`/help/extend/custom-synchronizer`](/help/extend/custom-synchronizer) for the recipe. The synchronizer's `completeImpl()` is where you hand the live artefact to the engine.

## Pairing with an endpoint

For request-driven engines (JS, Java, Python) the engine usually owns a Spring `@RestController` under `/services/<engine>/...`. See `JavaEndpoint` and `JavascriptEndpoint` for the canonical pattern.

## Adding new JS/TS APIs

If the engine wants to expose Java helpers to user-authored JS / TS code, ship a matching `@aerokit/sdk/<area>` module under `components/api/api-<area>/`. See [`/help/extend/custom-api-module`](/help/extend/custom-api-module).

## Group registration

Add the module to `components/group/group-engines/pom.xml`.

## When to add a new engine vs. a new synchronizer

- New file extension + the runtime is one of the existing engines (Java, JS, BPMN, etc.) -> **synchronizer only**.
- New runtime semantics (new scripting language, new BPM engine variant) -> **synchronizer + engine**.

## See also

- [Custom synchronizer](/help/extend/custom-synchronizer)
- [Custom API module](/help/extend/custom-api-module)
- [Polyglot runtime](/help/concepts/polyglot-runtime)
