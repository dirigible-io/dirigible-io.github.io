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

Plus the [declarative-glue blocks](/help/intent/glue) (`notifications`, `schedules`, `integrations`, `inbound`, `rollups`).

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

Logical types: `string`, `text`, `integer`, `int`, `long`, `decimal`, `double`, `boolean`, `date`, `timestamp`, `uuid`. Generators map them to JDBC + EDM types. `text` becomes a CLOB; `uuid` becomes `VARCHAR(36)`.

**Primary keys must be an integer type** (`integer` / `int` / `long`). The Dirigible convention is an integer auto-increment id, and a non-integer auto-increment column is invalid SQL - the parser rejects a `uuid` or string PK. `uuid` is fine for non-PK fields.

`audit: true` on an **entity** adds the four standard audit columns (`CreatedAt`, `CreatedBy`, `UpdatedAt`, `UpdatedBy`), populated by the platform's audit annotations.

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

Relation kinds: `oneToMany`, `manyToOne`, `oneToOne`, `manyToMany`. The FK lives on the to-one side; the EDM generator ignores `oneToMany` / `manyToMany` (navigation-only) since the column is on the child.

- **`required: true` on a to-one** makes the FK NOT NULL but keeps the entity a top-level entity with its own perspective (a plain dropdown).
- **`composition: true` on a to-one** makes it a master-detail composition: the owning entity becomes DEPENDENT (managed as details under its parent's perspective), and the FK is NOT NULL (so `required` need not also be set). Only a `manyToOne` / `oneToOne` can be a composition; an entity's first `composition` to-one is its composition parent. Declare the inverse `oneToMany` on the master so the child is managed as a detail of it.

Composition is **opt-in** - this matches the Dirigible convention where most required FKs are plain associations and composition is explicit.

### Setting entities

```yaml
- name: Country
  kind: setting
```

`kind: setting` marks an entity as nomenclature / configuration. It is generated with `type="SETTING"`, which the template engine routes under the dashboard's global **Settings** perspective instead of giving it its own perspective. Any relation **targeting** a setting entity resolves its dropdown to the `Settings` perspective. Settings are still real entities (own table, seeds, FK columns) - only their UI placement differs. Default `kind` (omitted) is a regular managed entity.

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

There is no `manyToMany` materialisation. Model n:m as an **explicit intermediate entity** holding a `composition` to one side, a `manyToOne` to the other (which may be cross-model via `model:`), plus any bridge fields:

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

Step kinds: `userTask`, `serviceTask`, `decision`, `script`, `end`.

**Decision steps**: `if` + `then` are mandatory, `else` optional. `then` / `else` must name a declared step or the literal `end`; the parser validates this, so a typo fails at parse time rather than producing a Flowable reject. Without `else`, the gateway default falls through to the next step.

A decision condition can walk **one hop** off the trigger entity (`customer.creditLimit > 10000`): the generator inserts a resolver service task before the gateway that loads the related entity and rewrites the condition to the resolved variable.

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
- a bare to-one relation (`customer`) joins and shows the target's label (`name`-like) field, not the raw FK id - use `customer.id` for the id;
- a measure `count(*)` / `sum(...)` / `avg` / `min` / `max` becomes an aggregate, and the dimensions become the `GROUP BY`.

`filter` becomes the `WHERE` with field names rewritten to qualified physical columns. All physical identifiers in the query are double-quoted for Postgres compatibility. Keep entity names non-reserved (avoid `Order` as a bare alias source on reserved-word databases).

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
  - name: countries
    entity: Country
    rows:
      - { id: 1, name: Afghanistan, code2: AF }
      - { id: 2, name: Albania,     code2: AL }
```

Generates `<seed>.csvim` + `<seed>.csv` per seed. The CSV header carries `<ENTITY>_<FIELD>` upper-snake column names; row order matches the entity's declared field order. The target table only exists after the downstream "Generate from EDM" output is published, so the CSVIM import retries via its own synchronizer until then.

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

## See also

- [The Intent Editor](/help/intent/editor)
- [Generators and generation](/help/intent/generators)
- [Declarative glue](/help/intent/glue)
- [Entity Data modeler](/help/ide/modelers/entity-data) - the model the entities generate into
