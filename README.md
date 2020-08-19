# soajs.examples

We have created four ready examples for you to get started. 
You can test those examples and learn how to create a service, add some security and protect it, use the same service with different tenants and apply different access controls on your service.


##Installation
Install soajs.examples before you can run the examples.

```bash
$ npm install soajs.examples
```

at this point you need to install soajs locally check out [soajs installer](https://soajsorg.atlassian.net/wiki/x/DQB8O)

##Provision The Sample Data

For this example, you need additional database settings. We have created sample records for you to use. You need to provision these data into your database.
Just run the commands below.

```bash
$ soajs mongo custom soajs.examples/data/ --clean
```

once you import the needed data for this example, you need to start the example environment as follow
```bash
$ sudo soajs services start --env=example
```

---

You are now ready to visit each example readme and run it.

---
