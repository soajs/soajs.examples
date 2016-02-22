'use strict';

module.exports = {
	"serviceName": "example02",
	"serviceGroup": "Examples Group",
    servicePort: 4011,
	requestTimeout: 30,
	requestTimeoutRenewal: 5,
    extKeyRequired: false,
	"errors": {},
	"schema": {
		"/buildName": {
			"_apiInfo":{
				"l": "Build Name"
			},
			"firstName": {
				"source": ['query.firstName'],
				"required": true,
				"default": "John",
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