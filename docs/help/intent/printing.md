---
title: Printing and documents
description: How an intent generates printable documents - the .print template, the doc/ CMS-seed folder, the relation-aware print feeder, customization and multi-language.
---

# Printing and documents

A document (header-items) entity - one with an `*Item` composition child, like `SalesInvoice` + `SalesInvoiceItem` - gets a **printable document template** on Generate. The template is written in the document-template DSL (a small XML-like layout language), seeded into the CMS, and rendered to PDF on demand from the entity's own data.

## The generated `.print` template

`PrintIntentGenerator` emits one template per document master, at the exact path it must occupy in the CMS, under the project's `doc/` folder:

```
doc/Templates/<Entity>/Print/en/standard.print
```

The master is detected exactly like the document layout in the [entity generator](/help/intent/generators) - an entity that is the composition parent of a child named `*Item`. The generated template is a complete starting point: a humanized title, the document number subtitle, the header fields, an items table, and a totals footer.

**It is generated once and never regenerated over.** Like the developer-owned `.settings` file, the template is written *create-if-absent*: a later Generate leaves an existing file untouched. This is deliberate - a printed business document is a formatted, audited artifact you adapt by hand, and a newly added model field must **not** silently appear on an already-designed invoice. Treat the generated file as a per-tenant starting layout to adapt, not a finished document.

## The document-template DSL

The template is a tree of layout tags. The ones you will use most:

| Tag | Purpose |
| --- | --- |
| `<page width height padding>` | the page box |
| `<header>` / `<footer>` | rendered once, top and bottom |
| `<section>` / `<stack>` | a vertical block of content |
| `<row>` | side-by-side columns, one per child `<stack width="...">` |
| `<field label="...">` | a labelled value |
| `<text style="title\|subtitle\|caption" align="...">` | free text |
| `<table source="items">` + `<column width label>` | the line-items table |
| `<total align="right">` | the emphasized document total |
| `<line/>` | a horizontal rule |
| `<if source="...">` | keep the children only when the value is present |
| `filter="..."` / `match="..."` | row filtering on `table`/`for`, value matching on `if` |

Values are Mustache placeholders. A two-column header with the seller on the left and invoice meta on the right:

```xml
<header>
  <row>
    <stack width="55%">
      <text style="title">{{document.Organization}}</text>
      <text>{{document.Organization.Address}}</text>
    </stack>
    <stack width="45%">
      <text align="right" style="title">INVOICE</text>
      <field align="right" label="No">{{document.Number}}</field>
      <field align="right" label="Date">{{document.Date}}</field>
    </stack>
  </row>
  <line/>
</header>

<table source="items">
  <column width="4*" label="Description">{{Name}}</column>
  <column width="*" align="right" label="Qty">{{Quantity}}</column>
  <column width="1.5*" align="right" label="Net">{{Net}}</column>
</table>
```

Decimal values print in the money pattern (`### ### ### ##0.00`); an unresolved placeholder renders empty (a printout never shows raw braces). Wrap an optional field in `<if source="...">` so its label does not print when the value is blank.

### Row filtering - grouped tables over one collection

A `table` (or a row-expanding `for`) can filter the collection it renders - a declarative value match, never an expression: `filter="<path>"` keeps the rows whose path, resolved in the row's own scope, is truthy, and adding `match="A | B"` keeps only the rows whose value equals one of the `|`-separated literals. The same `match` on an `<if>` compares its resolved `source` against the listed values instead of testing truthiness.

One fed collection can this way render into several purpose-grouped tables - a payslip's earnings and deductions columns, a journal entry's debit and credit sides, a VAT summary per rate:

```xml
<row gap="16">
  <stack>
    <text style="subtitle">Earnings</text>
    <table source="items" filter="Kind" match="BASE | ENTRY">
      <column width="3*" label="Earning">{{Name}}</column>
      <column width="*" align="right" label="Amount">{{Amount}}</column>
    </table>
  </stack>
  <stack>
    <text style="subtitle">Deductions</text>
    <table source="items" filter="Kind" match="CONTRIBUTION | TAX">
      <column width="3*" label="Deduction">{{Name}}</column>
      <column width="*" align="right" label="Amount">{{Amount}}</column>
    </table>
  </stack>
</row>
```

A null or unresolved value never matches a `match` list; a runtime that predates the attributes ignores them and renders all rows, so a filtered template degrades gracefully instead of failing.

## The data contract - the print feeder

The template binds against data supplied by a generated **print feeder** - a small `@Controller` (`gen/events/<Entity>PrintFeeder.java`) that loads the document and its related records through the generated repositories and returns a nested document-and-items payload. This is what lets a template reach related data, not just the document's own columns:

```text
{{document.<Property>}}            the document's own field
{{document.<Relation>}}            a to-one relation's display label (e.g. the customer's name)
{{document.<Relation>.<Field>}}    a field of the related record - e.g. document.Organization.Iban,
                                   document.Customer.Address
{{<Property>}}                     a line-item field (inside <table source="items">)
```

The feeder walks the document master's whole reachable to-one graph (two hops within the same model, one hop into a referenced module) and is regenerated with the application, so the generated Java is an exact, auditable record of everything a print receives. Because it loads through the repositories and is called by the browser as the signed-in user, it inherits the multilingual translation overlay (the document prints in the caller's language) and the caller's authorization and tenant - no server-side data fetching or credential forwarding. Date and timestamp fields are supplied as ISO strings; numbers are left raw so the template's money formatting applies.

## The `doc/` folder and CMS seeding

Everything under a project's **`doc/` folder** is seeded into the CMS on publish, mirroring the path it has under `doc/`:

```
<project>/doc/Templates/SalesInvoice/Print/en/standard.print
        -> CMS  /Templates/SalesInvoice/Print/en/standard.print
```

The `CmsSeedSynchronizer` does this generically - it is not print-specific. Any file under `doc/` (print templates, images, other documents) is seeded as CMS content. Three rules:

- **Create-if-absent, never overwrite** - the CMS copy is the business user's customization surface; a re-publish never clobbers it.
- **Delete never touches the CMS** - removing the source file (or the project) removes only the tracking record; uploaded customizations survive.
- **Per-tenant** - each tenant's publish seeds its own copy under its own CMS root.

`doc/` is a raw CMS staging area - do not place model artefacts (`.csvim`, `.bpmn`, ...) there expecting their normal engines to run; under `doc/` they are treated as opaque content.

## Customizing and multi-language

Business users customize a document through the [Documents perspective](/help/ide/perspectives/documents): download the seeded `standard.print`, edit it, and upload it back - the upload is the version that prints, and it is never overwritten by a re-publish.

Only English (`en`) is generated. To add a language, add another file under a sibling language folder:

```
doc/Templates/SalesInvoice/Print/en/standard.print
doc/Templates/SalesInvoice/Print/bg/standard.print
```

When several languages exist, the Print button asks which to use; otherwise it prints the only one. The default follows the user's Region &amp; Language setting. The Print button always renders **live** - current master data, the language just chosen. The immutable copy of an issued document is a separate, first-class surface: see below.

## The issued copy and its language

A document may declare a `function: Snapshot` composition child - an **immutable, versioned PDF copy** minted by the process (typically right after Issue) and served by a read-only files panel on the document page, with a per-version **Open** and **Download**. Printing and the stored copy answer different questions: Print renders the document as it is *now*; the snapshot panel serves the document as it was *issued* - both stay one click apart on the same page.

The language a copy is **minted** in is a knob on the snapshot child:

```yaml
- name: SalesInvoiceCopy
  function: Snapshot
  languageFrom: customer.language      # per record - the customer decides the invoice's language
  # or: language: bg                   # fixed
  relations:
    - { name: salesInvoice, kind: manyToOne, to: SalesInvoice, composition: true }
```

`languageFrom` is a one-hop path on the document master - a to-one relation and a string field of its target holding the language code; it works across models like any other cross-model reference. `language` fixes the code; the two are mutually exclusive. Absent both (or when the resolved value is blank), the mint uses the first entry of the tenant's application language set (`DIRIGIBLE_APPLICATION_LANGUAGES`) - so a tenant configured `bg,en` mints Bulgarian copies with no intent change, provided a `bg` template exists.

## Printing at runtime

In a generated document view, the **Print** button (available while editing a record) calls the feeder for the current record, then posts the payload to the print service, which resolves the template from the CMS, binds the data, and returns a PDF:

- `GET /services/print/{entity}/languages` - the languages a document has templates for.
- `POST /services/print/{entity}?lang=en` with `{ "document": { ... }, "items": [ ... ] }` - returns `application/pdf`.

Rendering goes through the document parser, the data binder, and an XSL-FO / Apache FOP transform to PDF.

## See also

- [Generators and generation](/help/intent/generators)
- [The `.intent` file](/help/intent/intent-file)
- [The Documents perspective](/help/ide/perspectives/documents)
- [The synchronizer model](/help/concepts/synchronizer-model)
