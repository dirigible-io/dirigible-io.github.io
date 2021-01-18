---
title: Scheduled Job
hide:
  - toc
---

Scheduled Job
===

### Steps


1. Create a project **job_console_project**
2. Then create a JavaScript service named **my_job_handler.js**
3. Replace the service code with the following content:

```javascript

console.log("Hello from My Job!");

```

4. Then create a **Scheduled Job** named **my_job.job**
5. Replace the content with the following JSON code:

```json

{
	"expression":"0/10 * * * * ?",
	"handler":"job_console_project/my_job_handler.js",
	"description":"My Job"
}

```

6. Publish the project
8. After 10s in the *Console* view you should see the following lines:

	[2018-05-14T12:05:00.061Z] [INFO] Hello from My Job!

> Note: the log messages in the Console view are in a reverse order - the newest are on top

---

For more information, see the *[API](../api/)* documentation.
