'use strict';
module.exports = {
	type: 'service',
	prerequisites: {
		cpu: '',
		memory: ''
	},
	serviceVersion: 1,
	serviceName: "example04",
	serviceGroup: "SOAJS Example Service",
	requestTimeout: 30,
	requestTimeoutRenewal: 5,
	servicePort: 4013,
	extKeyRequired: true,
	"oauth": true,
	"session": true,
	
	"errors": {},
	"schema": {
		"commonFields": {
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
		},
		"/buildName": {
			"_apiInfo":{
				"l": "Build Name"
			},
			"commonFields": ["firstName", "lastName"]
		},
		"/buildNameGold": {
			"_apiInfo":{
				"l": "Build Name Gold"
			},
			"commonFields": ["firstName", "lastName"]
		},
		"/testGet": {
			"_apiInfo":{
				"l": "Test Get"
			},
			"commonFields": ["firstName", "lastName"]
		}
	}
};