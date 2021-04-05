---
title: BPMN Process
hide:
  - toc
---

BPMN Process
===

### Steps


1. Create a project **bpmn_process_project**
2. Then create a JavaScript service named **my_delegate.js** with the following content:


```javascript

console.info("Hello from the JavaScript Delegate!");

var process = require('bpm/v3/process');
var execution = process.getExecutionContext();
process.setVariable(execution.getId(), 'variable2', 'value2');
try {
	console.info("variable1: " + process.getVariable(execution.getId(), 'variable1'));
	console.info("variable2: " + process.getVariable(execution.getId(), 'variable2'));
} catch(e) {
	console.error(e.message);
}

```

3. Then create a Business Process Model (via the New popup menu) named **my_process.bpmn**
4. Double-click on this file to open the corresponding BPMN editor.
5. There should be shown on the diagram a **Start Event**, connected to a **MyServiceTask**, connected to an **End Event**.
6. Select the MyServiceTask.
7. In the Properties section below the diagram, find the **Class fields** property and click on it.
8. In the **Class fields** dialog find and click on the field **handler**.
9. Change its value from **myproject/mydelegate.js** to **bpmn_process_project/my_delegate.js** and click save.
10. Click on the **Save** button on the top-left corner of the editor with *Name* - **MyProcess** and *Key* - **myprocess**
11. Publish the project
12. Then create a JavaScript service named **my_trigger.js** which will be used to start the just defined process
13. Enter the following code in it:

```javascript

var process = require('bpm/v3/process');
process.start('myprocess', {"variable1": "value1"});

```



9. Select the **my_trigger.js** file in the *Workspace* view to be able to trigger the invocation of this service via the *Preview* view
10. In the *Console* view you should see the following lines:

	[2018-05-14T14:25:16.791Z] [DEBUG] Done starting a BPMN process by key: myprocess
	
	[2018-05-14T14:25:16.773Z] [INFO] variable2: value2

	[2018-05-14T14:25:16.772Z] [INFO] variable1: value1

	[2018-05-14T14:25:16.751Z] [INFO] Hello from the JavaScript Delegate!

	[2018-05-14T14:25:16.585Z] [DEBUG] Starting a BPMN process by key: myprocess
	
	
> Note: the log messages in the Console view are in a reverse order - the newest are on top

---

For more information, see the *[API](../../../api/)* documentation.
