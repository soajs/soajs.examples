'use strict';
/**
 * @license
 * Copyright SOAJS All Rights Reserved.
 *
 * Use of this source code is governed by an Apache license that can be
 * found in the LICENSE file at the root of this repository
 */

const soajs = require('soajs');
const config = require('./config.js');

let service = new soajs.server.service(config);

service.init(function () {
	service.get("/testGet", function (req, res) {
		res.json(req.soajs.buildResponse(null, {
			firstName: req.soajs.inputmaskData.firstName,
			lastName: req.soajs.inputmaskData.lastName
		}));
	});
	
	service.get("/buildName", function (req, res) {
		let tenant = '';
		if (req.soajs.servicesConfig) {
			if (req.soajs.servicesConfig.example03) {
				if (req.soajs.servicesConfig.example03.tenantName) {
					tenant = req.soajs.servicesConfig.example03.tenantName;
				}
			}
		}
		let name = req.soajs.inputmaskData.firstName + ' ' + req.soajs.inputmaskData.lastName;
		res.json(req.soajs.buildResponse(null, {
			tenantName: tenant,
			fullName: name
		}));
	});
	
	service.start();
});