---
title: Declarative glue
description: notifications, schedules, integrations, inbound arrivals (webhook, message, file), outbound departures (queue, topic), rollups, process-step events and lifecycle triggers - declared in the intent, generated as annotated client-Java, no hand-written code.
---

# Declarative glue

Beyond the model artefacts, the intent declares **glue**: common integrations and activities that would otherwise be hand-written code. The abstraction is one line:

> glue = `on <event>` then `do <action>`, with action parameters bound by resolver paths.

Three axes:

- **Event** - an entity `onCreate` / `onUpdate` / `onDelete` (with an optional `when:` guard), a **process step** reached or completed, a schedule (`cron`), or an inbound arrival (a webhook, a message, a dropped file).
- **Action** - notify (email), call out (HTTP), emit a message (queue/topic), ingest into an entity, recompute a counter, start a process.
- **Binding** - the **resolver path grammar** (`customer.name`, `member.email`): one-hop relation walks off the triggering entity, validated at parse time exactly like a decision's `then` / `else`.

## Glue is generated annotated client-Java

Unlike the model generators (which emit `.edm` / `.bpmn` / `.form` / ...), each glue activity is generated as an **annotated client-Java class against the SDK** (`org.eclipse.dirigible.sdk.*`) under `gen/events` - `@Listener` + `MessageHandler`, `@Scheduled` + `JobHandler`, `@Controller` + `@Post`. The annotated class **is** the artefact: `engine-java` synchronises and runs it, it is deterministic and regenerated with the app, and it is replaceable via a `custom/` override.

This is a deliberate exception to "never emit code from a generator" - because client-Java is now the platform's primary runtime and TypeScript is being deprecated. The line still held: **no hand-written business logic in `gen/`.** The moment an action needs real logic it becomes a `script` step or a `custom/` hook, never more intent syntax.

The author-facing fields are translated to Java by shared support classes (`EventBinding`, `NotificationSupport`, `ScheduleSupport`, the typed `Criteria` query API), emitted into `<intent>.glue`, and rendered by the `template-application-events-java` templates. `gen/events` is a sibling of `gen/<model>`, so it survives the per-model regeneration wipe.

::: warning Event-key gotcha
An event-binding key is `event:`, never `on:` - YAML 1.1 resolves a bare `on` (also `off` / `yes` / `no`) to the boolean `true`, so an `on:` key is silently swallowed. An action key is `do:`.
:::

## The event axis - lifecycle and process-step events

A glue entry that reacts (`notifications`, `integrations`) declares **exactly one** `event:`, on one of two axes:

| Axis | Shape | Fires when |
| --- | --- | --- |
| entity lifecycle | `{ onCreate\|onUpdate\|onDelete: <Entity> }` | a record is created / updated / deleted |
| process step | `{ onStepReached\|onStepCompleted: { process, step } }` | a running process arrives at that step / has just finished it |

```yaml
processes:
  - name: LoanApproval
    trigger: { onCreate: Loan }
    steps:
      - { name: librarianReview, kind: userTask,    args: { assignee: librarian, next: activate } }
      - { name: activate,        kind: serviceTask, args: { setField: status, value: ACTIVE } }

notifications:
  # "when the review task becomes available, tell the member's branch manager"
  - name: reviewPending
    event: { onStepReached: { process: LoanApproval, step: librarianReview } }
    to: member.branch.managerEmail
    subject: "Loan {id} is waiting for review"
    body: "A librarian must approve it."

integrations:
  # "when the loan has been activated, tell the partner system"
  - name: pushActivation
    event: { onStepCompleted: { process: LoanApproval, step: activate } }
    method: POST
    url: "@config:PARTNER_URL"
```

A step event is an event **about the record the process runs on** - the process's `trigger` entity - so every action parameter reads exactly as it does for a lifecycle event: the same `to:` recipient rule, the same `{placeholder}` interpolation, the same `when:` guard, the same forwarded body. That is not a coincidence: the generator inserts a small `JavaDelegate` (`<Process><Step>Reached`/`Completed`, the `stepEvents` glue collection) at the step's boundary, which loads the record by the id in the process context and publishes it on the entity's own topic plus a step suffix - `<project>-<perspective>-<Entity>-step-<process>-<step>-reached`. The notification / integration listener binds to that topic and consumes an ordinary entity payload; nothing in the action layer knows which axis fired it.

::: warning What is rejected at Generate
An undeclared process or step; a step that occupies no observable moment (only a `userTask` or a `serviceTask` does - not a decision, a wait or the end); a process with no `trigger`, since there is then no record the event could be about.
:::

`onStepReached` fires the moment the execution arrives - for a user task, when it becomes available in the Inbox. `onStepCompleted` fires after the step finished **and** after its writes are persisted (the task form's edits via the writer delegate, a `setField`), and the publish itself is deferred to after commit, so a consumer that re-loads the record never observes it stale. Any number of entries may observe the same moment: the emitter is generated once and publishes once. A branch that jumps back into an observed step re-enters it, so its `onStepReached` observers fire again.

## notifications

Email on an event of the axis above.

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

## The notify block - and `attach: print`, sending the document itself

`to` / `subject` / `body` is one reusable **notify block**, not a shape peculiar to `notifications`. The same block is authored at every place an intent can act on a record:

| Where | The record it is about | Generated as |
| --- | --- | --- |
| `notifications[]` | the event record | `<Name>Notification.java` (`@Listener`) |
| `schedules[].notify` | each matched row | `<Name>Job.java` (`@Scheduled`) |
| `transitions[].notify` | the transitioned record | inside `<Name>Transition.java`, after the flip |
| a `serviceTask`'s `args.notify` | the process's trigger record | `<Process><Step>Send.java`, a `JavaDelegate` the BPMN binds |

Add **`attach: print`** and the message carries the record's **own document**: the generated `<Entity>PrintFeeder` assembles the `{document, items}` payload through the repositories and `sdk.print.Print` renders it to PDF server-side - the same two steps the snapshot delegate takes - and the result rides along as an `application/pdf` part. This is the declarative form of the most common outbound action a business document has: the invoice to its customer, the payslip to its employee, a dunning reminder carrying the invoice it is about.

```yaml
    notify:
      to: Customer.email                 # literal / direct field / one-hop relation.field
      subject: "Invoice {number}"        # {field} and {relation.field} interpolation
      body: "Dear {Customer.name}, please find invoice {number} attached."
      attach: print                      # render THIS record's .print template and attach it
      language: bg                       # optional FIXED print-template language
      # or per record: languageFrom: Customer.locale  (a one-hop relation.field holding the code)
```

`attach` is `print` - the record the block is about - or, inside a fan-out, [`recordPrint`](#one-document-many-recipients-attach-recordprint). With `print` the entity must be a **document** (a header with a line-items child) - that is what has a `.print` template and a generated feeder to fill it. Attaching the print of a plain entity is a parse-time error, not a silent plain-text mail. The attachment is named after the document's `number:` field when it has one (`INV0000042.pdf`), else `<Entity> <id>.pdf`. The **render language**: `language:` fixes the print-template language; `languageFrom: <relation>.<field>` reads it per record off a one-hop to-one path (the customer decides the language their invoice arrives in) - the two are mutually exclusive. Absent both, the render uses the first entry of the tenant's application language set (`DIRIGIBLE_APPLICATION_LANGUAGES`) at send time; a blank `languageFrom` value falls back the same way. The sender address comes from `DIRIGIBLE_MAIL_SENDER`; delivery uses the platform's per-tenant mail configuration.

::: tip Failure semantics, per call site
A recipient that resolves to no address is a logged **no-op** - a record with nobody to mail must not stall a flow. A `transitions[].notify` is **fail-soft**: the status flip is the endpoint's contract and has already committed, so an SMTP problem is logged and the transition still returns success. A sending `serviceTask`, whose whole purpose *is* the message, fails the task instead, so the process engine's retry applies.
:::

### Links back to the application: `{recordUrl}`, `{inboxUrl}`, `{appUrl}`

"You have an approval waiting" is useless without the way back to the record, so `subject:` and `body:` accept three reserved link placeholders alongside the field ones:

| Placeholder | Resolves to |
| --- | --- |
| `{recordUrl}` | the record the message is about, opened in the generated application |
| `{inboxUrl}` | the recipient's process Inbox |
| `{appUrl}` | the application's external base URL - the origin only |

```yaml
    notify:
      to: Approver.email
      subject: "Approval needed: invoice {number}"
      body: "Open it here: {recordUrl}\nEverything waiting on you: {inboxUrl}"
```

All three names are reserved at every notify call site, so an entity field of the same name never shadows them (and declaring one is a mistake worth avoiding). **Never hand-type a route into a body**: `{recordUrl}` and `{inboxUrl}` are resolved for you to the complete address - `<base>/services/web/<project>/gen/<model>/index.html#/<Entity>/<id>/edit` and `.../index.html#/inbox` respectively. `{appUrl}` yields the origin alone; reach for it only for an address the other two cannot express, such as a page of your own.

The origin comes from the **`DIRIGIBLE_APP_BASE_URL`** configuration, which is tenant-overridable - the same instance mails each tenant its own host - and is read per dispatch inside the sending tenant's configuration scope. Leave it unset and the links render relative to nothing; set it to the externally reachable origin of the instance (`https://apps.example.com`).

::: tip Why the intent never writes the path
The routes belong to the template that renders the application, not to the model. An intent that spelled one would encode a layout it does not own - correct only until that layout changes, and silently wrong afterwards. The intent layer contributes the entity and its key; the events template composes the address, exactly as it already does for the task form's `__entityUrl`.
:::

Inside a [`forEach`](#one-message-per-related-row-foreach) fan-out `{recordUrl}` links the **row**, like every other bare path in the block - the row is what that message is about, while `{record.<field>}` reads the anchor record.

### One message per related row: `forEach`

Some sends are per-row rather than per-record - a payroll run mails every payslip to its own employee.
`forEach:` names a related entity and the block sends ONE message per row of it; from then on every path
(recipient, placeholders, `attach: print`) resolves against the **ROW**.

```yaml
    notify:
      forEach: Payslip                              # rows whose to-one FK points at this record
      to: Employee.email                            # the ROW's employee
      subject: "Payslip {PayrollRun.month}"         # one hop from the ROW
      body: "Dear {Employee.name}, net pay {net}."  # the ROW's own field
      attach: print                                 # the ROW's own document
```

The row entity must have exactly **one** to-one relation back to the record - none means the rows are
unrelated, several make the intended set ambiguous, and both are parse-time errors rather than a
silently wrong list of recipients. The generated code loops the rows with the loop variable named
`entity`, so the same pre-rendered expressions serve both shapes.

A fan-out is generated on a `transitions[].notify` and a `serviceTask`'s `args.notify`. A
`schedules[].notify` already runs once per matched row and a `notifications[]` entry is about the event
record, so a `forEach` on either is a parse-time error rather than a declaration that is quietly
ignored while a different message goes out.

### One document, many recipients: `attach: recordPrint`

The mirror shape: the related rows are only the **recipient list** and the document belongs to the
record they hang off - a request for quotation mailed to each invited supplier, an agenda mailed to
each participant. `attach: print` cannot express it (it renders the ROW, which is nobody's document);
`attach: recordPrint` renders the fan-out's **anchor record** - the record the block is about - ONCE,
before the loop, and attaches the same PDF to every message.

```yaml
    notify:
      forEach: InvitedSupplier                      # the rows: the recipient list
      to: Supplier.email                            # the ROW's supplier - the rows ARE the recipients
      subject: "RFQ {record.number}"                # {record.<field>} = the ANCHOR RECORD's field
      body: "Dear {Supplier.name}, please quote by {record.deadline}."   # bare = the ROW
      attach: recordPrint                           # the RECORD's document, rendered once
```

`recordPrint` needs a `forEach` (without one, `attach: print` already renders that very record) and it
is the **anchor** that must be a document - the row need not be. `language:` / `languageFrom:` then
select the anchor's render language, read off the anchor: the generated delegate calls a
`renderDocument(source)` before the loop - and not at all when the fan-out has no rows, so an empty
recipient list costs no render and cannot fail a step for nobody.

::: warning Which record a path reads is authored, never inferred
Inside a fan-out a **bare** path - the recipient, `{field}`, `{Relation.field}` - resolves against the
**ROW**, and the reserved prefix `record.` is the only way to address the anchor record:
`{record.<field>}` names ONE field of it (a walk on from the record is rejected). The recipient may
never be record-scoped: the rows *are* the recipients, so a record-scoped address would mail the same
person once per row. `record.` outside a fan-out is rejected too - there the bare placeholder already
IS the record's. All of it is checked at parse time, because nothing in a rendered message would show
that the wrong record had been read.
:::

::: warning A fan-out never fails its activity
Fail-soft per row at every call site, including a `serviceTask` (which otherwise fails): a row with no
recipient is skipped, a delivery failure is logged, and the step completes with a per-row summary.
Retrying would resend to every recipient already served - a partial fan-out cannot be made idempotent.
:::

A sending `serviceTask` stands alone: `notify` cannot be combined with `setField` / `setRelationField` / `call` / `delegate` on the same step - give the send its own step and route to it with `next`.

```yaml
processes:
  - name: InvoiceIssue
    trigger: { onCreate: Invoice }
    steps:
      - { name: issue, kind: userTask, args: { assignee: issuer, setRelationField: Status, value: 3, next: mailIt } }
      - name: mailIt
        kind: serviceTask
        args:
          notify: { to: Customer.email, subject: "Invoice {number}", body: "Attached.", attach: print }
          next: end
      - { name: end, kind: end }
```

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

### Cross-model source (`model:`)

The source `entity` is a local entity by default. Add `model: <uses alias>` to read the source from another (owner) model, so the schedule can live with the module that owns the CREATED rows instead of being forced into the source's module with a back-reference. The generated `JobHandler` imports the owner's `gen.<owner>.data...` classes and only READS them (a schedule never writes its source). A `forEach` collection may likewise be cross-model with its own `model:` alias. Both aliases must be declared under `uses:`.

```yaml
uses:
  - { model: projects }

schedules:
  - name: monthlyProjectTimesheets
    cron: "0 0 2 1 * ?"
    entity: Project
    model: projects                    # the source Project lives in the projects model
    where:
      - { field: Status, op: eq, value: 2 }
    generate:
      to: ProjectTimesheet             # LOCAL - owned by this model, no uses: needed
      map: { Project: id, Customer: Customer }
      defaults: { Period: now }
      children:
        - to: EmployeeTimesheet
          parent: ProjectTimesheet
          forEach:
            entity: EmployeeProjectAssignment
            model: projects            # the forEach collection is also cross-model
            match: { Project: id }
          map: { Employee: Employee }
```

- **`generate` only.** A cross-model source with a `notify` action is rejected at parse - notify needs the source's relation metadata, which only a local entity carries. Keep such a schedule in the source's model, or drop `model:`.
- **Validation split** (the same one relations use): that `model:` names a declared `uses:` alias is checked at parse; the source entity's existence and the `where` / `map` / `match` field references are checked at **generation** against the owner's `.model` (generate the owner model first, or install/publish its prebuilt module). A missing owner or a mistyped field drops that schedule with a warning in the generate response - it never emits a job that cannot compile.

## integrations

Tell another system on an event (outbound HTTP).

```yaml
integrations:
  - name: pushOrderToWarehouse
    event: { onCreate: Order }
    method: POST
    url: "@config:WAREHOUSE_URL"
```

Generates a `gen/events/<module>/<Name>Integration.java` self-describing `MessageHandler` that calls the URL via `sdk.http.HttpClient`. The `@config:KEY` sugar resolves to `Configurations.get` so endpoints and secrets stay out of the source. Custom headers are still a later increment.

### payload - the declared envelope

Without a `payload`, the request body is the record as stored. That is only right when the receiver accepts the entity, and it has a cost even then: every column becomes a public contract, so adding a field silently changes what the outside world receives. A real integration contract is usually an *envelope* - a type, a version, an idempotency key, a timestamp, an identifier of the sender - which no arrangement of entity columns can produce.

`payload` declares that envelope, key by key:

```yaml
integrations:
  - name: requestUserAssignment
    event: { onCreate: UserInvitation }
    method: POST                          # a payload needs POST / PUT / PATCH
    url: "@config:ASSIGNMENT_URL"
    payload:
      type: "user.assignment.requested"   # literal
      version: 1
      messageId: "{uuid}"                 # minted per message
      tenantId: "{tenant}"                # execution context
      appId: "@config:APP_ID"             # configuration
      email: email                        # a field of the record
      role: role.name                     # one hop off a to-one relation
      requestedAt: "{now}"
```

The generated handler then reads the record, loads each referenced relation once (the same one-hop mechanism a notification uses), builds the map in the authored key order and posts `Json.stringify(payload)` - so what the model says is exactly what goes on the wire.

The value forms are the ones [`notify`](#the-notify-block-and-attach-print-sending-the-document-itself) already resolves, deliberately borrowed rather than invented: a **literal**, a **direct field**, or a **one-hop `relation.field`** of a to-one relation. `@config:KEY` reads the configuration, as it does in `url`. The **context tokens** are a closed set of four:

| token | resolves to |
| --- | --- |
| `{uuid}` | `java.util.UUID.randomUUID()` - the idempotency key a receiver deduplicates on |
| `{now}` | `java.time.Instant.now()`, as an ISO-8601 string |
| `{tenant}` | `sdk.core.Tenant.getId()` - the tenant the send runs for |
| `{user}` | `sdk.security.User.getName()` - the user behind the change |

The cap is the point: three value forms and four tokens express a frozen contract without the block becoming a transformation language. What is refused, and refused at **parse**, not silently at run time:

- **Interpolated text.** `"Order {id} placed"` is rejected - a payload value is one whole value, not a template.
- **A nested object or list.** Same reason.
- **A multi-hop path.** `customer.country.name` is rejected, exactly as in a notify recipient.
- **An unknown context token.** `{today}` fails the parse rather than shipping an empty value.
- **A payload on a method with no body.** GET and DELETE send nothing, so a payload there would be built and discarded.

One thing to know about literals: a bare word that names no field and no to-one relation of the record is a **literal** (that is how `source: erp` and `type: "order.placed"` work at all - YAML quoting does not survive the parse). When you mean a reference and want the parser to check it, brace it: `email: "{email}"`.

## inbound - arrivals from outside

Another system tells us - a JSON record shaped like the entity, ingested into it. What differs between the three forms is only **where the record arrives**; the action is the same `create`, through the same repository.

```yaml
inbound:
  # HTTP - an endpoint the other system posts to
  - { name: ingestOrder,  path: /ingest, create: Order }
  # message - every record arriving on a queue (point-to-point) or a topic (broadcast)
  - { name: ordersQueue,  source: { queue: orders.inbound }, create: Order }
  - { name: ordersFeed,   source: { topic: crm.orders }, create: Order }
  # file - every file dropped into a folder, polled on the cron
  - { name: ordersDrop,   source: { folder: /data/inbox/orders, cron: "0 */5 * * * ?" }, create: Order }
```

An entry declares **exactly one arrival**: a `path`, or a `source` naming exactly one of `queue` / `topic` / `folder` - both, neither, or two channels fails at Generate. What each one generates under `gen/events`:

| Arrival | Generated class | Shape |
| --- | --- | --- |
| `path` | `<Name>Webhook.java` | a `@Controller` with a `@Post("<path>")`, served at `/services/java/<project>/gen/events/<module>/<Name>Webhook<path>` |
| `source: { queue \| topic }` | `<Name>Consumer.java` | a self-describing `MessageHandler` (`destination()` / `kind()`) on the platform broker |
| `source: { folder, cron }` | `<Name>FileImport.java` | a self-describing `JobHandler` (`cron()`) polling the folder |

Whichever it is, the record is saved through the entity's **generated repository**, so validations, translations and the create event fire exactly as for any other write - the arrival is a transport, not a second data path.

::: warning A folder is polled, not watched
That is why a `folder` source requires its `cron` (and why a `cron` on the other sources is rejected). A file holds one record or an array of them; a file modified within the last few seconds is left for the next tick (it may still be being copied in); and every read file leaves the drop folder - into `processed/` or, if it could not be ingested, `failed/` - so nothing is ever ingested twice and a rejected file stays inspectable.
:::

Conversation-shaped transports - acknowledgements, retries with backoff, certificates, SFTP - stay outside the intent by design: use a [Camel route](/help/ide/modelers/integrations-karavan) in the same project, feeding the entity's ordinary write path.

## outbound - departures to another system

The mirror of `inbound`: the application **raises a business event** for something outside it, on a queue or a topic. Reach for `integrations` when you are calling someone's API and want their answer; reach for `outbound` when you are announcing that something happened and nobody answers. That difference in failure semantics - a failed call versus a missed announcement - is why these are two blocks rather than one with a transport switch.

```yaml
outbound:
  # the record's own JSON, on a queue - one consumer takes each message
  - name: publishOrder
    event: { onCreate: Order }
    to: { queue: "codbex.orders" }

  # a declared envelope, on a topic - every subscriber gets it
  - name: announceActivation
    event: { onStepCompleted: { process: OrderApproval, step: activate }, when: "channel != internal" }
    to: { topic: "codbex.order-activations" }
    payload:
      type: "order.activated"
      version: 1
      messageId: "{uuid}"
      tenantId: "{tenant}"
      reference: number
      customer: customer.name
```

An entry declares **exactly one channel**: `to:` names a `queue` or a `topic` - both, neither, or two fails at Generate, which is the arrival rule above read backwards. It binds to the same [event axis](#the-event-axis-lifecycle-and-process-step-events) as everything else on this page, including its `when:` guard, and takes the same [`payload`](#payload-the-declared-envelope) envelope as an integration. Without a `payload` the body is the record's own JSON - exactly what an integration forwards over HTTP today.

What it generates under `gen/events`:

| Departure | Generated class | Shape |
| --- | --- | --- |
| `to: { queue \| topic }` | `<Name>Publisher.java` | a self-describing `MessageHandler` subscribed to the record's own event topic, re-publishing through `sdk.messaging.Producer.sendToQueue` / `sendToTopic` |

The publisher being a **subscriber** is the whole design. Every generated repository already publishes each write on an internal topic - that is what the rest of this page listens to - so a departure needs no new mechanism and no touch to the write path: it subscribes where a notification would, and sends instead of mailing.

::: warning Delivery semantics - stated, not implied
The message is published **after** the write that raised the event is persisted, and is **not** transactional with it. A failed publish is logged and the write stands - the same rule the notify block sets. There is no outbox, no exactly-once delivery and no ordering guarantee. If a contract needs any of those, it needs a real integration platform, not this block.
:::

::: tip A destination name is application-owned, and therefore tenant-scoped
The platform prefixes a destination with the tenant that touches it, which is right for a queue belonging to the application and wrong for one that **is a contract with someone else**. So a departure works as declared everywhere inside one deployment - its own `inbound` arrivals included - while two separate deployments sharing a broker need the platform's external-contract destination marker, which is [tracked separately](https://github.com/eclipse-dirigible/dirigible/issues/6766). Until it lands, cross-deployment emission works on the default tenant only.
:::

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


The parent may be owned by another model: with a cross-model `via` the handler resolves the parent's
package and perspective from the owner's `.model` and writes through the owner's repository. The
model must be declared in `uses:`, and an unresolvable roll-up is surfaced in the generate
response's issues rather than dropped.

## aggregates

A total over one entity's rows grouped by SEVERAL to-one relations, materialised into its own
entity keyed by the same relations (on-hand per product and store, exposure per customer):

```yaml
aggregates:
  - { name: onHand, of: StockMovement, op: sum, sum: quantity,
      by: [Product, Store], into: ProductAvailability, field: onHand }
```

Four handlers per aggregate (source create / update / delete, plus rekey) upsert the target row for
the incoming row's key-tuple and recompute from every source row sharing it. The rekey handler
receives the PREVIOUS row on a dedicated `-rekeyed` topic, published by the DAO only when a grouping
key actually moved, and repairs the tuple the row left behind. The write is targeted
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

## resolves

A to-one filled from the row of a **register** whose validity period covers a date the record
carries - the driver from a vehicle-assignment register on the violation date, the price from the
list in force on the order date, the approver from the org assignment on the request date:

```yaml
resolves:
  - { name: identifyDriver, event: { onCreate: Fine }, set: driver, from: VehicleAssignment,
      match: { vehicle: vehicle },
      between: { start: validFrom, end: validTo, value: violationAt },
      outcome: resolution, found: { setStatus: IDENTIFIED }, notFound: { setStatus: UNRESOLVED },
      ambiguous: { setStatus: UNRESOLVED } }
```

The generated handler listens on the record's event topic, queries the register by the `match` keys
with a typed `Criteria`, and keeps the rows whose period covers the date. All three outcomes are
first-class: exactly one covering row fills the relation, while none and more than one both leave it
unset - it never picks one of two candidates. Each outcome may flip the record's status, and
`outcome:` stamps `found` / `notFound` / `ambiguous` into a string field, which is what makes the
unresolved ones a worklist rather than a silent gap. The relation, the outcome and the status go out
in one targeted `updateProperties`. See the
[DSL reference](/help/intent/dsl-reference#resolves-fill-a-relation-from-a-register-valid-on-a-date).

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
| Send a document by e-mail (a notify block with `attach: print`, on a process step / transition / schedule) | implemented |
| Schedules (cron to typed-`Criteria` query; per-row `notify` or `generate`) | implemented |
| Integrations (event to `HttpClient`) | implemented |
| Process-step events (`onStepReached` / `onStepCompleted` on a notification or an integration) | implemented |
| Inbound arrivals (webhook `@Controller`, queue/topic `MessageHandler`, polled-folder `JobHandler`) | implemented |
| Outbound departures (event to a queue / topic via `Producer`, with the declared envelope) | implemented |
| Event-driven create-from (`generates` with `event:`, at most once per source) | implemented |
| Rollups (count, and sum + balance + status) | implemented |
| Settlements (auto-allocate payments across open invoices) | implemented |
| Expansions (generate child rows from a date span) | implemented |
| Generates (one-click document-from-document create) | implemented |
| Postings (source document to balanced local document) | implemented |
| Effective-dated register lookup (`resolves` - fill a to-one from the row valid on a date) | implemented |
| Owner-based user-task assignment (`assignee: personal`) | implemented |
| Resolver-path task assignment (`assignee: { path, fallback }` - a to-one walk off the trigger record) | implemented (see [DSL reference](/help/intent/dsl-reference#processes)) |
| Waits (`wait` step - park on an entity event, correlate by `ProcessId`) | implemented |
| Boundary timers (userTask `timeout:` reminder / `expire:` date-driven withdrawal) | implemented |
| Standard per-document PDF print templates | implemented (see [Printing](/help/intent/printing)) |
| Event-driven document generation (produce a PDF on an event) | implemented - mailed by `attach: print`, stored by `function: Snapshot` |
| Status lifecycle / declarative state machine (`lifecycle:` - the whole legal status graph, enforced on every status write) | implemented (see [DSL reference](/help/intent/dsl-reference#lifecycle-the-legal-status-graph)) |
| Audit history (shadow `<Entity>History` entity; audit *columns* via `audit: true` ship today) | planned |

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
