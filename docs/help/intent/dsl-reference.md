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
| [`lifecycle`](#lifecycle-the-legal-status-graph) | the whole legal status graph, enforced on every status write |
| [`hierarchy` / `leafOnly`](#hierarchy-leafonly-tree-entities) | tree entities, leaf-only references |
| [`personal` / `partner`](#personal-partner-row-scoped-surfaces) | per-user and per-partner row-scoped surfaces (+ `sensitive` stripping) |
| [`visibleTo`](#visibleto-role-scoped-fields) | a field only some roles may read or write, enforced in the REST responses |
| [`multilingual` / `languages`](#multilingual-translated-master-data) | `_LANG` tables + read-time translation overlay, on entity reads and report columns alike |
| [calculated fields](#calculated-fields-actions) | server+UI-evaluated expressions, date functions, Java call-outs |
| [`view`](#view-calendar-range-slots) | calendar / range / slot-booking pages |
| [`documentItemsLayout: chat`](#documentitemslayout-chat-conversation-threads) | render a document's items as a chat thread |
| [`uses`](#uses-cross-model-references) | reuse entities owned by another intent model |
| [`processes`](#processes-workflows) | BPM workflows with user tasks, decisions, delegates, waits and boundary timers |
| [`forms`](#forms-task-ui) | task data-entry pages |
| [`actions`](#actions-custom-buttons) | developer-defined buttons opening custom pages |
| [`generates`](#generates-create-from) | one-click document-from-document cloning |
| [`generates.event`](#event-driven-creation-event) | mint the document on a source event instead of a click, at most once |
| [`generates.prompt`](#prompted-input-prompt) | collect a couple of values in a dialog before the create |
| [`transitions`](#transitions-guarded-status-flips) | guarded on-demand status flips (void / cancel / reopen) |
| [`postings`](#postings-source-document-to-ledger) | declarative source-document to balanced-document posting |
| [`expansions`](#expansions-child-rows-from-a-date-span) | generated child rows per day/week/month |
| [`rollups`](#rollups-denormalised-parent-totals) | counts, sums, balance + status maintenance, transitive chains |
| [`settlements`](#settlements-payment-allocation) | auto-allocation of payments across open invoices |
| [`reports`](#reports-read-only-aggregations) | aggregations, charts, dashboard KPI tiles, balance reports |
| [`widgets`](#widgets-custom-dashboard-tiles) | custom KPI / embedded-page dashboard tiles |
| [`seeds`](#seeds-initial-data) | initial data, CSV-backed sets, translations |
| [`notifications`](#notifications-email-on-change) | email on create/update/delete |
| [notify link placeholders](/help/intent/glue#links-back-to-the-application-recordurl-inboxurl-appurl) | `{recordUrl}` / `{inboxUrl}` / `{appUrl}` - a message that carries the way back into the application |
| [`notify.forEach`](/help/intent/glue#one-message-per-related-row-foreach) | fan a notify block out over a related collection: one message per row, every bare path resolved against the row |
| [`attach: recordPrint`](/help/intent/glue#one-document-many-recipients-attach-recordprint) | in a fan-out: attach the ANCHOR record's document, rendered once, to every recipient (`{record.<field>}` addresses that record) |
| [the notify block / `attach: print`](/help/intent/glue#the-notify-block-and-attach-print-sending-the-document-itself) | send a message about a record - with the record's own document attached - from a process step, a transition or a schedule |
| [`schedules`](#schedules-cron) | cron: notify or generate records per matching row |
| [`integrations`](#integrations-outbound-http) | outbound HTTP on a data change |
| [`integrations.payload`](#integrations-outbound-http) | the declared envelope a message carries, instead of the record as stored |
| [the event axis](/help/intent/glue#the-event-axis-lifecycle-and-process-step-events) | what a notification / integration binds to: an entity lifecycle event, or a process step reached / completed |
| [`inbound`](#inbound-arrivals-from-outside) | records arriving from outside: a webhook, a queue/topic message, a dropped file |
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
    history: true              # every write recorded as field-level deltas (see below)
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
- { name: hours, type: decimal, required: true, defaultValue: 8 }        # default value (see below)
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

## defaultValue - field defaults

```yaml
- { name: hours,    type: decimal, required: true, defaultValue: 8 }
- { name: billable, type: boolean, defaultValue: true }
```

One key, three effects:

* the column's **DB DEFAULT**;
* it **satisfies `required`** - the generated controller does not demand a value the model already
  guarantees (`isRequiredProperty && !dataDefaultValue`);
* it **seeds a new row in the generated UI** - the document item dialog opens on the default
  instead of on a blank (`def` on the column in the detail registry).

Applied on **create only**. An existing row is never re-defaulted: a value the user cleared is a
value the user chose, and re-applying the default on the next edit would silently undo it.

The to-one relation equivalent is `init: <seed id>`, which names a seeded record rather than a
literal.

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

**The lock reaches the document's lines.** A composition child declares no immutability of its own -
the lock belongs to the document - but its writes recompute the master's totals, so a line write on
a locked document would rewrite exactly what the lock protects: after the number was stamped, after
the immutable PDF snapshot was taken, after the entry posted to the ledger. Creating, editing or
deleting a line of a locked master is therefore refused with the same **409** by the child's own
controller, on every REST surface (the power controller and the partner / personal ones). The
generated UI already withheld the affordance; this is the server agreeing with it. Declare
[`locksWithMaster: false`](#lockswithmaster-a-child-collection-that-outlives-its-master-s-lock) on a
collection that must go on being recorded past the lock.

## lifecycle - the legal status graph

Every other status construct states one edge at a time: `init:` says where a record starts, a
`transitions` button guards the flips a user performs *through that button*, a workflow step sets a
status, a `checks` rejection files a record in another. Nothing states which moves are legal at all -
so a workflow branch, a glue action or a plain REST call can move a document from any status to any
other, and the model has no opinion about it.

`lifecycle:` states the whole graph, once:

```yaml
- name: SalesInvoice
  lifecycle:
    edges:
      - { from: DRAFT,  to: [ISSUED, CANCELLED] }
      - { from: ISSUED, to: [PAID, VOIDED] }
  relations:
    - { name: status, kind: manyToOne, to: SalesInvoiceStatus, function: EntityStatus, init: DRAFT }
```

- One entry per **source** status, listing every status reachable from it. Either side accepts a
  seeded status name or its id (see [Statuses by name](#statuses-by-name-not-by-id)).
- The graph is always over the entity's `function: EntityStatus` relation, so it names no column.
  (An `on:` key would be redundant - and YAML reads a bare `on` as the boolean `true`, so it could
  never bind; it is rejected rather than silently dropped.)
- The nomenclature must be seeded in the same intent. A status entity owned by another model is
  seeded there, and so is its lifecycle.
- A status that is no edge's `from` is terminal.

**Where it is enforced.** In the generated **repository** - the one place every status write passes
through, whoever performs it: the REST update, the transition controller's targeted write, a workflow
`setRelationField`, a rollup or a hand-written custom action. An unmodeled move is rejected with
**HTTP 400** and a message naming both statuses ("This SalesInvoice cannot move from ISSUED to DRAFT
- that is not a step its lifecycle allows"), and the record is left untouched. Guarding the
transition endpoints alone would leave every other writer free to jump anywhere, which is the hole
the declaration closes.

Where the status relation declares `init:`, the graph also fixes where a record may **enter** it: a
create carrying any other status is refused, since entering mid-lifecycle skips the graph rather than
travelling it. (The system's own create-time filing - an aggregate guard's `outcome: reject` - runs
after that check, so it still files the record where the model says it belongs.)

**What it makes impossible at generate time.** With a lifecycle declared, `transitions` become
presentation over its edges: each `from` status of a button must reach its `setStatus` along a
declared edge, and a status written by a workflow step or forced by a check's rejection must be one
some edge reaches. A reject path transiting through an approved status is reported when the intent is
read, not discovered in production.

`lifecycle:` composes with [`stage:`](#stage-what-a-status-means-to-the-lifecycle): a stage says what
a status *means* (draft / live / cancelled / void) and keeps a draft or voided document out of a
revenue total; the lifecycle says how a record may *move*.

## locksWithMaster - a child collection that outlives its master's lock

```yaml
- name: SalesInvoice
  immutableWhen: "Status == 3"        # ISSUED: the document's own content freezes
- name: SalesInvoiceCustomerPayment
  locksWithMaster: false              # ...but money keeps being recorded against it
  relations:
    - { name: SalesInvoice, kind: manyToOne, to: SalesInvoice, composition: true, required: true }
```

A master's immutability covers the document's own content, and by default it
[reaches the document's lines](#immutablewhen-immutable-user-write-immutability) - a child collection
freezes with its master, in the panel *and* at the REST layer. For some collections that is wrong:
the Add button and row actions on an invoice's allocations panel then exist only while the invoice
is DRAFT, i.e. never in the state where allocations matter.

`locksWithMaster: false` says so in the model: this collection keeps its user writes past the
master's lock, affordances and endpoints together. Content and settlement are different lifecycles
on the same document - an issued invoice's lines are frozen while money keeps arriving against it
for months.

One declaration governs both halves, so the screen and the server can never disagree about a given
collection. Engine-level writers are unaffected either way: auto-settlement, roll-ups, workflow
delegates and the void transition write through the repository rather than the controller, exactly
as the master's own guard already assumes.

Default `true`. Parse-validated on both halves - it must be a composition child, and its master must
actually declare `immutableWhen` / `immutable`, so an inert declaration fails at generate time
instead of quietly doing nothing. A document's own **line items** are unaffected by the flag: they
render in the items pane, not a child panel, and stay locked with the document.

## history - the shadow change trail

```yaml
- name: Contract
  audit: true
  history: true                  # every write recorded as field-level deltas
  fields:
    - { name: id,     type: integer, primaryKey: true }
    - { name: amount, type: decimal }
```

`audit: true` keeps only the LAST writer and time, in four columns of the row itself. `history: true`
keeps the whole trail: the entity gains a sibling `<TABLE>_HISTORY` shadow table - the same pattern as
the multilingual `<TABLE>_LANG` table - shaped
`GUID, Id, Operation, Property, OldValue, NewValue, ChangedAt, ChangedBy, Source`, and the generated
repository appends **one row per property whose value actually changed** on every write path it owns:
create (`null -> value`), update, the event-free system update, the targeted `updateProperty` /
`updateProperties` writes, a document master's totals recalculation, and delete (`value -> null`).

`Source` is `USER` or `SYSTEM`. The user-facing paths record `USER`; every targeted / system write -
a roll-up total, a workflow write-back, a process trigger stamping `ProcessId` - records `SYSTEM`.
Once a number the application moved and an amount a person typed sit in the same column, nothing
downstream can tell them apart, and "who changed this" is the first question asked of a trail.

The trail is read-only end to end. The entity's own controller exposes `GET /{id}/history` (404 on an
unknown record - never an empty trail a caller could read as "nothing happened here"), and the
generated manage form and document view render it as a **History** card in the right sidebar. No
create, update or delete verb exists for the shadow table on any surface, which is what makes it
append-only by construction rather than by policy.

What is deliberately NOT recorded:

- the **primary key** (it never changes) and the **audit columns** (they restate what the entry
  already carries - who and when);
- values that differ only in representation - a recomputed decimal of a different scale, a
  translated overlay of a stored value. The before-image is read WITHOUT the multilingual overlay, so
  a translated read never reports an edit nobody made;
- rows written outside the generated repository: **CSVIM seeds** and direct database writes have no
  history, which is correct - nobody wrote them.

The **personal and partner surfaces expose no history endpoint**. A scoped controller strips
`sensitive:` fields from its responses, so handing it a trail carrying those fields' old and new
values would leak exactly what the scoping hides. When a scoped History panel is wanted it arrives
with its per-property filter.

The append happens after the entity write, on its own connection - the store commits every operation
in its own transaction, so there is no enclosing transaction to join. A failure to append is logged at
ERROR and does not fail the business write, which has already been persisted.

Use it for the entities a regulated domain must be able to reconstruct, and only for those: it
multiplies the write volume of the entity.

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

A [report](#reports-read-only-aggregations) column bound to a translatable property is served in
the caller's language too - the generated query LEFT-joins `<TABLE>_LANG` on a bound `:language`
parameter and falls back to the base value - so a report grouping by a multilingual nomenclature
shows the same term as the list page beside it. Report **filters** (`filter:`, `scope:`, per-column
conditions) stay on the base table, so translating content never changes which rows a report
returns.

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

## visibleTo - role-scoped fields

A salary, a cost price, a margin is readable by everyone who may read the entity. `visibleTo`
scopes a single field to a list of roles: it is stripped from every REST response and ignored on
every write unless the caller holds one of them.

```yaml
permissions:
  - { role: Payroll }
  - { role: Administrator }

- name: Employee
  fields:
    - { name: name,      type: string,  required: true }
    - { name: dailyRate, type: decimal, visibleTo: [Payroll, Administrator] }
```

Holding **any one** of the listed roles is enough. Every role must be declared in `permissions:` -
a role no permission grants would hide the field from everybody, which is a typo far more often
than an intention, so Generate refuses it and names the roles the model does declare.

It is an **allow-list**, never the inverse "hidden for these roles": a role added to the
application later sees nothing until it is listed, and a misspelled role hides the value instead of
exposing it.

**What it does**

- **Reads** - the property comes back `null` for a caller outside the roles, on the regular
  controller *and* on the `personal` / `partner` ones (owning the record is not the same as being
  allowed to see every column of it).
- **Writes** - a create drops the value, an update keeps the stored one. No error: the field simply
  is not the caller's to set.
- **Change history** - a `history: true` entity leaves the field's entries out of the trail for
  that caller; it records the before/after of every write, so it would otherwise hand out exactly
  what the record withholds.
- **Derived totals** - a roll-up, an `aggregate: true` master field or an `aggregates:` target fed
  by a restricted field inherits its allow-list. A sum of hidden figures is that same figure one
  entity out.
- **The generated UI** - the pages ask the controller which fields it withholds from the caller
  (`GET .../restricted`) and leave those columns, inputs, totals, filters and CSV columns out. The
  browser is never told a role name, and the redaction on the wire remains the enforcement - the
  hiding is only so nobody stares at a permanently empty control.

**Not allowed on** the primary key, the entity's `identity` field or the document title: hiding
those does not produce a restricted field, it produces a broken page. A field referenced by a
`label:` is refused for the same reason - the generated `Name` is an ordinary column everyone gets.

**Reports are not scoped.** A report over a restricted field re-serves the figure to everyone who
may open the report, so Generate emits a warning naming the report, the field and its roles. That
is a legitimate thing to author - a payroll report over payroll data is the point - as long as the
report's own roles say who may open it.

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

## manyToMany - the intermediate entity, materialized

An n:m is always an intermediate (link) entity - one row per link. `kind: manyToMany` writes that
entity for you:

```yaml
entities:
  - name: Order
    relations:
      - { name: products, kind: manyToMany, to: Product }        # through: OrderLine to name it
```

materializes, before validation and Generate:

```yaml
  - name: OrderProduct                       # <Declaring><Target>, or the authored `through:`
    fields:
      - { name: id, type: integer, primaryKey: true, generated: true }
    relations:
      - { name: Order,   kind: manyToOne, to: Order, composition: true, required: true }
      - { name: Product, kind: manyToOne, to: Product, required: true }
```

so the link gets a real table, a detail grid under the declaring entity's page (dropdown for the
target), and can be seeded, reported on and referenced like any other entity. The target may be
cross-model (`model:`); the target-picker attributes (`where` / `show` / `major` / `size` /
`leafOnly`) travel onto the link's target relation.

**Author the intermediate entity yourself** (composition to one side + `manyToOne` to the other,
exactly as above) when the link carries **bridge fields** - a quantity, a partial `amount`, a
valid-from date - or a lifecycle of its own; then drop the `manyToMany`. Declare an n:m on **one**
side only, and note that a relation attribute describing a hand-authored to-one (`composition`,
`function`, `init`, `dependsOn`, a calculated action, `personal`, `partner`) is rejected on a
`manyToMany` rather than silently dropped.

## related - the records that reference this entity

A generated page shows its own fields, and a document shows its composition items. An entity that is
the **target** of associations had no way to show the records pointing at it - a project-month and
its per-employee timesheet lines, a customer and its invoices, an account and its journal entries.
`related:` declares that register, on the referenced entity:

```yaml
entities:
  - name: ProjectTimesheet
    related:
      - entity: EmployeeTimesheet          # the referencing entity
        model: employee-timesheets         # omit when it is declared in this model
        via: projectTimesheet              # omit when it points here exactly once
        label: Employee Timesheets         # omit for the pluralized entity name
        show: [number, employee, totalHours, status]   # omit for the source's own list columns
```

The register renders as a read-only grid on the referenced record's form / document / master page,
filtered to that record, and each row opens the referencing record's own page (in the shared record
dialog, so the open form keeps its unsaved edits - and so a source owned by another project works
the same way).

It is a **window, not an owner**: the listed records have their own lifecycle, pages and processes,
so there is no add, edit or delete. That is the whole difference from a composition child, which IS
edited in place as a detail / document-items collection - and why a composition child is rejected
here rather than rendered a second time.

**The declaration lives on the referenced side because that is the only side that can know.**
Generation is per model and leaf-first, so the model being referenced is generated before - and
generally knows nothing about - the models that reference it.

Rules: `entity` is required; a cross-model `model:` must be listed in `uses:`; `via:` is required
only when the source reaches this entity through more than one relation (an invoice naming the same
company as both issuer and recipient), which is refused rather than guessed; every `show:` name must
be a field or relation of the source. A cross-model source is resolved against the owner model's
generated `.model` (workspace, else the published registry copy) and fails loudly when it is not
there, exactly like a cross-model relation.

Scope today: the power surfaces (the personal / partner surfaces render no registers yet), the
filtered set without paging - like the detail panels - and `sensitive:` columns marked exactly as
the source's own lists mark them.

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
[personal / partner](#personal-partner-row-scoped-surfaces)), or a **relation walk** off the trigger
record:

```yaml
- name: approve
  kind: userTask
  args:
    assignee: { path: employee.manager, fallback: manager }
    form: ApproveRequest
```

Every segment of `path` is a **to-one relation** - the first of the trigger entity, each further one
of the previous target - and the walk ends at an entity that declares `identity:`, which is what maps
the record to a login. A **cross-model** relation may only be the **last** segment (a projection
carries the target's own properties but not its relations). Every hop is validated at parse time, so
a dangling segment fails Generate rather than the running process.

`fallback` is **required** and names the candidate group. The walk is resolved at **task entry** -
later than `assignee: personal`, which is fixed at process start, so a relation an earlier step of
the same process set is visible - and when it resolves to nobody (a null hop, a deleted record, a
blank identity) the task is created unassigned and the fallback group can still claim it. That is
what stops an unresolvable path from minting a task nobody can see.

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

### Event-driven creation - `event:`

A create-from may declare an `event:` and run by itself when the source reaches a state, instead of
waiting for someone to press the button. The canonical case is a document that arrives from outside and
is completed by an earlier step: a fine ingested by an [inbound arrival](#inbound-arrivals-from-outside), whose
responsible person is identified by a [transition](#transitions-guarded-status-flips), must produce a
declaration document from the fine and that person.

```yaml
generates:
  - name: declaration-from-fine
    from: Fine
    to: Declaration
    event: { onTransition: Fine, when: "Status == IDENTIFIED" }   # or { onCreate: Fine }
    map:
      Fine: id                       # REQUIRED with an event - the back-reference, i.e. the guard
      Vehicle: Vehicle
    defaults: { declaredAt: now }
    items:                           # a whole document - header AND items
      - { name: "Fine {number}", amount: Amount }
```

- Exactly one trigger: `onTransition` (a status write - the `when: "<StatusRelation> == <status>"` guard
  is **mandatory**; the status may be its seeded name) or `onCreate` (the source's insert - the guard is
  optional, for a source with no status lifecycle). The entity named there must be the one `from:`
  declares; the owning model is never repeated (`fromUses:` declares it).
- **`map:` must copy the source's `id` onto the target's to-one relation back to the source.** That
  back-reference is the at-most-once guard: the create-from looks for a target already back-referencing
  the source and returns it instead of creating a second one, so a redelivered event - or a click
  afterwards - is a no-op. Declaring an `event` without it is rejected at parse.
- **The button is dropped by default**; add `button: true` to keep both triggers. They share one
  generated create-from, and therefore one guard. `button: false` without an `event` is rejected - the
  action would have no trigger at all.
- `sourceStatus:` composes unchanged (the flip happens once the target exists, and cannot re-trigger the
  create-from because the guard has already claimed the source).

Generated artifacts: `gen/events/<module>/<ClassName>GenerateOnEvent.java`, a `MessageHandler` on the
source's `<project>-<perspective>-<Entity>-transitioned` topic (or its bare create topic for
`onCreate`) that re-reads the source by id, applies the guard, and calls the create-from in
`<ClassName>Generate.java`. Without `button: true` that class carries no `@Controller`/`@Post` - there is
no endpoint, because nothing links to one.

Prefer this over [`posts`](#posts-derived-rows-on-an-event) when the result is a document with line
items: `posts` writes flat mapped rows and cannot reference the freshly created header. Prefer it over a
button plus a `wait` step when the step is really waiting for a person to remember to click - an
unclicked record parks its process instance indefinitely.

### Prompted input - `prompt:`

When the target needs a value or two that cannot be derived from the source, `prompt:` declares a
small input form shown before the target is created. The canonical case is manual payment allocation
on an issued invoice - which payment, and how much (an allocation is often partial). It also reaches
a child record on an **immutable** document, because per-record action buttons are not gated on
mutability the way the document's own panels are (the same reason Void works on an issued invoice) -
the action-shaped sibling of
[`locksWithMaster: false`](#lockswithmaster-a-child-collection-that-outlives-its-master-s-lock),
which reopens the child's own panel: use the panel when the rows are ordinary data entry, and a
prompted action when the create is a guided one - a narrowed form over values the source mostly
derives.

```yaml
generates:
  - name: allocate-payment
    from: SalesInvoice
    to: SalesInvoiceCustomerPayment  # must be a composition child of forEntity (local, scope entity)
    label: Allocate Payment
    icon: link
    map:
      SalesInvoice: id               # the clicked record becomes the child's master FK
      Customer: Customer             # derived values stay mapped - prompt only what cannot be derived
    prompt:
      - { field: CustomerPayment, required: true }   # a to-one relation of the target -> a dropdown
      - { field: amount, required: true }            # a field of the target -> a typed input
```

Each `prompt` entry names a **field or to-one relation of the target**, so the dialog's controls are
typed from the target's own definitions and the target's `dependsOn:` declarations apply unchanged
(the payment list narrows to the invoice's customer, `amount` defaults to the picked payment's
amount). `required: true` is enforced in the dialog and again by the generated controller (HTTP 400
before anything is written). A property may not be both prompted and mapped/defaulted - exactly one
writer. The create still goes through the target's repository, so the ordinary `-created` event,
roll-ups and status flips fire unchanged.

`prompt:` cannot be combined with [`event:`](#event-driven-creation-event) - an event-driven
create-from runs with nobody there to answer the form.

## transitions - guarded status flips

A per-record button that flips an entity's `function: EntityStatus` relation on demand - void,
cancel, close, reopen - guarded by the allowed source statuses and an optional condition. A flip from
any other status (or a failing guard) returns **HTTP 409**; a successful flip publishes the
`-transitioned` event (which `postings` and integrations can consume).

```yaml
transitions:
  - name: VoidInvoice
    forEntity: Invoice            # must declare a function: EntityStatus relation
    from: [ISSUED, SENT]          # allowed source statuses (seeded names, or ids)
    setStatus: VOIDED             # the target status (not one of `from`)
    when: "Paid == 0"             # optional guard: <Field> ==|!= <number>
    label: Void
    icon: ban
    notify:                       # optional: mail the counterparty after the flip commits
      to: Customer.email          # (fail-soft - a mail problem cannot fail the flip)
      subject: "Invoice {number} was voided"
      body: "The invoice has been cancelled."
      attach: print               # optionally with the document itself attached
```

When the entity declares a [`lifecycle`](#lifecycle-the-legal-status-graph), a transition is
presentation over its edges: its `from`/`setStatus` pair must be one of them, and the graph is what
every OTHER writer is held to as well.

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

## resolves - fill a relation from a register valid on a date

```yaml
resolves:
  - name: identifyDriver
    event: { onCreate: Fine }               # onCreate or onUpdate, optional `when` guard
    set: driver                             # the to-one of Fine this fills
    from: VehicleAssignment                 # the register
    match: { vehicle: vehicle }             # register property <- record property (one or more)
    between: { start: validFrom, end: validTo, value: violationAt }
    outcome: resolution                     # optional string field: found / notFound / ambiguous
    found:     { setStatus: IDENTIFIED }
    notFound:  { setStatus: UNRESOLVED }
    ambiguous: { setStatus: UNRESOLVED }
```

The register says "X applied to Y from A to B" - a vehicle assignment, a price list, a contract in
force, an org assignment - and the record carries the match key(s) and the date. `dependsOn` cannot
express it (it is an authoring-time copy matched by equality), a `decision` condition is a single
comparison, and a `setField` step writes a constant.

**All three outcomes are first-class.** Exactly one covering row fills the relation; NO covering row
and MORE THAN ONE covering row both leave it unset - a lookup never picks one of two candidates,
because a silently-wrong driver (or price, or approver) is worse than an unresolved record. Route
each outcome with `setStatus` (a seed id or a [status name](#statuses-by-name-not-by-id)) and record
it with `outcome:`, so the unresolved records are a filterable worklist a person can finish and a
process `decision` can branch on.

| Key | Meaning |
| --- | --- |
| `event` | `{ onCreate: <Record> }` or `{ onUpdate: <Record> }`, plus an optional `when: "<Field> == <value>"` guard. `onDelete` is rejected - there is nothing left to fill |
| `set` | the to-one relation of the record the lookup fills |
| `from` | the register entity (declared in this model) |
| `match` | equality keys, `<registerProperty>: <recordProperty>`; at least one |
| `between` | `start` / `end` are `date`/`timestamp` fields of the register (either may be omitted = open-ended), `value` the record's date the period must cover |
| `outcome` | optional `string` field of the record stamped `found` / `notFound` / `ambiguous` |
| `found` / `notFound` / `ambiguous` | optional `{ setStatus: <id or name> }`; needs a `function: EntityStatus` relation on the record |

The value copied is derived, not authored: the register must have exactly ONE to-one relation to the
same entity as `set:` - zero or two is a generation error naming the register, since a lookup with a
choice of columns to copy is exactly the ambiguity this construct refuses. A record that already
carries the relation is skipped, so a manual correction is never overwritten and a re-delivered event
is a no-op. The end of a period is inclusive, and a date-only bound covers its whole day.

Generates a `MessageHandler` under `gen/events` that queries the register with a typed `Criteria`,
keeps the covering rows, and writes the resolved relation, the outcome and the status in ONE targeted
`updateProperties` - nothing else of the record is touched and no `-updated` event re-fires.

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
    scope: live                               # which lifecycle rows to count - see below
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

### scope - which lifecycle rows an aggregate counts

An aggregation over an entity that carries a lifecycle (a `function: EntityStatus` relation) is
**wrong by default**: drafts nobody has issued, cancelled documents and voided ones all land in the
sum. Classify the status nomenclature with [`stage:`](#stage-what-a-status-means-to-the-lifecycle)
and the report expresses "the rows that count" declaratively, instead of as a predicate over status
ids:

```yaml
reports:
  - name: RevenueByMonth
    source: SalesInvoice
    # no scope: an aggregation over a stage-classified lifecycle counts the LIVE rows
    dimensions: ["month(date)"]
    measures: ["sum(total)"]

  - name: InvoicesByStatus
    source: SalesInvoice
    scope: all                    # explicit opt-out: this report is ABOUT the lifecycle
    dimensions: [Status]
    measures: ["count(*)"]

  - name: VoidedInvoices
    source: SalesInvoice
    scope: void                   # a stage name selects the statuses classified with it
    measures: ["count(*)", "sum(total)"]
```

`scope` is `all` or one stage name, and requires the source to declare a `function: EntityStatus`
relation. A stage scope adds `WHERE <alias>."<STATUS FK>" IN (<the stage's seed ids>)` to the
generated query, ANDed onto any `filter:`.

**With no `scope`, a report counts the live rows only when all three hold:** it aggregates (has
`measures`, or is a balance report); its nomenclature is stage-classified; and neither its dimensions
nor its `filter` mention the status. The last condition matters - a breakdown **by** status keeps its
draft rows, and a hand-written status predicate stays authoritative rather than being combined with an
implicit one. Anything else counts every row, exactly as before.

::: warning Classify your statuses
When the nomenclature carries no `stage:` markers there is nothing to resolve, so **Generate reports a
warning** naming the report and its status relation - shown in the Intent Editor's notes strip and in
the Builder shell's publish panel, and returned as `warnings` from
`POST /services/ide/intent/generate`. That warning is the only signal the omission has: the report
still generates and the tile still renders a number. Treat it as a bug in the model.
:::

A nomenclature owned by **another model** (`uses:`) is seeded there, so its stages cannot be resolved
from this file; a `scope` over it is rejected at parse with a message pointing at an explicit
`filter:`.

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
      - { id: 1, name: DRAFT, stage: draft }  # what the status MEANS to the lifecycle
      - { id: 2, name: POSTED, stage: live }
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

### stage - what a status means to the lifecycle

A seed row of a **status nomenclature** (the target of a `function: EntityStatus` relation) should
classify itself with `stage`:

| Stage | Meaning |
| --- | --- |
| `draft` | Nobody has issued it yet - visible to its author, not yet economically real. |
| `live` | It counts: issued, sent, paid - anything in normal circulation. |
| `cancelled` | Withdrawn before it ever became live. |
| `void` | Deliberately retired while keeping its number (анулиране) - out of circulation by design. |

`stage` is **metadata, not data**: it never becomes a column, so the generated CSV and the imported
table are unchanged. It exists so that "the rows that count" is declared once, where the nomenclature
lives, instead of being re-derived as a magic-number predicate in every report and guard - see
[`scope`](#scope-which-lifecycle-rows-an-aggregate-counts).

A classified row must also carry its `id` (the stage classifies that id), the value must be one of the
four, and an entity that declares its own `stage` field cannot be classified this way - the collision
is reported rather than guessed at.

### Statuses by name, not by id

Everywhere the intent names a status - `transitions[].from` / `setStatus`, a relation's `init:`, a
`setRelationField` step's `value:`, `abortOn.status`, a check's `status` / `setStatus`,
`immutableWhen`, a `lifecycle` edge, a posting's `event.when`, a report's `filter:` - write the seeded **name** instead of
the number:

```yaml
transitions:
  - { name: VoidInvoice, forEntity: Invoice, from: [ISSUED, SENT], setStatus: VOIDED, when: "Paid == 0" }
reports:
  - { name: OverdueInvoices, source: Invoice, filter: "balance > 0 AND Status != VOIDED", measures: ["sum(total)"] }
```

Names are resolved to ids at parse time, so nothing downstream changes and numeric ids keep working.
Prefer names: **a status id is positional.** Inserting a status into the middle of a nomenclature
shifts every later id, and every guard authored against the old numbering keeps generating valid code
that now means a different status - nothing can tell, because the emitted constant is well-formed.
This is not hypothetical: it is how a red-storno posting guarded on the pre-insertion id stopped
matching the Void it was written for, leaving a general ledger holding a receivable for a document
that no longer existed.

An unknown name fails Generate with the known statuses listed. A name has no ordering, so
`Status >= ISSUED` is rejected - use a report `scope:` for "the rows that count". A status owned by
another model must still be referenced by its numeric id, since its seeds live in that model.

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

An optional `payload:` replaces the raw record with the envelope the receiver's contract actually
specifies. Values are a literal, a direct field, a one-hop `relation.field`, `@config:KEY`, or one of the
four context tokens `{uuid}` / `{now}` / `{tenant}` / `{user}`; interpolated text, nested values,
multi-hop paths and unknown tokens are parse errors, and a payload needs a method that carries a body.
See [Declarative glue › payload](/help/intent/glue#payload-the-declared-envelope).

```yaml
integrations:
  - name: announceMember
    event: { onCreate: Member }
    method: POST
    url: "@config:ANNOUNCE_URL"
    payload:
      type: "member.registered"
      version: 1
      messageId: "{uuid}"
      tenantId: "{tenant}"
      email: email
      country: country.name
      registeredAt: "{now}"
```

## inbound - arrivals from outside

Exactly one arrival per entry: an HTTP `path`, or a `source` naming exactly one of `queue` / `topic` /
`folder`. All three deserialise the JSON into `create:` and save it through the entity's repository; a
`folder` is polled (hence the mandatory `cron`), and every read file leaves the drop folder. See
[Declarative glue](/help/intent/glue#inbound-arrivals-from-outside).

```yaml
inbound:
  - { name: leadHook,  path: /webhooks/lead, create: Lead }
  - { name: leadQueue, source: { queue: leads.inbound }, create: Lead }
  - { name: leadFeed,  source: { topic: crm.leads }, create: Lead }
  - { name: leadDrop,  source: { folder: /data/inbox/leads, cron: "0 */5 * * * ?" }, create: Lead }
  # a contract with a system outside this deployment - never tenant-scoped
  - { name: leadFeedExternal, source: { queue: "global:codbex.leads" }, create: Lead }
```

A `queue` / `topic` name is scoped to the tenant on the broker unless it is prefixed `global:`, which
resolves it to the bare name for every tenant and every deployment bound to it - see
[global destinations](/help/develop/message-listeners#global-destinations-a-contract-with-another-system).

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
- **Bridge fields on a generated `manyToMany` link** - the materialized link entity carries only its
  key and the two FKs; a link with data of its own is authored as an explicit intermediate entity.
- **Cross-model status names and stage scopes** - a status nomenclature owned by another model is
  seeded there, so neither its `stage:` classification nor its names can be resolved from the
  referencing intent; both are rejected with the numeric-id fallback named.
- **Declarative glue actions beyond the current set**: publish a message on an event,
  event-driven `generateDocument` (produce a PDF on an event). Today's implemented glue: triggers,
  decision/form resolvers, notifications, schedules (notify + generate), integrations, ~~process-step
  events~~ (landed: `onStepReached` / `onStepCompleted` on a notification or an integration), inbound
  arrivals (webhook, and - landed - ~~message/file events~~ queue/topic and polled-folder sources),
  rollups, settlements, expansions, generates, transitions, postings, numbering (the
  `number:{stampOn:issue}` stamp delegate).
- ~~Cross-model schedule source~~ - landed: a schedule's `entity` (and a `forEach` collection) may
  live in another model via `model: <uses alias>` (generate action only).
- ~~`generates` completion hook~~ - landed: `sourceStatus` flips the source's status after the
  target is created.
- ~~Embedded calendar panel for a dependent composition child~~ - landed: a calendar-view
  composition child renders as an embedded calendar in its master's detail pane (a `scope:`
  relation filters and prefills by the parent).
- ~~Owner-based user-task assignment~~ - landed: `assignee: personal` routes a task to the record
  owner.
- ~~Resolver-path task assignment~~ - landed: `assignee: { path, fallback }` routes a task to the
  person a to-one relation walk off the trigger record names, resolved at task entry.
