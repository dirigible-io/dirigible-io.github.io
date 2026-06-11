---
title: Access artefact
description: Declarative URL access rules. Synchronizer AccessSynchronizer.
---

# Access - `*.access`

Declarative URL access rules. Synchronizer: `AccessSynchronizer`. Engine: `engine-security`. Enforced at request dispatch before any controller, JS module, or static resource is invoked.

## File format

```json
{
    "constraints": [
        {
            "path": "/services/ts/myproject/admin/*",
            "method": "*",
            "scope": "HTTP",
            "roles": ["admin", "ops"]
        },
        {
            "path": "/services/ts/myproject/public/*",
            "method": "GET",
            "scope": "HTTP",
            "roles": []
        }
    ]
}
```

## Fields

| Field    | Notes |
| -------- | ----- |
| `path`   | URL pattern. Supports `*` wildcards. |
| `method` | HTTP method, `"*"` for any. |
| `scope`  | `"HTTP"` for URL routes; other scopes reserved for future use. |
| `roles`  | Any-of role list. Empty list -> publicly accessible. |

## Evaluation

Rules are matched in declaration order; the first match wins. Super-roles `DEVELOPER` and `ADMINISTRATOR` pass any check. Anonymous mode short-circuits `roles` evaluation - see [`/help/concepts/security-model`](/help/concepts/security-model).

For controller-method-level checks prefer the `@Roles` annotation - see [`/help/develop/security-and-roles`](/help/develop/security-and-roles).

## Editor

Authored via the [Access editor](/help/ide/editors/access-and-roles) or raw JSON in Monaco.

## See also

- [Roles artefact](/help/artefacts/security/roles)
- [Security model](/help/concepts/security-model)
