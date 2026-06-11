---
title: Tenant management
description: Provisioning, lifecycle, isolation for multi-tenant deployments.
---

# Tenant management

Multi-tenancy is on by default - see [`/help/concepts/multi-tenancy`](/help/concepts/multi-tenancy) and [`/help/setup/multi-tenancy`](/help/setup/multi-tenancy).

## Tenant lifecycle

| State | Meaning |
| ----- | ------- |
| `NEW`           | Tenant row created, provisioning not started. |
| `PROVISIONING`  | Provisioning steps running. |
| `READY`         | All steps complete; tenant is serving. |

A new tenant is created either:

- Implicitly, by an incoming request matching the configured subdomain regex; or
- Explicitly, through an admin endpoint or a `TenantProvisioningStep` SPI implementation.

## Provisioning cadence

```bash
DIRIGIBLE_TENANTS_PROVISIONING_FREQUENCY_SECONDS=30
```

The provisioner polls the tenant table at this cadence and drives `NEW` tenants through their steps.

## Provisioning step SPIs

Two SPI hooks let modules plug into the lifecycle:

- `TenantProvisioningStep` - runs during the `PROVISIONING` state. Used by data-source provisioning, CMS root setup, etc.
- `TenantPostProvisioningStep` - runs after the tenant reaches `READY`. Used for "after the lights are on" tasks like seed data.

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
