---
title: Documents
description: Content management - browse, upload, download, search binary artefacts.
---

# Documents

`perspective-documents` is the content management surface. Binary artefacts (images, PDFs, spreadsheets, archives) are managed here, backed by the internal CMIS store or a configured external provider.

## Layout

- **Folder tree** - hierarchical browser of the active CMS root.
- **Document list** - files in the selected folder with size, MIME type, modified date.
- **Toolbar** - upload, new folder, download, overwrite, delete, search.

## Backends

The active backend is selected by the deployed engine:

| Engine                  | Backend                           |
|-------------------------|-----------------------------------|
| `engine-cms-internal`   | Repository-backed CMIS (default). |
| `engine-cms-s3`         | Amazon S3 / S3-compatible store.  |
| `engine-cms-sharepoint` | Microsoft SharePoint.             |

## Tenant isolation

When multi-tenancy is enabled (`DIRIGIBLE_MULTI_TENANT_MODE=true`, the default), the documents tree is scoped to the calling tenant. Each tenant sees only its own files.

## Access control

Folder permissions are granted at runtime, per path and per role, from the **Manage access** dialog - available both in this perspective and in the Documents section of the application shell. Grants are stored per tenant and take effect on the next request.

The rules that decide whether a caller may read or write a path:

- **A path with no rules is open** to anyone who can reach Documents. The store is not deny-by-default; a rule is what restricts it.
- **Rules are inherited** - a rule on `/reports` covers everything beneath it.
- **The most specific path decides.** Only the rules of the deepest folder that has any are considered, so a restricted parent can have one child opened up again.
- **Roles are alternatives** - holding *any* granted role is enough.
- **Writing implies reading.** A caller who may not read a path may not write it either.

System activity is never subject to these rules: content seeding, scheduled jobs, workflow delegates and message listeners act as the platform rather than as a user, and have no roles to check. Enforcement can be switched off entirely with `DIRIGIBLE_CMS_ROLES_ENABLED=false`, which - like the enforcement itself - is configurable per tenant from the shell's Settings.

::: warning Upgrade note - role matching changed from ALL to ANY

Before this change the folder listing required a caller to hold **every** role listed for a path, while the CMIS access check required only **one** of them - two mechanisms answering the same question differently. There is now a single rule: **any** granted role suffices, matching how HTTP `.access` constraints have always behaved.

A path that lists more than one role therefore becomes **more permissive** than it was in the listing: the second role now reads as an alternative rather than an additional requirement. If a deployment authored multi-role folder rules expecting the all-of behaviour, review them after upgrading.

Rules with a single role per path are unaffected, as is any installation that never authored folder rules - which, since no user interface existed for setting them before, is the usual case.
:::

## Programmatic access

The same operations are available from user code:

- JavaScript / TypeScript: [`@aerokit/sdk/cms/cmis`](/api/cms/cmis)
- Java: [`/sdk/cms/cmis`](/sdk/cms/cmis)

## Related

- [CMS engines](/help/ide/perspectives/documents)
- [Tenants](/help/operate/tenants)
