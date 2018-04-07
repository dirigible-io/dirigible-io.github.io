---
layout: help
title: Registry
icon: none
group: help-services
---

{{ page.title }} Service
===

Registry Service gives read-only access to the Dirigible public Registry content.

> The endpoint is: */registry*

To be able to use the service:

> User must be assigned to Role: *Operator*
> *Basic Authentication* headers must be provided
> Header *Accept* must be provided with value *application/json*

* To get the full content:

> **GET** `http //[host]:[port]/[dirigible application context]/ *registry*`


* To get the index of a given collection:

> **GET** `http //[host]:[port]/[dirigible application context]/ *registry/*`

		{
		   "name":"root",
		   "path":"/",
		   "files":[  
		      {  
		         "name":"DataStructures",
		         "path":"/registry/DataStructures/",
		         "folder":true,
		         "files":[  
		            {  
		               "name":"jane_books",
		               "path":"/registry/DataStructures/jane_books/",
		               "folder":true,
		               "files":[  
		                  {  
		                     "name":"jane_books.table",
		                     "path":"/registry/DataStructures/jane_books/jane_books.table"
		                  }
		               ]
		            },
		            {  
		               "name":"test_types.table",
		               "path":"/registry/DataStructures/test_types.table"
		            }
		         ]
		      },
		      {  
		         "name":"ExtensionDefinitions",
		         "path":"/registry/ExtensionDefinitions/",
		         "folder":true
		      },
		      {  
		         "name":"IntegrationServices",
		         "path":"/registry/IntegrationServices/",
		         "folder":true
		      },
		      {  
		         "name":"MobileApplications",
		         "path":"/registry/MobileApplications/",
		         "folder":true
		      },
		      {  
		         "name":"ScriptingServices",
		         "path":"/registry/ScriptingServices/",
		         "folder":true,
		         "files":[  
		            {  
		               "name":"jane_books",
		               "path":"/registry/ScriptingServices/jane_books/",
		               "folder":true,
		               "files":[  
		                  {  
		                     "name":"jane_books.entity",
		                     "path":"/registry/ScriptingServices/jane_books/jane_books.entity"
		                  },
		                  {  
		                     "name":"jane_books.js",
		                     "path":"/registry/ScriptingServices/jane_books/jane_books.js"
		                  },
		                  {  
		                     "name":"jane_books_lib.js",
		                     "path":"/registry/ScriptingServices/jane_books/jane_books_lib.js"
		                  }
		               ]
		            },
		            {  
		               "name":"test",
		               "path":"/registry/ScriptingServices/test/",
		               "folder":true,
		               "files":[  
		                  {  
		                     "name":"healthcheck.js",
		                     "path":"/registry/ScriptingServices/test/healthcheck.js"
		                  },
		                  {  
		                     "name":"testframework.js",
		                     "path":"/registry/ScriptingServices/test/testframework.js"
		                  }
		               ]
		            },
		            {  
		               "name":"api.js",
		               "path":"/registry/ScriptingServices/api.js"
		            },
		            {  
		               "name":"assert.js",
		               "path":"/registry/ScriptingServices/assert.js"
		            },
		            {  
		               "name":"entity.js",
		               "path":"/registry/ScriptingServices/entity.js"
		            },
		            {  
		               "name":"io.js",
		               "path":"/registry/ScriptingServices/io.js"
		            },
		            {  
		               "name":"mail.js",
		               "path":"/registry/ScriptingServices/mail.js"
		            },
		            {  
		               "name":"system.js",
		               "path":"/registry/ScriptingServices/system.js"
		            },
		            {  
		               "name":"upload.js",
		               "path":"/registry/ScriptingServices/upload.js"
		            }
		         ]
		      },
		      {  
		         "name":"SecurityConstraints",
		         "path":"/registry/SecurityConstraints/",
		         "folder":true
		      },
		      {  
		         "name":"TestCases",
		         "path":"/registry/TestCases/",
		         "folder":true
		      },
		      {  
		         "name":"WebContent",
		         "path":"/registry/WebContent/",
		         "folder":true,
		         "files":[  
		            {  
		               "name":"jane_books",
		               "path":"/registry/WebContent/jane_books/",
		               "folder":true,
		               "files":[  
		                  {  
		                     "name":"jane_books.html",
		                     "path":"/registry/WebContent/jane_books/jane_books.html"
		                  }
		               ]
		            }
		         ]
		      },
		      {  
		         "name":"WikiContent",
		         "path":"/registry/WikiContent/",
		         "folder":true
		      }
		   ]
		}


* To get the content of a given artifact:

> **GET** `http //[host]:[port]/[dirigible application context]/ */registry/WebContent/jane_books/jane_books.html*`

