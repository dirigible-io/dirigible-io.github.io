# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.extensions`
- source: [extensions/Extension.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/extensions/Extension.java)
:::

Annotation for registering a class as a contribution to a named Dirigible extension point. The runtime stores an `Extension` metadata record that maps the extension-point name to the contributing class; consumers that query the extension point via `ExtensionService.findByExtensionPoint` will receive this record among the results.

The contributing class itself is instantiated on demand by the consumer - no specific interface is required.

### Example Usage:
```java
import java.util.List;
import java.util.Map;
import org.eclipse.dirigible.sdk.extensions.Extension;

@Extension(name = "my-menu-item", to = "ide-menu")
public class MyMenuItem {

    public List<Map<String, Object>> getItems() {
        return List.of(Map.of("label", "My Tool", "link", "/services/web/my-tool/"));
    }
}
```

## @Extension

Marks a class as a contribution to a named extension point.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.TYPE)
> public @interface Extension { ... }
> ```

### Attributes

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `name` | `String` | Logical name of this extension contribution. |
| `to` | `String` | Name of the extension point this class contributes to. |
