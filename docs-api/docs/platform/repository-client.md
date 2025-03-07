---
title: Repository (Client)
---

Repository client service
===

The repository client service is used to communicate with the back-end API. You may also want to check out the [RepositoryHub](../repository-hub).

=== "Overview"
- Module: `platform-core`
- Source: [service-repository/repository.js](https://github.com/eclipse/dirigible/blob/master/components/ui/service-workspace/src/main/resources/META-INF/dirigible/service-repository/repository.js)
- Web Link: `/services/web/service-repository/repository.js`
- Status: `stable`
- Group: `platform`


### Basic Usage

Include the service using the web link above. If you are making a standard Dirigible [editor](../../user-interface/editor/), the repository service is already included.

Add it to your app module and controller:

```javascript
const exampleView = angular.module('example', [
  ...
  'RepositoryService',
]);
exampleView.controller('ExampleViewController', ($scope, RepositoryService) => {...});
```


## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getMetadata(resourceUrl)**   | Return file metadata. | *Promise*
**loadRepository(resourcePath)**   | Lists the content of the repository. | *Promise*
**createCollection(path, name)**   | Creates a folder. | *Promise*
**createResource(path, name)**   | Creates a file. | *Promise*
**remove(resourcePath)**   | Remove a file/folder. | *Promise*

<!-- ## Example

```javascript
``` -->