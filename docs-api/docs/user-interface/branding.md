---
title: Branding
---

Branding
===

Dirigible allows you to change the branding of the platform. You will have to replace the default `platform-branding` module with your own.

=== "Overview"
- Module: `platform-branding`
- Source: [platform-branding/branding.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-branding/src/main/resources/META-INF/dirigible/platform-branding/branding.js)
- Web Link: `/services/web/platform-branding/branding.js`
- Status: `stable`
- Group: `platform`

### Basic Usage

The branding object:

```javascript
const brandingInfo = {
    name: 'Dirigible',
    brand: 'Eclipse Dirigible',
    brandUrl: 'https://www.dirigible.io/',
    icons: {
        faviconIco: '/services/web/platform-branding/images/favicon.ico',
        favicon32: '/services/web/platform-branding/images/favicon-32x32.png',
        favicon16: '/services/web/platform-branding/images/favicon-16x16.png',
    },
    logo: '/services/web/platform-branding/images/dirigible.svg',
    keyPrefix: 'dirigible'
};
```

* `brandingInfo` - This is the configuration object itself. It must be a const and it must always be called "brandingInfo".
	* `name` - Brand name that will be used for titles.
	* `brand` - Brand name that will be used for the the shellbar. 
	* `brandUrl` - URL to the brand/product that will be used in the about information.
    * `icons` - FavIcons
        * faviconIco - FavIcon in `.ico` format
        * favicon32 - FavIcon in `.png` format in 32x32px size.
        * favicon16 - FavIcon in `.png` format in 16x16px size.
    * `logo` - Link to the brand logo.
    * `keyPrefix` - When saving data to the local storage (opened tabs, layout configuration, etc.), this prefix will be used.