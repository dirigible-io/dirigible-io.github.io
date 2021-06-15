---
title: Database Table
---

Database Table
===
**Table Model** is a JSON formatted `*.table` descriptor. It represents the layout of the database table, which will be created during the activation process. Data structures synchroniser automatically reads all the available `*.table` files in the repository (including the classpath resources) and creates the underlying database tables into the default database. The definition supports also dependencies which gives the ability to the synchroniser to make a topological sorting before starting the creation of the database artifacts. 

Example descriptor:

```json

{
	"tableName": "TEST001",
	"columns": [
		{
			"name":"ID",
			"type":"INTEGER",
			"length":"0",
			"notNull":"true",
			"primaryKey":"true",
			"defaultValue":""
		}, {
			"name":"NAME",
			"type":"VARCHAR",
			"length":"20",
			"notNull":"false",
			"primaryKey":"false",
			"defaultValue":""
		}, {
			"name":"DATEOFBIRTH",
			"type":"DATE",
			"length":"0",
			"notNull":"false",
			"primaryKey":"false",
			"defaultValue":""
		}, {
			"name":"SALARY",
			"type":"DOUBLE",
			"length":"0",
			"notNull":"false",
			"primaryKey":"false",
			"defaultValue":""
		}
	]
}
```

The supported database types are:

*	`VARCHAR`     - for text-based fields long up to 2K characters
*	`CHAR`        - for text-based fields with fixed length of up to 255 characters
*	`INTEGER`     - 32 bit
*	`BIGINT`      - 64 bit
*	`SMALLINT`    - 16 bit
*	`REAL`        - 7 digits of mantissa
*	`DOUBLE`      - 15 digits of mantissa
*	`DATE`        - represents a date consisting of day, month, and year
*	`TIME`        - represents a time consisting of hours, minutes, and seconds
*	`TIMESTAMP`   - represents DATE,  TIME, a nanosecond field, and a time zone
*	`BLOB`        - a binary object, such as an image, audio, etc.

The activation of the table descriptor is the process of creating a database table in the target database. The activator constructs a `CREATE TABLE` SQL statement considering the dialect of the target database system. If a particular table name already exists, the activator checks whether there is a compatible change, such as adding new columns, and constructs an `ALTER TABLE` SQL statement. If the change is incompatible, the activator returns an error that has to be solved manually through the SQL console.
