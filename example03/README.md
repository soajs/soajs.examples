# soajs.examples - Example 03

The purpose of example03 is to show you how to take advantage of multitenancy; and how to configure ACL and secure your APIs at the product, tenant and user levels


##Provision The Sample Data

If you have not provisioned the data yet (as described in example02), or you want a clean reset of the data, run the following commands:

```sh
$ cd soajs.examples/tools
$ chmod +x soajs.mongo.sh
$ ./soajs.mongo.sh
```

##Start the service

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
    },
    "soajsauth": "Basic c29hanM6czAxOXI0OGxIa2RLV0Q0RXlHN2l0SWpidHZWbVo5R1g3R3A="
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
    },
    "soajsauth": "Basic c29hanM6czAxMjlsdlY5QTBZOW5Xd1JFVjJ0NEF0NXVyQjBtQkNydmc="
}
```


---

Visit SOAJS website for a detailed explanation on how to test [example03](http://www.soajs.org/#/getStarted/example03).