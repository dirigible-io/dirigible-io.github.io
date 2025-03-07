---
title: Branding
---

Branding
===

Dirigible allows you to change the branding of the platform.

=== "Overview"
- Module: `platform-branding`
- Source: [platform-branding/branding.js](https://github.com/eclipse/dirigible/blob/master/components/ui/platform-branding/src/main/resources/META-INF/dirigible/platform-branding/branding.js)
- Source: [platform-branding/branding.mjs](https://github.com/eclipse/dirigible/blob/master/components/ui/platform-branding/src/main/resources/META-INF/dirigible/platform-branding/branding.mjs)
- Source: [platform-core/utilities/view.js](https://github.com/eclipse/dirigible/blob/master/components/ui/platform-core/src/main/resources/META-INF/dirigible/platform-core/utilities/view.js)
- JS Link: `/services/js/platform-branding/branding.js`
- Web Link: `/services/web/platform-core/utilities/view.js`
- Status: `stable`
- Group: `platform`

### Setting the brand information

There are two ways to do this:

#### Static

Configure the [branding environment variables](/help/setup/setup-environment-variables/#branding).

#### Dynamic

Use the `setBrandingInfo` function:

```javascript
setBrandingInfo({
    name: 'Dirigible',
    brand: 'Eclipse',
    brandUrl: 'https://www.dirigible.io/',
    icons: {
        favicon: '/services/web/platform-branding/images/favicon.ico',
    },
    logo: '/services/web/platform-branding/images/dirigible.svg',
    theme: 'blimpkit-auto',
    prefix: 'dirigible'
});
```

Parameter     | Description | Required
------------ | ----------- | -----------
**name**   | The product name | no
**brand**   | The brand name | no
**brandUrl**   | The brand/product URL | no
**icons**   | Favicons | no
**icons.favicon**   | Favicon in `.ico` format | no
**logo**   | The brand/product logo | no
**theme**   | The default theme ID | no
**prefix**   | The prefix used for cookie and localStorage value keys | no

### Getting the brand information

```javascript
const branding = getBrandingInfo();
```

The branding constant will be a reference to the global branding information object, which will have the same structure as the set function object parameter.

### Initializing the branding

For standard Dirigible shells/perspectives/views/etc. you can just use the loader. Example:

```html
<script type="text/javascript" src="/services/js/platform-core/services/loader.js?id=view-js"></script>
```

In a custom view, you must include those two files in your shell/perspective/view/etc. and make sure they are the first to load.

```html
<script type="text/javascript" src="/services/js/platform-branding/branding.js"></script>
<script type="text/javascript" src="/services/web/platform-core/utilities/view.js"></script>
```