---
title: Concepts
description: Architecture, runtime model, and key abstractions of Eclipse Dirigible.
---

# Concepts

Read these in order. They define the mental model used everywhere else in the docs.

- **[Platform overview](/help/concepts/platform-overview)** — hpaPaaS, "in-system programming", what the single fat-jar bundles.
- **[Polyglot runtime](/help/concepts/polyglot-runtime)** — JavaScript / TypeScript / Java / Python sharing one JVM.
- **[Repository and workspace](/help/concepts/repository-and-workspace)** — `/registry/public/...` vs `/users/.../workspace/...`.
- **[Projects and artefacts](/help/concepts/projects-and-artefacts)** — a folder is a project; a file is an artefact.
- **[The synchronizer model](/help/concepts/synchronizer-model)** — how files become live runtime state.
- **[Publish and reconcile](/help/concepts/publish-and-reconcile)** — Save → publish → live.
- **[Multi-tenancy](/help/concepts/multi-tenancy)** — default on; what's isolated and what isn't.
- **[Security model](/help/concepts/security-model)** — roles, access rules, anonymous mode, super-roles.
- **[Lifecycle and hot-reload](/help/concepts/lifecycle-and-hot-reload)** — how edits propagate without redeploy.
- **[Extensibility](/help/concepts/extensibility)** — extension points and SPI surfaces.
