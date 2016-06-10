'use strict';

module.exports = {
	type: 'service',
	prerequisites: {
		cpu: '',
		memory: ''
	},
	serviceVersion: 1,
	serviceName: "example01",
	serviceGroup: "SOAJS Example Service",
	requestTimeout: 30,
	requestTimeoutRenewal: 5,
	servicePort: 4010,
	extKeyRequired: false,
	"errors": {
		"900": "firstName not found"
	},
	"schema": {
		"/testGet": {
			"_apiInfo": {
				"l": "Test Get"
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
			},
			"email": {
				"source": ['query.email'],
				"required": false,
				"validation": {
					"type": "string",
					"format": "email"
				}
			}
		},
		"/testDel": {
			"_apiInfo": {
				"l": "Test Delete"
			},
			"firstName": {
				"source": ['query.firstName'],
				"required": false,
				"validation": {
					"type": "string"
				}
			},
			"lastName": {
				"source": ['query.lastName'],
				"required": false,
				"validation": {
					"type": "string"
				}
			}
		},
		"/buildName": {
			"_apiInfo": {
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
		},
		"/testPost": {
			"_apiInfo": {
				"l": "Test Post"
			},
			"firstName": {
				"source": ['body.firstName'],
				"required": true,
				"validation": {
					"type": "string"
				}
			},
			"lastName": {
				"source": ['body.lastName'],
				"required": true,
				"validation": {
					"type": "string"
				}
			},
			"email": {
				"source": ['body.email'],
				"required": false,
				"validation": {
					"type": "string",
					"format": "email"
				}
			}
		},
		"/testPut": {
			"_apiInfo": {
				"l": "Test Put"
			},
			"firstName": {
				"source": ['body.firstName'],
				"required": true,
				"validation": {
					"type": "string"
				}
			},
			"lastName": {
				"source": ['body.lastName'],
				"required": true,
				"validation": {
					"type": "string"
				}
			},
			"email": {
				"source": ['body.email'],
				"required": false,
				"validation": {
					"type": "string",
					"format": "email"
				}
			}
		}
	}
};