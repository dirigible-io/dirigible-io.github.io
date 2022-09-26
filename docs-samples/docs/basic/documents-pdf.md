---
title: Generate PDF
hide:
  - toc
---

# Generate PDF

### Steps

1. Create a project `generate-pdf`.
2. Create a JavaScript service with the name `pdf-service.js`.
3. Enter the following content:

    ```javascript
    var response = require("http/v4/response");
    var pdfDocuments = require("documents/v4/pdf");

    var data = {
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia fermentum magna, sit amet accumsan felis auctor ac.",
      columns: [
        {
          name: "Id",
          key: "id",
        },
        {
          name: "First Name",
          key: "firstName",
        },
        {
          name: "Last Name",
          key: "lastName",
        },
        {
          name: "Age",
          key: "age",
        },
      ],
      rows: [
        {
          id: 1001,
          firstName: "John",
          lastName: "Doe",
          age: 29,
        },
        {
          id: 1002,
          firstName: "Jane",
          lastName: "Doe",
          age: 26,
        },
        {
          id: 1003,
          firstName: "Joe",
          lastName: "Doe",
          age: 44,
        },
        {
          id: 1004,
          firstName: "Jill",
          lastName: "Doe",
          age: 40,
        },
      ],
    };

    var pdf = pdfDocuments.generateTable(data);

    response.setContentType("application/pdf");
    response.setHeader("Content-Disposition", 'filename="data.pdf"');
    response.write(pdf);
    response.flush();
    response.close();
    ```

Expected result:
![Generated PDF](/img/samples/documents/pdf-generator.png)

---

1. Create a project `generate-pdf`.
2. Create a JavaScript service with the name `pdf-service-advanced.js`.
3. Enter the following content:

    ```javascript
    var response = require("http/v4/response");
    var pdfDocuments = require("documents/v4/pdf");

    var data = {
      title: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      columns: [
        {
          name: "Id",
          key: "id",
        },
        {
          name: "Name",
          key: "name",
        },
        {
          name: "Position",
          key: "position",
        },
      ],
      rows: [],
    };

    for (let i = 0; i < 100; i++) {
      data.rows.push({
        id: "" + i,
        name: "John",
        position: "Software Developer",
        highlight: i % 2 == 0,
        breakAfter: (i + 1) % 10 == 0,
      });
    }

    var config = {
      size: "A3",
      alignColumns: "center",
      alignRows: "end",
    };
    var pdf = pdfDocuments.generateTable(data, config);

    response.setContentType("application/pdf");
    response.setHeader("Content-Disposition", 'filename="data.pdf"');
    response.write(pdf);
    response.flush();
    response.close();
    ```

Expected result:
![Generated PDF](/img/samples/documents/pdf-generator-advanced.png)

---

> For more information, see the _[API](https://www.dirigible.io/api/documents/pdf/)_ documentation.
