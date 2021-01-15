---
title: Env Print All
icon: print
tag: sample
brief: Prints all the variables of the environment
git: https://github.com/dirigiblelabs/sample_env_print_all
info: apps/2016/07/12/app_sample_env_print_all.html
---

{{ page.title }}
---


This is a sample application demonstrating how to print all the variables of the environment.

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var env = require('core/env');
	var response = require('net/http/response');

	var allEnvVars = env.getAll();
	allEnvVars.forEach(function (envVar) {
		response.println(envVar.key + "=" + envVar.value);
	});

	response.flush();
	response.close();
```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git={{ page.git }}.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/env.html">API</a>
</div>

<br><br>