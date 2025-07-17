---
layout: help
title: Locale
icon: help-features
---

Loader
===

The locale is a system service that returns the locale configurations and translations.

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/extension-services/locales.js](https://github.com/eclipse/dirigible/blob/master/components/ui/platform-core/src/main/resources/META-INF/dirigible/platform-core/extension-services/locales.js)
- Service Link: `/services/js/platform-core/extension-services/locales.js`
- Status: `stable`
- Group: `platform`

## Bundles

---

Bundle name     | Description
------------ | -----------
**langs**   | BCP 47 language tag(s). Example - 'en-US'
**namespaces**   | Translation namespace(s). Usually, namspaces are the same as the name of the project they come from.
**extensionPoints**   | Extension point id(s)

### Example

Request:
```
/services/js/platform-core/extension-services/locales.js?langs=en-US
```

Response:
```json
{
  "locales": [
    {
      "id": "en-US",
      "label": "English (US)",
      "common": "/resources-locale/translations/en-US/common.json"
    }
  ],
  "translations": {
    "en-US": {
      "common": {
        "aria": {
          "headerMenu": "header menu",
          "headerMainMenuBtn": "main menu button",
          "headerMenuBtn": "menu button",
          "headerMenuWindow": "header menu window",
          "headerMenuHelp": "header menu help",
          "windowMenuDdBtn": "window menu dropdown button",
          "helpMenuDdBtn": "help menu dropdown button",
          "ntfListButton": "notification list button",
          "delNtf": "delete notification",
          "usrMenuBtn": "user menu button",
          "usrMenu": "user menu",
          "perspectiveNav": "perspective navigation",
          "perspectiveList": "Perspective list",
          "utilityNav": "utility navigation",
          "expandPerGrp": "expand perspective group"
        },
        "yes": "Yes",
        "no": "No",
        "ok": "OK",
        "cancel": "Cancel",
        "add": "Add",
        "edit": "Edit",
        "delete": "Delete",
        "remove": "Remove",
        "help": "Help",
        "new": "New",
        "region": "Region",
        "language": "Language",
        "window": "Window",
        "shells": "Shells",
        "perspectives": "Perspectives",
        "views": "Views",
        "notificationsNum": "Notifications ({{num}})",
        "noNotifications": "No Notifications",
        "close": "Close",
        "clear": "Clear",
        "clearAll": "Clear all",
        "clearFilter": "Clear filter",
        "name": "Name",
        "username": "Username",
        "logout": "Logout",
        "search": "Search",
        "loading": "Loading",
        "folder": "Folder",
        "rename": "Rename",
        "refresh": "Refresh",
        "settings": "Настройки",
        "reset": "Нулиране",
        "about": "About",
        "status": "Status"
      },
      "perspective-workbench": {
        "file": "File",
        "saveAll": "Save All",
        "publishAll": "Publish All",
        "unpublishAll": "Unpublish All",
        "exportAll": "Export All",
        "project": "Project"
      }
    }
  }
}
```