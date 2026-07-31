---
title: DocumentNumbers
description: Allocate the next gap-free document number from a declared series.
---

# DocumentNumbers

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.numbering`
- source: [numbering/DocumentNumbers.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/numbering/DocumentNumbers.java)
:::

Allocates the next gap-free number from a named **series**. The number's SHAPE is deliberately not knowable from application code: a series renders as a **literal prefix plus the sequence zero-padded to a total width** (`SI00000042`), declared once in a module's [`.numbers` artefact](/help/intent/dsl-reference#number-document-numbering) and configurable per tenant in the application shell's **Document Numbering** settings - so one application serves jurisdictions with different numbering conventions without being forked or regenerated. Every caller of the same series - hand-written `custom/` code, the intent-generated stamping, several document types sharing one legal range - draws from the same continuously advancing counter.

### Key Features

- **Gap-free**: Each allocation advances the counter by one under a row lock; there are no holes and no duplicates, even under concurrent creates.
- **Per-tenant**: The counter table lives in the tenant's own schema, so numbers are isolated per tenant and portable with the tenant's data.
- **Partitioned**: The optional partition value (typically a company id - the intent's `per:` relation) gives each partition its own sequence, prefix and width. Two legal entities in one tenant never share a counter; identical numbers across partitions are correct.
- **Declared, never invented**: Allocating from a series no `.numbers` artefact declares fails loudly - a document must never carry a number in a shape nobody chose.
- **Continuous**: Sequences never auto-reset. An annual restart is an administrator setting the prefix and the next value in the Document Numbering settings.

### Example Usage

```java
import org.eclipse.dirigible.sdk.numbering.DocumentNumbers;

// One tenant-wide sequence (the series' shape comes from its declaration / settings):
String invoice = DocumentNumbers.next("Sales Invoice");
// -> "SI00000001", then "SI00000002", ...

// Partitioned per company - each company id owns its own sequence:
String order = DocumentNumbers.next("Sales Order", String.valueOf(entity.Company));
// -> company 1: "SO000001", "SO000002", ... ; company 2 independently: "SO000001", ...
```

Prefer the declarative `number: { ... }` field in the [intent DSL](/help/intent/dsl-reference#number-document-numbering) - it generates the stamping (on create, or at a modeled issue step) and calls this SDK for you. Reach for `DocumentNumbers` directly only from bespoke logic (a custom `JavaDelegate` or calculated action) that the declarative form does not express.

## Methods

### next()

Allocate the next number of a series within a partition.

> ```java
> public static String next(String series, String partition);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `series` | `String` | The series identity. Documents that must share one sequence pass the same series. |
> | `partition` | `String` | The partition value (the `per:` relation's id, e.g. the company id), or `null` when the series is not partitioned. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The allocated number, rendered as the series' prefix plus the sequence zero-padded to the series' total width.
> :::

### next()

Allocate the next number of an unpartitioned series.

> ```java
> public static String next(String series);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `series` | `String` | The series identity. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The allocated number.
> :::
