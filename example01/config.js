'use strict';
/**
 * @license
 * Copyright SOAJS All Rights Reserved.
 *
 * Use of this source code is governed by an Apache license that can be
 * found in the LICENSE file at the root of this repository
 */

module.exports = {
	"type": 'service',
	"prerequisites": {
		cpu: '',
		memory: ''
	},
	"serviceVersion": 1,
	"serviceName": "example01",
	"serviceGroup": "SOAJS Example Service",
	"requestTimeout": 30,
	"requestTimeoutRenewal": 5,
	"servicePort": 4010,
	
	"extKeyRequired": false,
	"oauth": false,
	
	"errors": {
		"900": "firstName not found"
	},
	"schema": {
		"get": {
			"/testGet": {
				"_apiInfo": {
					"l": "Test Get",
					"group": "Example"
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
			"/buildName": {
				"_apiInfo": {
					"l": "Build Name",
					"group": "Example"
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
		},
		"delete": {
			"/testDel": {
				"_apiInfo": {
					"l": "Test Delete",
					"group": "Example"
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
			}
		},
		"post": {
			"/testPost": {
				"_apiInfo": {
					"l": "Test Post",
					"group": "Example"
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
		},
		"put": {
			"/testPut": {
				"_apiInfo": {
					"l": "Test Put",
					"group": "Example"
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
	}
};