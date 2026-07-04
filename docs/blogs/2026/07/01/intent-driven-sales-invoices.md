---
title: "From Prompt to Running App: Intent-Driven Development with Eclipse Dirigible"
description: "A hands-on walkthrough of building a complete Sales Invoices application from a single intent file - entities, a calculated document, an approval workflow and a modern UI, with the AI assistant doing the heavy lifting."
author: Nedelcho Delchev
author_gh_user: delchev
author_avatar: https://avatars.githubusercontent.com/u/6852373?v=4
read_time: 9 min
publish_date: July 1, 2026
---

Most application platforms ask you to model first, then wire, then build a UI, then write the glue. [Eclipse Dirigible](https://www.dirigible.io/) now lets you work **one altitude higher**: you describe the application you want in a single **intent** file, and the platform generates the data model, the persistence, the REST APIs, the UI and the workflow for you.

In this article we build a real **Sales Invoices** application end to end - from an empty project to a running app with an approval workflow - without hand-writing CRUD, REST or UI code. The finished sample lives at [`sample-intent-model`](https://github.com/dirigiblelabs/sample-intent-model).

## The three altitudes

The idea you need to grok first: there are three levels, and you author only the top one.

| Altitude | Artefact | Authored by |
| --- | --- | --- |
| 1 - Intent | one `*.intent` file | you (and the AI assistant) |
| 2 - Models | `.edm` / `.bpmn` / `.form` / `.report` / `.roles` / `.csvim` | generated from the intent |
| 3 - Application | schema, persistence, REST, UI, jobs, processes | generated from the models |

You edit the intent; the platform deterministically produces everything below it. Change a line, regenerate, and the whole stack follows.

## The scenario

A classic billing document: a **Sales Invoice** with a customer, a currency, line items, calculated totals, and a lifecycle - an invoice is drafted, **approved**, **issued** and **sent** (or rejected). That is exactly the kind of regulated, auditable, multi-step process Eclipse Dirigible is built for.

## Step 1 - Create the project and the intent

In the Dirigible web IDE, create a project and add a file `sales-invoices.intent` at its root. You can type the YAML by hand, but the faster path is to **prompt the AI assistant** built into the Intent Editor. Open the assistant pane and describe what you want:

> "A Sales Invoice with a customer, currency, line items (name, quantity, price, discount), and calculated Net, Vat and Total per line. Add an approval process: approve, then issue, then send, with a reject branch that cancels."

The assistant proposes a complete `app.intent` as a **diff** against your buffer. You review it, click **Accept**, and the editor's live diagram updates instantly.

## Step 2 - The intent, in plain YAML

What the assistant produces (and what you can refine by hand) is readable and compact. The document entity and its line items:

```yaml
name: sales-invoices
entities:
  - name: SalesInvoice
    audit: true
    fields:
      - { name: id, type: integer, primaryKey: true, generated: true }
      - { name: number, type: string, length: 100 }
      - { name: date, type: date, required: true }
      - { name: net,   type: decimal, precision: 18, scale: 2, aggregate: true }
      - { name: vat,   type: decimal, precision: 18, scale: 2, aggregate: true }
      - { name: total, type: decimal, precision: 18, scale: 2, aggregate: true }
    relations:
      - { name: Customer, kind: manyToOne, to: Customer, required: true }
  - name: SalesInvoiceItem
    fields:
      - { name: id, type: integer, primaryKey: true, generated: true }
      - { name: quantity, type: decimal, precision: 18, scale: 3, required: true }
      - { name: price,    type: decimal, precision: 18, scale: 2, required: true }
      - { name: discount, type: decimal, precision: 18, scale: 2 }
      - { name: net,   type: decimal, calculatedOnCreate: "Quantity * Price",        calculatedOnUpdate: "Quantity * Price" }
      - { name: vat,   type: decimal, calculatedOnCreate: "round(Net * 0.2, 2)",      calculatedOnUpdate: "round(Net * 0.2, 2)" }
      - { name: total, type: decimal, calculatedOnCreate: "Net + Vat - Discount",     calculatedOnUpdate: "Net + Vat - Discount" }
    relations:
      - { name: SalesInvoice, kind: manyToOne, to: SalesInvoice, composition: true, required: true }
```

Two things worth noticing:

- **`composition: true`** makes `SalesInvoiceItem` a *detail* of `SalesInvoice` - the platform generates a master-detail screen where items are managed inside the invoice.
- **Calculated fields** (`Net = Quantity * Price`, ...) are evaluated on the server and previewed live in the UI with the same evaluator. No event handlers to write.

The line totals roll up to the invoice header automatically because the header's `net` / `vat` / `total` are marked `aggregate: true`.

## Step 3 - Status, the document way

The invoice has a `Status` relation to a `SalesInvoiceStatus` nomenclature (DRAFT, APPROVED, ISSUED, SENT, CANCELLED). Two small flags make it behave like a real business document:

```yaml
relations:
  - { name: Currency,      kind: manyToOne, to: Currency, size: 4 }
  - { name: Status,        kind: manyToOne, to: SalesInvoiceStatus, documentStatus: true, init: 1 }  # 1 = DRAFT
  - { name: PaymentMethod, kind: manyToOne, to: PaymentMethod, init: 2, size: 4 }                    # 2 = Bank transfer
  - { name: SentMethod,    kind: manyToOne, to: SentMethod, init: 1, size: 4 }                       # 1 = E-mail
```

- **`init: 1`** sets the foreign key's **database-level default** - a new invoice starts as DRAFT the instant it is inserted, without any code or a workflow step. That matters: setting the initial status from a process step would race the trigger that starts the process. The FK default is race-free.
- **`documentStatus: true`** tells the generated UI to render this relation as a **status pill** in the document header; the matching **`documentTitle: true`** on the `number` field renders it as the document title.
- **`size: 4`** is the form-control width as a **12-column grid span** (3 = quarter, 4 = third, 6 = half, 12 = full). A control without a `size` takes half the row; giving Currency, PaymentMethod and SentMethod a third each packs the three short pickers onto a single row instead of three half-empty ones. It works on plain fields too.

## Step 4 - The workflow, declared in the same file

The lifecycle is a process that starts when an invoice is created and walks Approve -> Issue -> Send:

```yaml
processes:
  - name: SalesInvoiceApproval
    trigger: { onCreate: SalesInvoice }
    steps:
      - { name: approve,         kind: userTask,    args: { assignee: approver, form: ApproveSalesInvoice } }
      - { name: approveDecision, kind: decision,    args: { if: "action == 'approve'", then: activate, else: cancel } }
      - { name: activate,        kind: serviceTask, args: { setRelationField: Status, value: 2, next: issue } }   # APPROVED
      - { name: issue,           kind: userTask,    args: { assignee: issuer, form: IssueSalesInvoice, setRelationField: Status, value: 3, next: send } }  # ISSUED
      - { name: send,            kind: userTask,    args: { assignee: sender, form: SendSalesInvoice,  setRelationField: Status, value: 4, next: end } }   # SENT
      - { name: cancel,          kind: serviceTask, args: { setRelationField: Status, value: 5, next: end } }      # CANCELLED
      - { name: end,             kind: end }
```

Status transitions use **`setRelationField: Status, value: N`** - a step sets the status foreign key to a nomenclature seed id, with no hand-written handler. The APPROVED transition sits on the *approve branch* (the `activate` service task), so a **Reject** goes straight to CANCELLED without passing through APPROVED. That is the whole BPMN process - human tasks, a decision gateway, status transitions - declared in place. The Intent Editor renders it as a flow diagram next to the YAML so you can read the branching at a glance.

> 📸 *Screenshot: the Intent Editor - YAML on the left, the live entity + process diagram on the right.*

## Step 5 - Generate

Click **Generate**. The platform writes the model files next to your intent, then chains the model-to-code generation: a Java persistence layer, REST controllers, a **modern Harmonia single-page UI**, the BPMN process, the forms, the report pages, and the seed data. Publish, and the app is live.

## Step 6 - Run the lifecycle

Open the generated app and walk the flow:

1. **New invoice** - fill the header (number starts as a draft placeholder, date, customer). The status pill reads **DRAFT** (the FK default) and totals are 0; there are no items yet.
2. **Create** - saving the header reveals the line-items table *and* starts the approval process, creating an **Approve** task.
3. **Add items** - pick a **product**: the unit list narrows to the product's base UoM and auto-selects it, and the price pre-fills with the product's default (both still editable). Enter the quantity; `Net`, `Vat`, `Total` compute live, and the header totals recompute.
4. **Approve** - open the task from the built-in **Process Inbox**, review the read-only card, and click **Approve** (or **Reject** to cancel).
5. **Issue**, then **Send** - the invoice walks to its final state; at Issue it also gets its definitive sequential number (e.g. `SI00000001`) and any of the customer's open payments are auto-allocated, moving the status to **PARTIAL** or **PAID**.
6. **Preview** - every record also has a read-only view (a **Preview** button next to Edit, its own shareable `/preview` URL): the same document, items and totals with nothing editable - right for reviewers who should look but not touch.

The product-driven pre-fill (Depends-On), the payment roll-up and the auto-allocation are covered in the [documents-that-settle-themselves](../04/documents-that-settle-themselves.md) follow-up; the number generator in the [multi-model](../02/composing-a-business-suite.md) and [custom-Java](../03/custom-java-in-the-web-ide.md) ones.

> 📸 *Screenshot: the running Harmonia app - the invoice document with line items and the Process Inbox.*

## What just happened

You wrote one YAML file. You did **not** write a single line of CRUD, SQL, REST routing, UI markup or BPMN XML. The calculated totals, the master-detail screen, the approval workflow, the task forms and the seed data all came from the intent - and they regenerate deterministically every time you change it.

That is the Eclipse Dirigible promise: describe the application at the altitude of *intent*, and let the platform build the rest.

## Where next

This single-module app is the foundation for three follow-ups:

- **Composing a business suite** - splitting customers, currencies and units of measure into reusable modules that many apps share, with one shared application shell.
- **Documents that settle themselves** - payment allocation with automatic roll-ups, cascading Depends-On forms, and management reports that join across modules.
- **Custom Java when the model isn't enough** - dropping a hand-written calculation into the generated app without leaving the browser.

Explore the finished sample at [`sample-intent-model`](https://github.com/dirigiblelabs/sample-intent-model), and see the whole [Eclipse Dirigible platform](https://www.dirigible.io/) for what else it can build.
