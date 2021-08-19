---
title: FTP Client
hide:
  - toc
---

# FTP Client

### Steps

1. Create a project `ftp-client`.
2. Then create a JavaScript service named `ftp-client.js`.
3. Within the service code, enter the following content:

```javascript
var response = require("http/v4/response");
var ftp = require("io/v4/ftp");

var host = "test.rebex.net";
var port = 21;
var userName = "demo";
var password = "password";

var ftpClient = ftp.getClient(host, port, userName, password);
var file = ftpClient.getFileText("/", "readme.txt");

response.println(file);
```

---

> For more information, see the _[API](../../api/)_ documentation.
