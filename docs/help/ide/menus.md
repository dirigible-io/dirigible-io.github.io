---
title: Menus
description: Per-perspective top-bar menus contributed by components/ui/menu-*.
---

# Menus

Every perspective renders its own top-bar menu. Menus are independent WebJar modules under `components/ui/menu-*`; the shell mounts the menu registered for the active perspective and swaps it when the perspective changes. Add a new menu by shipping a new module with the matching id.

## Built-in menus

| Module             | Mounted in                            | Typical actions                                                       |
|--------------------|---------------------------------------|-----------------------------------------------------------------------|
| `menu-projects`    | [Workbench](/help/ide/perspectives/workbench)   | New project / file / folder, import, publish, unpublish, generate.    |
| `menu-database`    | [Database](/help/ide/perspectives/database)     | New datasource, refresh schema, execute, export result.               |
| `menu-schema`      | Database Schema modeler               | Add table / view, generate DDL, validate.                             |
| `menu-entity`      | Entity Data modeler                   | Add entity, add navigation, generate application.                     |
| `menu-bpm`         | BPMN modeler                          | New process, deploy, validate, palette toggle.                        |
| `menu-camel`       | Integrations (Karavan) editor         | New route, run, kameleon catalog, validate.                           |
| `menu-csv`         | CSV editor                            | Add row / column, delimiter, header row, save as CSVIM.               |
| `menu-extensions`  | Extensions editor                     | New extension point, new extension, link, save.                       |
| `menu-form-builder`| Form Designer                         | Add control, group, repeat, preview.                                  |
| `menu-help`        | Shell global menu                     | About, documentation links, shortcuts, version.                       |
| `menu-jobs`        | [Jobs](/help/ide/perspectives/jobs) and Jobs editor | Trigger, enable / disable, edit cron, view next-fire.        |
| `menu-listeners`   | Listeners editor                      | New listener, link queue / topic, role binding.                       |
| `menu-mapping`     | Mapping editor                        | New mapping, source / target picker, generate code.                   |
| `menu-security`    | [Security](/help/ide/perspectives/security)     | New role, new access rule, new client registration.                   |
| `menu-websockets`  | Websockets editor                     | New endpoint, role binding, save.                                     |

## Authoring

A menu module is a WebJar with a single AngularJS view; declare its actions through standard BlimpKit menu directives. Cross-link to [Editors](/help/ide/editors/) for the artefacts the menu acts on.
