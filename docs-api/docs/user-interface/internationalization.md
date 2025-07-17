---
layout: help
title: Internationalization
icon: none
group: help-features
---

Internationalization
===

The internationalization API is based on the `i18next` library.

Extension
---

You can register a new locale using the `platform-locales` extension point.

This file is usually put inside a folder named `extensions`, in the root of the project.

Example:

```json
{
    "module": "new-locale/configs/en-US.js",
    "extensionPoint": "platform-locales",
    "description": "Platform Locale - English (US)"
}
```

!!! Note
	The 'module' parameter above should point to a valid JavaScript configuration module.

Configuration module
---

In order to register a new locale, you must provide a valid configuration module.

This file is usually put inside a folder named `configs`, in the root of the project.

Example:

```javascript
exports.getLocale = () => ({
    id: 'en-US',
    label: 'English (US)',
    common: '/new-locale/translations/en-US/common.json'
});
```

* `getLocale` - The "getLocale" function must return the configuration object.
    * `id` - Valid and unique BCP 47 language tag.
	* `label` - User-facing name. Used when listing all languages.
    * `common` - Link to the common translation file. The file has a simple key-value structure. The key is the translation id and the value is the translation.

Example of a common translation file:
```json
{
    "yes": "Yes",
    "no": "No",
}
```

For the common translations, the translation ID can be the id from the json file (e.g. `yes`), or to be more explicit, a combination of the namespace and translation id (e.g. `common:yes`).

Tranlations
---

Each project can have its own translations.
When a perspective, view, dialog, etc. is loaded, it will have access to its own translations and the common ones.
You can register multiple translations by simply creating a `translations` folder in the root of a project and placing the different translations in subfolders whose name is the BCP 47 tag.
Example:

```
new-project
- translations
    - en-US
        - translation.json
    - de-DE
        - translation.json
```

The project name becomes the [namespace](https://www.i18next.com/principles/namespaces) and the file contains the translations.
Example of a translation file:

```json
{
    "locale": "Locale",
    "lng": "Language",
    "errMsg": {
        "noTranslation": "Failed to translate text",
    },
}
```

The full translation ID becomes a combination of the namespace and translation id (e.g. `new-project:errMsg.noTranslation`).

Service
---

In order to use translations, you will need to inlude the `platformLocale` module.

```javascript
const exampleView = angular.module('exampleView', ['blimpKit', 'platformView', 'platformLocale']);
```

Then you can either use `LocaleService` or the `t` filter for HTML templates.

```javascript
exampleView.controller('ExampleViewController', ($scope, LocaleService) => {
    LocaleService.onInit(() => {
        $scope.locale = LocaleService.t('new-project:locale');
        $scope.lng = LocaleService.t('new-project:lng');
        $scope.errorMessage = LocaleService.t('new-project:errMsg.noTranslation');
    });
});
```

```html
<div>{{'new-project:locale' | t}}</div>
```

#### LocaleService

Function     | Description | Returns
------------ | ----------- | --------
**changeLanguage(lang)**   | Change the language. Use the BCP 47 tag | *void*
**getLanguage()**   | Get the current language | *string*
**getLanguages()**   | Get all registerd language configurations | *object*
**t(TranslationParams)**   | Get translation | *string*
**onInit(callback)**   | Execute a callback once the translations are loaded | *string*

## Typedefs

<a name="TranslationParams"></a>

## TranslationParams

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Translation id |
| options | <code>Object</code> | [i18next options](https://www.i18next.com/overview/api#t) |
| fallback | <code>string</code> | Fallback string in case the translation is not found |

#### Filter

Maps to the `t` function from LocaleService.

```html
<div>{{'translation-id' | t:<options>:<fallback>}}</div>
```

```html
<div>{{'translation-id' | t:{num: 3}:'Items'}}</div>
```