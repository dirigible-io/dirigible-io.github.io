---
title: numbering
description: First-class document numbering - gap-free per-series sequences rendered through a format.
---

# numbering/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.numbering`
- source: [numbering/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/numbering)
:::

The `numbering` module allocates the next gap-free number for a document series and renders it through the series' format. It is backed by the platform's per-tenant counter store - the same store the application shell's **Document Numbering** settings manage - so hand-written `custom/` code and the intent-generated stamping share one engine and one sequence per series.

Numbering is a first-class concern in business software (invoices, orders, receipts, credit and debit notes), so the platform owns the sequence: allocation is gap-free, the counter lives in the tenant's schema, and the number is formatted from a small grammar. Most applications never call this SDK directly - they declare a `number: { ... }` field in the intent model and the generator wires the stamping. Use the SDK when you need a number from bespoke logic that the declarative form does not cover.

The main components of this module are:
- **DocumentNumbers**: Static `next(series, format[, scope])` - allocate and format the next number.

## Classes

- [DocumentNumbers](./documentnumbers.md)
