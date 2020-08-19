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
			lastName: req.soajs.inputmaskData.lastName,
			email: req.soajs.inputmaskData.email
		}));
	});
	
	service.get("/buildName", function (req, res) {
		//write your business logic here
		let fullName = req.soajs.inputmaskData.firstName + ' ' + req.soajs.inputmaskData.lastName;
		res.json(req.soajs.buildResponse(null, {
			fullName: fullName
		}));
	});
	
	service.delete("/testDel", function (req, res) {
		// some business logic
		res.json(req.soajs.buildResponse(null, true));
	});
	
	service.post("/testPost", function (req, res) {
		if (req.soajs.inputmaskData.firstName !== 'John') {
			//EXAMPLE: to simulate error response return
			res.json(req.soajs.buildResponse({"code": 900, "msg": config.errors[900]}));
		} else {
			res.json(req.soajs.buildResponse(null, {
				firstName: req.soajs.inputmaskData.firstName,
				lastName: req.soajs.inputmaskData.lastName,
				email: req.soajs.inputmaskData.email
			}));
		}
	});
	
	service.put("/testPut", function (req, res) {
		res.json(req.soajs.buildResponse(null, {
			firstName: req.soajs.inputmaskData.firstName,
			lastName: req.soajs.inputmaskData.lastName
		}));
	});
	
	service.start();
});
