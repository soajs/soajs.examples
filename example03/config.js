'use strict';

module.exports = {
	"serviceName": "example03",
    servicePort: 4012,
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
		"/testGet": {
			"commonFields": ["firstName", "lastName"]			
		},
		"/buildName": {
			"commonFields": ["firstName", "lastName"]
		}
	}
};