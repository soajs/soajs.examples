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
		"cpu": '',
		"memory": ''
	},
	"serviceVersion": 1,
	"serviceName": "example02",
	"serviceGroup": "SOAJS Example Service",
	"servicePort": 4022,
	"requestTimeout": 30,
	"requestTimeoutRenewal": 5,
	"extKeyRequired": false,
	"oauth": true,
	
	
	"errors": {},
	"schema": {
		"get": {
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
		}
	}
};