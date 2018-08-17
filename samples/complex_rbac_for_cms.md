---
layout: samples
title: RBAC for CMS
icon: fa-caret-right
group: complex
---

{{ page.title }}
===

This sample shows how to enable the Role Based Access Management for the Content Management System in Eclipse Dirigible.

### Steps

1. Set the environment variable:
	
	export DIRIGIBLE_CMS_ROLES_ENABLED=true
	
before staring the Dirigible instance

> Note: for SAP Cloud Platform Neo use the deploy parameter:

	-DDIRIGIBLE_CMS_ROLES_ENABLED=true

2. Open Dirigible WebIDE and go to Documents perspective
3. Create sub-folder "private" under the "root" folder
4. Create sub-folder "shared" under the "root" folder 
5. Upload a text file named "secret.txt" under the "private" folder with the following content

```
This is a top secret information accessible only by users with the role Operator!
```

6. Upload a text file named "billboard.txt" under the "shared" folder with the following content

```
This is a public notice accessible by Everyone.
```

7. Click on Preview icon next to the files. You should be able to see the content of both of them.

8. Open the Workspace perspective in the WebIDE
9. Create a project named "cms_permissions"
10. Create an *.access file via the popup menu New->Access Constraints
11. Open the file with editor 
12. Delete the sample record
13. Click New button
14. Fill the form as follows:

```
Path: /private
Method: READ
Scope: CMIS
Roles: Operator
```

15. Click Save button
16. The content of the file should look like: 

```
{
  "constraints": [
    {
      "path": "/private",
      "method": "READ",
      "scope": "CMIS",
      "roles": [
        "Operator"
      ]
    }
  ]
}
```

> Note: You can inspect that be closing the editor and then use Open With from the popup menu on the same file, but choosing Orion editor option

17. After a while open the Operations perspective and select the Access view
18. You should be able to identify a line similar like this:

	/cms_permissions/private.access	CMIS		/private		READ		Operator		Aug 17, 2018 3:33:00 PM	guest
	
19. Open the Preview of the file secret:

	http://localhost:8080/services/v3/js/ide-documents/api/read/document/preview?path=/private/secret.txt
	
20. Only the users who has the role Operator should be able to see the content of the file


