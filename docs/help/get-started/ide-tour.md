---
title: Tour the IDE
description: Find your way around the in-browser workbench.
---

# Tour the IDE

The IDE is a single-page web app shipped inside the runtime. Open it at [http://localhost:8080](http://localhost:8080).

## Layout

```
+-----------------------------------------------------------+
| Top shell  -  brand, perspective switcher, user menu      |
+----+------------------------------------------------------+
| P  | Project tree                                         |
| e  +--------+---------------------------------------------+
| r  |        |                                             |
| s  |        |   Editor area  (tabs, Monaco, modelers)     |
| p  |        |                                             |
|    +--------+---------------------------------------------+
|    | Bottom panel  -  console, problems, logs, terminal   |
+----+------------------------------------------------------+
```

- **Top shell** - branding, the perspective switcher, the user menu, and global actions.
- **Left rail** - icons for each registered perspective. Click one to switch.
- **Project tree** - workspace contents (`/users/<you>/workspace/...`). Right-click any node for create / publish / git actions.
- **Editor area** - Monaco for code, custom modelers for `.bpmn`, `.edm`, `.dsm`, `.form`, etc.
- **Bottom panel** - tabs for **Console**, **Problems**, **Logs**, **Terminal**, **Result Set**, and others depending on the active perspective.

## Perspectives

Pick from the left rail. The most-used ones:

- **Workbench** - default. Project tree + editors.
- **Git** - clone, commit, push, merge against the project's git repository.
- **Database** - browse data sources, run SQL, view result sets. Pages: [Databases](/help/ide/perspectives/).
- **Documents** - CMIS content management (internal, S3, SharePoint).
- **Jobs** - inspect Quartz schedules, trigger jobs manually.
- **Operations** - runtime state, synchronizer status, JVM monitoring, ActiveMQ broker inspection.
- **BPM** - process inbox, deployed process definitions, running instances.
- **Modelers** - entity (EDM), schema (DSM), form, OData, etc. See [Modelers](/help/ide/modelers/).

## Where to find common things

| Looking for | Where |
| ----------- | ----- |
| Data sources | **Database** perspective, top of the tree |
| Scheduled jobs | **Jobs** perspective |
| OpenAPI explorer | `http://localhost:8080/swagger-ui/index.html` (or **Operations > OpenAPI**) |
| Shell terminal | **Terminal** tab in the bottom panel (uses `ttyd` on port 9000) |
| Server logs | **Logs** tab in the bottom panel |
| Java debugger | **Java Debug** view in the Workbench left sidebar; attaches to the JVM over JDWP |
| JS / TS debugger | Chrome DevTools - connect to the Graalium port (default `8081`) |
| Spring Boot Admin | `http://localhost:8080/spring-admin/` |
| Actuator probes | `/actuator/health/liveness`, `/actuator/health/readiness` |

## Detailed pages

- [Editors](/help/ide/editors/)
- [Modelers](/help/ide/modelers/)
- [Perspectives](/help/ide/perspectives/)
- [Views](/help/ide/views/)

## Next

- [Your first application](/help/get-started/first-application)
- [Next steps](/help/get-started/next-steps)
