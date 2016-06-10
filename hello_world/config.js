module.exports = {
	type: 'service',
	prerequisites: {
		cpu: '',
		memory: ''
	},
	serviceVersion: 1,
	serviceName: "helloworld",
	serviceGroup: "SOAJS Example Service",
	requestTimeout: 30,
	requestTimeoutRenewal: 5,
	servicePort: 4020,
	extKeyRequired: false,
	"errors": {},
	"schema": {
		"/hello": {
			"_apiInfo": {
				"l": "hello world"
			},
			"firstName": {
				"source": ['query.firstName'],
				"required": true,
				"validation": {
					"type": "string"
				}
			},
			"lastName": {
				"source": ['query.lastName'],
				"required": true,
				"validation": {
					"type": "string"
				}
			}
		}
	}
};