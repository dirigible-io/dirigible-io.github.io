---
title: OData service
description: OData V2 service definition. *.odata artefact.
---

# OData service

`*.odata` declares an OData V2 service - entity sets, navigations, and mappings to underlying database tables.

- **File format.** JSON descriptor.
- **Synchronizer.** `ODataSynchronizer` (tenant-isolated).
- **Engine.** `engine-odata` - Apache CXF + Olingo.
- **URL.** `/odata/v2/<namespace>/...`.
- **Spec.** OData V2 (entity sets, navigation properties, `$filter`, `$orderby`, `$expand`, `$top`, `$skip`, `$select`, `$count`).

## File format

```json
{
    "namespace": "library.Readers",
    "entities": [
        {
            "name": "Reader",
            "alias": "Readers",
            "table": "READERS",
            "keyGenerated": "ID",
            "properties": [
                { "name": "ID",   "column": "ID",   "type": "Edm.Int32",  "key": true, "nullable": false },
                { "name": "Name", "column": "NAME", "type": "Edm.String", "nullable": false }
            ],
            "navigations": []
        }
    ]
}
```

| Field | Purpose |
| --- | --- |
| `namespace` | Service namespace. Surfaces in the service URL. |
| `entities[]` | Entity sets exposed by the service. |
| `entities[].name` / `.alias` | Entity type name / entity-set name. |
| `entities[].table` | Underlying database table. |
| `entities[].properties[]` | Property → column mapping with EDM type, nullability, and key flag. |
| `entities[].navigations[]` | Navigation properties to related entities (association name, `from`, `to`). |

Without an explicit `properties` array, columns are auto-discovered from the underlying table.

## Generated service surface

For the example above:

- `GET /odata/v2/library.Readers/Readers` - list.
- `GET /odata/v2/library.Readers/Readers(1)` - single entity.
- `POST /odata/v2/library.Readers/Readers` - create.
- `PUT` / `PATCH` / `DELETE` - update / delete.
- `GET /odata/v2/library.Readers/$metadata` - EDMX metadata document.

Query parameters: `$filter`, `$orderby`, `$top`, `$skip`, `$select`, `$expand`, `$count`, `$inlinecount`.

## Tenancy

OData services are tenant-isolated - each tenant's reconciled `.odata` artefacts are mounted into its own service catalogue and bind to that tenant's data sources.
