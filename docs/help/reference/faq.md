---
title: FAQ
description: Frequently asked questions.
---

# FAQ

## What is Eclipse Dirigible?

A high-productivity application platform (hpaPaaS). One Spring Boot fat jar bundles an in-browser IDE plus runtime engines (GraalJS, Flowable BPM, Camel, Quartz, Lucene, CMS, OData, JDBC). See [`/help/concepts/platform-overview`](/help/concepts/platform-overview).

## Which languages can I write code in?

JavaScript, TypeScript, Java, and Python - all running in the same JVM. See [`/help/concepts/polyglot-runtime`](/help/concepts/polyglot-runtime).

## How does code reach the running system?

Files in the published-projects registry (`/registry/public/...`) are reconciled into runtime state by **synchronizers** on every change. No separate deploy step. See [`/help/concepts/synchronizer-model`](/help/concepts/synchronizer-model).

## Is there a "production" mode?

The platform runs the same way in dev and production. Tighten via env vars: disable anonymous mode, set strong basic-auth credentials, switch to an OIDC provider, point at a managed database, set up Helm-driven Kubernetes. See [`/help/setup/`](/help/setup/) and [`/help/operate/`](/help/operate/).

## How do I make my code accessible without authentication?

Two ways:

1. Use the `/public/...` URL roots instead of `/services/...`.
2. Set `DIRIGIBLE_ANONYMOUS_MODE_ENABLED=true` to bypass authentication globally. Useful for read-only public deployments.

## Can I mix TypeScript and Java in the same project?

Yes. A single project can hold `.ts`, `.java`, `.py`, `.bpmn`, etc. side by side. They share data sources, the broker, jobs, security context. See [`/help/concepts/polyglot-runtime`](/help/concepts/polyglot-runtime).

## How do I add a new artefact type?

Implement `BaseSynchronizer` (or `MultitenantBaseSynchronizer`), pair with a JPA entity extending `Artefact`, plus an engine to consume the live artefact. See [`/help/extend/custom-synchronizer`](/help/extend/custom-synchronizer).

## Why is the H2 default database not enough?

H2 is file-local. For multi-pod deployments and serious workloads switch to PostgreSQL, MSSQL, or another supported RDBMS. See [`/help/setup/databases/`](/help/setup/databases/).

## How do I debug Java code in the IDE?

Use the [Java debugger view](/help/ide/views/debugger-java). It bridges JDT.LS's DAP to the platform's JDWP port (`8000` by default).

## How do I debug JavaScript / TypeScript code?

Use the [JavaScript debugger view](/help/ide/views/debugger-js). Set breakpoints in the Monaco gutter. The Graalium debugger listens on port `8081`.

## What's the difference between `@aerokit/sdk/*` and the old `@dirigible/*`?

`@aerokit/sdk/*` is the canonical package name. The legacy `@dirigible/*` aliases still resolve. New code should use `@aerokit/sdk/*`.

## How do I report a bug?

Open an issue on the [GitHub repository](https://github.com/eclipse/dirigible/issues).

## See also

- [Concepts](/help/concepts/)
- [Setup overview](/help/setup/)
- [Glossary](/help/reference/glossary)
- [Troubleshooting](/help/operate/troubleshooting)
