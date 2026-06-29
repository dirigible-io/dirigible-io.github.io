---
title: Harmonia runtime UI
description: The Alpine.js + Harmonia generation stack - a self-contained single-page app served as a web resource, the runtime-UI alternative to the Angular stack.
---

# Harmonia runtime UI

Dirigible generates the runtime UI for a model in one of two stacks. The **Angular + BlimpKit** stack generates one iframe perspective per entity, hosted by the platform dashboard over the `postMessage` hub protocol. The **Alpine.js + Harmonia** stack generates a single client-routed single-page application served as a plain web resource. Both consume the same model and the **same generated Java REST/DAO backend** (`template-application-rest-java`); only the UI layer differs.

The IDE itself - Workbench, Monaco editors, the entity / form / intent modelers - stays on Angular + BlimpKit. Harmonia is a **runtime** stack: generated and custom apps, their shell, views, forms and BPM task forms. The two stacks coexist by URL, not by a shared seam: the IDE shell at its own URL, each Harmonia app as a standalone SPA at `/services/web/<project>/`.

## Picking the stack

Choose the stack when you generate the application UI:

| Template | Stack | Produces |
| --- | --- | --- |
| `template-application-ui-angular-java` | Angular + BlimpKit | iframe-per-entity perspectives, hosted by the dashboard |
| `template-application-ui-harmonia-java` | Alpine.js + Harmonia | a single client-routed SPA per app |
| `template-form-builder-angularjs` | Angular + BlimpKit | a runtime `.form` as an Angular page |
| `template-form-builder-harmonia` | Alpine.js + Harmonia | a runtime `.form` as a Harmonia page |

The model-layer generators (EDM / intent / DAO / REST) and the Java backend are identical across both - the choice is the UI template only. The intent recipe (`<intent>.settings`) can point its `form` and UI templates at the Harmonia variants.

## What gets generated

A complete, runnable SPA under `gen/<genFolder>/`:

```
gen/<genFolder>/
  index.html                          # aggregate shell: x-h-split layout, sidebar,
                                       #   breadcrumb, <template x-route> per entity
  css/app.css
  js/app.js                           # window.App namespace
  js/config.js                        # GENERATED - projectName, basePath, restBase
  js/services/api.js                  # fetch client + ApiError
  js/services/apiError.js             # localizable, user-safe error catalog
  js/services/formValidation.js       # schema validator
  js/components/layout/appShell.js     # the reusable dashboard (Alpine.data 'app')
  js/components/pages/basePage.js
  js/components/pages/baseFormPage.js   # 422 errorCauses -> per-field mapping
  js/components/pages/<persp>/<Entity>ListPage.js   # one per LIST entity
  views/<persp>/<entity>-list.html      # one per LIST entity (Harmonia fragment)
  views/_notfound.html
```

Shared assets are copied verbatim; the only project-specific shell file is `js/config.js`, so the verbatim JS is never Velocity-processed (which would collide with its `$` sigils).

## Architecture

- **Single page, no iframes, no hubs.** [Pinecone Router](https://github.com/rehhouari/pinecone-router) (hash mode, `basePath: '/services/web/<project>'`) declares routes as `<template x-route="/customers" ...>` and renders the matched view fragment into one `<div id="app">`. Each view's root element is an `Alpine.data(...)` page component whose `init()` runs on entry and `destroy()` on exit - fresh per-visit state.
- **`window.App = { services, routes, utils }`** is the global namespace (CDN / no-build style). Stores via `Alpine.store(...)`, pages via `Alpine.data(...)`, services framework-agnostic.
- **Layout** uses Harmonia's `x-h-split` / `x-h-split-panel` for both the sidebar/main division and master-detail views. The shell (`appShell.js`) provides sidebar nav, a top toolbar with a breadcrumb trail derived from the route, a notifications popover, an avatar menu with a light/dark/auto theme switch, and a responsive collapse that re-parents the sidebar into an `x-h-sheet` drawer below 1024 px.

## View types

| View | Status |
| --- | --- |
| list | read-only list page + fragment |
| manage | CRUD list + shared create/edit form (relationship dropdowns, client validation, 422 field mapping, delete-confirm) |
| setting | reuses the manage CRUD, grouped under a **Settings** sidebar section |
| master-detail | `x-h-split` master list + the selected record's detail panels via a runtime registry |
| reports | in-SPA data table (CSV export) + chart.js charts (bar / line / pie / doughnut / polarArea / radar); standalone `.report` files render as a self-contained Harmonia page |
| forms + BPM task forms | rendered by `template-form-builder-harmonia` via the neutral `formController(ctx)` contract |
| Process Inbox (built-in `/inbox`) | Outlook-style master-detail: task list left, the selected task's form inline right, claim-before-open, auto-refresh |
| Documents (built-in `/documents`) | full Document Storage master-detail: file list + preview pane (CSV to table, others via `/preview`), upload, zip, rename, delete, search |
| process tasks | a `processTasks` store fetches `/services/inbox/tasks`, buckets by process instance, surfaces inline task popovers in list / manage / master rows and completes through an app-wide task-form dialog |

## Runtime contracts

These are the invariants the generated SPA relies on:

- **REST base** - `restBase` = `/services/java/<project>/gen/<javaGenFolderName>/api`; each entity page uses a relative `apiPath` = `/<javaPerspectiveName>/<Entity>Controller` and the fetch client prepends `restBase` exactly once. The path uses the **Java-sanitised** folder / perspective names (`sales-order` -> `sales_order`), since the backend package is sanitised. Absolute URLs (relationship dropdowns) pass `{ baseUrl: '' }`.
- **Neutral form contract** - a `.form`'s `code` is the body of `formController(ctx)` with `ctx.{ model, params, http, task: { id, processInstanceId, complete() }, notify, close }`. BPM task forms complete via `ctx.task.complete()`.
- **Master-detail registry** - each detail registers its metadata via `App.registerDetail(<master>, ...)`, so masters render detail panels without enumerating details at generation time.
- **Dates** - forms convert HTML date / datetime / time widget values to the backend `java.time` format on submit and back for edit display.

## Embedding

The whole stack is built into the fat jar - no CDN, for CSP and offline. Alpine, Harmonia, Lucide and chart.js are **webjars** served version-less at `/webjars/...`; Pinecone Router (no published webjar) is vendored under `application-core/.../vendor/`. The generated `index.html` references only these local URLs.

Harmonia's CSS is a fixed, curated Tailwind subset (no build step): unknown utilities silently render as nothing, so stay inside the allow-list or use inline `style=` / CSS variables. Theming is CSS-variable based via `Harmonia.setColorScheme('light' | 'dark' | 'auto')`.

## See also

- [Generation from models](/help/develop/using-templates-for-generation)
- [Intent](/help/intent/) - an intent project can target the Harmonia form / UI templates via `.settings`
- [The polyglot runtime](/help/concepts/polyglot-runtime)
- [Entity Data modeler](/help/ide/modelers/entity-data)
