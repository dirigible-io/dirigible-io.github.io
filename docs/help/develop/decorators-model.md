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
| Primary key | `@Id` + `@Generated("sequence")` | `@Id` + `@GeneratedValue(GenerationType.SEQUENCE)` |
| Column | `@Column({name, type})` | `@Column(name=..., length=..., nullable=...)` |
| Audit fields | `@CreatedAt`, `@UpdatedAt`, `@CreatedBy`, `@UpdatedBy` | `@CreatedAt`, `@UpdatedAt`, `@CreatedBy`, `@UpdatedBy` |
| Repository / DI | `@Component("CountryRepository")` | `@Repository` |
| Inject | `@Inject("CountryRepository")` | `@Inject` |
| Scheduled job | `@Scheduled(...)` | `@Scheduled(expression="0 0 * * * ?")` |
| Message listener | `@Listener(...)` | `@Listener(name="queue.x", kind=ListenerKind.QUEUE)` |
| Websocket | `@Websocket(...)` | `@Websocket(name="chat", endpoint="chat")` |
| Extension provider | `@Extension(...)` | `@Extension(name="...", to="...")` |
| Role check | `@Roles(["admin"])` | `@Roles({"admin"})` |

## How the wiring happens

The mechanism behind each declaration is the same: at class-load time a consumer reflects over the annotations and registers the class with the relevant platform service.

On the Java side this is the `JavaClassConsumer` SPI run in fixed `@Order`:

1. `EntityClassConsumer` (`@Order(100)`) - `@Entity` classes register with `JavaEntityManager`.
2. `RepositoryClassConsumer` (`@Order(200)`) - `@Repository` classes are instantiated and stored in `RepositoryRegistry`.
3. `ControllerClassConsumer` (`@Order(300)`) - `@Controller` classes have their `@Inject` fields resolved, then their routes registered with `ControllerRouter`.
4. `HandlerClassConsumer` - claims `implements JavaHandler`.

The ordering guarantees that `@Inject CountryRepository` resolves inside the controller consumer - the repository has already been registered in the same rebuild cycle.

On the TypeScript side, dedicated synchronizers (`ComponentSynchronizer`, `EntitySynchronizer`, `OpenAPISynchronizer`, plus the listener / job / websocket / extension synchronizers) scan files matching `*Component.ts`, `*Entity.ts`, `*Controller.ts`, etc. and do the same registration work.

## Pages by concept

- [REST APIs](/help/develop/rest-apis) - `@Controller`, the method verbs, parameter binding, return-value writing.
- [Entities and persistence](/help/develop/entities-and-persistence) - `@Entity`, `@Id`, `@Column`, audit fields, repository pattern.
- [Dependency injection](/help/develop/dependency-injection) - `@Inject`, `@Repository`, `@Component`.
- [Scheduled jobs](/help/develop/scheduled-jobs) - `@Scheduled`.
- [Message listeners](/help/develop/message-listeners) - `@Listener`.
- [Extension providers](/help/develop/extension-providers) - `@Extension`.
- [Websockets](/help/develop/websockets) - `@Websocket`.
- [Security and roles](/help/develop/security-and-roles) - `@Roles`.

## See also

- [The synchronizer model](/help/concepts/synchronizer-model) - how files become runtime state.
- [Java SDK reference](/sdk/).
- [TypeScript API reference](/api/).
