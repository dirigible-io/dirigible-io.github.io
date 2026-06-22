---
title: Extension providers
description: Declare extension points and contribute providers to them.
---

# Extension providers

The extensions mechanism lets one piece of code declare a pluggable contract and any other piece of code contribute a provider. It is the canonical way the platform itself surfaces menu entries, perspectives, and views, and it is open to user projects.

Two coexisting forms:

- **Typed Java** - an interface marked with `@ExtensionPoint` defines the contract; classes marked with `@Extension(target = ContractInterface.class)` plug in. Discovered with `Extensions.find(Class)`. Preferred for Java code.
- **String-keyed artefacts** - `*.extensionpoint` declares a named point; `*.extension` registers a JS / TS / Java module against the named point. Discovered with `Extensions.getExtensions(String)`. Used by older code and by TypeScript-side extensions.

## Typed Java extensions

### Declare the contract

```java
import org.eclipse.dirigible.sdk.extensions.ExtensionPoint;

@ExtensionPoint("Sample Java extension point")
public interface SampleExtensionPoint {

    String describe();
}
```

### Contribute an implementation

```java
import org.eclipse.dirigible.sdk.extensions.Extension;

@Extension(target = SampleExtensionPoint.class, name = "sample-contribution")
public class SampleContribution implements SampleExtensionPoint {

    @Override
    public String describe() {
        return "Hello from SampleContribution!";
    }
}
```

The runtime validates that `SampleContribution` implements `SampleExtensionPoint` at registration time. Consumers receive instances cast to the interface - no reflection.

### Consume via collection injection (recommended)

Because every `@Extension` provider is a managed bean, the Spring-style way to receive all implementations is to inject a `List<SampleExtensionPoint>` into a `@Controller` or `@Component`. The container populates it with every bean assignable to the interface:

```java
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

### Discover programmatically

When you cannot inject - or want to look up providers at an arbitrary point - `Extensions.find(Class)` returns them directly:

```java
import java.util.List;

import org.eclipse.dirigible.sdk.extensions.Extensions;
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;

@Controller
public class ExtensionConsumer {

    @Get("/contributions")
    public List<String> listContributions() {
        return Extensions.find(SampleExtensionPoint.class)
                         .stream()
                         .map(SampleExtensionPoint::describe)
                         .toList();
    }
}
```

`Extensions.find` and the string-keyed `Extensions.getExtensions` below also work across runtimes (TypeScript providers, JS/TS module extensions) and remain available for back-compatibility, so prefer them when the consumer must see providers that injection cannot reach.

**Sample project:** [`dirigiblelabs/sample-java-extension-decorator`](https://github.com/dirigiblelabs/sample-java-extension-decorator) - `SampleExtensionPoint` + `SampleContribution`, consumed both by `ExtensionConsumer` (`Extensions.find`) and `InjectingConsumer` (constructor `List<SampleExtensionPoint>` collection injection). SDK reference: [`/sdk/`](https://www.dirigible.io/sdk/).

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

```java
import org.eclipse.dirigible.sdk.extensions.Extensions;

String[] modules = Extensions.getExtensions("my-app-menu-items");
```

## When to use this

- IDE chrome - pluggable menu items, perspectives, views.
- Cross-project workflows - one project owns a flow, others contribute steps.
- Anywhere "find every provider of X" is the natural shape.

For typed wiring within a single project, prefer [dependency injection](/help/develop/dependency-injection) instead.

## See also

- Working sample: [`dirigiblelabs/sample-java-extension-decorator`](https://github.com/dirigiblelabs/sample-java-extension-decorator).
- [SDK reference](https://www.dirigible.io/sdk/).
- [`@ExtensionPoint` / `@Extension`](/sdk/extensions/decorators)
- [`Extensions`](/sdk/extensions/extensions)
- [Extension point artefact](/help/artefacts/extensibility/extensionpoint)
- [Extension artefact](/help/artefacts/extensibility/extension)
