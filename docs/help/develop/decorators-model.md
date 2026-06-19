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
| Scheduled job | `@Scheduled(...)` | `@Scheduled` on a class implementing `JobHandler`, or on a method of a `@Component` |
| Message listener | `@Listener(...)` | `@Listener` on a class implementing `MessageHandler`, or on a method of a `@Component` |
| Websocket | `@Websocket(...)` | `@Websocket` on a class implementing `WebsocketHandler`, or `@OnOpen`/`@OnMessage`/`@OnError`/`@OnClose` methods of a `@Component` |
| Extension point | `@ExtensionPoint("description")` on an interface | `@ExtensionPoint("description")` on an interface |
| Extension provider | `@Extension({target: Contract})` | `@Extension(target=Contract.class, name="...")` |
| Role check | `@Roles(["admin"])` | `@Roles({"admin"})` |

## How the wiring happens

The mechanism behind each declaration is the same: at class-load time the platform reflects over the annotations and registers the class with the relevant platform service.

On the Java side a single `ComponentContainer` builds all beans per `ClientClassLoader` generation. Because `@Repository`, `@Controller`, `@Scheduled`, `@Listener`, `@Websocket`, and `@Extension` are all meta-annotated `@Component`, they are beans too - the container instantiates them, satisfies constructor / field / collection injection by type, and then registers each with its service (`@Entity` → `JavaEntityManager`, `@Controller` routes → `ControllerRouter`, and so on). Injection is order-independent: any bean can depend on any other regardless of declaration order, so `@Inject CountryRepository` (or a `CountryRepository` constructor parameter) always resolves within the same rebuild cycle.

### Strong interfaces or method-level annotations

`@Scheduled`, `@Listener`, and `@Websocket` each ship a companion interface in the SDK (`JobHandler`, `MessageHandler`, `WebsocketHandler`) - implement it for compile-time signature checking, IDE autocomplete, default no-op callbacks, and direct (non-reflective) dispatch. Alternatively, annotate a **method** of a `@Component` bean: `@Scheduled` / `@Listener` on a method (Spring `@Scheduled` / `@JmsListener` style), or `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose` for websockets. The legacy method-by-name reflective convention remains as a fallback, so existing handlers keep working unchanged. See the per-decorator pages under `/sdk/` for details.

On the TypeScript side, dedicated synchronizers (`ComponentSynchronizer`, `EntitySynchronizer`, `OpenAPISynchronizer`, plus the listener / job / websocket / extension synchronizers) scan files matching `*Component.ts`, `*Entity.ts`, `*Controller.ts`, etc. and do the same registration work.

## Pages by concept

- [REST APIs](/help/develop/rest-apis) - `@Controller`, the method verbs, parameter binding, return-value writing.
- [Entities and persistence](/help/develop/entities-and-persistence) - `@Entity`, `@Id`, `@Column`, audit fields, repository pattern.
- [Dependency injection](/help/develop/dependency-injection) - `@Component`, `@Inject`, constructor and collection injection, `@Repository`.
- [Scheduled jobs](/help/develop/scheduled-jobs) - `@Scheduled`.
- [Message listeners](/help/develop/message-listeners) - `@Listener`.
- [Extension providers](/help/develop/extension-providers) - `@Extension`.
- [Websockets](/help/develop/websockets) - `@Websocket`.
- [Security and roles](/help/develop/security-and-roles) - `@Roles`.

## See also

- [The synchronizer model](/help/concepts/synchronizer-model) - how files become runtime state.
- [Java SDK reference](/sdk/).
- [TypeScript API reference](/api/).
