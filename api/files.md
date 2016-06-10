---
layout: api
title: Files
icon: fa-ellipsis-h
---

Files
===

Files module provides an access to the underlying File System, where the Dirigible server is deployed on.

- Module: **io/files**
- Definition: [/core_api/issues/21](https://github.com/dirigiblelabs/core_api/issues/21)
- Source: [/io/files.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/io/files.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var files = require('io/files');
var response = require('net/http/response');

var file = files.get("../temp/./..");

response.println("[File Exists?]: " + file.exists());
response.println("[File CanonicalPath]: " + file.getCanonicalPath());
response.println("[File Path]: " + file.getPath());
response.println("[File Name]: " + file.getName());
response.println("[File Parent]: " + file.getParent());
response.println("[File Is Directory?]: " + file.isDirectory());
response.println("[File Is File?]: " + file.isFile());
response.println("[File Is Hidden?]: " + file.isHidden());
response.println("[File Last Modified]: " + file.lastModified());
response.println("[File Length]: " + file.length());

response.flush();
response.close();
```

