# soajs.examples - Example 01 

The purpose of example01 is to show you how you can create a service. Example01 is a simple service that provides some APIs that use different protocols: GET - POST - PUT - DEL.
The example focuses on how to make use of IMFV. 
The service "Example01" is public and not secure, thus accessible by everyone.


##Start the service

Make sure you set the needed environment variable needed for local deployment
check out this [link](https://soajsorg.atlassian.net/wiki/x/A4AXcg)

```sh
$ cd soajs.examples/example01
$ node.
```

---

##Features
The service contains 5 apis. 


###testGet api
This api uses the GET protocol. It reads 3 input parameters from the query string and returns an object with these 3 values.
```bash
$ curl -X GET http://localhost:4000/example01/testGet?firstName=John&lastName=Smith&email=john@smith.com'
```

###buildName api
This api uses the GET protocol. It reads 2 input parameters from the query string and uses them to create the fullname field.
This api shows that you can perform any operation within your api.
```bash
$ curl -X GET http://localhost:4000/example01/testGet?firstName=John&lastName=Smith&email=john@smith.com'
```

###testPost api
This api uses the POST protocol. It reads 3 input parameters from the body and returns an object with these 3 values.
```bash
$ curl -X POST -H "Content-type:application/json" -H "Accept:application/json" "http://localhost:4000/example01/testPost" -d '{"firstName":"John","lastName":"Smith"}'
```

###testPut api
This api uses the PUT protocol. It reads 2 input parameters from the body and returns an object with these 2 values.
```bash
$ curl -X PUT -H "Content-type:application/json" -H "Accept:application/json" "http://localhost:4000/example01/testPut" -d '{"firstName":"John","lastName":"Smith"}'
```

###testDel api
This api uses the DELETE protocol. It reads 2 input parameters from the query string.
```bash
$ curl -X DELETE "http://localhost:4000/example01/testDel?firstName=John&lastName=Smith"
```
