---
title: Cache API
---

Cache API
===

Cache object is used to access and manage the cache from the underlying engine.

=== "Overview"
- Module: `sdk/cache`
- Source: [cache.ts](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/cache/cache.ts)
- Status: `stable`
- Group: `api`

### Basic Usage

**The service which interacts with the cache:**

=== "ECMA6"

```javascript
import { Cache } from "sdk/cache";

Cache.set("key", "value");

let value = Cache.get("key");
let exists = Cache.contains("key");

Cache.delete("key");
Cache.clear();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | -----------
**contains(key)**   | Checks if the cache contains a specific key | *boolean*
**get(key)**   | Retrieves the value associated with a specific key from the cache | *any / undefined*
**set(key, data)**   | Stores a value in the cache under a specific key | *void*
**delete(key)**   | Deletes the value associated with a specific key from the cache | *void*
**clear()**   | Clears all entries from the cache | *void*
