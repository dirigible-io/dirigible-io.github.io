---
title: Python
description: ".py modules executed by engine-python on GraalPy."
---

# Python

`*.py` source files are user-authored modules executed by [`engine-python`](https://github.com/eclipse/dirigible/tree/master/components/engine/engine-python). Coverage is intentionally a **subset** of the JavaScript / TypeScript / Java surfaces - there is no facade bridge into `@aerokit/sdk/*`, no DI, no declarative entities or controllers.

## Lifecycle

Python modules are **not synchronized**. They are loaded on demand by `PythonEndpoint` for each request and evaluated by `PythonCodeRunner` in a GraalPy context.

## URL surface

```
/services/py/<project>/<file>     # authenticated
/public/py/<project>/<file>       # anonymous (if enabled)
```

## Example

```python
import sys
print("python " + sys.version)
```

## Notes

- The Python runtime ships with GraalVM polyglot's GraalPy distribution.
- No tenant-isolated reconciliation; URL-level access is governed by [`.access`](/help/artefacts/security/access).
- For richer integrations (DB, HTTP, BPM, jobs, listeners) use [JavaScript](/help/artefacts/scripting/javascript), [TypeScript](/help/artefacts/scripting/typescript), or [Java](/help/artefacts/scripting/java).
