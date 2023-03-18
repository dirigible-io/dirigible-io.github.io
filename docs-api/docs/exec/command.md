---
title: Exec
---

Exec
===

Exec object is used to execute shell commands.

=== "Overview"
- Module: `core/v4/exec`
- Alias: `core/exec`
- Source: [/core/v4/exec.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/exec.js)
- Facade: [ExecFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/ExecFacade.java)
- Status: `NOT YET MIGRATED`

### Basic Usage

```javascript
var exec = require('core/v4/exec');
var response = require('http/v4/response');

var result = exec.exec("echo 'hello dirigible!'");
response.println("[Result]: " + result);
response.flush();
response.close();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**exec(commandLine, toAdd, toRemove)**   | Executes the *commandLine* string and returns the result from the execution or exception message. Passing an object as *toAdd* parameter sets the corresponding variables. *toRemove* parameter is used to unset the variables  | *string*
