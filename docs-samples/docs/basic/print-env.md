---
title: Print Environment Variables
hide:
  - toc
---

# Print Environment Variables

### Steps

1. Create a new project and name it `env-vars`.
2. Select the project folder and open the pop-up menu.
3. Choose _New_ -> _JavaScript Service_.
4. Give it a meaningful name (e.g `print-env-vars.js`).
5. Replace the generated code in `print-env-vars.js` with the following:

    ```javascript
    var env = require("core/v4/env");
    var response = require("http/v4/response");

    var envVarsList = JSON.parse(env.list());
    var envVarValue;
    for (var envVarName in envVarsList) {
      envVarValue = envVarsList[envVarName];
      response.println(envVarName + "=" + envVarValue);
    }
    response.flush();
    response.close();
    ```

---

> For more information, see the _[API](https://www.dirigible.io/api/core/env/)_ documentation.
