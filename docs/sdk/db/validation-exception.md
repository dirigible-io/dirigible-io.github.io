# ValidationException

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.db`
- source: [db/ValidationException.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/db/ValidationException.java)
:::

`ValidationException` is thrown by client-side domain logic to signal that a **well-formed** request violates a **business rule** - as opposed to a malformed request or an unexpected server fault. It is the exception a generated repository raises for a declarative `checks:` gate or a capacity guard, and the one your own hand-written validation should throw when it rejects an otherwise-valid write.

The Java controller runtime maps it to **HTTP `400 Bad Request`** carrying the exception message, so a user-fixable validation surfaces as a client error instead of an opaque `500`. Raised on a non-HTTP path (for example a BPMN service task), it simply fails that unit of work with its message, the same as any other unchecked exception.

### Key Features:
- **Layer-clean**: thrown from the persistence/domain layer, it carries no web dependency - the HTTP-status mapping lives once in the controller dispatcher, not in every controller.
- **Consistent 400 mapping**: every generated (and hand-written) client controller reports it as `400` with the authored message, matching the row-level check behaviour.
- **Message-carrying**: the constructor message is the reason returned to the caller - write it for the end user.

### When it is raised for you

- A document-level `checks:` violation (`itemsMin`, `itemsSumEqual`) on a gated status transition.
- A capacity guard on a balance roll-up rejecting an over-capacity child write.

In both cases a REST create/update returns `400`; on a workflow transition the same exception aborts the task completion.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.db.ValidationException;

@Component
public class TransferValidator {

    public void validate(TransferEntity transfer) {
        if (transfer.getAmount() == null || transfer.getAmount().signum() <= 0) {
            // Surfaces to the caller as HTTP 400 with this message.
            throw new ValidationException("Transfer amount must be greater than zero");
        }
    }
}
```

## Constructors

- `ValidationException(String message)` - the user-facing reason the request was rejected.
- `ValidationException(String message, Throwable cause)` - the same, wrapping an underlying cause.
