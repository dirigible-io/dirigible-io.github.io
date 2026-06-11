---
title: Welcome
description: The IDE start page.
---

# Welcome

Start page for the IDE. Opens by default on first login and is reachable via the Help menu thereafter. Contains quick links and nothing platform-critical.

## Sections

- **Documentation** - link to this help portal.
- **Tutorials** - curated entry points (Hello World, Bookstore, modeling).
- **Recent projects** - the projects most recently opened by the current user.
- **Samples** - links to the sample project templates (`template-hello-world`, `template-bookstore`, ...).
- **External** - GitHub, downloads, community.

## Customisation

The Welcome view is a regular view module (`view-welcome`). Replace it in a custom stack by:

- Shipping a replacement WebJar that registers the same view id, or
- Pointing `DIRIGIBLE_HOME_URL` at a different shell / landing page.

For one-off branding (logos, product name, custom links on the existing welcome shell) prefer `platform-branding` - see [Shell and Branding](/help/ide/shell-and-branding).

## Related

- [Shell and Branding](/help/ide/shell-and-branding)
- [Templates](/help/develop/using-templates-for-generation)
- [Settings perspective](/help/ide/perspectives/settings)
