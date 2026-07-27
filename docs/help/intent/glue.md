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

Generates a `gen/events/<Name>Job.java` `@Scheduled` `JobHandler` that runs a typed `Criteria` query (`where` to typed conditions, `CURRENT_DATE` / `CURRENT_TIMESTAMP` to now) and performs, per matching row, **exactly one of `notify` or `generate`** (the `notify` form uses the same relation-load + interpolation as notifications).

The `generate` variant creates a record through the **target's** repository (so numbering, status init and calculated fields fire); the target may be cross-model via a `uses:` alias, and it may fan out `children` (one child per matching entity, or per working day of the period):

```yaml
schedules:
  - name: monthlyTimesheets
    cron: "0 0 1 1 * ?"
    entity: Employee
    where:
      - { field: status, op: eq, value: ACTIVE }
    generate:
      to: EmployeeTimesheet          # cross-model target via a uses: alias
      map: { Employee: id }
      defaults: { Period: now }
      children:
        - to: EmployeeDayAllocation
          parent: EmployeeTimesheet
          forEach: { days: workingDays }   # one child per working day
          dayField: day
```

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

With `op: sum` the roll-up instead keeps `field` equal to the sum of the children's `of` field, and can maintain a `balance` (= `capacity - sum`) and flip a `status` relation to `statusWhenFull` / `statusWhenPartial` - the invoice paid / balance / PAID-PARTIAL pattern. Sum roll-ups also compose transitively across a multi-level composition (leaf edit to mid total to top total). See [rollups in the DSL reference](/help/intent/dsl-reference#rollups-denormalised-parent-totals).

```yaml
rollups:
  - { name: invoicePaid, entity: Allocation, via: SalesInvoice, field: paid,
      op: sum, of: amount, capacity: total, balance: balance,
      status: Status, statusWhenFull: 7, statusWhenPartial: 6 }
```

## aggregates

A total over one entity's rows grouped by SEVERAL to-one relations, materialised into its own
entity keyed by the same relations (on-hand per product and store, exposure per customer):

```yaml
aggregates:
  - { name: onHand, of: StockMovement, op: sum, sum: quantity,
      by: [Product, Store], into: ProductAvailability, field: onHand }
```

Three handlers per aggregate (source create / update / delete) upsert the target row for the
incoming row's key-tuple and recompute from every source row sharing it. The write is targeted
(`updateDerived`), so only the aggregate column is persisted. Unlike `rollups`, the total lives in
a referenceable entity rather than on a composition parent. See the
[DSL reference](/help/intent/dsl-reference).

## posts

Derived rows into a ledger on a document status event, mapped from the document and its items,
idempotent by a declared back-reference:

```yaml
posts:
  - { name: goodsReceiptLedger, event: POSTED, forEach: items, into: StockMovement,
      idempotentBy: GoodsReceipt, set: { Product: item.Product, Quantity: item.Quantity } }
```

The generated handler listens on the source's `-transitioned` topic, skips when rows already
back-reference the source, and writes through the target repository so its numbering and checks
still fire.

## Lifecycle triggers

A process `trigger` (start a process on an entity event) is the original glue and is documented with [processes](/help/intent/intent-file#processes), including the configurable `businessKey` and `businessKeyStrategy: timestamp`. Decision **resolvers** (load a related entity's field at a gateway) are also glue, emitted into `<intent>.glue`.

## Waits and boundary timers

The process-side "observe the outside world" primitives ([`wait`, `timeout:`, `expire:`](/help/intent/intent-file#processes)) each generate their own glue class under `gen/events`:

- a **wait listener** (`<Process><Step>Wait.java`, the `waits` collection) - a `MessageHandler` on the event entity's topic that applies the `when:` guard, resolves the record carrying the parked instance's `ProcessId` (through the `via:` back-reference, or the event record itself), and correlates the catch event's message fail-soft;
- an **expire date loader** (`Load<Process><Task>Expire.java`, the `timerLoaders` collection) - a `JavaDelegate` inserted before the user task that re-reads the trigger entity's date field at task entry and publishes the `java.util.Date` process variable the cancelling boundary timer arms from.

## What one intent can declare today

The event-then-action glue above, plus the data-flow glue documented in the
[DSL reference](/help/intent/dsl-reference) - [`settlements`](/help/intent/dsl-reference#settlements-payment-allocation),
[`expansions`](/help/intent/dsl-reference#expansions-child-rows-from-a-date-span),
[`generates`](/help/intent/dsl-reference#generates-create-from) and
[`postings`](/help/intent/dsl-reference#postings-source-document-to-ledger) - are all generated as the same annotated client-Java under `gen/events`.

| Glue | Status |
| --- | --- |
| Lifecycle triggers (process start, `when` guard, business key + timestamp strategy) | implemented |
| Decision / form resolvers (`relation.field` at a gateway or on a task form) | implemented |
| Notifications (email; literal / field / one-hop relation; `when`) | implemented |
| Schedules (cron to typed-`Criteria` query; per-row `notify` or `generate`) | implemented |
| Integrations (event to `HttpClient`) | implemented |
| Inbound webhooks (`@Controller` ingest to entity) | implemented |
| Rollups (count, and sum + balance + status) | implemented |
| Settlements (auto-allocate payments across open invoices) | implemented |
| Expansions (generate child rows from a date span) | implemented |
| Generates (one-click document-from-document create) | implemented |
| Postings (source document to balanced local document) | implemented |
| Owner-based user-task assignment (`assignee: personal`) | implemented |
| Waits (`wait` step - park on an entity event, correlate by `ProcessId`) | implemented |
| Boundary timers (userTask `timeout:` reminder / `expire:` date-driven withdrawal) | implemented |
| Standard per-document PDF print templates | implemented (see [Printing](/help/intent/printing)) |
| Event-driven document generation (produce a PDF on an event) | planned |
| Status lifecycle / declarative state machine | planned |
| Audit history (shadow `<Entity>History` entity; audit *columns* via `audit: true` ship today) | planned |
| Arbitrary resolver-path task assignment (beyond `assignee: personal`) | planned |

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
