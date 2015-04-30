'use strict';
module.exports = {
	"serviceName": "example04",
	servicePort: 4013,
	extKeyRequired: true,
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