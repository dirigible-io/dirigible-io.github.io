---
title: Extensions Overview
---

Extensions Overview
===

## Extensibility

Extensibility is an important requirement for business applications built to follow custom processes in Line of Business(LoB) areas. In the cloud toolkit, a generic description of the extension points and extensions is provided without explicitly defining the contract. This a simple but powerful way to define extensions.

## Extension Points

### Client

  - [platform-shells](/api/user-interface/shell/)
  - [platform-perspectives](/api/user-interface/perspective/)
  - platform-settings
  - [platform-views](/api/user-interface/view/)
  - [platform-subviews](/api/user-interface/subview/)
  - [platform-windows](/api/user-interface/window/)
  - [platform-editors](/api/user-interface/editor/)
  - [platform-menus](/api/user-interface/menu/)
  - [platform-themes](/api/user-interface/themes/)
  - [platform-templates](template/)

You can override and/or extend the default extension points by using the `setExtPoints` function to your shell, right before you initialize anything else:

```javascript
setExtPoints({
  perspectives: ['custom-perspectives'],
  shells: ['custom-shells'],
  views: ['custom-views'],
  subviews: ['custom-subviews'],
  editors: ['custom-editors'],
  menus: ['custom-menus'],
  windows: ['custom-windows'],
  themes: ['custom-themes'],
  settings: ['custom-settings'],
});
angular.module('shell', ...
```

You can find more information in the Extensions API (Client).

### Server

  - ide-workspace-on-save
  - ide-workspace-before-publish
  - ide-workspace-after-publish
  - ide-workspace-before-unpublish
  - ide-workspace-after-unpublish

### Extension Point API

See [Extension Point](/api/extensions/extension-point/)

### Extensions API (Server)

See [Extensions (Server)](/api/extensions/extensions-server/)

### Extensions API (Client)

See [Extensions (Client)](/api/extensions/extensions-client/)