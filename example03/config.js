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
	"serviceName": "example03",
	"serviceGroup": "SOAJS Example Service",
	"requestTimeout": 30,
	"requestTimeoutRenewal": 5,
	"servicePort": 4023,
	"extKeyRequired": true,
	"oauth": true,
	
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
		"get": {
			"/testGet": {
				"_apiInfo": {
					"l": "Test Get",
					"group": "Example"
				},
				"commonFields": ["firstName", "lastName"]
			},
			"/buildName": {
				"_apiInfo": {
					"l": "Build Name",
					"group": "Example"
				},
				"commonFields": ["firstName", "lastName"]
			}
		}
	}
};