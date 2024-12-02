---
title: Repository (Server)
---

Repository (Server)
===

Repository object gives access to the repository. It can be used for creating artifacts such as services and web pages programmatically.

=== "Overview"
- Module: `platform/repository`
- Definition: [https://github.com/eclipse/dirigible/issues/377](https://github.com/eclipse/dirigible/issues/377)
- Source: [/platform/repository.js](https://github.com/eclipse/dirigible/blob/master/components/api-platform/src/main/resources/META-INF/dirigible/platform/repository.js)
- Status: `stable`
- Group: `platform`


### Basic Usage

The service which list the available workspaces:

=== "ECMA6"

    ```javascript
    import { repository } from "sdk/platform";
    import { response } from "sdk/http";

    let resource = repository.getResource("/registry/public/modules/src/platform/repository.ts");

    response.println("Exists: " + resource.exists());
    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const response = require("http/response");
    const repositoryManager = require("platform/repository");

    let resource = repositoryManager.getResource("/registry/public/platform/repository.js");

    response.println("Exists: " + resource.exists());
    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getResource(path)**   | Get Resource by path | *Resource*
**createResource(path, content, contentType)**   | Creates Resource programmatically | *Resource*
**createResourceNative(path, content, contentType)**   | Creates Resource programmatically, with array of Java bytes | *Resource*
**updateResource(path, content)**   | Updates Resource content | *Resource*
**updateResourceNative(path, content)**   | Updates Resource content, with array of Java bytes | *Resource*
**deleteResource(path)**   | Delete Resource by path | *-*
**getCollection(path)**   | Get Collection by path | *Collection*
**createCollection(path)**   | Creates Collection programmatically | *Collection*
**deleteCollection(path)**   | Delete Collection by path | *-*
**find(path, pattern)**   | Find resources under certain path (e.g. /) by pattern (e.g. *.js) | *array of strings*


### Objects

---

#### Resource

Function     | Description | Returns
------------ | ----------- | --------
**getName()** | Gets the Resource name | *string*
**getPath()**   | Gets the Resource path | *string*
**getParent()** | Gets the Resource parent Collection | *Collection*
**getInformation()** | Get the Resource information | *EntityInformation*
**create()** | Create new Resource | *-*
**delete()** | Delete the Resource | *-*
**renameTo(name)** | Rename the Resource | *-*
**moveTo(path)** | Moves the Resource to a new location | *-*
**copyTo(path)** | Copy the Resource to a new location | *-*
**exists()** | Returns _true_ if the Resource exists | *boolean*
**isEmpty()** | Returns _true_ if the Resource is empty | *boolean*
**getText()** | Returns the content of the Resource as text | *string*
**getContent()** | Returns the content of the Resource | *byte array*
**getContentNative()** | Returns the content of the Resource | *array of Java bytes*
**setText(text)** | Sets the Resource content as text | *-*
**setContent(content)** | Sets the Resource content | *-*
**setContentNative(content)** | Sets the Resource content as array of Java bytes | *-*
**isBinary()** | Returns _true_ if the Resource content is binary | *boolean*
**getContentType()** | Returns the content type of the Resource | *string*

#### Collection

Function     | Description | Returns
------------ | ----------- | --------
**getName()** | Gets the Collection name | *string*
**getPath()**   | Gets the Collection path | *string*
**getParent()** | Gets the Collection parent Collection | *Collection*
**getInformation()** | Get the Collection information | *EntityInformation*
**create()** | Create new Collection | *-*
**delete()** | Delete the Collection | *-*
**renameTo(name)** | Rename the Collection | *-*
**moveTo(path)** | Moves the Collection to a new location | *-*
**copyTo(path)** | Copy the Collection to a new location | *-*
**exists()** | Returns _true_ if the Collection exists | *boolean*
**isEmpty()** | Returns _true_ if the Collection is empty | *boolean*
**getCollectionsNames()** | Gets the names of the Collections in this Collection | *array of strings*
**createCollection(name)** | Create new Collection | *Collection*
**getCollection(name)** | Get Collection by name | *Collection*
**removeCollection(name)** | Remove Collection by name | *-*
**getResourcesNames()** | Gets the names of the Resources in this Collection | *array of strings*
**getResource(name)** | Get Resource by name | *Resource*
**removeResource(name)** | Remove Resource by name | *-*
**createResource(name, content)** | Create new Resource | *Resource*


#### EntityInformation

Function     | Description | Returns
------------ | ----------- | --------
**getName()** | Gets the entity name | *string*
**getPath()**   | Gets the entity path | *string*
**getPermissions()**   | Gets the entity permissions | *string*
**getSize()**   | Gets the entity size | *string*
**getCreatedBy()**   | Gets the entity createdBy | *string*
**getCreatedAt()**   | Gets the entity createdAt | *string*
**getModifiedBy()**   | Gets the entity modifiedBy | *string*
**getModifiedAt()**   | Gets the entity modifiedAt | *string*
