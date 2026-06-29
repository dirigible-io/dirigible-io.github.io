---
title: Multi-model applications
description: Split a domain into several intent projects that reference each other across models, reuse single master-data entities, and contribute their screens to one shared application shell.
---

# Multi-model applications

A non-trivial domain is rarely one project. The intent layer lets you split it into **several intent projects** - one `*.intent` per project, each the source of truth for its own slice - that **reference each other across models**, **reuse** single master-data entities instead of redefining them, and **contribute** their screens to one **shared application shell**.

In practice each module is its **own repository**, versioned and shipped independently as a build artefact (an npm module), and consumed by others as a dependency - so a `currencies` or `customers` module is published once and reused across many applications. The worked example below keeps all the modules in **one repository for simplicity** (so you can clone and try the whole domain in one step), but nothing about the model requires that: each subfolder is a self-contained project that could equally live in its own repo and be pulled in as a dependency.

The worked example is [`dirigiblelabs/sample-intent-multi-model`](https://github.com/dirigiblelabs/sample-intent-multi-model): a Billing domain in six intent projects plus one navigation project, collected in a single repository for convenience.

| Project | Owns | References (cross-model) |
| --- | --- | --- |
| `uoms` | Dimension, UoM | - |
| `countries` | Country | - |
| `currencies` | Currency, CurrencyRate | - |
| `customers` | Customer | Country, Currency |
| `customer-payments` | CustomerPayment | Customer, Currency |
| `sales-invoices` | SalesInvoice, SalesInvoiceItem, SalesInvoiceCustomerPayment, settings | Customer, Currency, UoM, CustomerPayment |
| `navigation` | (no intent) the shared-shell groups | - |

## Reuse, don't redefine - one master-data entity

Master / reference data (`Customer`, `Country`, `Currency`, `UoM`) is owned by **one** project. Every other project that needs it stores an **integer FK** and renders a dropdown sourced from the **owner's** REST service - it does **not** generate the owner's table or API. There is one `Country` table, one `Customer` table, one place to change them.

Declare the dependency in a top-level `uses:` block, then point a `manyToOne` / `oneToOne` relation at the alias with `model:`:

```yaml
name: customers
uses:
  - { model: countries }
  - { model: currencies }
entities:
  - name: Customer
    relations:
      - { name: Country,  kind: manyToOne, to: Country,  model: countries }
      - { name: Currency, kind: manyToOne, to: Currency, model: currencies }
```

A cross-model relation must be `manyToOne` / `oneToOne`, its `model:` must be listed in `uses:`, and it **cannot** be a `composition` (a detail cannot be owned across models). The mechanism is the platform's PROJECTION: the consumer's `.model` carries a projection of the owner entity so the FK dropdown resolves against the owner's live service. `project:` defaults to the model alias, so when the project folder name equals the intent `name:` you omit it; set it when they differ:

```yaml
uses:
  - { model: currencies, project: currencies }   # only needed when alias != project name
```

See [cross-model references in the `.intent` file](/help/intent/intent-file#cross-model-references-uses) for the full rules.

### Many-to-many across models

`SalesInvoice` (in `sales-invoices`) is settled by many `CustomerPayment`s (in `customer-payments`), and a payment spans many invoices. Model it as an **explicit intermediate entity** with a local `composition` to one side and a cross-model `manyToOne` to the other, carrying the bridge field:

```yaml
- name: SalesInvoiceCustomerPayment
  fields:
    - { name: id,     type: integer, primaryKey: true, generated: true }
    - { name: amount, type: decimal, precision: 18, scale: 2, required: true }
  relations:
    - { name: SalesInvoice,    kind: manyToOne, to: SalesInvoice,    composition: true, required: true }
    - { name: CustomerPayment, kind: manyToOne, to: CustomerPayment, model: customer-payments, required: true }
```

## One shared shell - contributions, not app-hopping

Each domain project generates its **own** standalone app shell (handy to run or test one domain in isolation at `/services/web/<project>/gen/<genFolder>/index.html`). They **also** contribute their entities as grouped perspectives to the platform's **shared** application shell at **`/services/web/application/`** - one app with a single grouped sidebar, every screen embedded in the one shell so the user never jumps between per-project UIs.

Two pieces drive this:

**1. `group:` on an entity** places its generated perspective under a named navigation group in the shared shell:

```yaml
entities:
  - name: Customer
    group: partners        # appears under the "Partners" group in the shared shell
```

The entity only references the group **id**. A `group:` does not affect the project's own standalone shell.

**2. A navigation project defines each group once.** Group ids are declared in one dedicated project (not an intent project) so they are not redeclared per domain - the shell drops duplicate group ids. Each group is a module exporting `getPerspectiveGroup()`, registered on the `application-perspectives` extension point:

```js
// navigation/configs/sales.js
exports.getPerspectiveGroup = () => ({
  id: 'sales',
  label: 'Sales',
  expanded: true,
  order: 20,
  icon: '/services/web/resources/unicons/receipt.svg',
  items: []
});
```

```json
// navigation/extensions/sales.extension
{
  "module": "navigation/configs/sales.js",
  "extensionPoint": "application-perspectives",
  "description": "Navigation group - Sales"
}
```

The domain entities then reference these ids (`group: sales`, `group: settings`, ...). The shared shell aggregates every contributed perspective into its sidebar under the matching group, ordered by each group's `order`.

## Packaging in practice - separate repositories

The sample puts every module in one repository so the whole domain clones in one step. A real system ships each module **independently**:

- Each module is its **own repository**, with its own release cadence and version. A reusable module like `currencies` or `countries` is published once and consumed by many applications.
- Modules are distributed as **build artefacts (npm modules)** and pulled in as dependencies, the same way any reusable library is. A consuming module declares what it depends on in its `package.json`:

  ```json
  {
    "name": "customers",
    "version": "1.0.0",
    "dependencies": {
      "countries": "^1.0.0",
      "currencies": "^1.0.0"
    }
  }
  ```

  `npm install` pulls the owner modules in, and they are deployed into the registry alongside the consumer.

- The `uses:` block in the consumer's intent names the same owner models; the installed dependency makes the owner's published artefacts (its `.model` + REST service) available at generation and runtime. (In the single-repo sample the projects are siblings already in the workspace, so nothing needs installing.)

So the only difference between the single-repo sample and a production setup is **where the projects live** - the cross-model `uses:` / `model:` references, the shared-shell `group:` contributions, and the generate-then-publish flow are identical either way.

## Generate leaf-first, then publish everything

Cross-model dropdowns read the **owner's already-generated `.model`** at generation time and call the **owner's live REST service** at runtime, so order matters:

1. **Generate the owners (leaves) first**, then their consumers. For the sample: `uoms` / `countries` / `currencies`, then `customers`, then `customer-payments`, then `sales-invoices`. (The `navigation` project has no intent - it just declares the groups and is published as-is.)
2. **Publish everything.** Every owner project must be live for a consumer's cross-model dropdown to resolve, and the `.csvim` seeds load the nomenclatures.
3. **Open `/services/web/application/`** - the shared shell with the grouped sidebar (Master Data / Sales / Payments / Settings).

Each project is its own `.intent`; the project folder name equals the intent `name:` (and so the table prefix and gen folder). Because table names are [intent-prefixed](/help/intent/intent-file#naming-and-tables) (`<INTENT>_<ENTITY>`), the projects share a schema without colliding.

## See also

- [The `.intent` file](/help/intent/intent-file) - cross-model `uses:`, many-to-many, field attributes
- [Generators and generation](/help/intent/generators)
- [Harmonia runtime UI](/help/develop/harmonia-runtime-ui) - the default code-gen UI stack for the sample
- [Extensibility](/help/concepts/extensibility) - the extension-point model behind `application-perspectives`
- [`dirigiblelabs/sample-intent-multi-model`](https://github.com/dirigiblelabs/sample-intent-multi-model)
