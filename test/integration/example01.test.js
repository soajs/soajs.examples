"use strict";

var assert = require('assert');
var request = require("request");
var helper = require("../helper.js");
var ex01 = helper.requireModule('example01/index');

describe("example01", function () {
	before(function (done) {
		setTimeout(function () {
			done();
		}, 500);
	});

	beforeEach(function (done) {
		console.log(' ------------------------------------------------- ');
		done();
	});
	
	describe("testGet route", function () {
		it('fail - no params', function (done) {
			var params = {
				uri: 'http://localhost:4000/example01/testGet'
			};
			helper.requester('get', params, function (err, body, req) {
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.ok(body.errors);
				assert.deepEqual(body.errors.details[0], {
					"code": 172,
					"message": "Missing required field: firstName, lastName"
				});
				done();
			});
		});
		
		it('fail - missing param', function (done) {
			var params = {
				uri: 'http://localhost:4000/example01/testGet?firstName=John'
			};
			helper.requester('get', params, function (err, body, req) {
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.ok(body.errors);
				assert.deepEqual(body.errors.details[0], {"code": 172, "message": "Missing required field: lastName"});
				done();
			});
		});
		
		it('success', function (done) {
			var params = {
				uri: 'http://localhost:4000/example01/testGet',
				qs: {
					'firstName': 'John',
					'lastName': 'Smith',
					'email': 'john@smith.com'
				},
				headers: {
					"Content-type": "application/json",
					'Accept': "application/json"
				}
			};
			helper.requester('get', params, function (err, body, req) {
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, true);
				assert.ok(body.data);
				assert.ok(body.data.email);
				done();
			});
		});
	});
	
	describe("buildName route", function () {
		it('fail - no params', function (done) {
			var params = {
				uri: 'http://localhost:4000/example01/buildName'
			};
			helper.requester('get', params, function (err, body, req) {
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.ok(body.errors);
				assert.deepEqual(body.errors.details[0], {"code": 172, "message": "Missing required field: lastName"});
				done();
			});
		});
		
		it('success', function (done) {
			var params = {
				uri: 'http://localhost:4000/example01/buildName?firstName=John&lastName=Smith'
			};
			helper.requester('get', params, function (err, body, req) {
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, true);
				assert.ok(body.data);
				done();
			});
		});
		
	});
	
	describe("testDel route", function () {
		var testDelOptions = {
			url: 'http://127.0.0.1:4000/example01/testDel',
			method: "DELETE",
			json: true
		};
		it('success - no paramas', function (done) {
			testDelOptions.qs = {};
			function callback(error, response, body) {
				assert.ifError(error);
				assert.ok(body);
				assert.equal(body.result, true);
				assert.ok(body.data);
				done();
			}

			request(testDelOptions, callback);
		});
		
		it('success - with params', function (done) {
			testDelOptions.qs = {
				'firstName': 'David',
				'lastName': 'Smith'
			};
			function callback(error, response, body) {
				console.log(body);
				assert.ok(body);
				assert.equal(body.result, true);
				assert.ok(body.data);
				done();
			}

			request(testDelOptions, callback);
		});
	});
	
	describe("testPost route", function () {
		var testPostOptions = {
			url: 'http://127.0.0.1:4000/example01/testPost',
			method: "POST",
			json: true
		};
		it('fail - no params', function (done) {
			testPostOptions.body = {};
			function callback(error, response, body) {
				assert.ifError(error);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.ok(body.errors);
				assert.equal(body.errors.codes[0], '172');
				assert.deepEqual(body.errors.details[0], {
					"code": 172,
					"message": "Missing required field: firstName, lastName"
				});
				done();
			}

			request(testPostOptions, callback);
		});
		it('fail - wrong first name', function (done) {
			testPostOptions.body = {
				"firstName": "David",
				"lastName": "Smith"
			};
			function callback(error, response, body) {
				assert.ifError(error);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.ok(body.errors);
				console.log(body.errors.details);
				assert.deepEqual(body.errors.details[0], {"code": 900, "message": "firstName not found"});
				
				done();
			}

			request(testPostOptions, callback);
		});
		it('success ', function (done) {
			testPostOptions.body = {
				"firstName": "John",
				"lastName": "Smith"
			};
			function callback(error, response, body) {
				assert.ifError(error);
				assert.ok(body);
				assert.equal(body.result, true);
				assert.ok(body.data);
				done();
			}

			request(testPostOptions, callback);
		});
	});
	
	describe("testPut", function () {
		var testPutOptions = {
			url: 'http://127.0.0.1:4000/example01/testPut',
			method: "PUT",
			json: true
		};
		it('fail - no paramas', function (done) {
			testPutOptions.body = {};
			function callback(error, response, body) {
				assert.ifError(error);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.ok(body.errors);
				assert.deepEqual(body.errors.details[0], {
					"code": 172,
					"message": "Missing required field: firstName, lastName"
				});
				done();
			}

			request(testPutOptions, callback);
		});

		it('success', function (done) {
			testPutOptions.body = {
				"firstName": "John",
				"lastName": "Smith"
			};
			function callback(error, response, body) {
				assert.ifError(error);
				assert.ok(body);
				assert.equal(body.result, true);
				assert.ok(body.data);
				done();
			}

			request(testPutOptions, callback);
			
		});
	});

});
