# Extension model

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.extensions`
- source: [extensions/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/extensions)
:::

There is **no extension annotation** in the Java SDK. Extension points and contributions are expressed with the same building blocks as everything else - plain interfaces and [`@Component`](/sdk/component/decorators) beans:

- An **extension point** is a plain Java interface that defines the contract every contribution must implement. No annotation is required.
- A **contribution** is a `@Component` that implements that interface. Its [`@Component`](/sdk/component/decorators) name (the `value()`, or the decapitalized class name by default) is the contribution name.

Contributions are discovered the same way any group of beans is: inject them all as a collection, or look them up through [`Extensions`](/sdk/extensions/extensions).

### Example Usage

```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.component.Inject;
import java.util.List;

// 1. The extension point - a plain interface, no annotation
public interface OrderProcessor {
    void process(Order order);
}

// 2. A contribution - a @Component implementing the interface;
//    its @Component name ("fast-processor") is the contribution name
@Component("fast-processor")
public class FastOrderProcessor implements OrderProcessor {
    public void process(Order order) {
        // ...
    }
}

// 3. Consume every contribution via collection injection (preferred)
@Component
public class OrderPipeline {

    private final List<OrderProcessor> processors;

    @Inject
    public OrderPipeline(List<OrderProcessor> processors) {
        this.processors = processors;
    }

    public void run(Order order) {
        processors.forEach(p -> p.process(order));
    }
}
```

## Discovering contributions

- **Collection injection (preferred)** - inject `List<OrderProcessor>` (or `Set<…>` / `Collection<…>`) and the container supplies every `@Component` assignable to the interface. See [Component / @Inject](/sdk/component/decorators).
- **Programmatic lookup** - call [`Extensions.find(OrderProcessor.class)`](/sdk/extensions/extensions) to get the same list, or `Extensions.findFirst(…)` for the first one. Equivalent to `Beans.getAll(…)` for the contract type.

## See also

- [`Extensions`](/sdk/extensions/extensions) - typed `find(Class)` discovery (and the legacy string-keyed `getExtensions`).
- [Component](/sdk/component/) - `@Component` / `@Inject`, including collection injection.
