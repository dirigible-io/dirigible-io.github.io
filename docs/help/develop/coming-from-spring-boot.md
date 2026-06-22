---
title: Coming from Spring Boot
description: A fast-start map from Spring Boot concepts to the Dirigible client-Java model.
---

# Coming from Spring Boot

If you know Spring Boot, the Dirigible Java model will feel familiar: you annotate a class or method to declare intent, and the platform wires it into DI, routing, persistence, scheduling, messaging, websockets, and security. The annotations live under `org.eclipse.dirigible.sdk.*` and deliberately mirror their Spring / Jakarta counterparts.

The big mental shift: your `.java` files are **client code** that the platform compiles in-process and loads through its own classloader. They are **not** part of Spring's component scan, so `@Autowired` is a no-op on them - you use Dirigible's own (Spring-shaped) DI surface instead.

## Mapping table

| Spring / Jakarta | Dirigible | Note |
| --- | --- | --- |
| `@Component` | `@Component` (`sdk.component`) | Same idea; default bean name is the decapitalized class name. |
| `@Autowired` field / constructor | `@Inject` field / constructor injection | Constructor injection is preferred. |
| `List<T>` injection | `List<T>` injection | Receives **every** bean assignable to `T`. |
| `ApplicationContext.getBean(...)` | `Beans.get(...)` / `Beans.get(name, ...)` / `Beans.getAll(...)` (`sdk.component.Beans`) | Client-facing facade - not the platform-internal `BeanProvider`. |
| `@RestController` | `@Controller` (`sdk.http`) | Return value is serialized as the response body. |
| `@GetMapping` / `@PostMapping` / `@PutMapping` / `@PatchMapping` / `@DeleteMapping` | `@Get` / `@Post` / `@Put` / `@Patch` / `@Delete` (`sdk.http`) | Method-level; `value()` is the path suffix with `{name}` placeholders. |
| `@PathVariable` / `@RequestParam` / `@RequestBody` | `@PathParam` / `@QueryParam` / `@Body` (`sdk.http`) | Same parameter-binding roles. |
| `interface … extends JpaRepository<T, ID>` | `class … extends JavaRepository<T>` + `@Repository` | A **concrete class**, not an interface. No derived queries - use `query(hql, params)`. |
| `org.quartz.Job` (interface) | `JobHandler` (`sdk.job`) - self-describing `cron()` + `run()` | Strong-interface job style. |
| `@Scheduled(cron = …)` on a method | `@Scheduled(expression = …)` on a `@Component` method | Method-level scheduling style. |
| `jakarta.jms.MessageListener` | `MessageHandler` (`sdk.messaging`) - self-describing `destination()` / `kind()` + `onMessage` | Strong-interface listener style. |
| `@JmsListener(destination = …)` on a method | `@Listener(name = …, kind = …)` on a `@Component` method | Method-level listener style. |
| `TextWebSocketHandler` | `WebsocketHandler` (`sdk.net`) - self-describing `endpoint()` + callbacks | Strong-interface websocket style. |
| Jakarta `@ServerEndpoint` + `@OnMessage` | `@Websocket(endpoint = …)` class + `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose` | Method-level callback style. |
| `@RolesAllowed` / `@PreAuthorize` | `@Roles` (`sdk.security`) | Any-of role check on a class or method. |
| Spring Security context / principal | `User` (`sdk.security.User`) | Static accessors for the current user. |
| `@PostConstruct` / `@PreDestroy` | `@PostConstruct` / `@PreDestroy` (`jakarta.annotation`) | Same lifecycle callbacks. |

## Side-by-side: implementing each artifact

For jobs, listeners, and websockets Dirigible offers **two styles**: a self-describing **strong interface**, or **method-level annotations** on a `@Component`. A single `@Component` class uses one style or the other - never both. Pick the interface style when the class *is* the handler; pick the annotation style when you want several handlers (or injected collaborators) on one bean.

### Listener

**Strong interface** - implement `MessageHandler`, supply your own `destination()`:

```java
@Component
public class OrderListener implements MessageHandler {

    @Override
    public String destination() {
        return "java-order-queue";
    }

    @Override
    public void onMessage(String message) {
        LOGGER.info("OrderListener received: {}", message);
    }
}
```

**Method-level** - `@Listener` on a `@Component` method (Spring's `@JmsListener` shape):

```java
@Component
public class InvoiceListener {

    private final Auditor auditor;

    public InvoiceListener(Auditor auditor) {
        this.auditor = auditor;
    }

    @Listener(name = "java-invoice-queue", kind = ListenerKind.QUEUE)
    public void onInvoice(String message) {
        auditor.record("invoice received: " + message);
    }
}
```

Sample: [`dirigiblelabs/sample-java-listener-decorator`](https://github.com/dirigiblelabs/sample-java-listener-decorator) (branch `feat/spring-style-listeners`).

### Job

**Strong interface** - implement `JobHandler`, supply your own `cron()`:

```java
@Component
public class CleanupJob implements JobHandler {

    @Override
    public String cron() {
        return "* * * * * ?";
    }

    @Override
    public void run() {
        LOGGER.info("CleanupJob executed!");
    }
}
```

**Method-level** - `@Scheduled` on a `@Component` method:

```java
@Component
public class Maintenance {

    @Scheduled(expression = "0/45 * * * * ?")
    public void purgeTempFiles() {
        LOGGER.info("Maintenance.purgeTempFiles executed!");
    }
}
```

Sample: [`dirigiblelabs/sample-java-job-decorator`](https://github.com/dirigiblelabs/sample-java-job-decorator) (branch `feat/spring-style-jobs`).

### WebSocket

**Strong interface** - implement `WebsocketHandler`, supply your own `endpoint()`; override only the callbacks you need:

```java
@Component
public class ChatHandler implements WebsocketHandler {

    @Override
    public String endpoint() {
        return "java-chat";
    }

    @Override
    public void onMessage(String message, String from) {
        System.out.println("ChatHandler: " + from + " says: " + message);
    }
}
```

**Annotation** - `@Websocket(endpoint = …)` class with `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose` methods (a non-void `@OnMessage` return is sent back to the client):

```java
@Websocket(name = "Java Ticker", endpoint = "java-ticker")
public class TickerHandler {

    @OnOpen
    public void opened() {
        System.out.println("TickerHandler: client connected");
    }

    @OnMessage
    public String message(String message, String from) {
        return "tick: " + message;
    }
}
```

Sample: [`dirigiblelabs/sample-java-websocket-decorator`](https://github.com/dirigiblelabs/sample-java-websocket-decorator) (branch `feat/spring-style-websockets`).

### Controller

A `@Controller` with method-level verb annotations; the return value is serialized as the response body:

```java
@Controller
public class CountryController {

    private final CountryRepository countries;

    public CountryController(CountryRepository countries) {
        this.countries = countries;
    }

    @Get("/{id}")
    public Country find(@PathParam("id") long id) {
        return countries.findById(id);
    }
}
```

See [REST APIs](/help/develop/rest-apis).

### Repository

A **concrete class** extending `JavaRepository<T>`, marked `@Repository` (not a Spring-Data interface). You get typed CRUD plus `query(hql, params)`:

```java
@Repository
public class CountryRepository extends JavaRepository<Country> {
}
```

See [Entities and persistence](/help/develop/entities-and-persistence).

### Extension

No annotation: the **extension point is a plain interface**, a **contribution is a `@Component`** implementing it, and consumers receive all contributions via `List<…>` injection:

```java
public interface SampleExtensionPoint {
    String describe();
}

@Component("sample-contribution")
public class SampleContribution implements SampleExtensionPoint {
    @Override
    public String describe() {
        return "Hello from SampleContribution!";
    }
}

@Controller
public class InjectingConsumer {

    private final List<SampleExtensionPoint> contributions;

    public InjectingConsumer(List<SampleExtensionPoint> contributions) {
        this.contributions = contributions;
    }
}
```

Sample: [`dirigiblelabs/sample-java-extension-decorator`](https://github.com/dirigiblelabs/sample-java-extension-decorator) (branch `feat/spring-style-extension-injection`). See [Extension providers](/help/develop/extension-providers).

## Key differences

1. **Two handler styles, never mixed on one `@Component`.** For jobs, listeners, and websockets you either implement the self-describing interface (`JobHandler` / `MessageHandler` / `WebsocketHandler`) **or** use method-level annotations (`@Scheduled` / `@Listener` / `@OnMessage` …). The engine rejects a class that carries both shapes.
2. **Repositories are concrete classes.** `JavaRepository<T>` gives you typed `findAll`, `findById`, `save`, `update`, `delete`, `deleteById`, `count`, and `query`. There are no Spring-Data derived query methods - write HQL via `query(hql, params)` for anything beyond CRUD.
3. **Singleton scope only.** Every bean is a single instance per classloader generation. There is no `prototype` / `request` / `session` scope.
4. **No declarative `@Transactional` yet.** Transactions are managed by the repository / store operations; there is no method-level transaction demarcation annotation.
5. **Client code is not Spring-scanned.** Your classes are loaded by `ClientClassLoader`, not picked up by `@ComponentScan`, so `@Autowired` does nothing. Use `@Inject` / constructor injection between your own beans and `Beans.get(...)` to reach platform services.

## Where to go next

- [Dependency injection](/help/develop/dependency-injection) - `@Component`, `@Inject`, `Beans`.
- [REST APIs](/help/develop/rest-apis) - `@Controller` + the method verbs.
- [Entities and persistence](/help/develop/entities-and-persistence) - `@Entity`, `@Repository`, `JavaRepository`.
- [Scheduled jobs](/help/develop/scheduled-jobs), [Message listeners](/help/develop/message-listeners), [Websockets](/help/develop/websockets), [Extension providers](/help/develop/extension-providers).
- [Security and roles](/help/develop/security-and-roles) - `@Roles` and the `User` API.
- [SDK reference](https://www.dirigible.io/sdk/).
