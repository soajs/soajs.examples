var controller = require("soajs.controller");
var oauth = require("soajs.oauth");
var urac = require("soajs.urac");

var shell = require('shelljs');
describe("importing sample data", function() {
	it("do import", function(done) {

		shell.pushd(__dirname + '/../../tools/');
		shell.exec('./soajs.mongo.sh', function(code, output) {
			console.log('test data imported.');
			shell.popd();
			done();
		});

	});

	after(function(done) {
		setTimeout(function() {
			done();
		}, 1000);
	});
});