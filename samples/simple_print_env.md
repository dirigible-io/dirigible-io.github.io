---
layout: samples
title: Print Environment Variables
icon: fa-caret-right
group: basic
---

{{ page.title }}
===

### Steps


1. Create a new project and name it **env_vars_project**.
2. Select the project folder and open the pop-up menu.
3. Choose *New* -> *JavaScript Service*.
4. Give it a meaningful name (e.g **print_env_vars.js**).
5. Replace the generated code in **print_env_vars.js** with the following:

```javascript

var env = require('core/v3/env');
var response = require('http/v3/response');
	
var envVarsList = JSON.parse(env.list());
var envVarValue;
for(var envVarName in envVarsList) {
    envVarValue = envVarsList[envVarName]
	response.println(envVarName + '=' + envVarValue);
}	
response.flush();
response.close();
	
```

---

For more information, see the *[API](../api/)* documentation.
