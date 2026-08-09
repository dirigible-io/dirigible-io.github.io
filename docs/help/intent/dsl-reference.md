---
title: DSL reference
description: Quick index of every supported intent construct - one line and one snippet each - plus the recognised-but-not-yet-implemented list.
---

# DSL reference

The quick lookup surface for the intent DSL: one line and one minimal snippet per construct. The
in-product assistant guide (shipped with the engine) remains the authoritative reference for
rules, edge cases and validation messages; [The `.intent` file](/help/intent/intent-file) walks a
complete worked example.

| Construct | What it gives you |
|---|---|
| [`entities`](#entities) | tables + CRUD UI + generated Java repository/REST |
| [field / relation attributes](#field-relation-attributes) | uniqueness, layout, read-only, dropdown filtering, cascades |
| [`function`](#function-presentation-role) | explicit presentation role (Document, Setting, ...) |
| [`label`](#label-stored-display-name) | a stored, read-only display name for lookups and dropdowns |
| [`checks`](#checks-declarative-validations) | cross-field / cross-line validations |
| [`immutableWhen` / `immutable`](#immutablewhen-immutable-user-write-immutability) | 409 on user writes in a status / append-only snapshots |
| [`hierarchy` / `leafOnly`](#hierarchy-leafonly-tree-entities) | tree entities, leaf-only references |
| [`personal` / `partner`](#personal-partner-row-scoped-surfaces) | per-user and per-partner row-scoped surfaces (+ `sensitive` stripping) |
| [`multilingual` / `languages`](#multilingual-translated-master-data) | `_LANG` tables + read-time translation overlay |
| [calculated fields](#calculated-fields-actions) | server+UI-evaluated expressions, date functions, Java call-outs |
| [`view`](#view-calendar-range-slots) | an additional calendar / range page, or a slot-booking page |
| [`documentItemsLayout: chat`](#documentitemslayout-chat-conversation-threads) | render a document's items as a chat thread |
| [`uses`](#uses-cross-model-references) | reuse entities owned by another intent model |
| [`processes`](#processes-workflows) | BPM workflows with user tasks, decisions, delegates, waits and boundary timers |
| [`forms`](#forms-task-ui) | task data-entry pages |
| [`actions`](#actions-custom-buttons) | developer-defined buttons opening custom pages |
| [`generates`](#generates-create-from) | one-click document-from-document cloning |
| [`transitions`](#transitions-guarded-status-flips) | guarded on-demand status flips (void / cancel / reopen) |
| [`postings`](#postings-source-document-to-ledger) | declarative source-document to balanced-document posting |
| [`expansions`](#expansions-child-rows-from-a-date-span) | generated child rows per day/week/month |
| [`rollups`](#rollups-denormalised-parent-totals) | counts, sums, balance + status maintenance, transitive chains |
| [`settlements`](#settlements-payment-allocation) | auto-allocation of payments across open invoices |
| [`reports`](#reports-read-only-aggregations) | aggregations, charts, dashboard KPI tiles, balance reports |
| [`widgets`](#widgets-custom-dashboard-tiles) | custom KPI / embedded-page dashboard tiles |
| [`seeds`](#seeds-initial-data) | initial data, CSV-backed sets, translations |
| [`notifications`](#notifications-email-on-change) | email on create/update/delete |
| [`notify.forEach`](/help/intent/glue#one-message-per-related-row-foreach) | fan a notify block out over a related collection: one message per row, resolved against the row |
| [the notify block / `attach: print`](/help/intent/glue#the-notify-block-and-attach-print-sending-the-document-itself) | send a message about a record - with the record's own document attached - from a process step, a transition or a schedule |
| [`schedules`](#schedules-cron) | cron: notify or generate records per matching row |
| [`integrations`](#integrations-outbound-http) | outbound HTTP on a data change |
| [`inbound`](#inbound-webhooks) | webhook that creates records |
| [`permissions`](#permissions-roles) | roles |
| [Planned](#planned-recognised-but-not-yet-implemented) | recognised, not yet implemented |

## entities

The data model - every entity becomes a table, a generated Java repository + REST controller, and
a UI page. Integer primary keys only; composition is opt-in.

```yaml
entities:
  - name: Member
    icon: user
    audit: true                # adds CreatedAt/CreatedBy/UpdatedAt/UpdatedBy
    group: master-data         # nav group in the shared application shell
    fields:
      - { name: id,   type: integer, primaryKey: true, generated: true }
      - { name: name, type: string,  required: true, length: 200 }
    relations:
      - { name: loans, kind: oneToMany, to: Loan }
  - name: Loan
    fields:
      - { name: id,    type: integer, primaryKey: true, generated: true }
      - { name: dueOn, type: date }
    relations:
      - { name: member, kind: manyToOne, to: Member, composition: true }  # detail of Member
```

## Field / relation attributes

```yaml
- { name: code,  type: string, unique: true, length: 30 }              # UNIQUE constraint
- { name: uuid,  type: uuid, major: false }                            # auto-filled on create, off the list table
- { name: Number, type: string, number: { series: Sales Invoice, per: Company, stampOn: create } }  # document number
- { name: total, type: decimal, precision: 18, scale: 2, readOnly: true }
- { name: period, type: month }                                        # YYYY-MM month picker
- { name: sprint, type: week }                                         # YYYY-Www ISO-week picker
- { name: number, type: string, function: DocumentTitle }              # the document title/number
- { name: Currency, kind: manyToOne, to: Currency, size: 4 }           # form width (12-col grid)
- { name: Payment, kind: manyToOne, to: Payment, show: [date, number] }  # extra read-only lookup columns
- { name: Status, kind: manyToOne, to: OrderStatus, function: EntityStatus, init: 1 }  # managed badge, seeded default
# Depends-On - cascade, narrow-to-referenced, auto-populate:
- { name: City,  kind: manyToOne, to: City, dependsOn: { relation: Country, filterBy: Country } }
- { name: UoM,   kind: manyToOne, to: UoM,  dependsOn: { relation: Product, valueFrom: UoM } }
- { name: price, type: decimal,             dependsOn: { relation: Product, valueFrom: price } }
# Static option filter - e.g. only stock-tracked products:
- { name: Product, kind: manyToOne, to: Product, where: { Type: 1 } }
```

Entity-level extras: `order: [Id, Product, Quantity, ...]` sequences form controls and list
columns; `duplicable: true` adds a Duplicate button on a document (clones header + items through
the normal create path); `imports: |` injects Java import lines into the generated repository
(pairs with calculated actions); `aggregate: true` on a document master's numeric field keeps it
equal to the sum of the items' same-named field (the totals footer).

## function - presentation role

Optional and authoritative when set; inferred from structure otherwise.

```yaml
- name: ProjectTimesheet
  function: Document           # header + line items + status pill + totals
- name: EmployeeTimesheet
  function: DocumentItem       # its line items (no "*Item" naming needed)
```

Values: `Document`, `DocumentItem`, `Master`, `Detail`, `List`, `Setting`, `Calendar` (entity -
`Calendar` is the role alias for `view: calendar`); `DocumentTitle` (field); `EntityStatus`
(relation). `Board` / `Gantt` / `Timeline` are reserved and rejected until those templates ship.

## label - stored display name

A stored, read-only `Name` recomputed on every write, so lookups and dropdowns show a meaningful
label instead of a raw id.

```yaml
- name: SalesInvoice
  label: "{Number} - {Date|yyyy MMMM} - {Customer.name}"
```

Tokens are own fields or **one-hop** to-one relation properties (`{Customer.name}`); `|format` is a
date pattern for temporal values. Deeper paths are rejected - compose by referencing the related
entity's own label (`{Parent.Name}`). Not allowed next to an authored `name` field, and a token must
never reference a `sensitive` field.

## checks - declarative validations

Row-level `exactlyOne` on every user write; document-level `itemsMin` / `itemsSumEqual` gated on
a status transition - drafting stays unconstrained, and a failing transition aborts with the
authored message.

```yaml
- name: JournalEntry
  checks:
    - { kind: itemsMin,      count: 1, status: 2, message: "An entry needs at least one line" }
    - { kind: itemsSumEqual, over: [debit, credit], status: 2, message: "Debits must equal credits" }
- name: JournalEntryItem
  checks:
    - { kind: exactlyOne, fields: [debit, credit], message: "Exactly one of debit/credit" }
```

## checks: kind: guard - precondition over an aggregate

```yaml
- name: StockMovement
  checks:
    - kind: guard
      aggregate: onHand                 # an `aggregates` entry whose `of` is THIS entity
      minimum: 0                        # recomputed total (prior rows + this row) stays >= minimum
      message: "Insufficient stock"
      enabledBy: BLOCK_NEGATIVE_STOCK   # optional: enforced only while the config key is "true"
- name: SalesOrder
  checks:
    - kind: guard
      aggregate: openExposure
      minimum: 0
      outcome: task                     # accept the write, mark it for a human step
      marker: withinCredit
- name: LeaveRequest
  checks:
    - kind: guard
      aggregate: remaining
      minimum: 0
      outcome: reject                   # accept the write, file it already rejected
      setStatus: 4
```

| `outcome` | Companion | A violating write |
| --- | --- | --- |
| `block` (default) | - | throws `ValidationException`, mapped to 4xx; nothing stored |
| `task` | `marker:` boolean field | stored; the marker is set false (true whenever the guard holds) |
| `reject` | `setStatus:` status seed id | stored; the `function: EntityStatus` FK is set to that value |

Emitted into the generated repository's save and update paths. The total is recomputed
SYNCHRONOUSLY from the guarded entity's own rows for the incoming key-tuple (excluding the row being
updated), not read from the materialised aggregate target, so the decision cannot race the aggregate
handler. Guard and aggregate are therefore two independent computations of the same total, and the
guard is the authoritative one.

`outcome: task` stamps a flag; it does not create or route to a task. A process `decision` step
reads the marker and routes the record. `outcome: reject` requires an `EntityStatus` relation. A
companion attribute belonging to another outcome is a generation error, not ignored.

## immutableWhen / immutable - user-write immutability

```yaml
- name: JournalEntry
  immutableWhen: "Status == 2"   # while POSTED, REST update/delete return 409 (join terms with ||)
- name: InvoiceSnapshot
  immutable: true                # append-only: e.g. the frozen copy stored when an invoice is SENT
```

`immutableWhen` requires a `function: EntityStatus` relation; `immutable: true` needs none and is
mutually exclusive with it. Workflow/system writes through the repository stay possible -
corrections to an immutable record are flow-generated reversals, never edits. (`immutableIn:` is
the pre-rename spelling, rejected with a migration message.)

## hierarchy / leafOnly - tree entities

```yaml
- name: Account
  hierarchy: Parent                                        # the tree edge (self-relation)
  relations:
    - { name: Parent, kind: manyToOne, to: Account }
# elsewhere - only leaf accounts are referenceable (server-enforced):
- { name: Account, kind: manyToOne, to: Account, model: accounts, leafOnly: true }
```

The list renders as an expandable tree; the server rejects cycles and leaf-only references to a
node with children.

## multilingual - translated master data

```yaml
languages: [en, bg]            # the languages this module PROVIDES translations for
entities:
  - name: UoM
    kind: setting
    multilingual: true         # sibling <TABLE>_LANG table; reads overlay per Accept-Language
```

Translations are seeds with a `language:` code (see [seeds](#seeds-initial-data)). The
platform's supported language set is `DIRIGIBLE_APPLICATION_LANGUAGES`.

## Calculated fields / actions

Neutral arithmetic expressions run on the server and preview live in the UI; date functions
included. For logic beyond an expression, a hand-written `CalculatedField` component is called
out.

```yaml
- { name: net, type: decimal, calculatedOnCreate: "Quantity * Price", calculatedOnUpdate: "Quantity * Price" }
- { name: days, type: decimal, readOnly: true,
    calculatedOnCreate: "businessDaysBetween(FromDate, ToDate)" }     # also daysBetween, monthsBetween
- { name: Barcode, type: string, calculatedActionOnCreate: BarcodeAction }  # + entity imports:
```

For document numbers use the first-class [`number`](#number-document-numbering) attribute below, not
a calculated action - the platform owns a gap-free sequence for you.

## number - document numbering

Turns a string field into a platform-numbered document field. The platform owns a **gap-free,
per-tenant sequence per series** and stamps the field automatically - no hand-written number action
or delegate. The intent declares only a **reference to a series** - never how the number looks.

```yaml
# stamped on create (the number exists the moment the record is saved):
- { name: Number, type: string, number: { series: Proforma, stampOn: create } }

# partitioned per company, stamped at a modeled issue step (a UUID placeholder holds the field until then):
- name: Number
  type: string
  number:
    series: Sales Invoice   # documents sharing one legal range pass the same series
    per: Company            # optional: a to-one relation whose value partitions the sequence
    stampOn: issue          # create | issue
```

- **`series`** (mandatory) - the sequence identity. Give several document types (invoice, credit
  note, debit note) the **same series** to share one running number.
- **`per`** (optional) - a to-one relation of the entity whose value **partitions** the series:
  each partition value gets its own sequence, prefix and width. The canonical use is
  `per: Company` - two legal entities in one tenant each owe their own sequential range and must
  never share a counter. Identical numbers across partitions are correct; the partition only
  selects which sequence to draw from and never appears in the number. An `EntityStatus` relation
  cannot partition a series.
- **`stampOn`** - `create` stamps the real number on insert; `issue` puts a UUID placeholder on the
  field at create and generates a `gen/events/<Entity>NumberStamp` delegate that stamps the real
  number when the process reaches the step wired with `delegate: gen.events.<Entity>NumberStamp`.
  Stamping is **idempotent** - re-issuing after an amend keeps the same number.

### The series is tenant configuration, not model

A number series is a **tenant-level business object**, not a module asset. A number renders as **a
literal prefix plus the sequence zero-padded to a total width** (`SI00000042`) - there is no token
grammar, and neither the prefix nor the width is authored in the intent: baking a format into the
model would force a market that numbers documents differently to fork and regenerate the
application.

A module declares the series it needs in a **`.numbers` artefact** at the project root - a
requirement declaration, exactly as `.roles` declares roles (authored by hand, never generated):

```json
{"series": [{"name": "Sales Invoice", "prefix": "SI", "size": 10}]}
```

At publish, the `.numbers` synchronizer provisions each declared series **per tenant** when the
tenant has none yet - an existing series keeps its live counter and whatever shape its
administrator configured. Two modules may declare the same series only **identically** (a shared
legal range provisions once); a differing re-declaration fails that artefact loudly, naming both
modules. Unpublishing a module never removes a series or its counter - allocated ranges are
business history.

A **partitioned** series (`per:`) may additionally declare its **partition source** - the physical
table its partition values come from, with the key and display-label columns (authored physical
coordinates, exactly like a `.csvim`'s table and columns):

```json
{"series": [{"name": "Sales Invoice", "prefix": "SI", "size": 10,
             "partitions": {"table": "CRM_COMPANY", "key": "COMPANY_ID", "label": "COMPANY_NAME"}}]}
```

With a partition source declared, the **Document Numbering** settings label each partition row by
the entity's display name ("Sales Invoice — ACME Ltd." instead of a raw id) and list a row for
**every** partition value before its first allocation - so an operator seeds a company's starting
number before its first document is issued; saving such a row provisions it exactly as the first
allocation would have (the base row's shape, then the edit). The identifiers must be plain SQL
names (validated at parse), and a differing cross-module re-declaration fails the artefact just
like a differing shape.

Sequences are **continuous and never auto-reset**. A jurisdiction that restarts numbering each year
does it by an administrator setting the prefix and the next value (e.g. prefix `2027-`, next `1`,
in January) in the application shell's **Document Numbering** settings - visible and auditable,
rather than a hidden reset rule that could mint the same number twice. Allocating from a series no
`.numbers` artefact declares fails loudly - a document must never carry a number in a shape nobody
chose.

The field is read-only in the UI, and the create-time UUID placeholder is hidden in document titles
until the real number is stamped. Each series' prefix, total width and next value are configured
per tenant in the **Document Numbering** settings, and series are reachable from bespoke code
through the Java SDK [`DocumentNumbers`](/sdk/numbering/documentnumbers) facade.

## view - calendar, range, slots

```yaml
- name: EmployeeDayAllocation
  view: calendar                                   # month/week calendar of records
  calendar: { start: day, title: note }            # start (date/timestamp) required; end/title/color optional
- name: VacationRequest
  view: range                                      # from-to bars (leave calendar)
  calendar: { start: fromDate, end: toDate }
- name: Appointment
  view: slots                                      # slot-picker booking page
  slots: { start: startTime }
```

### A view adds a page

`view: calendar`, `view: range` and `view: slots` **add** a page - they never take one away. The
entity keeps the layout its structure implies (a list, a master-detail, or a document editor) and the
view joins it:

| Route | Page |
|---|---|
| `/<Entity>` | the calendar, or the slot picker |
| `/<Entity>/list` | the entity's own browse page (list / master / document list) |
| `/<Entity>/create`, `/<Entity>/{id}/edit` | the entity's own editor |

Both browse pages carry a switch to the other, and choosing a day, an event or a free slot opens the
entity's own editor. So `function: Document` composes with `view: calendar` **and** with
`view: slots`: the documents are browsed on a calendar (or booked from a picker) and still edited on
the document page, with their line items, Print button and inline process tasks. A picker is how a
record is *created*; the list or document page is how it is worked with afterwards, and an author
needs both. The personal (My) surface mirrors the calendar - `/my/<Entity>` is the calendar,
`/my/<Entity>/list` the list.

### A document's line items on a calendar

When the entity declaring `view: calendar` is a document's **line-items** child, the document's items
pane *is* the calendar instead of the row grid - the shape for a day-grained line, such as a booked
day or an allocated hour:

```yaml
- name: Roster
  function: Document
- name: RosterItem
  function: DocumentItem
  view: calendar
  calendar: { start: day, title: Person }
  fields:
    - { name: day,   type: date, required: true }
    - { name: hours, type: decimal, precision: 18, scale: 2 }
```

The document keeps its header, totals and Print; only the items pane changes. Clicking an event edits
that line in the usual line dialog, clicking an empty day adds one with that date filled in, and
Delete moves into the dialog (a calendar has no per-row menu). It cannot be combined with
[`documentItemsLayout: chat`](#documentitemslayout-chat-conversation-threads), which claims the same
pane.

## personal / partner - row-scoped surfaces

A record-owning to-one relation can scope an entity to the logged-in staff user or external
partner, adding a second generated controller with server-side row-level filtering.

```yaml
- name: Employee
  identity: email                    # field matched against the login username
- name: Expense
  relations:
    - { name: Employee, kind: manyToOne, to: Employee, personal: true }   # staff owner
    - { name: Supplier, kind: manyToOne, to: Supplier, partner: true }    # external-partner owner
  fields:
    - { name: rate, type: decimal, sensitive: true }   # stripped from the scoped surfaces
```

`identity` (on the person/partner entity) declares how a login maps to a record. `personal: true`
(at most one per entity) generates an `<Entity>MyController` filtered to the caller's owned records
on the personal shell; `partner: true` the mirror `<Entity>PartnerController` on the Partner shell
(`/services/web/partner/`, gated by the Customer / Supplier / Partner IdP roles). A `sensitive:
true` field is stripped from those scoped responses and ignored on their writes (enforced
server-side, not merely hidden). The regular controller is unaffected; an entity may carry both.

## documentItemsLayout: chat - conversation threads

A document master can render its line-items child as a chat thread (message bubbles + a composer)
instead of the editable items table - support cases, tickets, comment threads. The header, status
pill, process tasks and print stay as in a normal document.

```yaml
- name: Case
  function: Document
  documentItemsLayout: chat
- name: CaseMessage
  function: DocumentItem
  audit: true                                    # bubble author + timestamp come from audit
  fields:
    - { name: body,     type: text,    messageBody: true }      # the bubble text (exactly one)
    - { name: internal, type: boolean, messageInternal: true }  # internal memo (hidden from partners)
```

## uses - cross-model references

Entities owned by another intent model are referenced read-only (a projection + FK + dropdown -
no local table/DAO). Generate leaf-first so the owner's model exists. See
[Multi-model applications](/help/intent/multi-model).

```yaml
uses:
  - { model: countries }
entities:
  - name: Supplier
    relations:
      - { name: Country, kind: manyToOne, to: Country, model: countries }
```

Many-to-many is an explicit intermediate entity (composition to one side + `manyToOne` to the
other, plus bridge fields); `manyToMany` is parsed but never materialized.

## processes - workflows

```yaml
processes:
  - name: OrderApproval
    trigger: { onCreate: Order }
    steps:
      - { name: review,   kind: userTask, args: { assignee: manager, form: ApproveOrder } }
      - { name: decide,   kind: decision, args: { if: "action == 'approve'", then: activate, else: cancel } }
      - { name: activate, kind: serviceTask, args: { setRelationField: Status, value: 2, next: end } }
      - name: number
        kind: serviceTask
        args: { delegate: gen.events.OrderNumberStamp, next: end }   # generated by a number:{stampOn:issue} field
      - { name: cancel,   kind: serviceTask, args: { setRelationField: Status, value: 3, next: end } }
      - { name: end,      kind: end }
```

Service-task shapes: `setField` / `setRelationField` (generated handlers), `delegate` (a reusable
hand-written client `JavaDelegate` with injected `fields`). Decisions may test `relation.field`
paths (`customer.creditLimit > 10000`) - resolvers are generated. Tasks surface in the Inbox and
inline on the record's page. A user task's `assignee` is a role / candidate-group name, or the
literal `assignee: personal` to route the task to the **record owner's** Inbox (requires the
trigger entity to declare a `personal:` relation - see
[personal / partner](#personal-partner-row-scoped-surfaces)).

A running process can also **observe the outside world**:

```yaml
steps:
  - name: review
    kind: userTask
    args:
      assignee: reviewer
      timeout: { after: P3D, then: remind }              # non-cancelling reminder / SLA escalation
      expire:  { until: validUntil, then: markExpired }  # cancelling, date-field-driven expiry
      next: awaitReply
  - { name: awaitReply, kind: wait, args: { onCreate: CaseMessage, via: case, when: "internal == false", next: work } }
```

A **`wait`** step parks the flow on a message intermediate catch event until an entity event resumes
it (a reply arrives, a payment lands, a goods receipt posts) - the generated listener correlates on
the trigger entity's stamped `ProcessId`, through the `via:` back-reference when the event entity is
a different one. **`timeout:`** / **`expire:`** are boundary timers on a user task: `after:` an
ISO-8601 duration for a non-cancelling reminder, `until:` a `date`/`timestamp` field re-read at task
entry for a cancelling expiry. Details: [processes](/help/intent/intent-file#processes).

A **`parallel`** step runs branch steps **concurrently** and rejoins before `next` - two independent
reviews of one order at once instead of one after the other:

```yaml
steps:
  - { name: reviews, kind: parallel, args: { branches: [techReview, commercialReview], next: consolidate } }
  - { name: techReview,       kind: userTask, args: { assignee: engineer, form: ReviewOrder } }
  - { name: commercialReview, kind: userTask, args: { assignee: sales,    form: ReviewOrder } }
  - { name: consolidate,      kind: serviceTask, args: { setRelationField: Status, value: 2, next: end } }
```

It emits a BPMN parallel-gateway fork/join: the fork fans an unconditioned flow to each branch, and a
synthesized converging gateway waits for **all** branches before the single flow to `next`.

A branch is a **chain**, not a single step: it continues through that step's own routing - its
`next`, a decision's `then`/`else`, a boundary `timeout`/`expire` - and it may itself be a nested
`parallel` with its own fork/join pair:

```yaml
steps:
  - { name: reviews, kind: parallel, args: { branches: [techReview, commercial], next: consolidate } }
  # a two-step chain - the second step declares no routing, so it joins
  - { name: techReview,  kind: userTask,    args: { assignee: engineer, form: ReviewOrder, next: techSignoff } }
  - { name: techSignoff, kind: serviceTask, args: { setRelationField: TechStatus, value: 2 } }
  # a nested fork - no `next`, so its join flows into the enclosing one
  - { name: commercial,  kind: parallel,    args: { branches: [pricing, legal] } }
  - { name: pricing,     kind: decision,    args: { if: "amount > 1000", then: escalate, else: join } }
  - { name: escalate,    kind: userTask,    args: { assignee: manager, form: ReviewOrder } }
  - { name: legal,       kind: userTask,    args: { assignee: legal,   form: ReviewOrder } }
```

Everything a branch reaches is off the linear chain, so its declaration order carries no meaning -
and inside a branch there is **no positional fall-through**: a step routes explicitly, or, declaring
no routing at all, is a branch **terminal** and flows into the join. Route to the literal **`join`**
to converge on the enclosing join gateway explicitly - that is how a decision inside a branch rejoins
from both arms.

At least two distinct `branches`, each a declared step. `join` is valid only inside a branch, and no
step may be named `join`. A branch must never route to `end` - the join would wait forever for a
token that ended. A step may belong to only one branch, and a branch is entered through its fork
only, so a branch converges on `join`, never on the fork's own `next`. A top-level fork declares
`next` (a declared step or `end`); a **nested** fork may omit it, and then joins into its enclosing
join.

## forms - task UI

```yaml
forms:
  - name: ApproveOrder
    forEntity: Order
    fields: [orderDate, total, customer.name]     # fields or one-hop relation.field
    actions: [approve, reject]                    # complete the BPM task
```

## actions - custom buttons

```yaml
actions:
  - name: OpenPortal
    forEntity: Order
    scope: entity            # per-record; 'page' = whole-view toolbar
    page: /services/web/myapp/custom/portal.html
```

## generates - create-from

```yaml
generates:
  - name: invoice-from-timesheet
    from: ProjectTimesheet
    to: SalesInvoice
    uses: sales                       # model alias when the target is cross-model
    map: { Customer: Customer }
    defaults: { InvoiceDate: now }
    items: { from: ProjectTimesheetItem, to: SalesInvoiceItem, map: { Description: Description } }
```

Adds a button on the source view; the clone saves through the target's repository so numbering,
status init and calculated fields fire.

## transitions - guarded status flips

A per-record button that flips an entity's `function: EntityStatus` relation on demand - void,
cancel, close, reopen - guarded by the allowed source statuses and an optional condition. A flip from
any other status (or a failing guard) returns **HTTP 409**; a successful flip publishes the
`-transitioned` event (which `postings` and integrations can consume).

```yaml
transitions:
  - name: VoidInvoice
    forEntity: Invoice            # must declare a function: EntityStatus relation
    from: [3, 4]                  # allowed source status seed ids
    setStatus: 8                  # the target status seed id (not one of `from`)
    when: "Paid == 0"             # optional guard: <Field> ==|!= <number>
    label: Void
    icon: ban
    notify:                       # optional: mail the counterparty after the flip commits
      to: Customer.email          # (fail-soft - a mail problem cannot fail the flip)
      subject: "Invoice {number} was voided"
      body: "The invoice has been cancelled."
      attach: print               # optionally with the document itself attached
```

The `notify:` block is the same shape a notification or a schedule uses, and `attach: print` mails the
record's own rendered document - see
[the notify block](/help/intent/glue#the-notify-block-and-attach-print-sending-the-document-itself).

## postings - source-document to ledger

When a (usually cross-model) source document reaches a status, create one local document with
computed multi-line content. Idempotent via the back-reference; a missing rule or account skips
(the unposted worklist), never throws.

```yaml
postings:
  - name: salesInvoicePosting
    event: { onTransition: SalesInvoice, model: sales-invoices, when: "Status == 3" }
    creates: JournalEntry
    backReference: SalesInvoice
    map: { entryDate: date, reason: "Sales invoice {number}" }
    rule: { entity: PostingRule, match: { documentType: "Sales Invoice" } }
    items:
      - { Account: rule(receivableAccount), debit: "Net + Vat" }
      - { Account: rule(revenueAccount),    credit: "Net" }
      - { Account: rule(vatAccount),        credit: "Vat", when: "Vat != 0" }
```

**Conditional rule column.** When the account column must be chosen by a source value (a payment posts
to the bank account for a transfer, the cash account for cash), a single item row selects the rule
column by a classifier instead of duplicating the row per case - the same `by` / `cases` / `default`
shape the conditional `dependsOn` `valueFrom` uses. Quote it (it carries colons and braces):

```yaml
    items:
      - { Account: "rule(by: Method, cases: { 1: BankAccount, 2: CashAccount }, default: SuspenseAccount)", debit: "Amount" }
```

`by` is a source field/relation compared as a number (like a `when` guard); `cases` keys are the
classifier's seed ids and values are columns of the rule entity; `default` (optional) is the fallback.
No match and no default - or a null selected column - skips the posting to the unposted worklist. A
conditional cell already branches the account, so it cannot also carry a row `when`.

A second posting can **reverse** the first (red storno) when the source document is voided - pair it
with the [`transitions`](#transitions-guarded-status-flips) void that flips the source into its void
status. The reversal inherits `creates` / `backReference` / `rule` / `map` / `items` from the sibling
it names, negates every item amount on the **same** side (a red storno, not a swap of debit/credit),
links back to the original through the `storno` self-relation, and is fail-soft (nothing to reverse
when the source was never posted).

```yaml
postings:
  - name: docPosting
    event: { onTransition: Doc, when: "Status == 2" }   # posted
    creates: Entry
    backReference: Doc
    items:
      - { debit: "Amount" }
      - { credit: "Amount" }
  - name: docStorno
    event: { onTransition: Doc, when: "Status == 3" }   # voided
    reverses: docPosting                                 # inherit + negate the sibling's items
    storno: Storno                                       # the self-link field on the created Entry
```

## expansions - child rows from a date span

```yaml
expansions:
  - name: installments
    from: Loan
    into: LoanInstallment
    unit: month                                     # day (default) | week | month
    between: { start: startDate, end: endDate }
    map: { dueDate: period }
    spread: { total: principal, into: amount, round: 2 }   # last row absorbs the remainder
    count: periods
```

A span change replaces the generated child set; never mix hand-entered rows into an expanded
child.

## rollups - denormalised parent totals

```yaml
rollups:
  - { name: memberLoanCount, entity: Loan, via: member, field: loanCount }        # count
  - { name: invoicePaid, entity: Allocation, via: SalesInvoice, field: paid,      # sum + balance + status
      op: sum, of: amount, capacity: total, balance: balance,
      status: Status, statusWhenFull: 7, statusWhenPartial: 6 }
```

Roll-ups compose transitively across a multi-level composition (leaf edit → mid total → top
total); recomputation stops when values stop changing.

The parent may live in ANOTHER model: when `via` is a cross-model relation the child stays local (it
owns the event the handler binds to) and the parent's package + perspective are resolved from the
owner's `.model`, so the generated handler imports `gen.<owner>.data.<perspective>.<Parent>Repository`
and writes through it. The relation's model must be declared in `uses:`; the parent field is checked
against the owner's model at generation time, and a roll-up that cannot be resolved (undeclared model,
unknown field) is surfaced in the generate response's issues instead of being dropped silently.
`capacity` / `balance` / `status` stay local-only - they read the parent's own limit and status seeds
and stamp the capacity guard on the child.

## aggregates - keyed cross-entity totals

```yaml
aggregates:
  - name: onHand
    of: StockMovement           # the source rows
    op: sum                     # sum (default) | count
    sum: quantity               # the summed field
    by: [Product, Store]        # the grouping keys (to-one relations of BOTH source and target)
    into: ProductAvailability   # the target entity, keyed by the same relations
    field: onHand               # the target field holding the total
```

Where `rollups` write a total onto the parent of a composition (one key, the child's own parent
relation), an aggregate is keyed by SEVERAL relations and lands in its own entity, so the total is a
real row other records can reference and pickers can point at: on-hand per product and store, open
exposure per customer, remaining allowance per employee and year.

Emits three `gen/events/<module>/<Name>AggregateOn{Create,Update,Delete}.java` handlers on the
source's topics. Each upserts the target row for the incoming row's key-tuple and recomputes the
field from every source row sharing it (idempotent, self-healing), then writes ONLY the aggregate
column through the target repository's `updateDerived` - so a concurrent edit to another column of
the target row is never reverted. A source row with any grouping key null is ignored.

Eventually consistent, not transactionally exact.

Editing a grouping key MOVES the row between tuples and both sides are repaired. The tuple it moved
into is recomputed off the `-updated` event; for the tuple it LEFT the generated DAO re-reads the row
before the write, compares every grouping key, and - only when one actually moved - publishes the
PREVIOUS row on `<project>-<perspective>-<Entity>-rekeyed`, which a fourth handler
(`<Name>AggregateOnRekey`) recomputes. Only aggregate handlers listen on that topic, so no roll-up,
notification or integration sees a phantom event. A tuple whose last contributing row leaves keeps
its target row with a zero total. A grouping key changed through a TARGETED write
(`updateProperty` / `updateProperties`, e.g. a workflow setter) moves no tuple, because those paths
raise no entity event at all.

## posts - derived rows on an event

```yaml
posts:
  - name: goodsReceiptLedger
    event: POSTED               # a status value of the source, or `create`
    forEach: items              # the composition child to iterate (omit for one row per record)
    into: StockMovement         # the target entity (local or cross-model)
    idempotentBy: GoodsReceipt  # the target's back-reference FK to the source
    set:
      Date:         Receipt.Date
      Store:        Receipt.Store
      Product:      item.Product
      Quantity:     item.Quantity
      Direction:    1
      GoodsReceipt: Receipt.Id
```

A `set` value is a constant, `<Source>.<field>`, `item.<field>`, or a `Calc` expression over those
(`-item.Quantity` for a sign flip). Several entries under one event emit several rows per item: a
stock transfer posts an OUT and an IN movement from one document.

Emits a `MessageHandler` on the source's `-transitioned` topic (or the create topic for
`event: create`) that re-loads the source, skips when target rows already carry the
`idempotentBy` back-reference, and writes each row through the target repository - so the target's
own numbering, `checks:` and derived fields fire. The declarative form of the hand-written
document-to-ledger delegate; contrast `generates`, which creates ONE document from a user action.

## settlements - payment allocation

```yaml
settlements:
  - name: autoAllocate
    junction: SalesInvoiceCustomerPayment
    invoice: SalesInvoice
    payment: CustomerPayment
    amount: amount
    total: total
    paid: paid
    pot: amount
    order: date                       # allocate oldest first
    match: [Customer, Currency]
    status: Status
    payableStatuses: [3, 4, 6]
```

Generates the on-payment spread handler and an on-invoice pull delegate; pair with a `rollups`
sum entry that maintains `paid`/`balance`/status.

## reports - read-only aggregations

```yaml
reports:
  - name: OrdersByMonth
    source: Order
    dimensions: ["month(orderDate)"]          # month()/year() bucket dates; relation.field joins
    measures: ["count(*)", "sum(total)"]
    filter: "total > 0"
    chart: bar                                # render as a chart page
    widget: { value: "sum(total)", at: { "month(orderDate)": now }, label: Revenue (this month) }
  - name: TrialBalance
    kind: balance                             # opening / period / closing debit+credit per dimension
    source: JournalEntryItem
    date: journalEntry.entryDate              # runtime From/To pickers
    debit: debit
    credit: credit
    dimensions: [account.code, account.name]
    filter: "journalEntry.status == 2"
```

In `filter:`, reference relations via `relation.field` (translated to a JOIN); a bare relation
name passes into the SQL untranslated.

## widgets - custom dashboard tiles

```yaml
widgets:
  - { name: SystemHealth, kind: kpi,  url: /services/js/myapp/custom/health.js, icon: activity }
  - { name: SalesFunnel,  kind: page, url: /services/web/myapp/custom/funnel/index.html }
```

## seeds - initial data

```yaml
seeds:
  - name: statuses
    entity: OrderStatus
    rows:
      - { id: 1, name: DRAFT }
      - { id: 2, name: POSTED }
  - name: cities
    entity: City
    rows:
      - { id: 1, name: Sofia, Country: 34 }   # FK by the relation's authored name (case-sensitive)
  - name: countries
    entity: Country
    file: data/countries.csv                  # large sets: developer-owned CSV in a subfolder
  - name: uoms-bg
    entity: UoM
    language: bg                              # translations for a multilingual entity (_LANG)
    rows:
      - { id: 1, name: "Килограм" }
```

Row keys must match a field or relation name exactly (case-sensitive).

## notifications - email on change

```yaml
notifications:
  - name: welcomeMember
    event: { onCreate: Member }               # exactly one of onCreate/onUpdate/onDelete
    to: email                                 # a field, one-hop relation.field, or a literal
    subject: "Welcome"
    body: "Your membership is active."
```

## schedules - cron

Per matching row, exactly one of `notify` or `generate`:

```yaml
schedules:
  - name: monthlyTimesheets
    cron: "0 0 1 1 * ?"
    entity: Employee                          # SOURCE - local, or cross-model via `model:`
    where:
      - { field: status, op: eq, value: ACTIVE }
    generate:
      to: EmployeeTimesheet                   # cross-model target via `uses:` alias
      map: { Employee: id }
      defaults: { Period: now }
```

The source may live in another model via `model: <uses alias>` (generate action only; a `forEach` collection may carry its own `model:` too) - see [glue › cross-model source](/help/intent/glue#cross-model-source-model).

## integrations - outbound HTTP

```yaml
integrations:
  - { name: pushNewMember, event: { onCreate: Member }, method: POST, url: "https://api.example.com/members" }
```

## inbound - webhooks

```yaml
inbound:
  - { name: leadHook, path: /webhooks/lead, create: Lead }
```

## permissions - roles

```yaml
permissions:
  - { role: Librarian, can: [Member:read, Member:write, Loan:approve] }
```

## Print, tests and the shell (generated automatically)

Every document (header-items) master also gets a standard `<Entity>.print` template (the Print
button renders PDF via the document-template engine, per-language via CMS folders - see
[Printing and documents](/help/intent/printing)), a `<name>.test` UI-test manifest, and its
perspective in the generated SPA + the shared application shell (dashboard, Inbox, Documents,
Reports, Settings including Region & Language).

## Planned - recognised but not yet implemented

- Other reserved `function` values for upcoming templates are recognised but rejected with a
  clear "not yet available" message. (`function: Calendar` is now first-class - the role alias
  for `view: calendar`.)
- **`manyToMany`** - parsed but never materialized; the supported shape is the explicit
  intermediate entity.
- **Declarative glue actions beyond the current set**: publish/consume message,
  event-driven `generateDocument` (produce a PDF on an event), process-step events, inbound
  message/file events. Today's implemented glue: triggers, decision/form resolvers, notifications,
  schedules (notify + generate), integrations, inbound webhooks, rollups, settlements, expansions,
  generates, transitions, postings, numbering (the `number:{stampOn:issue}` stamp delegate).
- ~~Cross-model schedule source~~ - landed: a schedule's `entity` (and a `forEach` collection) may
  live in another model via `model: <uses alias>` (generate action only).
- ~~`generates` completion hook~~ - landed: `sourceStatus` flips the source's status after the
  target is created.
- ~~Embedded calendar panel for a dependent composition child~~ - landed: a calendar-view
  composition child renders as an embedded calendar in its master's detail pane (a `scope:`
  relation filters and prefills by the parent).
- ~~Owner-based user-task assignment~~ - landed: `assignee: personal` routes a task to the record
  owner. Arbitrary resolver-path assignment (an assignee resolved from any relation walk) is still
  planned.
