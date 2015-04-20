"use strict";
var controller, urac, oauth;
var assert = require('assert');
var shell = require('shelljs');
var sampleData = require("soajs.mongodb.data/modules/examples");
var async = require("async");

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
		process.argv[2] = "127.0.0.1";
		console.log('test data imported.');
		controller = require("soajs.controller");
		async.series([
			function(cb) {
				require("./example01.test.js");
				cb();
			},
			function(cb) {
				require("./example02.test.js");
				cb();
			},
			function(cb) {
				require("./example03.ten1.test.js");
				cb();
			},
			function(cb) {
				require("./example03.test.js");
				cb();
			},
			function(cb) {
				require("./example04.test.js");
				cb();
			},
			function(cb) {
				require("./example04.test2.js");
				cb();
			},
			function(cb) {
				oauth = require("soajs.oauth");
				cb();
			},
			function(cb) {
				urac = require("soajs.urac");
				cb();
			}
		], function(err) {
			assert.ifError(err);
			setTimeout(function() {
				console.log("services started");
				done();
			}, 5000);
		});
	});
});