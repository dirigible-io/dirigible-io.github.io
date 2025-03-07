---
title: Themes
---

Themes
===

Eclipse Dirigible uses the default BlimpKit theme and it also has a classic theme, based on the SAP Fiori design.

Both themes can be found in the [BlimpKit](https://github.com/dirigiblelabs/BlimpKit/tree/master/css/themes) repository.

The ThemingHub API is used to get/set the currect theme and listen for theme changes. Extends [MessageHub](../message-hub).

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/theming-hub.js](https://github.com/eclipse/dirigible/blob/master/components/ui/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/theming-hub.js)
- Web Link: `/services/web/platform-core/ui/platform/theming-hub.js`
- Status: `stable`
- Group: `platform`

### Extension

You can register a new theme using the `platform-themes` extension point.

This file is usually put inside a folder named `extensions`, in the root of the project.

Example:

```json
{
    "module": "new-theme/configs/theme-light.js",
    "extensionPoint": "platform-themes",
    "description": "Example Theme"
}
```

!!! Note
	The 'module' parameter above should point to a valid JavaScript configuration module.

### Configuration module

In order to register a new theme in the platform, you must provide a valid configuration module.

This file is usually put inside a folder named `configs`, in the root of the project.

Example:

```javascript
exports.getTheme = () => ({
	id: 'example-theme',
	name: 'Example Theme',
	type: 'light',
	version: 1,
	links: [
		'/services/web/new-theme/css/new-theme-variables.css',
		'/services/web/new-theme/css/new-theme.css',
	]
});
```

* `getTheme` - This function must return the configuration object and it must be exported.
	* `id` - Unique theme ID.
	* `name` - User-facing name.
    * `type` - There are three types of themes - light, dark and auto.
    * `version` - Theme version.
    * `links` - List containing the URL path to the theme files.

The project structure should look like this:

```
new-theme
- extensions
    - theme.extension
- configs
    - theme.js
- css
    - new-theme-variables.css
    - new-theme.css
```

### Basic Usage

If you are using the standard Dirigible view configuration, theme support is initialized automatically by setting `<theme></theme>` tag at the end of the view body.

If you are making a custom view, you can include the API using the web link above.

To initialize it, place this in your code:

```javascript
const themingHub = new ThemingHub();
```

## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getSavedTheme()**   | Returns the current theme configuration | *object*
**setSavedTheme(theme)**   | Sets a theme configuration | *object*
**onThemesLoaded(handlerFunc)**   | Registers a listener. Triggered when all themes are loaded. Returns a function to unregister the listener. | *function*
**themesLoaded()**   | Triggers an event for `onThemesLoaded` | -
**onThemeChange(handlerFunc)**   | Registers a theme change listener. Returns a function to unregister the listener. | *function*
**themeChanged(ThemeChange)**   | Triggers an event for `onThemeChange` | -

## Typedefs

!!! Note
	Params in square brackets are optional.

<a name="ThemeChange"></a>

## ThemeChange : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of the theme. |
| type | <code>&#x27;light&#x27;</code> \| <code>&#x27;dark&#x27;</code> \| <code>&#x27;auto&#x27;</code> | Type of the theme. |
| links | <code>Array.&lt;string&gt;</code> | Links to the theme css files. |

## Example

```javascript
let currentTheme;
const themesLoadedListener = themingHub.onThemesLoaded(() => {
    currentTheme = themingHub.getSavedTheme());
    themingHub.removeMessageListener(themesLoadedListener)
});
```