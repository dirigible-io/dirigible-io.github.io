---
title: File Upload
---

File Upload
===

### Steps

1. Create a project named `file-upload-project`.
1. Right click on the `file-upload-project` project and select **New &#8594; TypeScript Service**.
1. Enter `service.ts` for the name of the TypeScript Service.
1. Replace the content with the following code:

    ```javascript
    const upload = require("http/upload");
    const request = require("http/request");
    const response = require("http/response");

    if (request.getMethod() === "POST") {
        if (upload.isMultipartContent()) {
            const fileItems = upload.parseRequest();
            for (i = 0; i < fileItems.size(); i++) {
                const fileItem = fileItems.get(i);
                const contentType = fileItem.getContentType();
                console.log(`Content Type: ${contentType}`);
                console.log(`Filename: ${fileItem.getOriginalFilename()}`);
                // console.log(`Text: ${fileItem.getText()}`);

                response.setContentType(contentType);
                response.write(fileItem.getBytesNative());
            }
        } else {
            response.println("The request's content must be 'multipart'");
        }
    } else if (request.getMethod() === "GET") {
        response.println("Use POST request.");
    }

    response.flush();
    response.close();
    ```

1. Right click on the `file-upload-project` project and select **New &#8594; HTLM5 Page**.
1. Enter `index.html` for the name of the file.

    ```html
    <html>
      <body>
        <form action="/services/ts/file-upload-project/service.ts" method="post" enctype="multipart/form-data">
          <label for="file">Filename:</label>
          <input type="file" name="file" id="file" multiple>
          <br>
          <input type="submit" name="submit" value="Submit">
        </form>
      </body>
    </html>
    ```

!!! info "Save & Publish"

    Saving the files will trigger a _`Publish`_ action, which will build and deploy the **TypeScript Service** and the **HTML5 Page**.

    Select the `index.html` file and open the `Preview` view to test the file upload.

## Next Steps

!!! success "Section Completed"

    After completing the steps in this tutorial, you would have:

    - HTML page to submit the uploaded file to the TypeScript service.
    - Backend TypeScript service that would render the uploaded file.

    Continue to the [`http/upload`](https://www.dirigible.io/api/http/upload/) page for more details about the API.

    _**Note:** The complete content of the File Upload tutorial is available at: [https://github.com/dirigiblelabs/tutorial-file-upload-project](https://github.com/dirigiblelabs/tutorial-file-upload-project)_