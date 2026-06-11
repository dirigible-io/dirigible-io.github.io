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

## Programmatic access

The same operations are available from user code:

- JavaScript / TypeScript: [`@aerokit/sdk/cms/cmis`](/api/cms/cmis)
- Java: [`/sdk/cms/cmis`](/sdk/cms/cmis)

## Related

- [CMS engines](/help/ide/perspectives/documents)
- [Tenants](/help/operate/tenants)
