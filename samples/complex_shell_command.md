---
layout: samples
title: Shell Command
icon: fa-caret-right
group: complex
---

{{ page.title }}
===

### Steps


1. Create a project **shell_command_project**
2. Then create a file named **my_command.sh**
3. Replace the code with the following content:

#### Log Levels

```

uname -an
echo variable1=$variable1

```

4. Then create a **Command** named **my_command.command**
5. Replace the content with the following JSON code:

```json

{
   "description":"command description",
   "contentType":"text/plain",
   "commands":[
      {
         "os":"mac",
         "command":"sh shell_command_project/my_command.sh"
      },
      {
         "os":"linux",
         "command":"sh shell_command_project/my_command.sh"
      }
   ],
   "set":{
      "variable1":"value1"
   },
   "unset":[
      "variable2"
   ]
}

```

6. Publish the project
8. Select the *.command file in the Workspace explorer and inspect the result in the Preview:

	Darwin XXXXXXXXXXXXX 17.7.0 Darwin Kernel Version 17.7.0: Thu Jun 21 22:53:14 PDT 2018; root:xnu-4570.71.2~1/RELEASE_X86_64 x86_64
	variable1=value1

> Note: The working folder is set to the registry/public space under the file-based Repository.

---

For more information, see the *[API](../api/)* documentation.
