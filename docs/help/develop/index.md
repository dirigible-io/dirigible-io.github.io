---
title: Develop
description: Building applications on Eclipse Dirigible — the decorator-driven model.
---

# Develop

Dirigible's modern development model is **decorator / annotation driven**: you declare your intent on a class or method, and the platform wires it into routing, persistence, scheduling, messaging, security, or DI without further configuration.

## Languages

- **[JavaScript](/help/develop/languages/javascript)**
- **[TypeScript](/help/develop/languages/typescript)**
- **[Java](/help/develop/languages/java)** — client `.java` compiled in-process.
- **[Python](/help/develop/languages/python)** — server-side modules.

## Application building blocks

- **[The decorator / annotation model](/help/develop/decorators-model)**
- **[REST APIs](/help/develop/rest-apis)** — `@Controller` + `@Get` / `@Post` + `@Body` etc.
- **[Entities and persistence](/help/develop/entities-and-persistence)** — `@Entity`, `JavaEntityStore`.
- **[Dependency injection](/help/develop/dependency-injection)** — `@Inject` + `@Repository` + `@Component`.
- **[Scheduled jobs](/help/develop/scheduled-jobs)** — `@Scheduled`.
- **[Message listeners](/help/develop/message-listeners)** — `@Listener` + `ListenerKind`.
- **[Extension providers](/help/develop/extension-providers)** — `@Extension`.
- **[Websockets](/help/develop/websockets)** — `@Websocket`.
- **[Security and roles](/help/develop/security-and-roles)** — `@Roles` + `UserFacade`.

## Working with data and the platform

- **[Working with data](/help/develop/working-with-data)** — data sources, schemas, CSVIM.
- **[Working with files and CMS](/help/develop/working-with-files-and-cms)** — IO + CMIS.
- **[Working with Git](/help/develop/working-with-git)**.
- **[Generation from models](/help/develop/using-templates-for-generation)**.

## Quality

- **[Debugging JavaScript](/help/develop/debugging-javascript)**.
- **[Debugging Java](/help/develop/debugging-java)**.
- **[Testing](/help/develop/testing)** — JUnit / QUnit bridges.
