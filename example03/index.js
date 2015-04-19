'use strict';
var soajs = require('soajs');
var config = require('./config.js');

var service = new soajs.server.service({
	"config": config,
	"session": true,
	"security": true,
	"multitenant": true,
	"acl": true
});

service.init(function () {
    service.get("/testGet", function (req, res) {
        res.json(req.soajs.buildResponse(null, {
            firstName: req.soajs.inputmaskData.firstName,
            lastName: req.soajs.inputmaskData.lastName
        }));
    });

    service.get("/buildName", function (req, res) {
        var tenant = '';
        if ((req.soajs.servicesConfig.example03) && (req.soajs.servicesConfig.example03.tenantName)) {
            tenant = req.soajs.servicesConfig.example03.tenantName;
        }
        var name = req.soajs.inputmaskData.firstName + ' ' + req.soajs.inputmaskData.lastName;
        res.json(req.soajs.buildResponse(null, {
            tenantName: tenant,
            fullName: name
        }));
    });

    service.start();
});