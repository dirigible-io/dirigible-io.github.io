---
title: Python
description: Server-side Python modules via engine-python.
---

# Python

`engine-python` serves `.py` modules from the registry. The runtime is intentionally limited compared to the JS/TS/Java stack - treat it as a scripting surface, not a primary application language.

## File layout

```
/registry/public/<project>/<file>.py
```

Served at:

```
/services/py/<project>/<file>.py
```

## When to use it

- Glue code between platform APIs and external Python libraries.
- Math, statistics, ad-hoc data processing.
- Migration of existing Python scripts into the platform without rewriting.

## When not to use it

- Full applications - prefer [TypeScript](/help/develop/languages/typescript) or [Java](/help/develop/languages/java). The decorator / annotation surface (controllers, entities, scheduled jobs, listeners) is not available from Python.
- Anything that needs typed access to the rest of the platform.

## See also

- [JavaScript](/help/develop/languages/javascript).
- [TypeScript](/help/develop/languages/typescript).
- [Java](/help/develop/languages/java).
