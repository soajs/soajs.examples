'use strict';
var soajs = require('soajs');
var config = require('./config.js');
var service = new soajs.server.service({
	"config": config,
	"oauth": true,
	"session": true,
	"security": true,
	"multitenant": true,
	"acl": true
});

service.get("/testGet", function (req, res) {
	res.json(req.soajs.buildResponse(null,{
		firstName:req.soajs.inputmaskData.firstName,
		lastName:req.soajs.inputmaskData.lastName
	}));
});

service.get("/buildName", function(req, res) {
	var tenant = '';
	if((req.soajs.servicesConfig.example04) && (req.soajs.servicesConfig.example04.tenantName)) {
		tenant = req.soajs.servicesConfig.example04.tenantName ;		
	}
	else{
		// if it is an important configuration, and it is missing, return an error
	}
	var name = req.soajs.inputmaskData.firstName + ' ' + req.soajs.inputmaskData.lastName;
	res.json(req.soajs.buildResponse(null, {
		tenantName: tenant,
		fullName: name
	}));
});

service.get("/buildNameGold", function (req, res) {	
	var name = req.soajs.inputmaskData.firstName +' ' + req.soajs.inputmaskData.lastName ;
	res.json(req.soajs.buildResponse(null,{
		fullName:name
	}));
});

service.start();