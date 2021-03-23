---
title: PDF
---

PDF
===

API for generating a PDF files.

=== "Overview"
- Module: `documents/v4/pdf`
- Alias: `documents/pdf`
- Definition: [https://github.com/eclipse/dirigible/issues/763](https://github.com/eclipse/dirigible/issues/763)
- Source: [/documents/v4/pdf.js](https://github.com/dirigiblelabs/api-documents/blob/master/documents/v4/pdf.js)
- Facade: [PDFFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-documents/src/main/java/org/eclipse/dirigible/api/v3/documents/PDFFacade.java)
- Status: `stable`


### Basic Usage

```javascript
var response = require("http/v4/response");
var pdfDocuments = require("documents/v4/pdf");

var data = {
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia fermentum magna, sit amet accumsan felis auctor ac.",
    columns: [{
        name: "Id",
        key: "id"
    }, {
        name: "First Name",
        key: "firstName",
    }, {
        name: "Last Name",
        key: "lastName"
    }, {
        name: "Age",
        key: "age"
    }],
    rows: [{
        id: 1001,
        firstName: "John",
        lastName: "Doe",
        age: 29
    }, {
        id: 1002,
        firstName: "Jane",
        lastName: "Doe",
        age: 26
    }, {
        id: 1003,
        firstName: "Joe",
        lastName: "Doe",
        age: 44
    }, {
        id: 1004,
        firstName: "Jill",
        lastName: "Doe",
        age: 40
    }]
};

var pdf = pdfDocuments.generateTable(data);

response.setContentType("application/pdf");
response.setHeader('Content-Disposition', 'filename="data.pdf"');
response.write(pdf);
response.flush();
response.close();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**generate(templatePath, data)**   | Generates PDF file from a given template and data | *byte array*
**generateTable(data, config)**   | Generates PDF file with [table data](#tabledata) and [config](#tableconfig) | *byte array*


### Objects

---


##### TableData

Property     | Description | Type
------------ | ----------- | --------
**title**   | (Optional) Title of the PDF document.  | *string*
**description**   | (Optional) Description of the PDF document.  | *string*
**columns**   | The table columns.  | *array of [TableDataColumns](#tabledatacolumns)*
**rows** | The table data. | *array of [TableDataRows](#tabledatacolumns)*

##### TableDataColumns

Property     | Description | Type
------------ | ----------- | --------
**name**   | The displayed column name.  | *string*
**key**   | The property key in the *rows* object.  | *string*

##### TableDataRows

Property     | Description | Type
------------ | ----------- | --------
**`arbitrary-number-of-properties`**   | The row data.  | *any*
**highlight**   | (Optional) Whether to highlight the row.  | *boolean*
**breakAfter**   | (Optional) Whether to bold the row.  | *boolean*

##### TableConfig

Property     | Description | Type     | Default
------------ | ----------- | -------- | --------
**size**   | (Optional) The PDF document size.  | *string* | `A4`
**alignColumns**   | (Optional) The column alignmnet property.  | *start, center, end* | `center`
**alignRows**   | (Optional) The rows alignmnet property.  | *start, center, end* | `center`

Sample **TableConfig**:

```javascript
let config = {
    size: "A3",
    alignColumns: "start"
    alignRows: "end"
};
```
