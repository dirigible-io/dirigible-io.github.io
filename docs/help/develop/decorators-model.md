---
title: The decorator / annotation model
description: One unified declarative surface across TypeScript and Java.
---

# The decorator / annotation model

Dirigible's modern development model is **decorator-driven on TypeScript** and **annotation-driven on Java**, with the two surfaces deliberately kept symmetric. The same concept (`@Controller`, `@Entity`, `@Inject`, `@Scheduled`, `@Listener`) means the same thing on both sides; only the import root and the syntax differ.

## Parallel surface

| Concept | TypeScript | Java |
| --- | --- | --- |
| REST controller | `@Controller("/users")` from `@aerokit/sdk/http/decorators` | `@Controller("/users")` from `org.eclipse.dirigible.sdk.http` |
| HTTP method | `@Get("/{id}")` | `@Get("/{id}")` |
| Path / query / body | `@PathParam`, `@QueryParam`, `@Body` | `@PathParam`, `@QueryParam`, `@Body` |
| Entity | `@Entity("User")` from `@aerokit/sdk/db/decorators` | `@Entity` from `org.eclipse.dirigible.sdk.db` |
| Primary key | `@Id` + `@Generated("sequence")` | `@Id` + `@GeneratedValue(strategy = GenerationType.SEQUENCE)` |
| Column | `@Column({name, type})` | `@Column(name=..., length=..., nullable=...)` |
| Audit fields | `@CreatedAt`, `@UpdatedAt`, `@CreatedBy`, `@UpdatedBy` | `@CreatedAt`, `@UpdatedAt`, `@CreatedBy`, `@UpdatedBy` |
| Managed bean | `@Component("Name")` | `@Component` (optional name) |
| Repository / DI | `@Component("CountryRepository")` | `@Repository` (a `@Component`) |
| Inject | `@Inject("CountryRepository")` | `@Inject` (field / constructor / parameter) or constructor injection |
| Scheduled job | `@Scheduled(...)` | `@Component` implementing `JobHandler` (self-describing `cron()`), or `@Scheduled` on a method of a `@Component` |
| Message listener | `@Listener(...)` | `@Component` implementing `MessageHandler` (self-describing `destination()`/`kind()`), or `@Listener` on a method of a `@Component` |
| Websocket | `@Websocket(...)` | `@Component` implementing `WebsocketHandler` (self-describing `endpoint()`), or a `@Websocket` class with `@OnOpen`/`@OnMessage`/`@OnError`/`@OnClose` methods |
| Extension point | `@ExtensionPoint("description")` on an interface | a plain interface (no annotation) |
| Extension provider | `@Extension({target: Contract})` | a `@Component` implementing the interface |
| Role check | `@Roles(["admin"])` | `@Roles({"admin"})` |

## How the wiring happens

The mechanism behind each declaration is the same: at class-load time the platform reflects over the annotations and registers the class with the relevant platform service.

On the Java side every bean is built once per generation. `@Repository`, `@Controller`, and `@Websocket` are `@Component`s, so they are beans too; the platform instantiates them, satisfies constructor / field / collection injection by type, and registers each with its service. Injection is order-independent: any bean can depend on any other regardless of declaration order, so `@Inject CountryRepository` (or a `CountryRepository` constructor parameter) always resolves.

### Two handler styles - never mixed

Jobs, listeners, and websockets each support exactly **two** declaration styles, and a single `@Component` class uses one or the other - **never both** (the engine rejects a class that mixes them):

1. **Self-describing interface.** Implement the SDK companion interface (`JobHandler`, `MessageHandler`, `WebsocketHandler`) on a `@Component`. The interface carries the binding itself - `cron()`, `destination()` / `kind()`, `endpoint()` - so **no class-level `@Scheduled` / `@Listener` / `@Websocket`** is used. This mirrors Spring's `org.quartz.Job`, `jakarta.jms.MessageListener`, and `TextWebSocketHandler`. You get compile-time signature checking, IDE autocomplete, and default no-op callbacks.
2. **Method-level annotation.** Annotate a **method** of a `@Component` bean: `@Scheduled` / `@Listener` on a method (Spring `@Scheduled` / `@JmsListener` style). Websockets are the asymmetric case - `@Websocket(endpoint = "…")` stays a **class** annotation (the endpoint has no method-level home, like Jakarta's `@ServerEndpoint`) and the callbacks are bound by `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose`.

Both styles dispatch directly; there is no reflective by-name fallback. See the per-decorator pages under `/sdk/` for details.

On the TypeScript side, dedicated synchronizers (`ComponentSynchronizer`, `EntitySynchronizer`, `OpenAPISynchronizer`, plus the listener / job / websocket / extension synchronizers) scan files matching `*Component.ts`, `*Entity.ts`, `*Controller.ts`, etc. and do the same registration work.

## Pages by concept

- [REST APIs](/help/develop/rest-apis) - `@Controller`, the method verbs, parameter binding, return-value writing.
- [Entities and persistence](/help/develop/entities-and-persistence) - `@Entity`, `@Id`, `@Column`, audit fields, repository pattern.
- [Dependency injection](/help/develop/dependency-injection) - `@Component`, `@Inject`, constructor and collection injection, `@Repository`.
- [Scheduled jobs](/help/develop/scheduled-jobs) - `@Scheduled`.
- [Message listeners](/help/develop/message-listeners) - `@Listener`.
- [Extension providers](/help/develop/extension-providers) - interface + `@Component`, collection injection.
- [Websockets](/help/develop/websockets) - `@Websocket`.
- [Security and roles](/help/develop/security-and-roles) - `@Roles`.

## See also

- [The synchronizer model](/help/concepts/synchronizer-model) - how files become runtime state.
- [Java SDK reference](/sdk/).
- [TypeScript API reference](/api/).
