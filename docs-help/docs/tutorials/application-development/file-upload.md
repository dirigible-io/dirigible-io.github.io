---
title: File Upload
---

File Upload
===

## Overview

This sample shows how to create a simple web application for uploading files.


## Steps

1. Create a project named `file-upload-project`.
1. Right click on the `file-upload-project` project and select **New &#8594; File**.
1. Enter `tsconfig.json` for the name of the File.
1. Replace the content with the following:

    ```json
    {
        "compilerOptions": {
            "module": "ESNext"
        }
    }
    ```

1. Right click on the `file-upload-project` project and select **New &#8594; File**.
1. Enter `project.json` for the name of the File.
1. Replace the content with the following:

    ```json
    {
        "guid": "file-upload-project",
        "actions": [
            {
                "name": "Build TypeScript",
                "commands": [
                    {
                        "os": "unix",
                        "command": "tsc"
                    },
                    {
                        "os": "windows",
                        "command": "cmd /c tsc"
                    }
                ],
                "registry": "true"
            }
        ]
    }
    ```

    !!! note "TypeScript Compilation"

        The `tsconfig.json` and `project.json` files are needed for the compilation of the TypeScript files.
        In order to run the compilation a _`Publish`_ action should be performed on the _`Project`_ level _(right click on the project and select **Publish**)_.

1. Right click on the `file-upload-project` project and select **New &#8594; TypeScript Service**.
1. Enter `service.ts` for the name of the TypeScript Service.
1. Replace the content with the following code:

    ```ts
    import { upload, request, response } from "sdk/http";
    import { cmis } from "sdk/cms";
    import { streams } from "sdk/io";
    
    if (request.getMethod() === "POST") {
        if (upload.isMultipartContent()) {
            const fileItems = upload.parseRequest();
            for (let i = 0; i < fileItems.size(); i++) {
                const fileItem = fileItems.get(i);
    
                const fileName = fileItem.getName();
                const contentType = fileItem.getContentType();
                const bytes = fileItem.getBytes();
    
                const inputStream = streams.createByteArrayInputStream(bytes);
    
                const cmisSession = cmis.getSession();
                const contentStream = cmisSession.getObjectFactory().createContentStream(fileName, bytes.length, contentType,     inputStream);
    
                cmisSession.createDocument("file-upload-project/uploads", {
                    [cmis.OBJECT_TYPE_ID]: cmis.OBJECT_TYPE_DOCUMENT,
                    [cmis.NAME]: fileName
                }, contentStream, cmis.VERSIONING_STATE_MAJOR);
    
            }
            response.sendRedirect("/services/web/ide-documents/");
        } else {
            response.println("The request's content must be 'multipart'");
        }
    } else {
        response.println("Use POST request.");
    }
    
    response.flush();
    response.close();
    ```

    !!! info "Save & Publish"
    
	    In order to run the compilation of _`TypeScript`_ files a _`Publish`_ action should be performed on the _`Project`_ level _(right click on the project and select **Publish**)_.

    !!! tip "http/upload"

        Take a look at the [`http/upload`](https://www.dirigible.io/api/http/upload/) documentation for more details about the API.

1. Right click on the `file-upload-project` project and select **New &#8594; HTLM5 Page**.
1. Enter `index.html` for the name of the file.
1. Replace the content with the following code:

    ```html
     <!DOCTYPE html>
     <html>
     
         <body>
             <form action="/services/ts/file-upload-project/service.ts" method="post" enctype="multipart/form-data">
                 <label for="file">Filename:</label>
                 <input type="file" name="file" id="file" multiple>
                 <br>
                 <input type="submit" name="submit" value="Submit">
             </form>
             <p><b>Note:</b> After successful upload you'll be redirected to the <a
                     href="/services/web/ide-documents/">Documents</a> perspective where the file can be found under the
                 <b>file-upload-project/uploads</b> folder.
             </p>
         </body>
     
     </html>
    ```

!!! info "Save & Publish"

    Saving the files will trigger a _`Publish`_ action, which will build and deploy the **TypeScript Service** and the **HTML5 Page**. Select the `index.html` file and open the `Preview` view to test the file upload.

## Summary

!!! success "Tutorial Completed"

    After completing the steps in this tutorial, you would have:

    - HTML page to submit the uploaded file to the TypeScript service.
    - Backend TypeScript service that would render the uploaded file.

    _**Note:** The complete content of the File Upload tutorial is available at: [https://github.com/dirigiblelabs/tutorial-file-upload-project](https://github.com/dirigiblelabs/tutorial-file-upload-project)_
