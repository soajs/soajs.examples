# soajs.examples - Example 03

The purpose of example03 is to show you how to take advantage of multitenancy; and how to configure ACL and secure your APIs at the product, tenant and user levels


##Start the service
Make sure you set the needed environment variable needed for local deployment
check out this [link](https://soajsorg.atlassian.net/wiki/x/A4AXcg)

```sh
$ cd soajs.examples/example03
$ node.
```

---

##Features
We have chosen an API from Example01 service and added them to Example03 service.
<br><br>
We want to test how different tenants can use the same service but each with different access levels.

```bash
$ curl -X GET -H "key:%some_tenant_key%" "http://127.0.0.1:4000/example03/buildName?lastName=Smith"
```

Response:
```json
{
    "result": true,
    "data": {
        "tenantName": "Client One",
        "lastName": "Smith"
    }
}
```

```bash
$ curl -X GET -H "key:%another_tenant_key%" "http://127.0.0.1:4000/example03/buildName?lastName=Thomas"
```

Response:
```json
{
    "result": true,
    "data": {
        "tenantName": "Client Two",
        "lastName": "Thomas"
    }
}
```
