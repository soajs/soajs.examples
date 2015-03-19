# soajs.examples - Example 02 

The purpose of example02 is to show how you can secure your service using oAuth.
When securing a service with oAuth, the service becomes accessible only to logged in oAuth users. 
Every request made to the service is first validated by SOAJS oAuth Service before it gets forwarded to that service.


##Provision The Sample Data

For this example, you need additional database settings. We have created sample records for you to use. You need to provision these data into your database.
Just run the commands below.

```sh
$ cd soajs.examples/tools
$ chmod +x soajs.mongo.sh
$ ./soajs.mongo.sh
```

---

##Start the service

If you haven't already done so, read the section on oAuth to learn how to install and run the soajs.oauth service.
Then install example02.

```sh
$ cd soajs.examples/example02
$ node.
```
More information on oAuth is available on SOAJS website for [oauth](http://www.soajs.org/#/documentation/oauth).

---

##Features
We have chosen one api from Example01 service and added it to Example02 service: **buildName**

In example01 we were able to run the api directly. But now if we attempt the same, we are unable to reach the service.
We need to provide it with an oauth access_token.
```bash
$ curl -X GET http://localhost:4000/example02/buildName?firstName=John&lastName=Smith'
```

Response:
```json
{
  "result": false,
  "errors": {
    "codes": [400],
    "details": [
      {
        "code": 400,
        "message": "The access token was not found"
      }
    ]
  }
}
```

Login to oAuth first, get the token and then add it as a query parameter.
```bash
$ curl -X GET http://localhost:4000/example02/buildName?firstName=John&lastName=Smith&access_token=e58751473112bca2ed939e0445e55b0f7921f544'
```

Response:
```json
{
    "result": true,
    "data": {
        "fullName": "John Smith"
    },
    "soajsauth": "Basic c29hanM6czAxV3JjX3F2V3R4bGdWb0l5czdBNkRnM2RjbU5STGJvSm4="
}
```

---

More information is available on SOAJS website for [example02](http://www.soajs.org/#/getStarted/example02).