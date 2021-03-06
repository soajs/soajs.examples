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

service.init(function() {
	service.get("/hello", function(req, res) {
		let name = req.soajs.inputmaskData.firstName + " " + req.soajs.inputmaskData.lastName;
		res.json(req.soajs.buildResponse(null, "Hello " + name));
	});
	service.start();
});