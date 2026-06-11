---
title: Data anonymisation
description: Column-level anonymisation for sharing data outside production.
---

# Data anonymisation

The `data-anonymize` component applies column-level anonymisation rules to a target table. Use cases: producing a non-production data copy for development or for sharing with third parties without leaking customer data.

## REST endpoint

```
POST /services/data/anonymize
{
    "dataSource": "DefaultDB",
    "schema": "PUBLIC",
    "table": "CUSTOMER",
    "rules": [
        { "column": "EMAIL",    "strategy": "hash" },
        { "column": "PHONE",    "strategy": "mask",     "options": { "keepLast": 4 } },
        { "column": "NAME",     "strategy": "fake",     "options": { "category": "name" } },
        { "column": "BIRTHDAY", "strategy": "shift",    "options": { "days": 30 } }
    ]
}
```

## Strategies

| Strategy | Effect |
| -------- | ------ |
| `hash`   | One-way SHA-256 of the value. |
| `mask`   | Replace all but a tail / head substring with `*`. |
| `fake`   | Replace with a generated value from a faker category (`name`, `email`, `address`, ...). |
| `shift`  | Shift a date / number by a deterministic offset. |
| `null`   | Replace with `NULL`. |

## Determinism

The `hash` and `shift` strategies are deterministic per-record, so foreign-key relationships survive the anonymisation. The `fake` strategy can be seeded with a salt to keep results stable across runs.

## See also

- [Data transfer](/help/operate/data-transfer)
- [Working with data](/help/develop/working-with-data)
