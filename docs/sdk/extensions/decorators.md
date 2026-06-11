# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.extensions`
- source: [extensions/Extension.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/extensions/Extension.java), [extensions/ExtensionPoint.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/extensions/ExtensionPoint.java)
:::

Two paired annotations make up the typed extension surface:

- `@ExtensionPoint` marks an **interface** that defines the contract every contribution must implement.
- `@Extension` registers a **class** as a contribution to a specific extension point, identified by the contract interface's `Class<?>` literal.

The runtime validates each contribution against its target interface at registration time. Consumers call [`Extensions.find(Class)`](/sdk/extensions/extensions) and receive a `List<T>` of typed instances - no reflection, no map payloads.

The contract interface's fully qualified name is the persisted extension-point identifier in `DIRIGIBLE_EXTENSIONS`. Renaming or moving the interface invalidates every persisted reference, so treat the interface FQN as part of the contract.

### Example Usage

```java
import org.eclipse.dirigible.sdk.extensions.ExtensionPoint;
import org.eclipse.dirigible.sdk.extensions.Extension;

// 1. Declare the contract
@ExtensionPoint("Order processors")
public interface OrderProcessor {
    void process(Order order);
}

// 2. Register a contribution
@Extension(target = OrderProcessor.class, name = "fast-processor")
public class FastOrderProcessor implements OrderProcessor {
    public void process(Order order) {
        // ...
    }
}
```

## @ExtensionPoint

Marks an interface as a typed Dirigible extension point. Apply to the **interface** that defines the contract for the contributing classes.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.TYPE)
> public @interface ExtensionPoint { ... }
> ```

### Attributes

| Attribute | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| `value` | `String` | `""` | Human-readable label shown in the Extensions UI. Defaults to the interface's simple name. |

## @Extension

Registers the annotated class as a contribution to a typed extension point. The class must implement the `target` interface; the runtime rejects any class that does not at registration time.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.TYPE)
> public @interface Extension { ... }
> ```

### Attributes

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `target` | `Class<?>` | The extension-point interface this class implements. Must carry `@ExtensionPoint`. |
| `name` | `String` | Logical name of this contribution. Surfaced in the Extensions UI; not used for lookup. Defaults to the empty string. |

## See also

- [`Extensions`](/sdk/extensions/extensions) - typed `find(Class)` discovery.
- Sample: [`dirigiblelabs/sample-java-extension-decorator`](https://github.com/dirigiblelabs/sample-java-extension-decorator).
