---
title: Extension providers
description: Declare extension points and contribute providers to them.
---

# Extension providers

The extensions mechanism lets one piece of code declare a pluggable contract and any other piece of code contribute a provider. It is the canonical way the platform itself surfaces menu entries, perspectives, and views, and it is open to user projects.

Two coexisting forms:

- **Typed Java** - an **extension point is a plain Java interface**; a **contribution is a `@Component` bean that implements it**. Consumers receive all contributions via collection injection (`List<SampleExtensionPoint>`) or `Extensions.find(Class)`. Preferred for Java code.
- **String-keyed artefacts** - `*.extensionpoint` declares a named point; `*.extension` registers a JS / TS module against the named point. Discovered with `Extensions.getExtensions(String)`. Used by TypeScript-side extensions and by older code.

## Typed Java extensions

### Declare the contract

An extension point is just a plain Java interface - no annotation:

```java
package demo.extension;

public interface SampleExtensionPoint {

    String describe();
}
```

### Contribute an implementation

A contribution is a `@Component` bean that implements the interface - no extra annotation. The contribution's name is its `@Component` name:

```java
package demo.extension;

import org.eclipse.dirigible.sdk.component.Component;

@Component("sample-contribution")
public class SampleContribution implements SampleExtensionPoint {

    @Override
    public String describe() {
        return "Hello from SampleContribution!";
    }
}
```

Consumers receive instances typed as the interface - no reflection, no `Map` payloads.

### Consume at runtime

#### Java

**Collection injection (preferred).** Because every contribution is a `@Component`, the Spring-style way to receive all implementations is to inject a `List<SampleExtensionPoint>` through the constructor of a `@Controller` or `@Component`. The container populates it with every bean assignable to the interface:

```java
package demo.extension;

import java.util.List;

import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;

@Controller
public class InjectingConsumer {

    private final List<SampleExtensionPoint> contributions;

    public InjectingConsumer(List<SampleExtensionPoint> contributions) {
        this.contributions = contributions;
    }

    @Get("/injected-contributions")
    public List<String> list() {
        return contributions.stream()
                            .map(SampleExtensionPoint::describe)
                            .toList();
    }
}
```

**`Extensions.find(Class)` (programmatic alternative).** When you cannot inject - or want to look up providers at an arbitrary point - `Extensions.find(Class)` returns them directly:

```java
package demo.extension;

import java.util.List;

import org.eclipse.dirigible.sdk.extensions.Extensions;
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;

@Controller
public class ExtensionConsumer {

    @Get("/contributions")
    public List<String> listContributions() throws Exception {
        return Extensions.find(SampleExtensionPoint.class)
                         .stream()
                         .map(SampleExtensionPoint::describe)
                         .toList();
    }
}
```

`Extensions.find` also works across runtimes and remains available for back-compatibility, so prefer it when the consumer must see providers that injection cannot reach.

#### TypeScript / JavaScript

TypeScript-side extensions use the string-keyed artefacts described below; `Extensions.getExtensions(String)` returns the registry paths of the contributing modules:

```ts
import { Extensions } from "@aerokit/sdk/extensions";

const modules = Extensions.getExtensions("my-app-menu-items");
for (const m of modules) {
    // m is the registry path of a contributing module; load and invoke as appropriate
}
```

**Sample project:** [`dirigiblelabs/sample-java-extension-decorator`](https://github.com/dirigiblelabs/sample-java-extension-decorator) - `SampleExtensionPoint` (plain interface) + `SampleContribution` (`@Component("sample-contribution")`), consumed both by `InjectingConsumer` (constructor `List<SampleExtensionPoint>` collection injection) and `ExtensionConsumer` (`Extensions.find`). SDK reference: [`/sdk/`](https://www.dirigible.io/sdk/).

## String-keyed artefacts

### Declare a point

```json
{
  "name": "my-app-menu-items",
  "description": "Items shown under the My App menu"
}
```

Save as `my-app-menu-items.extensionpoint`.

### Contribute a provider

```json
{
  "extensionPoint": "my-app-menu-items",
  "module": "demo/extensions/customer-menu"
}
```

Save as `customer-menu.extension`. Cross-link: [`/help/artefacts/extensibility/extension`](/help/artefacts/extensibility/extension).

### Consume at runtime

```ts
import { Extensions } from "@aerokit/sdk/extensions";

const modules = Extensions.getExtensions("my-app-menu-items");
for (const m of modules) {
    // m is the registry path of a contributing module; load and invoke as appropriate
}
```

## When to use this

- IDE chrome - pluggable menu items, perspectives, views.
- Cross-project workflows - one project owns a flow, others contribute steps.
- Anywhere "find every provider of X" is the natural shape.

For typed wiring within a single project, prefer [dependency injection](/help/develop/dependency-injection) instead.

## See also

- Working sample: [`dirigiblelabs/sample-java-extension-decorator`](https://github.com/dirigiblelabs/sample-java-extension-decorator).
- [SDK reference](https://www.dirigible.io/sdk/).
- [`Extensions`](/sdk/extensions/extensions)
- [Extension point artefact](/help/artefacts/extensibility/extensionpoint)
- [Extension artefact](/help/artefacts/extensibility/extension)
