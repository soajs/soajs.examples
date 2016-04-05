'use strict';

module.exports = {
	type: 'service',
	prerequisites: {
		cpu: '',
		memory: ''
	},
	serviceVersion: 1,
	serviceName: "example02",
	serviceGroup: "SOAJS Example Service",
    servicePort: 4011,
	requestTimeout: 30,
	requestTimeoutRenewal: 5,
    extKeyRequired: false,
	"oauth": true,
	"session": false,
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