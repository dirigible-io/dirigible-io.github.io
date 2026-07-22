---
title: DocumentNumbers
description: Allocate the next gap-free document number for a series and render it through a format.
---

# DocumentNumbers

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.numbering`
- source: [numbering/DocumentNumbers.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/numbering/DocumentNumbers.java)
:::

Allocates the next gap-free number for a document series and renders it through the series' format. Backed by the platform's per-tenant counter store, so every caller of the same series shares one continuously advancing sequence - hand-written `custom/` code, the intent-generated stamping, and any manual adjustment made through the application shell's **Document Numbering** settings all draw from the same counter.

### Key Features

- **Gap-free**: Each allocation advances the counter by one under a row lock; there are no holes and no duplicates, even under concurrent creates.
- **Per-tenant**: The counter table lives in the tenant's own schema, so numbers are isolated per tenant and portable with the tenant's data.
- **Scoped**: The optional scope map partitions the counter (e.g. one sequence per year, or per company) and, at the same time, feeds the format's `{year}` / `{<Field>}` tokens.
- **Formatted**: A small format grammar turns the raw sequence into the printed document number.

### Format grammar

The `format` template is rendered with these tokens:

| Token | Renders |
| ------ | ------ |
| `{seq}` | The raw sequence number. |
| `{seq:0N}` | The sequence zero-padded to `N` digits (e.g. `{seq:06}` -> `000042`). |
| `{series}` | The series identity. |
| `{year}` / `{<Field>}` | A value from the scope map (the key matched case-insensitively). |

A `null` or blank format falls back to the default `{series}-{seq:06}`.

### Example Usage

```java
import org.eclipse.dirigible.sdk.numbering.DocumentNumbers;
import java.util.Map;

// Unscoped series - one continuous sequence:
String order = DocumentNumbers.next("SalesOrder", "SO-{seq:06}");
// -> "SO-000001", then "SO-000002", ...

// Scoped by year - the counter partitions per year and the format prints it:
String invoice = DocumentNumbers.next("SalesInvoice", "SI-{year}-{seq:05}",
        Map.of("year", "2026"));
// -> "SI-2026-00001", then "SI-2026-00002", ...
```

Prefer the declarative `number: { ... }` field in the [intent DSL](/help/intent/dsl-reference#number-document-numbering) - it generates the stamping (on create, or at a modeled issue step) and calls this SDK for you. Reach for `DocumentNumbers` directly only from bespoke logic (a custom `JavaDelegate` or calculated action) that the declarative form does not express.

## Methods

### next()

Allocate and format the next number for a series, partitioned and formatted by the given scope.

> ```java
> public static String next(String series, String format, Map<String, String> scope);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `series` | `String` | The series identity. Documents that must share one sequence pass the same series. |
> | `format` | `String` | The format template (see the grammar above), or `null`/blank for the default `{series}-{seq:06}`. |
> | `scope` | `Map<String, String>` | The resolved scope values that partition the counter and feed `{year}` / `{<Field>}` tokens. Use an empty map for an unscoped series. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The formatted document number.
> :::

### next()

Allocate and format the next number for an unscoped series (scope defaults to empty).

> ```java
> public static String next(String series, String format);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `series` | `String` | The series identity. |
> | `format` | `String` | The format template (see the grammar above), or `null`/blank for the default. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The formatted document number.
> :::
