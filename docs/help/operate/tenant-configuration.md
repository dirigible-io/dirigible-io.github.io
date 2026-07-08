---
title: Tenant-aware configuration
description: Per-tenant overrides of selected configuration properties, resolved per request.
---

# Tenant-aware configuration

Each tenant can override a fixed set of configuration properties. Overrides are stored per tenant and resolved on every request, so different tenants see different values for the same key without separate deployments.

Multi-tenancy itself is covered in [`/help/operate/tenants`](/help/operate/tenants) and [`/help/concepts/multi-tenancy`](/help/concepts/multi-tenancy).

## Resolution precedence

A configuration value is resolved in this order (first match wins):

1. Runtime value set programmatically in the instance.
2. **Tenant override** (the current tenant's stored value).
3. Environment variable or system property.
4. Deployment `.properties`.
5. Module defaults.

So a tenant override takes precedence over environment variables and property files, but never over a value set programmatically at runtime. Overrides apply only within the scope of a request that belongs to that tenant.

## What can be overridden

Only an explicit allow-list of full keys is overridable - there are no wildcards, and infrastructure keys (database, repository, security, multi-tenancy) can never be overridden. For now the allow-list is the branding properties:

| Key | Purpose |
| --- | ------- |
| `DIRIGIBLE_BRANDING_NAME`     | Product name. |
| `DIRIGIBLE_BRANDING_SUBTITLE` | Subtitle. |
| `DIRIGIBLE_BRANDING_BRAND`    | Brand label. |
| `DIRIGIBLE_BRANDING_BRAND_URL`| Brand link. |
| `DIRIGIBLE_BRANDING_FAVICON`  | Favicon path. |
| `DIRIGIBLE_BRANDING_THEME`    | Default theme. |
| `DIRIGIBLE_BRANDING_PREFIX`   | Storage/key prefix. |
| `DIRIGIBLE_BRANDING_ANALYTICS`| Analytics snippet. |

Leaving a value empty removes the override, so the property falls back to the platform default.

::: tip
A key that is not on the allow-list can still be stored, but it stays inert - it is never injected into the running configuration.
:::

## Managing overrides in the UI

In the application shell, open **Settings** and select **Tenant Configuration**. Each predefined property is shown with its current value for the tenant; edit the values and choose **Save**. **Reload** re-reads the stored values.

The view requires the `ADMINISTRATOR` or `OPERATOR` role.

## REST API

All endpoints operate on the current tenant and require `ADMINISTRATOR` or `OPERATOR`.

| Method | Path | Purpose |
| ------ | ---- | ------- |
| `GET`    | `/services/core/configurations/tenant`           | List the tenant's stored entries. |
| `GET`    | `/services/core/configurations/tenant/predefined`| List every overridable key with the tenant's value (`null` if unset). |
| `PUT`    | `/services/core/configurations/tenant`           | Store an entry: body `{ "key": "...", "value": "..." }`. |
| `DELETE` | `/services/core/configurations/tenant?key=<KEY>` | Remove an override. |

## Storage

Overrides live in a `DIRIGIBLE_CONFIGURATIONS` table inside each tenant's own database schema (created on first use). Values are cached in memory per tenant and refreshed when changed through this instance.

## Extending the allow-list

The set of overridable keys is defined in the platform (the tenant configuration key policy). Adding a new key is a platform change, not a runtime setting - the consuming code must also read the value per request (values cached at startup will not reflect per-tenant overrides). See the platform repository guidance for the exact steps.
