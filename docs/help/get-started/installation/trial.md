---
title: Trial
description: Try Dirigible online without installing anything.
---

# Trial

A hosted Dirigible instance is available at [trial.dirigible.io](https://trial.dirigible.io) for evaluation and demos.

## What you get

- Full IDE in the browser, no install required
- Pre-seeded demo projects, sample data sources, and example BPMN processes
- The same runtime engines as the standalone build (JavaScript, TypeScript, Java, Flowable, Quartz, Camel, OData, CMS)

## Limits

- Sessions are ephemeral. Workspaces and registry content are reset periodically; treat the instance as throwaway.
- Outbound network access from user code may be restricted.
- Do not use it for confidential data.

## When to move off it

Once your prototype outgrows a single session, switch to a local install:

- [Docker](/help/get-started/installation/docker) for a quick local runtime
- [Standalone JAR](/help/get-started/installation/jar) for direct host deployment
- [Kubernetes](/help/get-started/installation/kubernetes) for shared / production setups
