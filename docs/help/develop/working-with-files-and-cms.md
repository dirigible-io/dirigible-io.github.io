---
title: Working with files and CMS
description: Filesystem IO via the io module; documents via the CMS (CMIS / S3 / SharePoint).
---

# Working with files and CMS

Two separate surfaces. Use `io` when you want bytes on the host filesystem. Use `cms` when you want versioned documents in a content store backed by Internal / S3 / SharePoint.

## Filesystem IO

Both runtimes expose the same `Files` entry point for host-filesystem access.

### Java

```java
import org.eclipse.dirigible.sdk.io.Files;

if (!Files.exists("/tmp/orders.json")) {
    Files.writeText("/tmp/orders.json", "{\"orders\":[]}");
}
String data = Files.readText("/tmp/orders.json");
```

### TypeScript / JavaScript

```ts
import { Files, Streams } from "@aerokit/sdk/io";

if (!Files.exists("/tmp/orders.json")) {
    Files.writeText("/tmp/orders.json", JSON.stringify({ orders: [] }));
}
const data = Files.readText("/tmp/orders.json");
```

Paths are resolved against the JVM's working directory - not the registry. For platform-managed storage prefer the registry or repository surface; for transient files inside a tenant prefer CMS.

See [`@aerokit/sdk/io`](/api/io/) and [`org.eclipse.dirigible.sdk.io`](/sdk/io/).

## CMS (CMIS)

The Documents perspective and the CMIS SDK module both talk to the same `CmsProvider`. Configure once via `DIRIGIBLE_CMS_*` env vars; switch backend by selecting Internal (local folders), S3, or SharePoint. Both runtimes obtain the session through `Cmis.getSession()`.

### Java

The Java side returns the raw `org.apache.chemistry.opencmis.client.api.Session` - you get the full Apache Chemistry API surface.

```java
import org.eclipse.dirigible.sdk.cms.Cmis;
import org.apache.chemistry.opencmis.client.api.Session;
import org.apache.chemistry.opencmis.client.api.Folder;

Session session = Cmis.getSession();
Folder root = session.getRootFolder();
// use the raw Apache Chemistry API directly:
// root.createDocument(properties, contentStream, VersioningState.MAJOR);
```

### TypeScript / JavaScript

```ts
import { Cmis } from "@aerokit/sdk/cms";

const session = Cmis.getSession();
const root = session.getRootFolder();
const doc = root.createDocument({ name: "report.pdf" }, pdfBytes, "application/pdf");
```

## Tenant isolation

CMS storage is **tenant-isolated** when multi-tenancy is on (default). Each tenant's CMIS root resolves to its own folder under the configured root. See [`/help/concepts/multi-tenancy`](/help/concepts/multi-tenancy).

## See also

- [`@aerokit/sdk/io/files`](/api/io/files)
- [`@aerokit/sdk/cms/cmis`](/api/cms/cmis)
- [`org.eclipse.dirigible.sdk.io.Files`](/sdk/io/files)
- [`org.eclipse.dirigible.sdk.cms.Cmis`](/sdk/cms/cmis)
- [Documents perspective](/help/ide/perspectives/documents)
