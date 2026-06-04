# PDF

## Overview

::: tip Module
- package: `@aerokit/sdk/pdf`
- source: [pdf/pdf.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/pdf/pdf.ts)
- last updated: 
:::

The PDF module provides utilities for generating PDF documents using predefined templates and structured data. It abstracts the complexities of PDF generation, allowing developers to create well-formatted PDF documents with ease. The module includes functionality for generating tables in PDFs based on a standard template, as well as the ability to use custom templates for more advanced use cases.

### Key Features:
- **Table Generation**: The `generateTable` method allows for creating PDF documents containing styled tables based on a standard template, using structured data input.
- **Custom Template Support**: The `generate` method enables the use of custom templates for PDF generation, providing flexibility for various document layouts and styles.
- **Configurable Layout**: Optional configuration parameters allow for customizing page size and alignment of table content within the generated PDF.

### Use Cases:
- **Reporting**: Generate PDF reports with tabular data, such as sales reports, inventory lists, or any structured data presentation.
- **Document Generation**: Create custom PDF documents for invoices, certificates, or any scenario where a specific layout is required.

### Example Usage:
```ts
import { PDF } from "@aerokit/sdk/pdf";

const tableData = {
  title: "Sales Report",
  description: "Monthly sales data for Q1",
  columns: [
    { name: "Product", key: "product" },
    { name: "Quantity", key: "quantity" },
    { name: "Price", key: "price" }
  ],
  rows: [
    { product: "Widget A", quantity: 100, price: "$10" },
    { product: "Widget B", quantity: 50, price: "$20" }
  ]
};

const pdfContent = PDF.generateTable(tableData, { size: "a4", alignColumns: true });
// pdfContent is a byte array representing the generated PDF document
```

## Classes

### PDF

#### generateTable()

Generates a PDF document containing a styled table based on the standard table template.

> ```ts
> static generateTable(data: PDFTableData, config: PDFTableConfig): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `data` | `PDFTableData` | The structured data to populate the table. |
> | `config` | `PDFTableConfig` | Optional configuration for page size and alignment. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The generated PDF content as a byte array (number[]).
> :::

#### generate()

Generates a PDF document using a custom template path and data payload.

> ```ts
> static generate(templatePath: string, data: PDFTableData): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `templatePath` | `string` | The path to the custom template file (e.g., in the Registry). |
> | `data` | `PDFTableData` | The data to be injected into the template. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The generated PDF content as a byte array (number[]).
> :::

