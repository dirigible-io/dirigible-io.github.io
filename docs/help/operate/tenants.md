---
title: Tenant management
description: Provisioning, lifecycle, isolation for multi-tenant deployments.
---

# Tenant management

Multi-tenancy is on by default - see [`/help/concepts/multi-tenancy`](/help/concepts/multi-tenancy) and [`/help/setup/multi-tenancy`](/help/setup/multi-tenancy).

## Tenant lifecycle

A tenant has two states:

| State | Meaning |
| ----- | ------- |
| `INITIAL`      | Tenant registered, provisioning not finished. |
| `PROVISIONED`  | All provisioning steps completed; the tenant is serving. |

A tenant is registered explicitly, through the tenants API or the Security perspective, and enters `INITIAL`. The provisioner picks it up on its next pass and moves it to `PROVISIONED` once every step has run; a step that fails leaves the tenant `INITIAL` and the next pass retries it. Nothing creates a tenant implicitly, so an unknown tenant is never provisioned by being asked for.

Until a tenant is `PROVISIONED` it cannot be entered. Under the `TOKEN_GROUPS` resolution strategy a user who has been granted it sees it on the tenant picker but cannot select it yet; see [Tenant resolution](/help/setup/multi-tenancy#tenant-resolution).

## Provisioning cadence

```bash
DIRIGIBLE_TENANTS_PROVISIONING_FREQUENCY_SECONDS=30
```

The provisioner polls the tenant table at this cadence and drives `INITIAL` tenants through their steps. The default is `900` (15 minutes), so a newly registered tenant may take that long to become usable; lower it if tenants are created interactively.

## Provisioning step SPIs

Two SPI hooks let modules plug into the lifecycle:

- `TenantProvisioningStep` - runs while the tenant is still `INITIAL`, before it is marked `PROVISIONED`. Used by data-source provisioning, CMS root setup, etc.
- `TenantPostProvisioningStep` - runs after the tenant is `PROVISIONED`. Used for "after the lights are on" tasks like seed data.

Implementations are discovered as Spring beans. Order via `@Order`.

## Tenant-scoped resources

| Resource | Tenant-isolated? |
| -------- | ---------------- |
| Default data source | yes - tenant-prefixed pool name |
| User data sources | yes |
| CMS root folder | yes |
| Scheduled jobs / listeners | yes |
| OData services | yes |
| BPMN process instances | no - system-level |
| Camel routes | no |
| Extension declarations | no |
| Git repositories / workspaces | no |

## Disabling multi-tenancy

For single-org deployments:

```bash
DIRIGIBLE_MULTI_TENANT_MODE=false
```

All artefacts resolve against the default tenant.

## See also

- [Multi-tenancy (concepts)](/help/concepts/multi-tenancy)
- [Multi-tenancy (setup)](/help/setup/multi-tenancy)
- [Tenant resolution](/help/setup/multi-tenancy#tenant-resolution)
