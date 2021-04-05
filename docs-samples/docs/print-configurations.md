---
title: Print Configuration Variables
hide:
  - toc
---

Print Configuration Variables
===

### Steps


1. Create a new project and name it `config-vars-project`.
2. Select the project folder and open the pop-up menu.
3. Choose *New* -> *JavaScript Service*.
4. Give it a meaningful name (e.g `print-config-vars.js`).
5. Replace the generated code in `print-config-vars.js` with the following:

```javascript

var configurations = require("core/v4/configurations")
var response = require("http/v4/response");

var keys = configurations.getKeys();

var dirigibleKeys = {};

for (var i = 0; i < keys.length; i ++) {
    var key = keys[i];
    if (key.startsWith("DIRIGIBLE")) {
        var value = configurations.get(key);
        dirigibleKeys[key] = value;
    }
}

response.print(JSON.stringify(dirigibleKeys));
	
```

---

> For more information, see the *[API](../../api/)* documentation.
