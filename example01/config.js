'use strict';

module.exports = {
	serviceName: "example01",
	"errors": {
		"900": "firstName not found"
	},
	"schema": {
		"/testGet": {
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
					format: "email"
				}
			}
		},
		"/testDel": {
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
					"type": "string"
				}
			}
		},
		"/testPut": {
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
					"type": "string"
				}
			}
		}
	}
};