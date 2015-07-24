---
layout: help
title: Access Log
icon: fa-key
group: help-services
---

Access Log Service
===

Via the Access Logs Service one can manage the locations to be filtered and registered as well as to receive the comprehensive information about the accessed ones for the latest time period.

> The endpoint is: */acclog*

For Management of Locations:


> **GET** `http //[host]:[port]/[dirigible application context]/ *acclog*`
 
> **POST** `http //[host]:[port]/[dirigible application context]/ *acclog* /<project_name>/<location>`
 
> **DELETE** `http //[host]:[port]/[dirigible application context]/ *acclog* /<project_name>/<location>`
 
> **DELETE** `http //[host]:[port]/[dirigible application context]/ *acclog* /all`

> **GET** `http //[host]:[port]/[dirigible application context]/ *acclog* /locations`


For chart compliant data:

Parameter *hitsPerPattern* - hits count calculated grouped by the locations above

> **GET** `http //[host]:[port]/[dirigible application context]/ *acclog* ? *hitsPerPattern*`

Parameter *hitsPerProject* - hits count calculated grouped by the project names

> **GET** `http //[host]:[port]/[dirigible application context]/ *acclog* ? *hitsPerProject*`

Parameter *hitsPerURI* - hits count calculated grouped by the actual requested URI

> **GET** `http //[host]:[port]/[dirigible application context]/ *acclog* ? *hitsPerURI*`

Parameter *hitsByURI* - hits count calculated grouped hierarchically

> **GET** `http //[host]:[port]/[dirigible application context]/ *acclog* ? *hitsByURI*`
