---
title: Command
---

Command
===

Command object is used to execute shell commands.

=== "Overview"
- Module: `platform/command`
- Source: [/platform/command.js]([https://github.com/dirigiblelabs/api-core/blob/master/core/v4/exec.js](https://github.com/eclipse/dirigible/blob/master/components/api-platform/src/main/resources/META-INF/dirigible/platform/command.js))
- Status: `stable`
- Group: `platform`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { command } from "@dirigible/platform";
    import { response } from "@dirigible/http";

    let result = command.execute("echo 'hello dirigible!'");

    response.println("[Result]: " + result);
    response.flush();
    response.close();
    ```

=== "CommonJS"

    ```javascript
    const command = require('platform/command');
    const response = require('http/response');

    let result = command.execute("echo 'hello dirigible!'");

    response.println("[Result]: " + result);
    response.flush();
    response.close();
    ```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**execute(command, add, remove)**   | Executes the *command* string and returns the result from the execution or exception message. Passing an object as *add* parameter sets the corresponding variables. *remove* parameter is used to unset the variables  | *string*
