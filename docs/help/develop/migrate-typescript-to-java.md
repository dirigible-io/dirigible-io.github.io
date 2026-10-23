---
title: Migrating from TypeScript to Java
description: Move server-side JavaScript and TypeScript to Java, construct by construct, before 16.0 removes them.
---

# Migrating from TypeScript to Java

Server-side JavaScript and TypeScript - the GraalJS engine, the TypeScript decorators and the JavaScript SDK `@aerokit/sdk` on the server - are deprecated and will be removed in 16.0. This guide maps every server-side construct to its Java counterpart, each with a short TypeScript "before" and a Java "after".

Browser-side JavaScript is not affected: the pages of a Harmonia or AngularJS UI, form scripts, and the Playwright runner for application tests stay as they are.

::: tip Generated code: regenerate, do not port
Code produced from a model - an `.edm` / `.model` generation or an intent application - is regenerated, not ported by hand. Generate from the `.model` again with the Java templates (*Application - DAO - Java*, *Application - REST - Java*, *Application - Glue Code - Java*, *Application - UI (Harmonia) - Java*), and Generate an `app.intent` again: intent applications are Java already. Port by hand only what you wrote yourself.
:::

## Timeline

| Release | What happens |
| ------- | ------------ |
| 15.0 | Server-side JavaScript and TypeScript are deprecated. The Java edition images are published. JavaScript and TypeScript keep running unchanged. |
| 15.x | The platform flags every project that uses them - a log warning, a Problems view entry and an IDE banner, each linking to this guide (see [Deprecation signals](#deprecation-signals)). Execution is unchanged. |
| 16.0 | Removed. The platform no longer contains the JavaScript and TypeScript engines or the JavaScript SDK, and `latest` and the version tags become the Java edition. There is no separate `-java` tag any more. |

## What moves and what stays

**Moves to Java:**

- `.ts` sources (not `.d.ts`), `.mjs` modules, and `.js` files that import the JavaScript SDK.
- Job, listener and websocket descriptors, BPMN service tasks and Camel route steps that name a script handler.
- Intent `call:` steps that name a `.ts` / `.js` / `.mjs` handler.
- Script extension modules - a `.extension` whose `module` is a `.js` or `.ts` file.
- Server-side tests written with `@aerokit/sdk/junit` or QUnit.

**Stays as it is:** the declarative artefacts (`.table`, `.schema`, `.view`, `.csvim`, `.datasource`, `.roles`, `.access`, `.form`, `.report`, `.edm`, `.model`, `app.intent`), the data, and all browser-side JavaScript.

## The Java edition

The Java edition is the platform without the JavaScript and TypeScript stack. It includes the IDE, the generation templates and the intent engine, and runs Java applications unchanged.

| Image | Content |
| ----- | ------- |
| `dirigiblelabs/dirigible:latest` | The default edition, with the JavaScript and TypeScript stack (until 16.0). |
| `dirigiblelabs/dirigible:latest-java` | The Java edition, built from the current main line. |
| `dirigiblelabs/dirigible:<version>-java` | The Java edition of a release, e.g. `15.0.0-java`. Pin this in production. |

```bash
docker run --rm -p 8080:8080 dirigiblelabs/dirigible:latest-java
```

Not in the Java edition: GraalJS, the TypeScript engine, the JavaScript SDK, and Node.js (so no `tsc` and no `npm` in the IDE terminal). The image keeps `ttyd` for the IDE terminal and `git` for the Git perspective.

Nothing server-side in JavaScript or TypeScript runs there. `.ts` and `.mjs` services are not served, a job, listener or websocket that names a script is registered `FAILED` with the missing engine as its reason, a process or route step that calls a script fails when it runs, and script extension modules are skipped. The deprecation entry of each such project counts what was skipped, so dropping the engine is never silent.

Use the Java edition to prove a migration: a project that publishes on it with no `JavaScript deprecation` entry in the Problems view and no `FAILED` artefact has nothing left to port.

## Project layout

**Before** - TypeScript, transpiled by `tsc`:

```
orders/
├── project.json            # "actions": [ { "name": "Build TypeScript", ... "tsc" ... } ]
├── tsconfig.json
├── CountryEntity.ts
├── CountryRepository.ts
└── CountryController.ts    # /services/ts/orders/CountryController.ts/...
```

**After** - Java, compiled by the platform on publish:

```
orders/
├── project.json            # no build action
└── demo/
    ├── Country.java        # package demo;
    ├── CountryRepository.java
    └── CountryController.java   # /services/java/orders/demo/CountryController/...
```

- A class's package mirrors its folder under the project: `orders/demo/Country.java` declares `package demo;`.
- Every published Java source of the instance compiles in one batch, so a fully qualified class name must be unique across projects. Compile errors (with their line) and wiring errors appear in the Problems view.
- Delete `tsconfig.json`, the `tsc` action in `project.json`, `node_modules` and the transpiled `.js` files.
- Generated intent applications use `gen/` (generated, never edited) and `custom/` (hand-written) packages; hand-written code that wants [slice tests](#tests) keeps its classes under `custom/`.

See [Java](/help/develop/languages/java) and [Coming from Spring Boot](/help/develop/coming-from-spring-boot) for the Java model itself.

## Decorators to annotations

All annotations live under `org.eclipse.dirigible.sdk.*`.

| TypeScript decorator | Java |
| -------------------- | ---- |
| `@Entity`, `@Table`, `@Column`, `@Id` (`@aerokit/sdk/db`) | `@Entity`, `@Table(name = ...)`, `@Column(name = ...)`, `@Id` (`sdk.db`) |
| `@Generated("sequence")` | `@GeneratedValue(strategy = GenerationType.IDENTITY)` (`sdk.db`) |
| `@CreatedAt`, `@UpdatedAt`, `@CreatedBy`, `@UpdatedBy` | the same names (`sdk.db`), plus `@Transient` and `@Lob` |
| `@OneToMany`, `@ManyToOne` | none - see [Entities](#entities) |
| `Repository<T>` + `@Component("...")` | `@Repository` class `extends JavaRepository<T>` |
| `@Controller` + `@Get` / `@Post` / `@Put` / `@Patch` / `@Delete` (`@aerokit/sdk/http`) | `@Controller` + the same method annotations (`sdk.http`), with `@PathParam`, `@QueryParam`, `@Body`, `@Context` |
| `@Head`, `@Options` | none |
| `@Documentation` (`http` and `db`) | `@Documentation` (`sdk.platform`) |
| `@Component`, `@Injected`, `@Inject("name")` (`@aerokit/sdk/component`) | `@Component` and constructor injection; `@Inject` on a field (`sdk.component`) |
| `@Roles([...])` (`@aerokit/sdk/security`) | `@Roles({...})` on a `@Controller` class or method (`sdk.security`) |
| `@Scheduled({ expression })` (`@aerokit/sdk/job`) | `JobHandler`, or `@Scheduled(expression = ...)` on a `@Component` method (`sdk.job`) |
| `@Listener({ name, kind })` (`@aerokit/sdk/messaging`) | `MessageHandler`, or `@Listener(name = ..., kind = ...)` on a `@Component` method (`sdk.messaging`) |
| `@Websocket({ name, endpoint })` (`@aerokit/sdk/net`) | `WebsocketHandler`, or `@Websocket(name = ..., endpoint = ...)` with `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose` (`sdk.net`) |
| `@Extension({ name, to })` (`@aerokit/sdk/extensions`) | a `@Component` implementing a plain Java interface |

### Entities

**Before:**

```ts
import { Entity, Table, Id, Generated, Column, Documentation } from "@aerokit/sdk/db";

@Entity("CountryEntity")
@Table("SAMPLE_COUNTRY")
@Documentation("Sample Country Entity")
export class CountryEntity {

    @Id()
    @Generated("sequence")
    @Column({ name: "COUNTRY_ID", type: "long" })
    public Id?: number;

    @Column({ name: "COUNTRY_NAME", type: "string" })
    public Name?: string;

    @Column({ name: "COUNTRY_CODE2", type: "string" })
    public Code2?: string;
}
```

**After:**

```java
package demo;

import org.eclipse.dirigible.sdk.db.Column;
import org.eclipse.dirigible.sdk.db.Entity;
import org.eclipse.dirigible.sdk.db.GeneratedValue;
import org.eclipse.dirigible.sdk.db.GenerationType;
import org.eclipse.dirigible.sdk.db.Id;
import org.eclipse.dirigible.sdk.db.Table;
import org.eclipse.dirigible.sdk.platform.Documentation;

@Entity
@Table(name = "SAMPLE_COUNTRY")
@Documentation("Sample Country Entity")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COUNTRY_ID")
    public Long Id;

    @Column(name = "COUNTRY_NAME", length = 128)
    public String Name;

    @Column(name = "COUNTRY_CODE2", length = 2)
    public String Code2;
}
```

- The column type comes from the field type; `@Column` carries `name`, `length`, `nullable`, `unique`, `precision` and `scale`.
- **The field name is the JSON property name.** Keeping the TypeScript property names (`Name`, `Code2`) keeps the REST payload your clients send and receive; the [sample](https://github.com/dirigiblelabs/sample-java-entity-decorators) uses camelCase instead, which changes it.
- A large-text column needs `@Lob`, or the mapping resizes it to `VARCHAR(255)`.
- `@OneToMany` / `@ManyToOne` have no Java equivalent. Map the foreign key as a plain column - on a `City`, `@Column(name = "CITY_COUNTRY") public Long Country;` - and read a country's cities with a `query(...)` on the city repository.

### Repositories

**Before:**

```ts
import { Repository, EntityConstructor } from "@aerokit/sdk/db";
import { Component } from "@aerokit/sdk/component";
import { CountryEntity } from "./CountryEntity";

@Component("CountryRepository")
export class CountryRepository extends Repository<CountryEntity> {
    constructor() {
        super(CountryEntity as EntityConstructor);
    }
}
```

**After:**

```java
package demo;

import org.eclipse.dirigible.components.data.store.java.repository.JavaRepository;
import org.eclipse.dirigible.sdk.component.Repository;

@Repository
public class CountryRepository extends JavaRepository<Country> {

    public CountryRepository() {
        super(Country.class);
    }
}
```

| TypeScript `Repository` | Java `JavaRepository` |
| ----------------------- | --------------------- |
| `findAll({ limit, offset })` | `findAll()`, `findAll(limit, offset)` |
| `findById(id)` (`undefined` when absent) | `findById(id)` (`null` when absent), `findOne(id)` (`Optional`) |
| `create(entity)` (returns the id) | `save(entity)` (returns the saved entity) |
| `update(entity)` | `update(entity)` |
| `upsert(entity)` | none - `findOne(id)`, then `save` or `update` |
| `deleteById(id)` | `deleteById(id)` |
| `count()` | `count()` |
| - | `query(hql, parameters)`, `updateProperty(id, property, value)`, `updateProperties(id, values)` |

Read and write a managed entity only through its repository: a generated repository carries the entity's validations and events, which the generic `Store` and raw SQL bypass. `UnitOfWork.call(() -> { ... })` (same package as `JavaRepository`) runs several writes as one transaction.

### Controllers and routes

**Before:**

```ts
import { Controller, Get, Post } from "@aerokit/sdk/http";
import { Inject, Injected } from "@aerokit/sdk/component";
import { CountryEntity } from "./CountryEntity";
import { CountryRepository } from "./CountryRepository";

@Controller
@Injected()
class CountryController {

    @Inject("CountryRepository")
    private readonly repository!: CountryRepository;

    @Get("/")
    public getAll(_: any, ctx: any): CountryEntity[] {
        const limit = ctx.queryParameters["$limit"] ? parseInt(ctx.queryParameters["$limit"]) : 20;
        return this.repository.findAll({ limit: limit, offset: 0 });
    }

    @Get("/:id")
    public getById(_: any, ctx: any): CountryEntity | undefined {
        return this.repository.findById(ctx.pathParameters.id);
    }

    @Post("/")
    public create(country: CountryEntity): CountryEntity {
        country.Id = this.repository.create(country) as number;
        return country;
    }
}
```

**After:**

```java
package demo;

import java.util.List;

import org.eclipse.dirigible.sdk.http.Body;
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.sdk.http.PathParam;
import org.eclipse.dirigible.sdk.http.Post;
import org.eclipse.dirigible.sdk.http.QueryParam;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Controller
public class CountryController {

    private final CountryRepository countries;

    public CountryController(CountryRepository countries) {
        this.countries = countries;
    }

    @Get("/")
    public List<Country> getAll(@QueryParam("$limit") Integer limit) {
        return countries.findAll(limit == null ? 20 : limit, 0);
    }

    @Get("/{id}")
    public Country getById(@PathParam("id") Long id) {
        return countries.findOne(id)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No country " + id));
    }

    @Post("/")
    public Country create(@Body Country country) {
        return countries.save(country);
    }
}
```

- **The URL changes.** `/services/ts/<project>/<file>.ts/<route>` becomes `/services/java/<project>/<package path>/<Class>/<route>` - here `/services/java/orders/demo/CountryController/`. The `/public/...` prefix works the same way. Update the callers, and the `path` of any `.access` constraint written for the `.ts` file.
- A path parameter is written `{id}` and bound with `@PathParam`; a query parameter with `@QueryParam` (a missing one binds `null`, so use a boxed type); the request body with `@Body`. `@Context` binds the `HttpServletRequest`, the `HttpServletResponse`, or a `Map<String, String>` of all path and query parameters.
- The return value is the response: an object is written as JSON, a `String` as `text/plain`, and a `void` method writes the response itself.
- Errors are exceptions, not `HttpUtils.send...` calls: throw Spring's `ResponseStatusException` with a status, or `org.eclipse.dirigible.sdk.db.ValidationException` for a `400`. A repository's own refusals reach the caller as `400` (validation) or `409` (a restricted delete, a concurrent write); anything else is a `500` with the message.
- `@Head` and `@Options` routes have no Java equivalent.
- A plain script endpoint (a `.ts` file that writes through `response.println`) and the `http/rs` resource builder both become a `@Controller`.

### Components and injection

**Before:**

```ts
import { Component, Injected, Inject } from "@aerokit/sdk/component";

@Component("GreetingService")
export class GreetingService {
    greet(name: string): string {
        return `Hello, ${name}!`;
    }
}

@Injected()
export class Greeter {
    @Inject("GreetingService")
    private readonly greetings!: GreetingService;
}
```

**After:**

```java
// demo/GreetingService.java
package demo;

import org.eclipse.dirigible.sdk.component.Component;

@Component
public class GreetingService {

    public String greet(String name) {
        return "Hello, " + name + "!";
    }
}
```

```java
// demo/GreetingController.java
package demo;

import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.sdk.http.PathParam;

@Controller
public class GreetingController {

    private final GreetingService greetings;

    public GreetingController(GreetingService greetings) {
        this.greetings = greetings;
    }

    @Get("/greet/{name}")
    public String greet(@PathParam("name") String name) {
        return greetings.greet(name);
    }
}
```

- Injection is by type, not by name. Constructor injection is preferred; `@Inject` on a field works too, and a `List<T>` parameter receives every bean of type `T`.
- `@Repository`, `@Controller` and `@Websocket` classes are beans without a separate `@Component`.
- A bean's name is `@Component("name")` or the decapitalized class name. `Beans.get(Type.class)` (`sdk.component`) looks one up where injection is not possible.
- `@PostConstruct` and `@PreDestroy` (`jakarta.annotation`) run when the bean is built and torn down.

### Roles

**Before:**

```ts
import { response } from "@aerokit/sdk/http";
import { user, Roles } from "@aerokit/sdk/security";

@Roles(["ADMINISTRATOR"])
class RolesCheck {
    public printMessage(): void {
        response.println(JSON.stringify({ message: "Roles Check", user: user.getName() }));
    }
}

new RolesCheck().printMessage();
```

**After:**

```java
package roles;

import java.util.Map;

import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.sdk.security.Roles;
import org.eclipse.dirigible.sdk.security.User;

@Controller
@Roles({"ADMINISTRATOR"})
public class RolesCheck {

    @Get("/")
    public Map<String, String> message() {
        return Map.of("message", "Roles Check", "user", User.getName());
    }
}
```

`@Roles` guards the routes of a `@Controller`: on the class it applies to every route, on a method it replaces the class's roles, and a caller in none of them gets `403`. The TypeScript decorator wrapped every method of any class; in other Java code, check `User.isInRole("...")` yourself.

### Jobs, listeners and websockets: two handler styles

Each of these has two Java styles, and a class uses exactly one of them:

- **A self-describing interface** - a `@Component` implements `JobHandler`, `MessageHandler` or `WebsocketHandler` and returns its own cron expression, destination or endpoint.
- **Method-level annotations** - `@Scheduled` or `@Listener` on a method of a `@Component`, or a `@Websocket` class with `@OnOpen` / `@OnMessage` / `@OnError` / `@OnClose` methods.

A class that mixes the two styles is rejected. The [job](https://github.com/dirigiblelabs/sample-java-job-decorator), [listener](https://github.com/dirigiblelabs/sample-java-listener-decorator) and [websocket](https://github.com/dirigiblelabs/sample-java-websocket-decorator) samples show both styles.

### Jobs

**Before:**

```ts
import { Scheduled } from "@aerokit/sdk/job";

@Scheduled({ expression: "0/10 * * * * ?" })
export class MyJob {
    run() {
        console.log("MyJob executed!");
    }
}

new MyJob().run();
```

**After** - the interface style:

```java
package demo.scheduled;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.job.JobHandler;
import org.eclipse.dirigible.sdk.log.Logger;
import org.eclipse.dirigible.sdk.log.Logging;

@Component
public class MyJob implements JobHandler {

    private static final Logger LOGGER = Logging.getLogger("demo.scheduled.MyJob");

    @Override
    public String cron() {
        return "0/10 * * * * ?";
    }

    @Override
    public void run() {
        LOGGER.info("MyJob executed!");
    }
}
```

or the annotation style:

```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.job.Scheduled;

@Component
public class Maintenance {

    @Scheduled(expression = "0/10 * * * * ?")
    public void purgeTempFiles() {
        // ...
    }
}
```

The expression is the same Quartz cron expression. A Java job is listed, enabled, disabled and triggered in the Jobs perspective like any other, and a run that throws is recorded as a failed run. `@Scheduled` has no `group`.

### Listeners

**Before:**

```ts
import { Listener } from "@aerokit/sdk/messaging";

@Listener({ name: "orders/OrderListener", kind: "queue" })
export class OrderListener {
    public static onMessage(message: string) {
        console.log("Processing message event:", message);
    }

    public static onError(error: string) {
        console.log("Processing error event:", error);
    }
}

export function onMessage(message: string) {
    OrderListener.onMessage(message);
}

export function onError(error: string) {
    OrderListener.onError(error);
}
```

**After** - the interface style:

```java
package orders;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.log.Logger;
import org.eclipse.dirigible.sdk.log.Logging;
import org.eclipse.dirigible.sdk.messaging.MessageHandler;

@Component
public class OrderListener implements MessageHandler {

    private static final Logger LOGGER = Logging.getLogger("orders.OrderListener");

    @Override
    public String destination() {
        return "orders/OrderListener";
    }

    @Override
    public void onMessage(String message) {
        LOGGER.info("Processing message event: {}", message);
    }

    @Override
    public void onError(String error) {
        LOGGER.error("Processing error event: {}", error);
    }
}
```

or the annotation style:

```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.messaging.Listener;
import org.eclipse.dirigible.sdk.messaging.ListenerKind;

@Component
public class InvoiceListener {

    @Listener(name = "orders/OrderListener", kind = ListenerKind.QUEUE)
    public void onInvoice(String message) {
        // ...
    }
}
```

`kind()` defaults to `ListenerKind.QUEUE`; return `ListenerKind.TOPIC` for a topic. A handler that throws is logged and the message is redelivered (three more attempts) before the broker dead-letters it, so a handler must be safe to run twice. Send with `Producer.sendToQueue(queue, message)` / `Producer.sendToTopic(topic, message)` (`sdk.messaging`).

### Websockets

**Before:**

```ts
import { Websocket } from "@aerokit/sdk/net";

@Websocket({ name: "orders/OrderWebsocket", endpoint: "order-ws" })
export class OrderWebsocket {
    public static onMessage(message: string, from: string) {
        return `Hello from OrderWebsocket! [${message}]`;
    }
}

export function onMessage(message: string, from: string) {
    return OrderWebsocket.onMessage(message, from);
}
```

**After** - the annotation style:

```java
package orders;

import org.eclipse.dirigible.sdk.net.OnMessage;
import org.eclipse.dirigible.sdk.net.Websocket;

@Websocket(name = "orders/OrderWebsocket", endpoint = "order-ws")
public class OrderWebsocket {

    @OnMessage
    public String message(String message, String from) {
        return "Hello from OrderWebsocket! [" + message + "]";
    }
}
```

or the interface style: a `@Component` implementing `WebsocketHandler`, with `endpoint()` and the `onOpen()`, `onMessage(message, from)`, `onError(error)` and `onClose()` callbacks (each a no-op by default). The endpoint name is what clients connect to, so keep it.

### Extensions

**Before** - a contribution and a consumer:

```ts
import { Extension } from "@aerokit/sdk/extensions";

@Extension({ name: "OrderExtension", to: "order-extension-point" })
export class OrderExtension {
    public static getDiscount(): number {
        return 5;
    }
}

export function getDiscount() {
    return OrderExtension.getDiscount();
}
```

```ts
import { extensions } from "@aerokit/sdk/extensions";

const orderExtensions = await extensions.load("order-extension-point");
let discount = 0;
for (const extension of orderExtensions) {
    discount += extension.getDiscount();
}
```

**After** - the extension point is a plain interface, a contribution is a `@Component` implementing it:

```java
// orders/OrderDiscount.java - the extension point
package orders;

public interface OrderDiscount {

    int getDiscount();
}
```

```java
// orders/OrderExtension.java - a contribution
package orders;

import org.eclipse.dirigible.sdk.component.Component;

@Component("order-extension")
public class OrderExtension implements OrderDiscount {

    @Override
    public int getDiscount() {
        return 5;
    }
}
```

```java
// orders/Discounts.java - a consumer
package orders;

import java.util.List;

import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;

@Controller
public class Discounts {

    private final List<OrderDiscount> discounts;

    public Discounts(List<OrderDiscount> discounts) {
        this.discounts = discounts;
    }

    @Get("/")
    public int total() {
        return discounts.stream()
                        .mapToInt(OrderDiscount::getDiscount)
                        .sum();
    }
}
```

Outside an injection point, `Extensions.find(OrderDiscount.class)` (`sdk.extensions`) returns the same beans. A script cannot implement a Java interface, so move all contributions of an extension point together, and delete the `.extension` files that registered script modules for it. For the extension modules of the IDE and the application shells (perspectives, views, menus), see [Script extension modules](#script-extension-modules).

## The SDK modules

Each `@aerokit/sdk/<module>` maps to a class under `org.eclipse.dirigible.sdk.*`. The Java classes are static facades over the same platform services, documented in the [Java SDK reference](/sdk/).

| TypeScript module | Java class |
| ----------------- | ---------- |
| `bpm/deployer`, `bpm/process`, `bpm/tasks` | `sdk.bpm.Deployer`, `sdk.bpm.Process`, `sdk.bpm.Tasks` |
| `cache` | `sdk.cache.Cache` |
| `cms/cmis` | `sdk.cms.Cmis` |
| `core/configurations`, `core/context`, `core/env`, `core/globals` | `sdk.core.Configurations`, `sdk.core.Context`, `sdk.core.Env`, `sdk.core.Globals` |
| `db/database`, `db/query`, `db/update`, `db/insert`, `db/sequence`, `db/sql`, `db/procedure` | `sdk.db.Database` |
| `db/store` | `sdk.db.Store` |
| `db/repository`, `db/dao`, `db/orm` | a `@Repository` extending `JavaRepository` |
| `db/translator` | `sdk.db.Translator` |
| `etcd/client` | `sdk.etcd.Client` |
| `extensions/extensions` | `sdk.extensions.Extensions` |
| `git/client` | `sdk.git.Git` |
| `http/client`, `http/client-async` | `sdk.http.HttpClient`, `sdk.http.HttpAsyncClient` |
| `http/request`, `http/response`, `http/session`, `http/upload` | `sdk.http.Request`, `sdk.http.Response`, `sdk.http.Session`, `sdk.http.Upload` |
| `http/rs` | a `@Controller` |
| `http/utils`, `http/errors` | return values and exceptions - see [Controllers](#controllers-and-routes) |
| `indexing/searcher`, `indexing/writer` | `sdk.indexing.Searcher`, `sdk.indexing.Writer` |
| `io/bytes`, `io/files`, `io/image`, `io/streams`, `io/zip` | `sdk.io.Bytes`, `sdk.io.Files`, `sdk.io.Image`, `sdk.io.Streams`, `sdk.io.Zip` |
| `job/scheduler` | `sdk.job.Scheduler` |
| `junit` | `sdk.junit.Assert` - see [Tests](#tests) |
| `log/logging` | `sdk.log.Logging`, `sdk.log.Logger` |
| `mail/client` | `sdk.mail.Mail` |
| `messaging/producer`, `messaging/consumer` | `sdk.messaging.Producer`, `sdk.messaging.Consumer` |
| `mongodb/client` | `sdk.mongodb.Client` |
| `net/websockets`, `net/soap` | `sdk.net.Websockets`, `sdk.net.Soap` |
| `pdf` | `sdk.pdf.Pdf` |
| `platform/command`, `platform/engines`, `platform/lifecycle`, `platform/os`, `platform/problems`, `platform/registry`, `platform/repository`, `platform/workspace` | `sdk.platform.Command`, `Engine`, `Lifecycle`, `Os`, `Problems`, `Registry`, `Repository`, `Workspace` |
| `qldb` | `sdk.qldb.Qldb` |
| `rabbitmq/producer`, `rabbitmq/consumer` | `sdk.rabbitmq.Producer`, `sdk.rabbitmq.Consumer` |
| `redis/client` | `sdk.redis.Client` |
| `security/user`, `security/oauth`, `security/tenants` | `sdk.security.User`, `sdk.security.OAuthClient`, `sdk.security.Tenants` |
| `template/engines` | `sdk.template.TemplateEngines` |
| `utils/alphanumeric`, `base64`, `converter`, `digest`, `escape`, `hex`, `qrcode`, `url`, `utf8`, `uuid`, `xml` | `sdk.utils.Alphanumeric`, `Base64`, `Converter`, `Digest`, `Escape`, `Hex`, `QrCode`, `Url`, `Utf8`, `Uuid`, `Xml` |

**Before:**

```ts
import { Logging } from "@aerokit/sdk/log";
import { Configurations } from "@aerokit/sdk/core";
import { Producer } from "@aerokit/sdk/messaging";
import { user } from "@aerokit/sdk/security";

const logger = Logging.getLogger("orders");
const queue = Configurations.get("ORDERS_QUEUE", "orders");
Producer.queue(queue).send(JSON.stringify({ placedBy: user.getName() }));
logger.info("Order sent to {}", queue);
```

**After:**

```java
package orders;

import java.util.Map;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.core.Configurations;
import org.eclipse.dirigible.sdk.log.Logger;
import org.eclipse.dirigible.sdk.log.Logging;
import org.eclipse.dirigible.sdk.messaging.Producer;
import org.eclipse.dirigible.sdk.security.User;
import org.eclipse.dirigible.sdk.utils.Converter;

@Component
public class OrderSender {

    private static final Logger LOGGER = Logging.getLogger("orders");

    public void send() {
        String queue = Configurations.get("ORDERS_QUEUE", "orders");
        Producer.sendToQueue(queue, Converter.toJson(Map.of("placedBy", User.getName())));
        LOGGER.info("Order sent to {}", queue);
    }
}
```

- Where a TypeScript function took an object, several Java facades take a JSON string - for example `Process.start(key, businessKey, parametersJson)`, `Tasks.complete(taskId, variablesJson)` and `Database.query(sql, parametersJson)`. `Converter.toJson(...)` / `Converter.fromJson(...)` convert.
- Log through `Logging.getLogger(...)`, never `System.out`: a print carries no level and does not reach the Logs view.
- No Java class: `bpm/tracer` (use `Logging`), `bpm/values` (use `Converter` and the process variable methods), `utils/jsonpath` (the `com.jayway.jsonpath` library is on the classpath), `mongodb/dao`.

## Descriptors with a script handler

### Jobs (`.job`)

**Before:**

```json
{
    "expression": "0 0 2 * * ?",
    "group": "defined",
    "handler": "orders/jobs/nightly-report.ts",
    "description": "Nightly report"
}
```

**After** - either drop the descriptor and write a `JobHandler` or a `@Scheduled` method (see [Jobs](#jobs)), or keep the `.job` and point it at a method of a `@Component`:

```json
{
    "expression": "0 0 2 * * ?",
    "group": "defined",
    "handler": "orders.Reports#nightly",
    "engine": "java",
    "description": "Nightly report",
    "parameters": [
        { "name": "region", "type": "string", "defaultValue": "EU" }
    ]
}
```

```java
package orders;

import java.util.Map;

import org.eclipse.dirigible.sdk.component.Component;

@Component
public class Reports {

    public void nightly(Map<String, String> parameters) {
        String region = parameters.get("region");
        // ...
    }
}
```

`"handler"` is `<fully qualified class>#<method>`. A method declaring a `Map<String, String>` receives the job's declared parameters - the value a trigger passed, else the declared default; a method without arguments runs as is.

### Listeners (`.listener`)

**Before:**

```json
{
    "name": "orders-queue",
    "kind": "Q",
    "handler": "orders/handlers/order-handler.ts",
    "description": "Orders"
}
```

```ts
export function onMessage(message: string) { /* ... */ }
export function onError(error: string) { /* ... */ }
```

**After** - delete the `.listener` and write a `MessageHandler` whose `destination()` returns `"orders-queue"`, or a `@Listener(name = "orders-queue", kind = ListenerKind.QUEUE)` method (see [Listeners](#listeners)). `"kind": "T"` becomes `ListenerKind.TOPIC`. A `.listener` cannot name a Java class.

### Websockets (`.websocket`)

**Before:**

```json
{
    "handler": "orders/ws/order-handler.js",
    "endpoint": "order-ws",
    "description": "Order updates"
}
```

**After** - delete the `.websocket` and write a `WebsocketHandler` whose `endpoint()` returns `"order-ws"`, or a `@Websocket(name = "...", endpoint = "order-ws")` class (see [Websockets](#websockets)). A `.websocket` cannot name a Java class either.

## BPMN script tasks

**Before** - a service task running a script through the `JSTask` delegate:

```xml
<serviceTask id="notify-approvers" name="Notify approvers" flowable:async="true"
             flowable:delegateExpression="${JSTask}">
  <extensionElements>
    <flowable:field name="handler">
      <flowable:string><![CDATA[leave-request/tasks/notify-approvers.ts]]></flowable:string>
    </flowable:field>
  </extensionElements>
</serviceTask>
```

```ts
import { process } from "@aerokit/sdk/bpm";

const execution = process.getExecutionContext();
const variables = process.getVariables(execution.getId());
console.log(`Leave requested by ${variables.requester}`);
```

**After** - a `JavaDelegate` bound with `flowable:class`:

```xml
<serviceTask id="notify-approvers" name="Notify approvers" flowable:async="true"
             flowable:class="leaverequest.NotifyApprovers"/>
```

```java
package leaverequest;

import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;

public class NotifyApprovers implements JavaDelegate {

    private final Approvers approvers;   // a @Component of the project

    public NotifyApprovers(Approvers approvers) {
        this.approvers = approvers;
    }

    @Override
    public void execute(DelegateExecution execution) {
        String requester = (String) execution.getVariable("requester");
        approvers.notifyAbout(requester);
    }
}
```

- **A delegate is not a `@Component`.** Flowable creates it, and its collaborators are injected through the constructor or `@Inject` fields like a bean's. Annotating it `@Component` builds a second instance the engine never runs; the Problems view flags it.
- Flowable reuses one `flowable:class` instance per task, so keep the delegate free of per-execution state - read everything from `execution`.
- A step parameter is a `<flowable:field>` of the service task, injected into a field of type `org.flowable.common.engine.api.delegate.Expression` with the same name.
- The `${JavaTask}` delegate expression with a `handler` field naming the class is the other binding; it builds a fresh delegate per execution. A new process created in the IDE's BPMN editor uses `flowable:class`.
- Execution and task listeners written as `flowable:class` Java classes are injected the same way.
- Starting a process and completing a task from Java: `Process.start(key, businessKey, parametersJson)` and `Tasks.complete(taskId, variablesJson)` (`sdk.bpm`).

## Camel script steps

**Before** - a route step calling a script:

```yaml
- to:
    id: to-enrich
    uri: dirigible-java-script
    parameters:
      javaScriptPath: orders/camel/enrich.ts
```

```ts
export function onMessage(message: any) {
    message.setBody("Enriched: " + message.getBody());
    return message;
}
```

**After** - a step calling a Camel `Processor`:

```yaml
- to:
    id: to-enrich
    uri: dirigible-java
    parameters:
      className: orders.camel.Enrich
```

```java
package orders.camel;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;

public class Enrich implements Processor {

    private final Greeter greeter;   // a @Component of the project

    public Enrich(Greeter greeter) {
        this.greeter = greeter;
    }

    @Override
    public void process(Exchange exchange) {
        exchange.getMessage()
                .setBody("Enriched: " + exchange.getMessage().getBody(String.class) + " " + greeter.greeting());
    }
}
```

The processor is built for every exchange, its collaborators injected like a delegate's, so it needs no `@Component`.

## Intent `call:` steps

**Before** - a process step calling a script:

```yaml
processes:
  - name: ArchiveDocument
    trigger: { onCreate: Document }
    steps:
      - { name: notifyOwner, kind: serviceTask, args: { call: custom/notify-owner.ts } }
      - { name: done, kind: end }
```

**After** - the step binds a Java delegate with `delegate:`:

```yaml
      - { name: notifyOwner, kind: serviceTask, args: { delegate: custom.NotifyOwner } }
```

```java
package custom;

import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;

public class NotifyOwner implements JavaDelegate {

    @Override
    public void execute(DelegateExecution execution) {
        Object recordId = execution.getVariable("Id");
        // load the record through its generated repository and act on it
    }
}
```

- `delegate:` takes the fully qualified class name and emits a `flowable:class` service task, so everything in [BPMN script tasks](#bpmn-script-tasks) applies.
- Generate reports a `call:` that names a `.ts`, `.js` or `.mjs` handler as a deprecation warning; the step keeps working until 16.0.
- A `call:` naming a Java class (`custom/NotifyOwner.java` or `custom.NotifyOwner`) is already bound exactly like `delegate:`. Write `delegate:` all the same: `retry:` and `onError:` are refused on a `call:`, and `fields:` passes per-step parameters to a delegate (injected as `Expression` fields).
- See the [DSL reference](/help/intent/dsl-reference) for `delegate:`, `fields:`, `retry:` and `onError:`.

## Tests

**Before** - a server-side test in TypeScript, run inside the instance:

```ts
import { test, assertEquals } from "@aerokit/sdk/junit";
import { LineVat } from "./LineVat";

test("rounds the VAT half up to the cent", () => {
    assertEquals(0.15, LineVat.of(1, 2.90, 5));
});
```

or QUnit (`require("qunit/qunit")` with `QUnit.test(...)`).

**After** - a JUnit 5 test with `@IntentSlice`, run by Maven:

```java
package custom.test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;

import org.eclipse.dirigible.sdk.test.IntentSlice;
import org.eclipse.dirigible.sdk.test.Slice;
import org.junit.jupiter.api.Test;

import gen.money.data.invoiceline.InvoiceLineEntity;

@IntentSlice
class LineVatActionTest {

    @Test
    void roundsTheVatHalfUpToTheCent(Slice slice) {
        InvoiceLineEntity line = slice.given(InvoiceLineEntity.class)
                                      .with("Description", "Paper")
                                      .with("Quantity", 1)
                                      .with("UnitPrice", "2.90")
                                      .with("VatRate", 5)
                                      .saved();

        assertEquals(new BigDecimal("0.15"), line.VatAmount);
    }
}
```

- The slice (`org.eclipse.dirigible:dirigible-sdk-test`, test scope) runs the project's `gen/` and `custom/` classes in the test JVM on a private in-memory H2 database: entities through their repositories, components wired by the platform's own container, document numbers, and every sent message recorded for `slice.sent()` / `slice.sentTo(destination)`. Nothing else starts - no web server, no broker, no IDE.
- The tests live in the project's `custom/test/` folder, which the platform never compiles on publish. A `pom.xml` at the project root imports `dirigible-parent` for the versions and compiles the project folder as a test source root; `mvn test` runs every `custom/test/**/*Test.java`. The [`dirigible-sdk-test` README](https://github.com/eclipse-dirigible/dirigible/tree/master/tests/tests-sdk) has the full `pom.xml` and the API (`given(...)`, `repository(...)`, `bean(...)`, `expectRefused(...)`).
- Not covered by the slice: listeners and processes reacting to the recorded events, REST concerns (permissions, controllers), and the `_HISTORY` / `_LANG` side tables. Cover those with an application test.
- Running Java tests from the IDE's test results view is not available yet ([#8052](https://github.com/eclipse-dirigible/dirigible/issues/8052)); run them with Maven.
- For a one-line check inside running code, `org.eclipse.dirigible.sdk.junit.Assert` keeps the `assertEquals` / `assertTrue` / `fail` surface.

**Application tests stay in JavaScript.** The Playwright runner that checks a generated application through its UI and REST API runs in Node.js outside the instance, so it is not server-side JavaScript and is not deprecated. It ships today as the `@aerokit/sdk/test` subpath of the npm package; a standalone `@aerokit/test` package is planned ([#8053](https://github.com/eclipse-dirigible/dirigible/issues/8053)).

## Script extension modules

An extension module contributes a perspective, a view, a menu or another piece of the IDE or an application shell. A script module is a `.js` file whose exported function returns an object, and only the JavaScript engine can evaluate it. A JSON module is that object, read as data.

**Before:**

```json
{
    "module": "orders/configs/orders-perspective.js",
    "extensionPoint": "platform-perspectives",
    "description": "Orders perspective"
}
```

```js
export function getPerspective() {
    return {
        id: "orders",
        label: "Orders",
        path: "/services/web/orders/index.html",
        groupId: "sales",
        order: 100,
        icon: "/services/web/orders/images/orders.svg"
    };
}
```

**After** - `orders/configs/orders-perspective.json` holds exactly the object the function returned:

```json
{
    "id": "orders",
    "label": "Orders",
    "path": "/services/web/orders/index.html",
    "groupId": "sales",
    "order": 100,
    "icon": "/services/web/orders/images/orders.svg"
}
```

and the `.extension` names it:

```json
{
    "module": "orders/configs/orders-perspective.json",
    "extensionPoint": "platform-perspectives",
    "description": "Orders perspective"
}
```

Then delete the `.js` file.

- The same applies to every export: `getPerspective`, `getPerspectiveGroup`, `getUtilityPerspective`, `getView`, `getEditor`, `getMenu`, `getProjection`, `getLocale`, `getTheme`, `getShell` and `getFileTypes`.
- The function's name no longer tells the kind, the content does: a perspective group is recognised by its `items`, and a utility perspective by `"isUtility": true`.
- Logic needs a declarative replacement. A menu item that a script showed only when another project was present carries `"requiresProject": "<project>"` instead - it is shown only while that project is published:

  ```json
  {
      "label": "OpenAPI",
      "action": "open",
      "link": "/services/web/view-swagger/ui/",
      "requiresProject": "view-swagger"
  }
  ```

- A template descriptor (`getTemplate`) becomes a `.json` file of the same base name beside it (`template.js` -> `template.json`), and its `.extension` names the `.json`; a `.gen` file that recorded the `.js` still resolves to it. A JSON descriptor is static, so a descriptor that computed its sources from the generation parameters needs one variant per case.
- Templates and generated applications from 14.96 on write JSON modules; regenerating converts the generated ones.

## Deprecation signals

A publish reviews each project it touches. A project that uses server-side JavaScript or TypeScript gets:

- **One warning in the log:**

  ```
  Project [orders] uses server-side JavaScript or TypeScript (3 TypeScript files, 1 job), which is deprecated and will be removed in 16.0. Migration guide: https://www.dirigible.io/help/develop/migrate-typescript-to-java
  ```

- **One entry in the Problems view**, category `JavaScript deprecation`, located at the project, with the same text.
- **A banner in the IDE** while any such entry exists: *Server-side JavaScript and TypeScript are deprecated and will be removed in 16.0. Used by: orders. See the Problems view and the migration guide.* Dismissing it hides it for good in that browser.

On an instance without the JavaScript engine - the Java edition, or a product assembled without the JavaScript group - the entry says what is skipped instead:

```
Project [orders] uses server-side JavaScript or TypeScript (2 extension modules) and this instance has no JavaScript engine, so it does not run - JavaScript extension modules and artefacts skipped: 2. Migration guide: https://www.dirigible.io/help/develop/migrate-typescript-to-java
```

An application that is never published there - its modules arrive in module jars or an external registry folder - gets the same warning and entry, counting the script extension modules that were skipped.

**What counts**, file by file:

- a `.ts` file (not a `.d.ts` declaration) and a `.mjs` file;
- a `.js` file that imports the JavaScript SDK (`sdk/...` or `@aerokit/sdk/...`), unless a `.ts` of the same name beside it shows it is that file's transpiled output;
- a `.extension` whose `module` is not a `.json` file;
- a `.job`, `.listener`, `.websocket`, `.bpmn` or `.camel` that names a `.js`, `.mjs` or `.ts` file.

Browser-side `.js` files, `node_modules` and hidden folders are not counted. An instance with only Java projects shows no warning, entry or banner. The signals are informational: nothing about how a script runs changes.

**To clear them:** port or convert everything the entry counts, delete the old files, and publish the project again. Each publish replaces the project's entry, and removes it once nothing counts; unpublishing the project removes it too. The banner disappears with the last entry. Delete the transpiled `.js` files along with their `.ts` sources: once the `.ts` is gone, a `.js` that imports the SDK counts on its own.

## No Java equivalent

| TypeScript | In Java |
| ---------- | ------- |
| `@OneToMany` / `@ManyToOne` | A plain foreign-key column, and a `query(...)` on the child repository. |
| `Repository.upsert` | `findOne(id)`, then `save` or `update`. |
| `@Head` / `@Options` routes | Not available. |
| `@Roles` on a class that is not a controller | `User.isInRole(...)` in the code. |
| The `group` of `@Scheduled` | Not available. |
| `HttpUtils.sendResponse...` | The return value, or a `ResponseStatusException` / `ValidationException`. |
| `bpm/tracer`, `bpm/values`, `utils/jsonpath`, `mongodb/dao` | `Logging`, `Converter`, the `com.jayway.jsonpath` library, the MongoDB driver from `sdk.mongodb.Client`. |
| A `.listener` or `.websocket` descriptor with a handler | A `MessageHandler` / `WebsocketHandler` or the annotations; only a `.job` can name a Java method. |
| An extension module that computes its content | A static JSON module; `requiresProject` covers "only while project X is published". |
| A script contributing to the same extension point as Java code | Not possible; move all contributions of the point to Java. |
| Running tests from the IDE results view, the Java debugger in a container | Not yet ([#8052](https://github.com/eclipse-dirigible/dirigible/issues/8052)); run tests with Maven. |

## Checklist

1. Publish the project and read its `JavaScript deprecation` entry in the Problems view: it is the inventory.
2. Regenerate generated code - from the `.model` with the Java templates, or Generate the `app.intent`.
3. Port the hand-written code construct by construct, using the sections above.
4. Update callers: the `/services/java/...` URLs, the JSON property names if fields were renamed, and the paths in `.access` constraints.
5. Convert script extension modules to JSON modules.
6. Port the server-side tests to JUnit with `@IntentSlice`.
7. Delete the `.ts`, `.mjs` and transpiled `.js` files, `tsconfig.json` and the `tsc` action, then publish again: the entry is gone.
8. Run the application on `dirigiblelabs/dirigible:<version>-java`: no `JavaScript deprecation` entry in the Problems view, no `FAILED` artefact.

## See also

- [Coming from Spring Boot](/help/develop/coming-from-spring-boot) - the Java model mapped to Spring.
- [Java](/help/develop/languages/java) - how client Java is compiled and loaded.
- [Java SDK reference](/sdk/).
- [Testing](/help/develop/testing).
- The worked samples: [`sample-entity-decorators`](https://github.com/dirigiblelabs/sample-entity-decorators) (TypeScript) and [`sample-java-entity-decorators`](https://github.com/dirigiblelabs/sample-java-entity-decorators) (Java).
