---
title: Client
---

Etcd Client
===

The Etcd Client is giving an access to an [etcd](https://etcd.io/) key-value storage.

=== "Overview"
- Module: `etcd/client`
- Definition: [https://github.com/eclipse/dirigible/issues/675](https://github.com/eclipse/dirigible/issues/675)
- Source: [/etcd/client.js](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/etcd/client.ts)
- Facade: [EtcdFacade](https://github.com/eclipse/dirigible/blob/master/components/api/api-etcd/src/main/java/org/eclipse/dirigible/components/api/etcd/EtcdFacade.java)
- Status: `beta`
- Group: `ext`


### Basic Usage

=== "ECMA6"

    ```javascript
    // Load the etcd client module.
    import { etcd } from "sdk/etcd";

    // Initialize the etcd client.
    let etcdClient = etcd.getClient();

    // Put key-value pair where the value is a string.
    etcdClient.putStringValue("foo", "bar");

    // Get key-value pair where value will be returned as a string.
    etcdClient.getKvsStringValue("foo"); // => { "foo": "bar" }

    // Put key-value pair where the value is a byte array.
    etcdClient.putByteArrayValue("foo", [98, 97, 114]);

    // Get key-value pair where value will be returned as a byte array.
    etcdClient.getKvsByteArrayValue("foo"); // => { "foo": [98, 97, 114] }

    // Delete key-value pair.
    etcdClient.delete("foo");
    ```
    
<!-- === "CommonJS"

    ```javascript
    // Load the etcd client module.
    const etcd = require("etcd/client");

    // Initialize the etcd client.
    let etcdClient = etcd.getClient();

    // Put key-value pair where the value is a string.
    etcdClient.putStringValue("foo", "bar");

    // Get key-value pair where value will be returned as a string.
    etcdClient.getKvsStringValue("foo"); // => { "foo": "bar" }

    // Put key-value pair where the value is a byte array.
    etcdClient.putByteArrayValue("foo", [98, 97, 114]);

    // Get key-value pair where value will be returned as a byte array.
    etcdClient.getKvsByteArrayValue("foo"); // => { "foo": [98, 97, 114] }

    // Delete key-value pair.
    etcdClient.delete("foo");
    ``` -->


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getClient()**   | Returns an object representing an Etcd Client | *Client*

### Objects

---

#### Client

Function     | Description | Returns
------------ | ----------- | --------
**putStringValue(key, value)**   | Puts a key-value pair to the etcd storage where the value should be a string | *-*
**putByteArrayValue(key, value)**   | Puts a key-value pair to the etcd storage where the value should be a byte array | *-*
**getHeader(key)**   | Returns an object representing an Etcd Header | *Header*
**getKvsStringValue(key)**   | Returns a key-value object with string value | *js object*
**getKvsByteArrayValue(key)**   | Returns a key-value object with byte array value | *js object*
**getCount(key)**   | Returns the number of keys if the get method is for range | *integer*
**delete(key)**   | Deletes a key-value pair | *-*

#### Header

Function     | Description | Returns
------------ | ----------- | --------
**getRevision()**   | Returns the revision of the header | *integer*
**getClusterId()**   | Returns the cluster id of the header | *integer*
**getMemberId()**   | Returns the member id of the header | *integer*
**getRaftTerm()**   | Returns the raft term of the header | *integer*
 
