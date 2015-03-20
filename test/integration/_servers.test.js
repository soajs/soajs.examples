"use strict";
var controller, urac, oauth;
var shell = require('shelljs');

describe("importing sample data", function() {
	it("do import", function(done) {

		shell.pushd(__dirname + '/../../tools/');
		shell.exec('./soajs.mongo.sh', function(code, output) {
			console.log('test data imported.');
			shell.popd();
			controller = require("soajs.controller");
			oauth = require("soajs.oauth");
			urac = require("soajs.urac");
			done();
		});

	});

	after(function(done) {
		setTimeout(function() {
			done();
		}, 1000);
	});
});