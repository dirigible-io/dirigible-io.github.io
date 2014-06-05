---
layout: help
---

Access Log Service
===

Via the Access Logs Service one can manage the locations to be filtered and registered as well as to receive the comprehensive information about the accessed ones for the latest time period.

> The endpoint is: */acclog*

For Management of Locations:

<pre>
GET: http //[host]:[port]/dirigible/ *acclog*
 
POST: http //[host]:[port]/dirigible/ *acclog* /<project_name>/<location>
 
DELETE: http //[host]:[port]/dirigible/ *acclog* /<project_name>/<location>
 
DELETE: http //[host]:[port]/dirigible/ *acclog* /all

GET: http //[host]:[port]/dirigible/ *acclog* /locations
</pre>

For chart compliant data:

Parameter *hitsPerPattern* - hits count calculated grouped by the locations above
GET: http //[host]:[port]/dirigible/ *acclog* ? *hitsPerPattern*

Parameter *hitsPerProject* - hits count calculated grouped by the project names
GET: http //[host]:[port]/dirigible/ *acclog* ? *hitsPerProject*

Parameter *hitsPerURI* - hits count calculated grouped by the actual requested URI
GET: http //[host]:[port]/dirigible/ *acclog* ? *hitsPerURI*

Parameter *hitsByURI* - hits count calculated grouped hierarchically
GET: http //[host]:[port]/dirigible/ *acclog* ? *hitsByURI*
