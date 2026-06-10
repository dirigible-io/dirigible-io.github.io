# Integrations

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.integrations`
- source: [integrations/Integrations.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/integrations/Integrations.java)
:::

Marker / placeholder class for the integrations namespace. Java callers implementing an Apache Camel `Processor` already have the `Exchange` parameter, so the native Camel API (`exchange.getMessage().setHeader(...)`, `setBody(...)`, `setProperty(...)`) is the right tool — there is no intermediate facade to add.

The package exists so the namespace stays consistent across the platform; the class itself has no methods.

### Example Usage (in a Camel route)

```java
import org.apache.camel.Exchange;
import org.apache.camel.Processor;

public class EnrichOrder implements Processor {

    @Override
    public void process(Exchange exchange) {
        String orderId = exchange.getMessage().getHeader("orderId", String.class);
        exchange.getMessage().setHeader("enrichedAt", System.currentTimeMillis());
        exchange.getMessage().setBody(Map.of("orderId", orderId, "status", "ok"));
    }
}
```

## Classes

### Integrations

No public methods. The class exists purely as a namespace marker; use Camel's `Exchange` directly inside `Processor` implementations.
