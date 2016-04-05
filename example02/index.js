'use strict';
var soajs = require('soajs');
var config = require('./config.js');

var service = new soajs.server.service(config);

service.init(function () {
    service.get("/buildName", function (req, res) {
        var fullName = req.soajs.inputmaskData.firstName + ' ' + req.soajs.inputmaskData.lastName;
        res.json(req.soajs.buildResponse(null, {
            fullName: fullName
        }));
    });
    service.start();
});