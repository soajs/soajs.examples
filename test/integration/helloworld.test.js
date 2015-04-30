"use strict";

var assert = require('assert');
var request = require("request");
var helper = require("../helper.js");
var helloworld = helper.requireModule('hello_world/index');

describe("Hello Wolrd", function() {
	before(function(done) {		
		setTimeout(function() {			
			done();
		}, 500);		
	});

	beforeEach(function(done) {
		console.log(' ------------------------------------------------- ');
		done();
	});
	
	describe("hello route", function() {
		it('fail - no params', function(done) {
			var params={
				uri: 'http://localhost:4000/helloworld/hello'
			};
			helper.requester('get', params, function(err, body, req){
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.ok(body.errors);
				assert.deepEqual(body.errors.details[0], {"code": 172, "message": "Missing required field: firstName, lastName"});								
				done();
			});
		});
		
		it('fail - missing param', function(done) {
			var params={
				uri: 'http://localhost:4000/helloworld/hello?firstName=John'
			};
			helper.requester('get', params, function(err, body, req){
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.ok(body.errors);
				assert.deepEqual(body.errors.details[0], {"code": 172, "message": "Missing required field: lastName"});								
				done();
			});
		});
		
		it('success', function(done) {
			var params={
				uri: 'http://localhost:4000/helloworld/hello?firstName=John&lastName=Smith'
			};
			helper.requester('get', params, function(err, body, req){
				assert.ifError(err);
				assert.ok(body);
				console.log(JSON.stringify(body));
				assert.equal(body.result, true);
				assert.ok(body.data);
				assert.equal(body.data, 'Hello John Smith');
				done();
			});
		});		
	});
});
