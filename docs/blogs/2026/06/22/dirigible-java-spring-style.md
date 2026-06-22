---
title: "Muscle Memory: Spring-Style Beans and Injection Land in Eclipse Dirigible Java"
description: "@Component, constructor injection, List<T> collection injection, a Beans facade, and two clean handler styles for jobs, listeners and websockets - the client-Java model now thinks the way a Spring Boot developer already does. No XML, no component scan, no restart."
author: Iliyan Velichkov
author_gh_user: iliyan-velichkov
author_avatar: https://avatars.githubusercontent.com/u/5058839?v=4
read_time: 8 min
publish_date: June 22, 2026
---

A month ago [the decorators came home to Java](../../05/19/dirigible-java-decorators.md) - `@Entity`, `@Repository`, `@Controller`, `@Inject`, hot-reloaded straight from the registry. That post ended on a promise: typed, annotated, alive.

This post is about the part underneath. The part that decides what gets created, in what order, and wired to what. Because an annotation is only as good as the container that honours it - and Dirigible's client-Java model now ships a real one.

If you have written Spring Boot, you already know how to use it. That is the whole point.

## The premise: it's a bean container

In Spring Boot you annotate a class `@Component`, declare its collaborators in the constructor, and trust the container to hand them over. You never call `new`. You never look anything up. You describe *what* you need and the framework arranges *how*.

Dirigible's client Java now works exactly like that. Every client `.java` you drop into `/registry/public/<project>/...` is compiled in one `javac` pass, loaded into a fresh classloader, and fed to a single `ComponentContainer` that builds and wires your beans before the first request arrives. One container per reload generation. No `applicationContext.xml`. No `@ComponentScan` base packages. No `@SpringBootApplication`.

```java
package demo;

import org.eclipse.dirigible.sdk.component.Component;

@Component
public class GreetingService {
    public String greet(String name) {
        return "Hello, " + name + "!";
    }
}
```

That is a managed singleton. `@Repository`, `@Controller` and `@Websocket` are meta-annotated `@Component`, so they are beans too - the same way `@Service` and `@RestController` are `@Component` in Spring.

## Injection, three ways - constructor first

The headline is **constructor injection**, and for the same reasons Spring's team has been recommending it for a decade: it makes dependencies explicit, the fields `final`, and the object impossible to construct in a half-wired state.

```java
package demo;

import org.eclipse.dirigible.sdk.http.*;

@Controller
public class GreetingController {

    private final GreetingService greetings;

    public GreetingController(GreetingService greetings) {   // ← filled in by type
        this.greetings = greetings;
    }

    @Get("/greet/{name}")
    public String greet(@PathParam("name") String name) {
        return greetings.greet(name);
    }
}
```

Field injection is there when you want it - `@Inject` (`org.eclipse.dirigible.sdk.component.Inject`) on a field - but constructor injection is the default you should reach for.

And then the one that turns a list of plug-ins into a feature: **collection injection**. Ask for a `List<T>` and the container hands you *every* bean assignable to `T` - the exact shape of Spring's "inject all implementations of an interface".

```java
@Component
public class GreetingRegistry {

    private final List<Greeter> greeters;   // every @Component Greeter, collected

    public GreetingRegistry(List<Greeter> greeters) {
        this.greeters = greeters;
    }

    public int available() { return greeters.size(); }
}
```

When an injection point is genuinely awkward to reach - a static utility, a third-party callback - there is a programmatic escape hatch, the **`Beans` facade**, the equivalent of Spring's `ApplicationContext.getBean`:

```java
import org.eclipse.dirigible.sdk.component.Beans;

GreetingService svc = Beans.get(GreetingService.class);
List<Greeter> all   = Beans.getAll(Greeter.class);
```

Resolution is by type, order-independent within a reload generation, with construction-cycle detection - so `A(B)` and `B(A)` is reported as the mistake it is, not a stack overflow at 3 a.m.

## Background work, two clean styles - never mixed

This is where the model got opinionated, and better for it. Jobs, message listeners and websockets each support **exactly two** styles - and a single `@Component` class must pick **one**. The engine rejects a class that mixes them, with a clear error, rather than guessing. That is precisely the Spring/Jakarta discipline: you implement `org.quartz.Job` *or* you put `@Scheduled` on a method - never both on one class.

### Style 1 - the self-describing interface

Implement a typed interface that carries *both* the callback and its binding. No class annotation at all - exactly like `org.quartz.Job`, `jakarta.jms.MessageListener`, or Spring's `TextWebSocketHandler`.

```java
@Component
public class CleanupJob implements JobHandler {
    public String cron() { return "0 0 * * * ?"; }   // binding lives on the interface
    public void run()    { /* … */ }
}

@Component
public class OrderListener implements MessageHandler {
    public String destination() { return "java-order-queue"; }
    public void onMessage(String message) { /* … */ }
}

@Component
public class ChatHandler implements WebsocketHandler {
    public String endpoint() { return "java-chat"; }
    public void onMessage(String message, String from) { /* … */ }
}
```

`JobHandler.cron()`, `MessageHandler.destination()` / `kind()`, `WebsocketHandler.endpoint()` - the contract is the configuration. Nothing on the class to drift out of sync.

### Style 2 - the method-level annotation

Annotate a method on a `@Component` bean - Spring's `@Scheduled` / `@JmsListener`, and Jakarta's `@ServerEndpoint` + `@OnMessage`. One bean can host several such methods and use injected collaborators.

```java
@Component
public class Maintenance {
    @Scheduled(expression = "0/30 * * * * ?")
    public void purgeTempFiles() { /* … */ }
}

@Component
public class InvoiceListener {
    private final Auditor auditor;
    public InvoiceListener(Auditor auditor) { this.auditor = auditor; }

    @Listener(name = "java-invoice-queue", kind = ListenerKind.QUEUE)
    public void onInvoice(String message) { auditor.record(message); }
}

@Websocket(name = "Ticker", endpoint = "java-ticker")
public class TickerHandler {
    @OnOpen    public void opened() { /* … */ }
    @OnMessage public String tick(String message, String from) { return "tick: " + message; }
    @OnClose   public void closed() { /* … */ }
}
```

(The websocket `@Websocket` class annotation stays for style 2 only - the endpoint path has no method to live on, just as Jakarta puts it on `@ServerEndpoint`.)

Pick the interface when the handler *is* the unit; pick the method annotation when one bean owns several handlers or leans on injected collaborators. Both are first-class. Neither is a fallback.

## Extension points, without an annotation

The same idea retires the old `@Extension` / `@ExtensionPoint` pair entirely. An extension point is now a **plain Java interface**. A contribution is a `@Component` that implements it. Consumers inject `List<ThatInterface>` - the collection-injection mechanism you already met above.

```java
public interface SampleExtensionPoint {       // the point: a plain interface
    String describe();
}

@Component("sample-contribution")             // the contribution: a bean
public class SampleContribution implements SampleExtensionPoint {
    public String describe() { return "Hello from SampleContribution!"; }
}

@Controller
public class InjectingConsumer {
    private final List<SampleExtensionPoint> contributions;   // every implementor, injected
    public InjectingConsumer(List<SampleExtensionPoint> contributions) {
        this.contributions = contributions;
    }
    @Get("/injected-contributions")
    public List<String> list() {
        return contributions.stream().map(SampleExtensionPoint::describe).toList();
    }
}
```

No registry to declare, no annotation to remember. "Find every provider of X" is just `List<X>`. (`Extensions.find(X.class)` remains for the programmatic style, and cross-language TypeScript/JavaScript contributions are still reachable by name.)

## The cheat sheet

| Spring Boot | Dirigible client Java |
| - | - |
| `@Component` / `@Service` | `@Component` |
| `@Repository` | `@Repository` (a `@Component`) |
| `@RestController` | `@Controller` (a `@Component`) |
| constructor injection | constructor injection (preferred) |
| `@Autowired` field | `@Inject` field |
| `List<T>` of all beans | `List<T>` collection injection |
| `ApplicationContext.getBean` | `Beans.get(Class)` / `Beans.getAll(Class)` |
| `org.quartz.Job` / `@Scheduled` | `JobHandler` / `@Scheduled` |
| `MessageListener` / `@JmsListener` | `MessageHandler` / `@Listener` |
| `TextWebSocketHandler` / `@ServerEndpoint`+`@OnMessage` | `WebsocketHandler` / `@Websocket`+`@OnX` |
| inject `List<Interface>` of beans | extension point = interface + `@Component` |

A full side-by-side walkthrough lives in the new [Coming from Spring Boot](/help/develop/coming-from-spring-boot) guide.

## What you don't do

You don't write XML. You don't configure a component scan. You don't run `mvn package`, and you don't restart the server. Save the file; the synchronizer recompiles every client source, swaps in a fresh classloader, rebuilds the container, and your next request hits the new wiring. The previous generation becomes unreachable and the JVM reclaims its Metaspace.

And when something *is* wrong - an unsatisfied dependency, an ambiguous type, a construction cycle, a class that mixed two handler styles - it doesn't fail silently. Both compile errors and **bean-wiring errors** surface in the IDE **Problems** view and mark the file, so you see exactly what the container could not build, in the browser, without tailing a log.

## Try it

Every style above ships as a working, cloneable sample - each now exercised by an integration test that asserts *both* its interface and its annotation variant:

- [`dirigiblelabs/sample-java-entity-decorators`](https://github.com/dirigiblelabs/sample-java-entity-decorators) - the kitchen sink: `@Entity` / `@Repository` / `@Controller`, plus a `@Component` service constructor-injected into a controller and the `Beans` facade.
- [`dirigiblelabs/sample-java-job-decorator`](https://github.com/dirigiblelabs/sample-java-job-decorator) - `JobHandler` and `@Scheduled`.
- [`dirigiblelabs/sample-java-listener-decorator`](https://github.com/dirigiblelabs/sample-java-listener-decorator) - `MessageHandler` and `@Listener`, with an injected collaborator.
- [`dirigiblelabs/sample-java-websocket-decorator`](https://github.com/dirigiblelabs/sample-java-websocket-decorator) - `WebsocketHandler` and `@Websocket` + `@OnX`.
- [`dirigiblelabs/sample-java-extension-decorator`](https://github.com/dirigiblelabs/sample-java-extension-decorator) - a plain-interface extension point consumed by collection injection.

The annotations and facades live under `org.eclipse.dirigible.sdk.*`; the full reference is at [`/sdk/`](https://www.dirigible.io/sdk/).

Two languages, one platform, one container. Your Java now thinks in beans - and you already knew how.
