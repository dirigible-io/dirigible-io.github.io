---
title: Registry
---

Registry
===

Registry object gives access to the content in the repository and also the pre-delivered content

=== "Overview"
- Module: `platform/registry`
- Definition: [https://github.com/eclipse/dirigible/issues/508](https://github.com/eclipse/dirigible/issues/508)
- Source: [/platform/registry.js](https://github.com/eclipse/dirigible/blob/master/components/api-platform/src/main/resources/META-INF/dirigible/platform/registry.js)
- Status: `stable`
- Group: `platform`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { registry } from "sdk/platform";
    import { response } from "sdk/http";

    let text = registry.getText("modules/src/platform/registry.ts");

    response.println(text);
    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const response = require("http/response");
    const registry = require("platform/registry");

    let text = registry.getText("platform/registry.js");

    response.println(text);
    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getContent(path)**   | Gets the content of artefact by path, as byte array | *array of bytes*
**getContentNative(path)**   | Gets the content of artefact by path, as array of Java bytes | *array of Java bytes*
**getText(path)**   | Gets the content of artefact by path, as text | *string*
**find(path, pattern)**   | Find artefacts under certain path (e.g. /) by pattern (e.g. *.js) | *array of strings*
**getRoot()**   | Gets the `Root` directory | *Directory*

### Objects

---

#### Artefact

Function     | Description | Returns
------------ | ----------- | --------
**getName()** | Gets the Artefact name | *string*
**getPath()**   | Gets the Artefact path | *string*
**getParent()** | Gets the Artefact parent  | *Directory*
**getInformation()** | Get the Artefact information | *ArtefactInformation*
**exists()** | Returns _true_ if the Artefact exists | *boolean*
**isEmpty()** | Returns _true_ if the Artefact is empty | *boolean*
**getText()** | Returns the content of the Artefact as text | *string*
**getContent()** | Returns the content of the Artefact | *byte array*
**getContentNative()** | Returns the content of the Artefact | *array of Java bytes*
**isBinary()** | Returns _true_ if the Artefact content is binary | *boolean*
**getContentType()** | Returns the content type of the Artefact | *string*

#### Directory

Function     | Description | Returns
------------ | ----------- | --------
**getName()** | Gets the Directory name | *string*
**getPath()**   | Gets the Directory path | *string*
**getParent()** | Gets the Directory parent Directory | *Directory*
**getInformation()** | Get the Directory information | *ArtefactInformation*
**exists()** | Returns _true_ if the Directory exists | *boolean*
**isEmpty()** | Returns _true_ if the Directory is empty | *boolean*
**getDirectoriesNames()** | Gets the names of the Directories in this Directory | *array of strings*
**getDirectory(name)** | Get Directory by name | *Directory*
**getArtefactsNames()** | Gets the names of the Artefacts in this Directory | *array of strings*
**getArtefact(name)** | Get Artefact by name | *Artefact*

#### ArtefactInformation

Function     | Description | Returns
------------ | ----------- | --------
**getName()** | Gets the Artefact name | *string*
**getPath()**   | Gets the Artefact path | *string*
**getPermissions()**   | Gets the Artefact permissions | *string*
**getSize()**   | Gets the Artefact size | *string*
**getCreatedBy()**   | Gets the Artefact createdBy | *string*
**getCreatedAt()**   | Gets the Artefact createdAt | *string*
**getModifiedBy()**   | Gets the Artefact modifiedBy | *string*
**getModifiedAt()**   | Gets the Artefact modifiedAt | *string*

