---
title: The .intent file
description: The .intent YAML schema - entities, relations, processes, forms, reports, permissions, seeds - plus the semantics that drive generation.
---

# The `.intent` file

One YAML document, at the project root, one per project. It is the whole application's intent in one place so the AI always diffs against full context and you always see the whole system at once. Content type `application/yaml+intent` (the `intent` extension) routes a double-click to the [Intent Editor](/help/intent/editor).

YAML, not JSON: comments, multi-line strings, no quote noise, friendlier diffs. It is loaded with SnakeYAML's `SafeConstructor`, so `!!type` tags are blocked - the intent often arrives from LLM output or paste and must never be a code-execution surface.

## A complete example

This is the canonical, integration-test-verified showcase - one Orders intent exercising every block:

```yaml
name: orders
description: Order management with approval workflow
version: 1

entities:
  - name: Country
    kind: setting
    description: ISO 3166-1 country reference data
    fields:
      - { name: id,    type: integer, primaryKey: true, generated: true }
      - { name: name,  type: string,  required: true, length: 100 }
      - { name: code2, type: string,  length: 2 }

  - name: Customer
    fields:
      - { name: id,          type: integer, primaryKey: true, generated: true }
      - { name: name,        type: string,  required: true, length: 200 }
      - { name: active,      type: boolean, defaultValue: "true" }
      - { name: creditLimit, type: decimal }
      - { name: orderCount,  type: integer }
    relations:
      - { name: country, kind: manyToOne, to: Country }
      - { name: orders,  kind: oneToMany, to: Order }

  - name: Order
    fields:
      - { name: id,        type: integer, primaryKey: true, generated: true }
      - { name: orderDate, type: date,    required: true }
      - { name: total,     type: decimal }
    relations:
      - { name: customer, kind: manyToOne, to: Customer }
      - { name: items,    kind: oneToMany, to: OrderItem }

  - name: OrderItem
    fields:
      - { name: id,       type: integer, primaryKey: true, generated: true }
      - { name: quantity, type: integer, required: true }
    relations:
      - { name: order, kind: manyToOne, to: Order, composition: true }

processes:
  - name: OrderApproval
    trigger: { onCreate: Order }
    steps:
      - { name: managerReview, kind: userTask, args: { assignee: manager, form: ApproveOrder } }
      - { name: bigOrder,      kind: decision, args: { if: "customer.creditLimit > 10000", then: cfoReview, else: notifyCustomer } }
      - { name: cfoReview,     kind: userTask, args: { assignee: cfo, form: ApproveOrder } }
      - { name: notifyCustomer, kind: serviceTask }
      - { name: done,          kind: end }

forms:
  - name: ApproveOrder
    forEntity: Order
    fields: [orderDate, total]
    actions: [approve, reject]

reports:
  - name: OrdersByCustomer
    source: Order
    dimensions: [customer]
    measures: ["count(*)", "sum(total)"]

permissions:
  - { role: Sales,   can: [Customer:read, Order:create] }
  - { role: Manager, can: [Order:approve] }

seeds:
  - name: countries
    entity: Country
    rows:
      - { id: 1, name: Afghanistan, code2: AF }
      - { id: 2, name: Albania,     code2: AL }
```

Plus the [declarative-glue blocks](/help/intent/glue) (`notifications`, `schedules`, `integrations`, `inbound`, `outbound`, `rollups`).

Every collection defaults to empty, so a partial intent (entities only) parses cleanly. Field names are camelCase.

## entities

```yaml
entities:
  - name: Customer          # PascalCase entity name
    description: Buyer account
    kind: setting           # optional - see "Setting entities"
    fields: [ ... ]
    relations: [ ... ]
```

### fields

```yaml
fields:
  - { name: id,      type: integer, primaryKey: true, generated: true }
  - { name: name,    type: string,  required: true, length: 200 }
  - { name: total,   type: decimal }
  - { name: active,  type: boolean, defaultValue: "true" }
```

| Key | Meaning |
| --- | --- |
| `name` | field name, camelCase (PascalCased in the generated model) |
| `type` | logical type (see below) |
| `primaryKey` | marks the PK; must be an integer type |
| `generated` | auto-increment (integer PKs only) |
| `required` | NOT NULL; the generated REST controller's required-value validation keys on this |
| `length` | column length for string types |
| `defaultValue` | column default |
| `unique` | a UNIQUE constraint (e.g. a code or a business key) |
| `precision` / `scale` | override the DECIMAL default (16, 2): `{ name: rate, type: decimal, precision: 18, scale: 6 }` |
| `calculatedOnCreate` / `calculatedOnUpdate` | an expression the generated repository assigns to the property on insert / update |
| `calculatedActionOnCreate` / `calculatedActionOnUpdate` | a server-side action call-out - see "Calculated fields" |
| `sensitive` | strip this field from the personal / partner surface and ignore it on their writes - see [Personal and partner surfaces](#personal-and-partner-surfaces) |
| `visibleTo` | a list of roles: the field is stripped from every REST response and ignored on every write for anyone else - see the [DSL reference](/help/intent/dsl-reference#visibleto-role-scoped-fields) |

Logical types: `string`, `text`, `integer`, `int`, `long`, `decimal`, `double`, `boolean`, `date`, `timestamp`, `uuid`, `month`, `week`. Generators map them to JDBC + EDM types. `text` becomes a CLOB; `uuid` becomes `VARCHAR(36)`. `month` (a `YYYY-MM` string) and `week` (a `YYYY-Www` ISO-week string) are stored as short `VARCHAR`s and render as the Harmonia month / week pickers.

**Primary keys must be an integer type** (`integer` / `int` / `long`). The Dirigible convention is an integer auto-increment id, and a non-integer auto-increment column is invalid SQL - the parser rejects a `uuid` or string PK. `uuid` is fine for non-PK fields.

`audit: true` on an **entity** adds the four standard audit columns (`CreatedAt`, `CreatedBy`, `UpdatedAt`, `UpdatedBy`), populated by the platform's audit annotations.

`multilingual: true` on an **entity** makes its string-typed properties translatable - see [multilingual](#multilingual-data-and-ui).

`label:` on an **entity** synthesises a stored, read-only `Name` recomputed on every write, so lookups and dropdowns show a meaningful label instead of a raw id:

```yaml
- name: SalesInvoice
  label: "{Number} - {Date|yyyy MMMM} - {Customer.name}"
```

Tokens are own fields or **one-hop** to-one relation properties (`{Customer.name}`); `|format` is a date pattern for temporal values. Deeper paths are rejected - compose by referencing the related entity's own label (`{Parent.Name}`). It is not allowed next to an authored `name` field, and a token must never reference a `sensitive` field.

### Control order

By default the generated UI controls (form inputs, list columns, detail rows) follow the declaration order - all fields first, then the to-one relations, so relations land last. Give an entity an `order:` list of property names to sequence them explicitly, interleaving fields and relations for a better form layout:

```yaml
- name: SalesInvoiceItem
  order: [Id, SalesInvoice, Product, Name, Quantity, UoM, Price, Total]
  fields: [ ... ]
  relations: [ ... ]
```

Names match the field / relation names (case-insensitive). A **partial** order is fine - any property not listed keeps its default position and is appended after the listed ones.

### Calculated fields

A field value can be derived on insert / update instead of being entered:

- **`calculatedOnCreate` / `calculatedOnUpdate`** - an expression the generated repository assigns to the property. Prefer a **neutral arithmetic expression** for numeric totals (`"Quantity * Price"`, `"round(Net * 0.2, 2)"`): the SDK `Calc` evaluator runs it on the server and the UI previews it live with the same evaluator. A non-numeric field's expression is emitted verbatim, so it must be valid Java for the Java DAO (e.g. `"java.util.UUID.randomUUID().toString()"`).
- **`calculatedActionOnCreate` / `calculatedActionOnUpdate`** - a server-side call-out for logic too custom to model (conditional / sequential number generation, lookups). The value names a Java class - a `@Component` implementing `org.eclipse.dirigible.sdk.db.CalculatedField<E, T>` (`T calculate(E entity)`) - that the repository invokes via `Beans.get(<class>.class).calculate(entity)`. It runs **server-side only** (no live preview) and **takes precedence** over the expression on the same slot. The implementation is hand-written by you under `custom/` (never `gen/`); the intent emits no Java.

To reference an action class by simple name, the entity declares `imports:` - a multi-line string of Java `import ...;` lines injected verbatim into the generated repository:

```yaml
entities:
  - name: SalesInvoice
    imports: |
      import custom.sales_invoices.SalesInvoiceNumberAction;
    fields:
      - { name: number, type: string, length: 100, calculatedActionOnCreate: SalesInvoiceNumberAction }
```

You then add `custom/sales_invoices/SalesInvoiceNumberAction.java`. Alternatively give the fully-qualified class name and omit the import.

The action class **must declare a named package** (e.g. `package custom.sales_invoices;`). A class in the default package cannot be imported or referenced from the generated repository, so the call-out will not resolve. See [Java compilation gotchas](/help/develop/languages/java#compilation-and-publishing-gotchas).

### relations

```yaml
relations:
  - { name: customer, kind: manyToOne, to: Customer }
  - { name: orders,   kind: oneToMany, to: Order }
  - { name: order,    kind: manyToOne, to: Order, composition: true }
```

Relation kinds: `oneToMany`, `manyToOne`, `oneToOne`, `manyToMany`. The FK lives on the to-one side; an `oneToMany` is navigation-only (the column is on the child), and a `manyToMany` is [materialised into its link entity](#many-to-many) at parse time.

- **`required: true` on a to-one** makes the FK NOT NULL but keeps the entity a top-level entity with its own perspective (a plain dropdown).
- **`composition: true` on a to-one** makes it a master-detail composition: the owning entity becomes DEPENDENT (managed as details under its parent's perspective), and the FK is NOT NULL (so `required` need not also be set). Only a `manyToOne` / `oneToOne` can be a composition; an entity's first `composition` to-one is its composition parent. Declare the inverse `oneToMany` on the master so the child is managed as a detail of it.

Composition is **opt-in** - this matches the Dirigible convention where most required FKs are plain associations and composition is explicit.

### Setting entities

```yaml
- name: Country
  kind: setting
```

`kind: setting` marks an entity as nomenclature / configuration. It is generated with `type="SETTING"`, which the template engine routes under the dashboard's global **Settings** perspective instead of giving it its own perspective. Any relation **targeting** a setting entity resolves its dropdown to the `Settings` perspective. Settings are still real entities (own table, seeds, FK columns) - only their UI placement differs. Default `kind` (omitted) is a regular managed entity.

### Personal and partner surfaces

On top of the regular controller (unaffected), an entity's records can be scoped to the logged-in user - the **My** shell at `/services/web/my/` - or to an external business partner - the **Partner** shell at `/services/web/partner/`.

```yaml
entities:
  - name: Employee
    identity: email                       # the string field matched against the login username
  - name: Timesheet
    relations:
      - { name: Employee, kind: manyToOne, to: Employee, personal: true }   # the record owner
    fields:
      - { name: rate, type: decimal, sensitive: true }   # hidden + ignored on the personal surface
```

- **`identity: <field>`** on the owner entity names the string field (conventionally a unique e-mail) matched against the login username.
- **`personal: true`** on a record-owning to-one relation generates an additional `<Entity>MyController` on the My shell: reads are filtered to the caller's mapped record, the owner FK is forced server-side on writes, and a foreign record returns 404. At most one `personal:` relation per entity; the target must declare `identity`; never put it on a composition parent - composition children inherit the owner's scope through their parent.
- **`partner: true`** is the exact mirror for EXTERNAL parties (customers, suppliers) on the Partner shell, whose perspectives register on the disjoint `application-partner-perspectives` extension point and are gated by the IdP roles (`Customer` / `Supplier` / `Partner`). An entity can carry both `personal:` (a staff owner) and `partner:` (an external owner) at once.
- **`sensitive: true`** on a field (never the PK, the identity field, or the owner FK) strips it from the personal and partner responses and ignores it on their writes - use it for billing rates and amounts the owner must not see.
- **`visibleTo: [Role, ...]`** on a field is the ROLE-scoped counterpart, and it holds on every surface, this one included: the value is stripped from the responses and ignored on the writes unless the caller holds one of the listed roles, because owning a record is not the same as being allowed to see every column of it. See the [DSL reference](/help/intent/dsl-reference#visibleto-role-scoped-fields).

A user task can also be routed to the record owner's Inbox with the literal `assignee: personal` (it resolves the owner through the `personal:` relation), or to whoever a **relation walk** off the trigger record names - `assignee: { path: employee.manager, fallback: manager }`. Every segment is a to-one relation and the walk ends at an entity declaring `identity:`; the required `fallback` names the candidate group that keeps the task claimable when the walk resolves to nobody. See the [DSL reference](/help/intent/dsl-reference#processes).

### Cross-model references (`uses`)

A relation can target an entity owned by a **different** project's intent model - master / reference data (`Customer`, `Country`, `Currency`, `UoM`) you do not want to redefine. The owner model owns the single table; this model stores an integer FK and renders a dropdown sourced from the owner's REST service. It does **not** generate the owner's table or API.

Declare the dependencies in a top-level `uses:` block, then point a `manyToOne` / `oneToOne` relation at the alias with `model:`:

```yaml
name: customers
uses:
  - { model: countries }                        # project defaults to the model alias
  - { model: currencies, project: currencies }   # set project when it differs from the alias
entities:
  - name: Customer
    fields:
      - { name: id,   type: integer, primaryKey: true, generated: true }
      - { name: name, type: string,  required: true }
    relations:
      - { name: Country,  kind: manyToOne, to: Country,  model: countries }
      - { name: Currency, kind: manyToOne, to: Currency, model: currencies }
```

A cross-model relation must be `manyToOne` / `oneToOne`, its `model:` must be listed in `uses:`, and it **cannot** be `composition: true` (a detail cannot be owned across models). Generate the owner (leaf) models before their consumers so the dropdown resolves; each project is its own `.intent` and all must be published to the same runtime. Under the hood this reuses the platform's PROJECTION mechanism.

### Many-to-many

An n:m is always an **intermediate (link) entity** - one row per link, holding a `composition` to one side and a `manyToOne` to the other (which may be cross-model via `model:`). It is a real entity: its own table, a detail grid with a dropdown under the declaring entity's page, and it can be seeded, reported on and referenced like any other.

**`kind: manyToMany` writes that entity for you:**

```yaml
  - name: Order
    relations:
      - { name: products, kind: manyToMany, to: Product }                  # link entity OrderProduct
      - { name: tags,     kind: manyToMany, to: Tag, through: OrderTag }   # named link entity
      - { name: parts,    kind: manyToMany, to: Part, model: parts }       # cross-model target
```

`Order.products` materialises, before validation and Generate:

```yaml
  - name: OrderProduct                    # <Declaring><Target>, or the name given by `through:`
    fields:
      - { name: id, type: integer, primaryKey: true, generated: true }
    relations:
      - { name: Order,   kind: manyToOne, to: Order, composition: true, required: true }
      - { name: Product, kind: manyToOne, to: Product, required: true }
```

and the authored relation becomes the navigation-only `oneToMany` to the link entity, so the model holds exactly one representation of the n:m.

Rules: declare the n:m on **one** side only (it is one link table); the target-picker attributes `where` / `show` / `major` / `size` / `leafOnly` are allowed and travel onto the link's target relation; `composition`, `function`, `init`, `dependsOn`, `calculatedActionOn*`, `personal` and `partner` are rejected on a `manyToMany` (they describe a hand-authored to-one) rather than accepted and ignored; `through:` is valid on `manyToMany` only, and a link name that collides with a declared entity is an error, not a silent merge. A self-referencing n:m is legitimate and its two ends are named apart.

**Author the intermediate entity yourself** when the link carries **bridge fields** - a quantity, a partial amount, a valid-from date - or a lifecycle of its own; then drop the `manyToMany`:

```yaml
  - name: SalesInvoiceCustomerPayment
    fields:
      - { name: id,     type: integer, primaryKey: true, generated: true }
      - { name: amount, type: decimal, precision: 18, scale: 2, required: true }   # partial allocation
    relations:
      - { name: SalesInvoice,    kind: manyToOne, to: SalesInvoice,    composition: true, required: true }
      - { name: CustomerPayment, kind: manyToOne, to: CustomerPayment, model: customer-payments, required: true }
```

## processes

```yaml
processes:
  - name: OrderApproval
    trigger: { onCreate: Order, when: "total > 0" }
    steps:
      - { name: managerReview, kind: userTask,    args: { assignee: manager, form: ApproveOrder } }
      - { name: bigOrder,      kind: decision,    args: { if: "customer.creditLimit > 10000", then: cfoReview, else: notifyCustomer } }
      - { name: cfoReview,     kind: userTask,    args: { assignee: cfo, form: ApproveOrder } }
      - { name: notifyCustomer, kind: serviceTask }
      - { name: done,          kind: end }
```

Generates one `<process>.bpmn` (Flowable-flavoured BPMN 2.0) plus the diagram interchange so the BPMN modeler renders it.

Step kinds: `userTask`, `serviceTask`, `decision`, `script`, `wait`, `end`.

**Decision steps**: `if` + `then` are mandatory, `else` optional. `then` / `else` must name a declared step or the literal `end`; the parser validates this, so a typo fails at parse time rather than producing a Flowable reject. Without `else`, the gateway default falls through to the next step.

A decision condition can walk **one hop** off the trigger entity (`customer.creditLimit > 10000`): the generator inserts a resolver service task before the gateway that loads the related entity and rewrites the condition to the resolved variable.

### wait - park the process on a data event

A `wait` step parks the process on a BPMN **message intermediate catch event** until an entity lifecycle event resumes it - a support case waiting for the requester's reply, a dunning flow waiting for a payment, an order flow waiting for its goods receipt:

```yaml
steps:
  - { name: requestInfo, kind: serviceTask, args: { setRelationField: Status, value: 4, next: awaitReply } }
  - { name: awaitReply,  kind: wait, args: { onCreate: CaseMessage, via: case, when: "internal == false", next: work } }
  - { name: work,        kind: userTask, args: { assignee: agent, form: WorkCase } }
```

- `onCreate | onUpdate: <Entity>` (exactly one; `onDelete` is rejected - a deleted record cannot resume a wait) names the resuming event of a declared entity.
- `via: <relation>` - when the event entity is not the trigger entity itself: the **event** entity's to-one relation that walks to the trigger entity (here `CaseMessage.case`). Omitted when the event entity *is* the trigger entity; same-model relations only.
- `when:` - the single-comparison guard over the **event record** (`field ==|!= literal`), so e.g. an internal note does not resume the wait.

The generated glue is a `MessageHandler` on the event entity's topic that resolves the record carrying the parked instance's `ProcessId` (through `via:`, or the event record itself) and calls `Process.correlateMessageEvent(processId, message)`. Correlation rides the `ProcessId` the trigger listener already writes back - which is why a `wait` requires the process to declare a `trigger:`. **Fail-soft:** no `ProcessId`, no matching parked instance, or an instance already past the wait is a no-op, never an error.

### timeout / expire - boundary timers on a user task

Two optional map attributes on a `userTask`'s args give generated flows a notion of time. Both route `then` like a decision branch (a declared step or `end`; route the main flow around the branch steps with `next`):

```yaml
steps:
  - name: approve
    kind: userTask
    args:
      assignee: approver
      form: ApproveQuotation
      timeout: { after: P3D, then: remind }              # non-cancelling: the task STAYS
      expire:  { until: validUntil, then: markExpired }  # cancelling: the task is WITHDRAWN
      next: done
```

- `timeout: { after: <ISO-8601 duration>, then: <step> }` - a **non-cancelling** boundary timer (`PT4H`, `P3D`): after the duration the `then` branch runs (a reminder / SLA escalation) while the task stays claimable.
- `expire: { until: <field>, then: <step> }` - a **cancelling** boundary timer driven by a `date` / `timestamp` field of the trigger entity (a quotation's `validUntil`): when the moment passes, the task is withdrawn and the flow continues at `then`.

The expire date is **re-read at task entry** by a generated loader delegate inserted before the task, so editing the date mid-flow moves the timer. A `date` field names the *last valid day* - the timer fires at the start of the day after it; a `timestamp` fires at its instant; a `null` value arms a far-future date so the timer never effectively fires. The Flowable async job executor (always active) runs the timer jobs - no configuration needed.

### retry / onError - step resilience on a delegate service task

A `delegate:` service task that talks to something remote - provision a schema, register a client in an identity provider, call a partner API - fails sometimes, and what happens then is part of the model, not the runtime's default. Two optional args, both on `delegate:` steps only:

```yaml
processes:
  - name: TenantProvisioning
    trigger: { onCreate: TenantApplication }
    vars:
      - { name: dbPassword, clearAfter: provisionApp }
    steps:
      - name: createSchema
        kind: serviceTask
        args: { delegate: SchemaProvisioner, produces: [dbPassword], retry: { count: 3, every: PT30S }, onError: recordFailure }
      - name: provisionApp
        kind: serviceTask
        args: { delegate: AppProvisioner, uses: [dbPassword], retry: { count: 5, every: PT1M }, onError: recordFailure, next: done }
      - { name: recordFailure, kind: serviceTask, args: { setField: failureMessage, value: "{error}", next: markFailed } }
      - { name: markFailed,    kind: serviceTask, args: { setRelationField: Status, value: Failed, next: end } }
      - { name: done, kind: end }
```

- `retry: { count: <n>, every: <ISO-8601 duration> }` - re-attempt the failed step `count` **further** times, spaced by `every` (the same vocabulary as `timeout.after`; `count` is an integer >= 1). Emitted as a Flowable failed-job retry cycle on the generated task, so each failed attempt rolls back cleanly and re-runs after the declared spacing. Absent, the step keeps today's behaviour - existing files generate byte-identically.
- `onError: <step | end>` - where the **exhausted** (or, with no `retry`, the first) failure routes, validated like `next` / `then`. Emitted as an error boundary event on the task; the runtime converts the final failed attempt into the caught BPMN error, so the token leaves through the boundary instead of dead-lettering. Route the main flow around the error steps with `next`, exactly like decision branches. Absent, an exhausted failure becomes the runtime's own incident, as before.
- `{error}` - the failure message. A `setField` value of exactly `{error}` (the whole value, nothing around it) writes the final attempt's message onto the record. It is only resolvable on a step reachable from some `onError` route - nothing else ever populates it - and the parser rejects it anywhere else.

The failed attempt that routes to `onError` commits the error-path writes (the message variable, the status set) like any caught BPMN error; the intermediate retried attempts roll back as plain job failures.

### vars - declared step data

`vars:` declares the process variables the steps exchange, so step data is written down instead of invented ad hoc inside a delegate:

```yaml
vars:
  - { name: dbPassword, clearAfter: provisionApp }
```

- A step's `produces: [name, ...]` / `uses: [name, ...]` lists which declared vars its delegate sets and reads (the delegate still calls `execution.setVariable` / `getVariable` itself - the declaration is the contract). **An undeclared name in either list is a parse error.**
- `clearAfter: <step>` removes the value from the instance data once that serviceTask / userTask completes normally - a generated credential does not survive in the process data or its history. A var name must be a plain identifier.

### trigger

`trigger: { onCreate | onUpdate | onDelete: <Entity>, when: "<expr>" }` starts the process on that entity's lifecycle event. Fully wired:

- the parser validates at most one event kind, and that the target is a declared entity;
- the EDM generator adds a `ProcessId` back-reference column to the entity (so the process starts at most once);
- `template-application-events-java` emits a `gen/events/<Process>Trigger.java` `@Listener` that loads the entity, applies the `when` guard, calls `Process.start(...)`, and writes the instance id back.

`when` supports a single `field ==|!= literal` guard. The **business key** defaults to the entity PK but is configurable:

```yaml
trigger: { onCreate: Order, businessKey: orderNo, businessKeyStrategy: timestamp }
```

`businessKey` names which field becomes the started instance's business key; `businessKeyStrategy: timestamp` mints a `yyyyMMddHHmmss` value into that field when it is blank (the field must be `string` / `text`). The strategy is the extension point for richer pluggable number generators later.

## forms

```yaml
forms:
  - name: ApproveOrder
    forEntity: Order
    fields: [orderDate, total]
    actions: [approve, reject]
```

Generates one `<form>.form` per form. Controls are typed by looking each field up against the bound entity (string/uuid to text input, text to textarea, integer/decimal to number, boolean to checkbox, date to date picker, timestamp to datetime). Actions become buttons, coloured by name (approve to positive; reject/decline/delete/cancel to negative; save/submit to emphasized). A stub controller declares `on<Action>Clicked` handlers as TODOs - real wiring is a downstream template or a `custom/` override.

## reports

```yaml
reports:
  - name: OrdersByCustomer
    source: Order
    dimensions: [customer]                 # bare to-one shows the target's label, not the FK id
    measures: ["count(*)", "sum(total)"]
  - name: BigOrderItems
    source: OrderItem
    dimensions: [order.orderDate, quantity] # relation.field path -> INNER JOIN
    filter: "quantity > 1"                   # -> WHERE
```

Generates one `<report>.report` per report, in the Dirigible `.report` shape with a fully materialised SQL `query`. Rooted at `source`:

- a plain field resolves to a source column;
- a `relation.field` path (`order.orderDate`) adds an `INNER JOIN` to the related entity plus a column on it;
- a bare to-one relation (`customer`) joins and shows the target's label (`name`-like) field, not the raw FK id - use `customer.id` for the id. A **cross-model** relation joins the owning model's table, so a report can group by an entity another module owns;
- a time bucket `month(field)` (a sortable `YYYYMM` integer, e.g. `202607`) or `year(field)` - standard-SQL `EXTRACT`, so H2 / PostgreSQL (not SQL Server);
- a measure `count(*)` / `sum(...)` / `avg` / `min` / `max` becomes an aggregate, and the dimensions become the `GROUP BY`.

`filter` becomes the `WHERE` with field names rewritten to qualified physical columns. All physical identifiers in the query are double-quoted for Postgres compatibility. Keep entity names non-reserved (avoid `Order` as a bare alias source on reserved-word databases).

The report `name`, `description` and column labels are emitted into the generated translation catalog, so they localize per language alongside the rest of the UI (see [multilingual](#multilingual-data-and-ui)).

### Chart

`chart:` renders the report page as a chart instead of a table (the page keeps a Table/Chart toggle, so filters, CSV export and print still work): one of `bar`, `line`, `pie`, `doughnut`, `polarArea`, `radar`. The grouping dimension labels the axis and each measure becomes a series, so a chart report wants exactly one dimension and one or more measures.

```yaml
reports:
  - name: MonthlyRevenue
    source: Order
    dimensions: ["month(orderDate)"]
    measures: ["sum(net)", "sum(vat)", "sum(total)"]
    chart: bar          # bar | line | pie | doughnut | polarArea | radar
```

A report may declare both a `chart` and a `widget` - they are independent surfaces.

### Dashboard KPI widgets (`widget`)

A report may declare a `widget` block that turns it into a KPI tile on the generated Harmonia home dashboard - a meaningful business number ("Overdue Invoices", "Revenue this month") instead of the default per-entity record-count tiles:

```yaml
reports:
  - name: OverdueInvoices
    source: Invoice
    dimensions: [number, customer.name, due, total]
    filter: "due <= CURRENT_DATE AND balance > 0"
    widget: { kind: count, label: Overdue Invoices, icon: alert-triangle }

  - name: RevenueByMonth
    source: Invoice
    dimensions: ["month(date)"]
    measures: ["sum(total)"]
    widget:
      value: "sum(total)"              # names a declared measure => kind: value
      at: { "month(date)": now }       # pin dimensions: the `now` token or a literal
      label: Revenue (this month)
      icon: banknote

  - name: SalesByProduct
    source: SalesInvoiceItem
    dimensions: [Product]
    measures: ["sum(quantity)", "sum(total)"]
    widget: { kind: list, limit: 5, label: Sales by Product }
```

- `kind: count` (default) - the number of records the report yields.
- `kind: value` - one aggregate cell: `value` names a declared measure; `at` pins dimension columns with equals conditions. The `now` token resolves at view time, type-aware: current `YYYYMM` on a `month(x)` dimension, current year on `year(x)`, today on a date column. Anything else is a literal.
- `kind: list` - the report's first `limit` rows (default 5) as a compact table tile.

A widget-bearing report shows the KPI tile **instead of** its dashboard preview tile (clicking still opens the full report), and declaring any widget replaces the auto per-entity count tiles. `dashboard: false` hides both tiles. `label`/`icon` (Lucide name) are optional. The same `widget` block can also be authored by hand for any standalone `.report` file via the Web IDE Report Editor's *Dashboard Widget* panel.

## widgets

Custom dashboard widgets - the dashboard's escape hatch when the report machinery cannot express the content:

```yaml
widgets:
  - name: SystemHealth
    kind: kpi                                    # default: a number tile fed by a REST endpoint
    url: /services/js/sales/custom/health.js    # GET returns { value, description? }
    label: System Health
    icon: activity
  - name: SalesFunnel
    kind: page                                   # a large tile embedding an HTML page
    url: /services/web/sales/custom/funnel/index.html
```

`kind: kpi` (default) renders a number tile whose value (a number or a display string like `"99.9%"`) comes from the developer's REST endpoint - typically hand-written code under the project's `custom/` folder. `kind: page` embeds the page in an iframe tile, like a report preview. The kind implies how the `url` is consumed, so there is no separate source-type field; the `url` must be a same-origin path (no scheme/host).

## permissions

```yaml
permissions:
  - { role: Sales,   can: [Customer:read, Order:create] }
  - { role: Manager, can: [Order:approve] }
```

Generates `<intent>.roles` (deduped by role name). It deliberately does **not** emit `.access` URL constraints - URL-shaped rules belong to whichever downstream template materialises the UI, because only that template knows the paths it publishes. The `can: [Resource:action]` tokens are an authoring hint to those downstream generators about which actions each role may invoke.

## seeds

```yaml
seeds:
  - name: order-statuses
    entity: OrderStatus
    rows:                                   # inline rows: small nomenclatures
      - { id: 1, name: DRAFT }
      - { id: 2, name: ISSUED }
  - name: countries
    entity: Country
    file: data/countries.csv                # or point at an authored CSV: bulk data
  - name: uoms-bg
    entity: UoM
    language: bg                            # a translation seed for a multilingual entity
    rows:
      - { id: 8, name: "Килограм" }
```

Generates `<seed>.csvim` + `<seed>.csv` per seed. The CSV header carries `<ENTITY>_<FIELD>` upper-snake column names; row order matches the entity's declared field order. The target table only exists after the downstream "Generate from EDM" output is published, so the CSVIM import retries via its own synchronizer until then.

Two seed shapes:

- **`rows:`** - inline seed data, right for small nomenclatures whose values are part of the flow (statuses, methods).
- **`file: data/<name>.csv`** - an authored CSV under the project (a `data/` subfolder is required), right for bulk nomenclatures and prepopulated demo data. The header uses the entity-derived physical column names (`<ENTITY>_<FIELD>`); a foreign key can be set by the relation name (`Country: 34`). The intent stays lean and the CSV is versioned by the developer.

A seed with `language: <code>` is a **translation** seed: it fills the per-language values of a `multilingual: true` entity (see [multilingual](#multilingual-data-and-ui)) and lands in the entity's `<TABLE>_LANG` table; rows carry the base row's `id` plus the translatable (string/text) fields only.

**Row keys are the entity's own names, matched exactly.** A field name, a **to-one** relation name (a collection has no column to set), or the lifecycle `stage:` marker - nothing else. A key matching none of them fails validation naming the nearest declared name, because accepting it would drop that column silently, and a dropped NOT NULL foreign key makes the import skip **every** row - a nomenclature that lands as zero rows behind a fully green pipeline:

```
seed [rates] row references [contributionScheme] which is not a field or a to-one relation of [Rate]
  - did you mean [ContributionScheme]? (names are case-sensitive)
```

## Multilingual data and UI

Two independent things get translated: the **data** in multilingual entities, and the generated **UI labels**.

**Data.** Mark an entity `multilingual: true` and its translatable (string-typed) properties gain per-language values in a sibling `<TABLE>_LANG` table (generated by the schema layer). Every read of the generated Java repository overlays the translated values for the caller's `Accept-Language` - the shell's Region & Language setting sends the user's choice on each call, and untranslated content falls back to the default language. Author the translations as [seeds](#seeds) with a `language:` code.

```yaml
languages: [en, bg]        # top level: the languages THIS module provides translations for
entities:
  - name: UoM
    kind: setting
    multilingual: true
    fields:
      - { name: id, type: integer, primaryKey: true, generated: true }
      - { name: name, type: string, required: true, length: 100 }
```

The languages the whole **stack** supports are a platform concern (`DIRIGIBLE_APPLICATION_LANGUAGES`, default `en,bg`) - never defined per module. The top-level `languages:` only declares which languages this module provides; the shell warns about a module missing a platform language.

A [report](#reports) reads the same data, so it reads it in the same language. A report column bound to a translatable property is served translated - whether the report is rooted at the multilingual entity or reaches it through a relation - so a report grouping by a multilingual nomenclature shows the same term as the list page beside it. A report is raw SQL and never loads an entity, so the overlay is done in the query: the generated `.report` LEFT-joins the `<TABLE>_LANG` table on the base row and a bound `:language` parameter, which the generated report repository fills from the caller's `Accept-Language`, and the column reads `COALESCE(<lang>."<Property>", <base>."<COLUMN>")` so an untranslated row keeps its base value. What a report **matches** is deliberately untouched: its `filter:`, its `scope:` and the per-column filters compile against the base table, so translating a nomenclature can never change which rows a report returns.

**UI labels.** Generation also emits a per-project i18n catalog (`translations/<locale>/*.json`) for every generated label: entity names (a humanized singular plus a `_plural` form), field labels, form and report names, report descriptions and column headers. The default locale (`en-US`) is generated for you; a translator adds a sibling locale folder (e.g. `bg-BG`) with the same keys. The Harmonia UI - sidebar, dashboard tiles, list headers, forms and report pages - renders through these keys, falling back to the baked English label for any key a locale has not translated.

## Naming and tables

- The top-level `name:` is the intent's identity. Single-file outputs are `<name>.edm` / `.model` / `.roles` / `.glue`; the table prefix is its upper-snake.
- Physical table names are **intent-prefixed**: `<INTENT>_<ENTITY>` upper-snake (`ORDERS_ORDER`), applied consistently across `.edm`, `.report` and `.csvim`. This dodges SQL reserved words and cross-project collisions in a shared schema. When the downstream "Generate from EDM" wizard asks for a table prefix, leave it empty - the prefix is already in the model.
- Property names are PascalCase in the generated model (`loanedOn` to `LoanedOn`); physical columns stay UPPER_SNAKE. You author in lower camelCase.

## Authoring rules

- **Comments are encouraged.** No tool ever rewrites the intent, so developer comments stay put; the AI patch path is prompted to preserve them.
- **No anchors / aliases** (`&foo` / `*foo`) at v1 - they make diffs harder for the AI. Prefer a `defaults:` block if duplication hurts.
- **No multi-document YAML** (`---`). One file, one document.
- **No tags** (already enforced by `SafeConstructor`).
- **Quote unquoted braces in scalars.** `to: {member.email}` is parsed by YAML as an object, not a string - write `to: member.email` (braces are only for `{...}` interpolation inside `subject` / `body`).
- An event-binding key is `event:`, never `on:` - YAML 1.1 resolves a bare `on` to boolean `true`. An action key is `do:`.
- **Only the documented keys exist, and they are case-sensitive** - see below.

### Unknown keys are errors, never silent

A key the intent does not declare - an invented one, or a case slip (`Required:` for `required:`) - **fails validation**. It is never accepted and ignored, because that silence is the worst outcome available: the typed mapping drops the key, parse returns 200, Generate 200, code generation 201, publish 200, and the only symptom is that the promise you wrote is simply absent at runtime.

The message names the key, where it sits and the nearest declared name, and appears wherever validation does - the Intent Editor's inline strip, the Builder's issue list, and the `POST /services/ide/intent/parse` response (422):

```
unknown key [requird] at [entities[Rate].relations[Scheme]] - did you mean [required]?
```

Three shapes are checked. The **intent's own keys** are matched against the DSL schema, at every level (root, entities, fields, relations, processes, reports, glue blocks and their nested blocks). A **seed row's** keys are matched against the target entity's own field and to-one relation names (see [seeds](#seeds)). And a **fixed-vocabulary block written as a mapping** - a process `trigger:` / `abortOn:`, a glue `event:` binding (including a step binding's `{ process, step }`), a posting's `rule:`, a `forEach:`, a lookup's `between:` / `found:` / `notFound:` / `ambiguous:`, and the boundary-timer and notify blocks nested in a step - is matched against its own vocabulary.

**A step's `args:` are matched per kind.** Both an invented argument and one belonging to another kind are errors, because a step reads neither:

```
process [InvoiceApproval] step [approve] declares unknown arg [assigne] - did you mean [assignee]?
process [InvoiceApproval] step [approve] declares arg [if] but is a userTask - if is a decision argument
```

Only maps whose keys are names from the application you are describing stay free-form: a `map:` / `defaults:` projection, a relation's `where:`, a widget's `at:`, and a delegate's injected `fields:`.

## See also

- [The Intent Editor](/help/intent/editor)
- [Generators and generation](/help/intent/generators)
- [Declarative glue](/help/intent/glue)
- [Entity Data modeler](/help/ide/modelers/entity-data) - the model the entities generate into
