---
layout: help
title: Loader
icon: help-features
---

Loader
===

The loader is a system service that aggregates javascript and css files togeter by groups and returns a bundle to the client.

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/services/loader.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-core/src/main/resources/META-INF/dirigible/platform-core/services/loader.js)
- Service Link: `/services/js/platform-core/services/loader.js`
- Status: `stable`
- Group: `platform`

## Bundles

---

Bundle name     | Description
------------ | -----------
**view-js**<br />**view-css**   | Everything needed to create a Dirigible view.
**editor-js**   | Same as the view but with the workspace and repository services and hubs included.
**perspective-js**<br />**perspective-css**   | Everything needed to create a Dirigible perspective.
**shell-js**<br />**shell-css**   | Everything needed to create a Dirigible shell.
**file-upload-js**   | `angular-file-upload` module.
**split-js**<br />**split-css**   | Split.js library and `<split>` directive.
**code-editor-js**<br />**code-editor-css**   | Embeddable monaco editor in the form of a `<code-editor>` directive.
**cookies**   | AngularJS cookie module.

!!! Note
	You cannot mix `-css` and `-js` bundles in one request.

## Example

Requesting the view bundle:

```html
<script type="text/javascript" src="/services/js/platform-core/services/loader.js?id=view-js"></script>
<link type="text/css" rel="stylesheet" href="/services/js/platform-core/services/loader.js?id=view-css" />
```

Requesting the view bundle with the embeddable editor:

```html
<script type="text/javascript" src="/services/js/platform-core/services/loader.js?ids=view-js,code-editor-js"></script>
<link type="text/css" rel="stylesheet" href="/services/js/platform-core/services/loader.js?ids=view-css,code-editor-css" />
```