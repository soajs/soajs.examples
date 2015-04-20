'use strict';

module.exports = {
	"serviceName": "example02",
    servicePort: 4011,
    extKeyRequired: true,
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