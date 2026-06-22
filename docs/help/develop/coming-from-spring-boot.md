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

Each artifact is shown the **Spring way first, then the Dirigible way**, so you can see how close they are. For jobs, listeners, and websockets there are **two styles** - a self-describing **strong interface** or **method-level annotations** on a `@Component` - and a single `@Component` class uses one or the other, never both. The main difference: in Spring the interface style gets its binding (destination / cron / path) from separate configuration, whereas the Dirigible interface is **self-describing** (the binding is a method on the interface).

### Listener

**Strong interface.** Spring - implement `jakarta.jms.MessageListener` (the destination is set on the listener container in config):

```java
@Component
class OrderListener implements MessageListener {
    public void onMessage(Message message) { /* ... */ }
}
```

Dirigible - implement `MessageHandler` and supply your own `destination()`:

```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.messaging.MessageHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class OrderListener implements MessageHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger("app.out");

    @Override
    public String destination() { return "java-order-queue"; }

    @Override
    public void onMessage(String message) { LOGGER.info("received: {}", message); }
}
```

**Method-level.** Spring - `@JmsListener` on a bean method:

```java
@Component
class Invoices {
    @JmsListener(destination = "java-invoice-queue")
    void onInvoice(String message) { /* ... */ }
}
```

Dirigible - `@Listener` on a `@Component` method:

```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.messaging.Listener;
import org.eclipse.dirigible.sdk.messaging.ListenerKind;

@Component
public class InvoiceListener {
    @Listener(name = "java-invoice-queue", kind = ListenerKind.QUEUE)
    public void onInvoice(String message) { /* ... */ }
}
```

Sample: [`dirigiblelabs/sample-java-listener-decorator`](https://github.com/dirigiblelabs/sample-java-listener-decorator).

### Job

**Strong interface.** Spring - implement Quartz `org.quartz.Job` (the cron lives in a `Trigger` bean):

```java
public class CleanupJob implements Job {
    public void execute(JobExecutionContext context) { /* ... */ }
}
```

Dirigible - implement `JobHandler` and supply your own `cron()`:

```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.job.JobHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class CleanupJob implements JobHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger("app.out");

    @Override
    public String cron() { return "* * * * * ?"; }

    @Override
    public void run() { LOGGER.info("CleanupJob executed!"); }
}
```

**Method-level.** Spring - `@Scheduled` on a bean method:

```java
@Component
class Maintenance {
    @Scheduled(cron = "0/45 * * * * ?")
    void purgeTempFiles() { /* ... */ }
}
```

Dirigible - `@Scheduled` on a `@Component` method (`expression` instead of `cron`):

```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.job.Scheduled;

@Component
public class Maintenance {
    @Scheduled(expression = "0/45 * * * * ?")
    public void purgeTempFiles() { /* ... */ }
}
```

Sample: [`dirigiblelabs/sample-java-job-decorator`](https://github.com/dirigiblelabs/sample-java-job-decorator).

### WebSocket

**Strong interface.** Spring - extend `TextWebSocketHandler` (the path is registered in config):

```java
@Component
class ChatHandler extends TextWebSocketHandler {
    protected void handleTextMessage(WebSocketSession session, TextMessage message) { /* ... */ }
}
```

Dirigible - implement `WebsocketHandler` and supply your own `endpoint()`; override only what you need:

```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.net.WebsocketHandler;

@Component
public class ChatHandler implements WebsocketHandler {
    @Override
    public String endpoint() { return "java-chat"; }

    @Override
    public void onMessage(String message, String from) { /* ... */ }
}
```

**Annotation.** Spring / Jakarta - `@ServerEndpoint` class with `@OnOpen` / `@OnMessage`:

```java
@ServerEndpoint("/java-ticker")
public class TickerHandler {
    @OnOpen    public void opened(Session session) { /* ... */ }
    @OnMessage public String message(String message) { return "tick: " + message; }
}
```

Dirigible - `@Websocket(endpoint = …)` class with `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose` (a non-void `@OnMessage` return is sent back to the client):

```java
import org.eclipse.dirigible.sdk.net.OnMessage;
import org.eclipse.dirigible.sdk.net.OnOpen;
import org.eclipse.dirigible.sdk.net.Websocket;

@Websocket(name = "Java Ticker", endpoint = "java-ticker")
public class TickerHandler {
    @OnOpen    public void opened() { /* ... */ }
    @OnMessage public String message(String message, String from) { return "tick: " + message; }
}
```

Sample: [`dirigiblelabs/sample-java-websocket-decorator`](https://github.com/dirigiblelabs/sample-java-websocket-decorator).

### Controller

Spring - `@RestController` with constructor injection:

```java
@RestController
class CountryController {
    private final CountryRepository countries;
    CountryController(CountryRepository countries) { this.countries = countries; }

    @GetMapping("/{id}")
    Country find(@PathVariable long id) { return countries.findById(id).orElseThrow(); }
}
```

Dirigible - `@Controller`; the return value is serialized as the response body:

```java
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.sdk.http.PathParam;

@Controller
public class CountryController {
    private final CountryRepository countries;
    public CountryController(CountryRepository countries) { this.countries = countries; }

    @Get("/{id}")
    public Country find(@PathParam("id") long id) { return countries.findById(id); }
}
```

See [REST APIs](/help/develop/rest-apis).

### Repository

Spring Data - declare an interface, the framework generates the implementation:

```java
interface CountryRepository extends JpaRepository<Country, Long> { }
```

Dirigible - a **concrete class** extending `JavaRepository<T>`, marked `@Repository` (typed CRUD plus `query(hql, params)`):

```java
import org.eclipse.dirigible.sdk.component.Repository;
import org.eclipse.dirigible.components.data.store.java.repository.JavaRepository;

@Repository
public class CountryRepository extends JavaRepository<Country> {
    public CountryRepository() { super(Country.class); }
}
```

See [Entities and persistence](/help/develop/entities-and-persistence).

### Extension

The shape is the same in both: an interface, `@Component` implementations, and a consumer that injects `List<Interface>` to receive them all.

Spring:

```java
interface SampleExtensionPoint { String describe(); }

@Component
class SampleContribution implements SampleExtensionPoint {
    public String describe() { return "Hello from SampleContribution!"; }
}

@RestController
class InjectingConsumer {
    private final List<SampleExtensionPoint> contributions;
    InjectingConsumer(List<SampleExtensionPoint> contributions) { this.contributions = contributions; }
}
```

Dirigible (no dedicated annotation - the `@Component` name is the contribution name):

```java
import java.util.List;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.http.Controller;

public interface SampleExtensionPoint { String describe(); }

@Component("sample-contribution")
public class SampleContribution implements SampleExtensionPoint {
    @Override
    public String describe() { return "Hello from SampleContribution!"; }
}

@Controller
public class InjectingConsumer {
    private final List<SampleExtensionPoint> contributions;
    public InjectingConsumer(List<SampleExtensionPoint> contributions) { this.contributions = contributions; }
}
```

Sample: [`dirigiblelabs/sample-java-extension-decorator`](https://github.com/dirigiblelabs/sample-java-extension-decorator). See [Extension providers](/help/develop/extension-providers).

## Where to go next

- [Dependency injection](/help/develop/dependency-injection) - `@Component`, `@Inject`, `Beans`.
- [REST APIs](/help/develop/rest-apis) - `@Controller` + the method verbs.
- [Entities and persistence](/help/develop/entities-and-persistence) - `@Entity`, `@Repository`, `JavaRepository`.
- [Scheduled jobs](/help/develop/scheduled-jobs), [Message listeners](/help/develop/message-listeners), [Websockets](/help/develop/websockets), [Extension providers](/help/develop/extension-providers).
- [Security and roles](/help/develop/security-and-roles) - `@Roles` and the `User` API.
- [SDK reference](https://www.dirigible.io/sdk/).
