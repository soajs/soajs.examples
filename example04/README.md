# soajs.examples - Example 04

The purpose of example04 is show you that you can use oAuth together with multitenancy. Everything is similar to Example03 with few exceptions.

##Provision The Sample Data

If you have not provisioned the data yet (as described in example02), or you want a clean reset of the data, run the following commands:

```sh
$ cd soajs.examples/tools
$ chmod +x soajs.mongo.sh
$ ./soajs.mongo.sh
```

##Start the service

```sh
$ cd soajs.examples/example04
$ node.
```

---

##Features
We have copied the same API from Example03 service and we added oauth security to it.

```bash
$ curl -X GET -H "key:%some_tenant_key%" "http://127.0.0.1:4000/example04/buildName?lastName=Smith"
```

Response:
```json
{
    "result": false,
    "errors": {
        "codes": [
            400
        ],
        "details": [
            {
                "code": 400,
                "message": "The access token was not found"
            }
        ]
    },
    "soajsauth": "Basic c29hanM6czAxVnJ3MXptUWViM2tHekVwSzZoVG1BTENuTlRYUGVXMmI="
}
```
The above call did not go through although we provided the correct tenant key, we need to login to oAuth, get the token and add it to the service call.

```bash
$ curl -X POST -H "key:%some_tenant_key%" -H "Authorization: Basic NTRlZTIxNTBiN2E2NjlmYzIyYjdmNmI5Ok15IHNlY3JldCBwaHJhc2U=" "http://localhost:4000/oauth/token" -d 'username=oauthuser_tenant1&password=oauthpassword_tenant1&grant_type=password'
```

Response:
```json
{
    "token_type": "bearer",
    "access_token": "e59104df7256d2d0a77771303ea81fd68ed39e45",
    "expires_in": 3600,
    "refresh_token": "edc6e671375dd000d79c2ecc589569469b4d4b9d",
    "soajsauth": "Basic c29hanM6czAxNG11UTF1cjltZ0cwR05IQ1V5cWUxaWJtakwxb0lqaTA="
}
```

We got the token, now let's call the service again and provide the token:

```bash
$ curl -X GET -H "key:%some_tenant_key%" "http://127.0.0.1:4000/example04/buildName?lastName=Smith&access_token=e59104df7256d2d0a77771303ea81fd68ed39e45"
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

---

Visit SOAJS website for a detailed explanation on how to test [example04](http://www.soajs.org/#/getStarted/example04).