"use strict";
var controller, urac, oauth;
var assert = require('assert');
var shell = require('shelljs');
var sampleData = require("soajs.mongodb.data/modules/examples");

describe("importing sample data", function () {
	it("do import", function (done) {
		shell.pushd(sampleData.dir);
		shell.exec("chmod +x " + sampleData.shell, function (code) {
			assert.equal(code, 0);
			shell.exec(sampleData.shell, function (code) {
				assert.equal(code, 0);
				shell.popd();
				done();
			});
		});
	});
	
	after(function (done) {
		console.log('test data imported.');
		setTimeout(function () {
			controller = require("soajs.controller");
			setTimeout(function () {
				oauth = require("soajs.oauth");
				urac = require("soajs.urac");
				require("./example01.test.js");
				require("./example02.test.js");
				require("./example03.ten1.test.js");
				require("./example03.test.js");
				require("./helloworld.test.js");
				done();
			}, 1000);
		}, 1000);
	});
});