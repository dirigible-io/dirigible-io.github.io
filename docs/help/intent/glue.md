---
title: Declarative glue
description: notifications, schedules, integrations, inbound webhooks, rollups and lifecycle triggers - declared in the intent, generated as annotated client-Java, no hand-written code.
---

# Declarative glue

Beyond the model artefacts, the intent declares **glue**: common integrations and activities that would otherwise be hand-written code. The abstraction is one line:

> glue = `on <event>` then `do <action>`, with action parameters bound by resolver paths.

Three axes:

- **Event** - an entity `onCreate` / `onUpdate` / `onDelete` (with an optional `when:` guard), a schedule (`cron`), or an inbound webhook.
- **Action** - notify (email), call out (HTTP), ingest into an entity, recompute a counter, start a process.
- **Binding** - the **resolver path grammar** (`customer.name`, `member.email`): one-hop relation walks off the triggering entity, validated at parse time exactly like a decision's `then` / `else`.

## Glue is generated annotated client-Java

Unlike the model generators (which emit `.edm` / `.bpmn` / `.form` / ...), each glue activity is generated as an **annotated client-Java class against the SDK** (`org.eclipse.dirigible.sdk.*`) under `gen/events` - `@Listener` + `MessageHandler`, `@Scheduled` + `JobHandler`, `@Controller` + `@Post`. The annotated class **is** the artefact: `engine-java` synchronises and runs it, it is deterministic and regenerated with the app, and it is replaceable via a `custom/` override.

This is a deliberate exception to "never emit code from a generator" - because client-Java is now the platform's primary runtime and TypeScript is being deprecated. The line still held: **no hand-written business logic in `gen/`.** The moment an action needs real logic it becomes a `script` step or a `custom/` hook, never more intent syntax.

The author-facing fields are translated to Java by shared support classes (`EventBinding`, `NotificationSupport`, `ScheduleSupport`, the typed `Criteria` query API), emitted into `<intent>.glue`, and rendered by the `template-application-events-java` templates. `gen/events` is a sibling of `gen/<model>`, so it survives the per-model regeneration wipe.

::: warning Event-key gotcha
An event-binding key is `event:`, never `on:` - YAML 1.1 resolves a bare `on` (also `off` / `yes` / `no`) to the boolean `true`, so an `on:` key is silently swallowed. An action key is `do:`.
:::

## notifications

Email on an entity lifecycle event.

```yaml
notifications:
  - name: orderUpdated
    event: { onUpdate: Order }
    channel: email
    to: ops@example.com
    subject: "Order {id} for {customer.name}, total {total}"
    body: "The order changed."
```

Generates a `gen/events/<Name>Notification.java` `@Listener` using `sdk.mail.Mail`, bound to the entity's create / `-updated` / `-deleted` topic. `to` and `{placeholder}` resolve a literal, a direct field, or a **one-hop `relation.field`** of a to-one relation (the listener loads the related entity once by FK id). `when:` supports a single `field ==|!= literal` guard. Multi-hop paths (`a.b.c`) are the remaining gap; the parser rejects them with a clear message.

## schedules

Cron reminders / cleanups - query an entity and act per matching row.

```yaml
schedules:
  - name: staleOrders
    cron: "0 0 9 * * ?"
    entity: Order
    where:
      - { field: orderDate, op: lt, value: CURRENT_DATE }   # eq/ne/gt/ge/lt/le/like
    notify:
      to: ops@example.com
      subject: "Stale order {id} for {customer.name}"
      body: "This order is stale."
```

Generates a `gen/events/<Name>Job.java` `@Scheduled` `JobHandler` that runs a typed `Criteria` query (`where` to typed conditions, `CURRENT_DATE` / `CURRENT_TIMESTAMP` to now) and performs the per-row `notify` (same relation-load + interpolation as notifications). The action is `notify` only for now.

## integrations

Tell another system on an event (outbound HTTP).

```yaml
integrations:
  - name: pushOrderToWarehouse
    event: { onCreate: Order }
    method: POST
    url: "@config:WAREHOUSE_URL"
```

Generates a `gen/events/<Name>Integration.java` `@Listener` that forwards the entity-event JSON to the URL via `sdk.http.HttpClient`. The `@config:KEY` sugar resolves to `Configurations.get` so endpoints and secrets stay out of the source. The body forwards the whole entity for now (custom body mapping and headers are later).

## inbound

Another system tells us - a webhook that ingests a JSON payload into an entity.

```yaml
inbound:
  - name: ingestOrder
    path: /ingest
    create: Order
```

Generates a `gen/events/<Name>Webhook.java` `@Controller` with a `@Post("<path>")` that deserialises the body into the entity and saves it, returning the saved JSON. Served at `/services/java/<project>/gen/events/<Name>Webhook<path>`. The v1 action is `create` (ingest).

## rollups

Maintain a denormalized counter on a parent.

```yaml
rollups:
  - name: customerOrderCount
    entity: Order        # the child being counted
    via: customer        # the to-one relation up to the parent
    field: orderCount     # the parent field to write
```

Generates two `gen/events/<Name>RollupOn{Create,Delete}.java` `@Listener`s on the child's create / delete topics that recompute the affected parent's count via a typed `Criteria` and write it back. Recompute-on-event (self-healing), so it is **eventually consistent, not transactionally exact** under heavy concurrency. It counts all children (no `where` filter yet) and tracks create / delete only (not re-parenting on update).

## Lifecycle triggers

A process `trigger` (start a process on an entity event) is the original glue and is documented with [processes](/help/intent/intent-file#processes), including the configurable `businessKey` and `businessKeyStrategy: timestamp`. Decision **resolvers** (load a related entity's field at a gateway) are also glue, emitted into `<intent>.glue`.

## What one intent can declare today

| Glue | Status |
| --- | --- |
| Lifecycle triggers (process start, `when` guard, business key + timestamp strategy) | implemented |
| Decision resolvers (`relation.field` at a gateway) | implemented |
| Notifications (email; literal / field / one-hop relation; `when`) | implemented |
| Schedules (cron to typed-`Criteria` query to per-row notify) | implemented |
| Integrations (event to `HttpClient`) | implemented |
| Inbound webhooks (`@Controller` ingest to entity) | implemented |
| Rollups (recompute a parent counter) | implemented |
| Documents (PDF) | planned |
| Status lifecycle / state machine | planned |
| Audit / history | planned |
| Dynamic user-task assignment | planned |

## Guardrails

- **Curated vocabulary, not a DSL.** Real logic is a `script` step or a `custom/` hook - the escape hatch is non-negotiable.
- **Every generated glue artefact has an override switch** via `.settings` (`overrides.{...}.generate = false`), so a hand-written `custom/` class can replace any single generated one.
- **Secrets and endpoints via `@config:` / `Configurations`**, never inline.
- **Bindings validated at parse** - a dangling `customer.namez` fails fast, not at runtime.
- Determinism, diff stability and comment preservation, as for every generator; each generated class carries a "generated from intent - do not edit" header.

## See also

- [The `.intent` file](/help/intent/intent-file)
- [Generators and generation](/help/intent/generators)
- [Message listeners](/help/develop/message-listeners) and [scheduled jobs](/help/develop/scheduled-jobs) - the SDK surfaces the glue generates against
- [Java SDK](/sdk/)
