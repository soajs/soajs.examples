"use strict";
var controller, urac, oauth;
var assert = require('assert');
var shell = require('shelljs');
var sampleData = require("soajs.mongodb.data/modules/examples");

describe("importing sample data", function() {
	it("do import", function(done) {
		shell.pushd(sampleData.dir);
		shell.exec("chmod +x " + sampleData.shell, function(code) {
			assert.equal(code, 0);
			shell.exec(sampleData.shell, function(code) {
				assert.equal(code, 0);
				shell.popd();
				done();
			});
		});
	});

	after(function(done) {
		console.log('test data imported.');
		setTimeout(function() {
			controller = require("soajs.controller");
			oauth = require("soajs.oauth");
			urac = require("soajs.urac");
			done();
		}, 1000);
	});
});