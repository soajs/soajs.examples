"use strict";

var assert = require('assert');
var request = require("request");
var helper = require("../helper.js");
var ex03 = helper.requireModule('example03/index');

var t1_app1_key = "4232477ed993d167ec13ccf8836c29c400fef7eb3d175b1f2192b82ebef6fb2d129cdd25fe23c04f856157184e11f7f57b65759191908cb5c664df136c7ad16a56a5917fdeabfc97c92a1f199e457e31f2450a810769ff1b29269bcb3f01e3d2";
var t1_app2_key = '4232477ed993d167ec13ccf8836c29c4550e88551c880d36fd42223ef81e0a6e1f668d42edc70d3d98fa8d28757e951bd7a04cf43829b5c2f38ed8c9ee87f03b79e564dd6aeaf8c37e90c92e6a69dccbd52b5a7812cad139bfbeaab69b023322';
var t1_app3_key = '4232477ed993d167ec13ccf8836c29c4c3eabd8dc5d6b29af1725af616353c2ef59ab49a11f64affc60fa73a48eda79187085b064d533fb2f2adccf3e48b41088765a3665c91a193cf13808d68194ecc2061ae81639b49c9f1a73150a3123254';

var AuthValue;
describe("example03 - Tenant 1", function () {
	before(function (done) {
		setTimeout(function () {
			done();
		}, 1000);
	});
	
	afterEach(function (done) {
		console.log(' ----------------------------------------------------------------------------------------------- ');
		done();
	});
	
	describe("user not logged in", function () {
		var params = {
			uri: 'http://127.0.0.1:4000/example03/buildName?lastName=Smith',
			headers: {
				'key': t1_app1_key
			}
		};
		it('application 1 - fail access', function (done) {
			helper.requester('get', params, function (err, body, req) {
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.ok(body.errors);
				assert.equal(body.errors.details[0].message, 'The access token was not found');
				done();
			});
		});
		
		it('application 2 - success', function (done) {
			params.headers.key = t1_app2_key;
			helper.requester('get', params, function (err, body, req) {
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, true);
				assert.ok(body.data);
				assert.equal(body.data.tenantName, 'Client One');
				done();
			});
		});
		it('application 2 - success testGet', function (done) {
			var paramsGet = {
				uri: 'http://127.0.0.1:4000/example03/testGet?lastName=Smith',
				headers: {
					'key': t1_app2_key
				}
			};
			helper.requester('get', paramsGet, function (err, body, req) {
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, true);
				assert.ok(body.data);
				done();
			});
		});
		
	});
	
	describe("user logged in", function () {
		var apibuildNameParams = {
			uri: 'http://127.0.0.1:4000/example03/buildName?lastName=Smith',
			headers: {
				'key': t1_app1_key,
				'soajsauth': ''
			},
			qs: {}
		};
		var apitestGetParams = {
			uri: 'http://127.0.0.1:4000/example03/testGet?lastName=Smith&firstName=John',
			headers: {
				'key': t1_app1_key,
				'soajsauth': ''
			},
			qs: {}
		};
		
		
		it("get Main Authorization token", function (done) {
			var options = {
				uri: 'http://localhost:4000/oauth/authorization',
				headers: {
					'Content-Type': 'application/json',
					'key': t1_app1_key
				},
				json: true
			};
			
			request.get(options, function (error, response, body) {
				assert.ifError(error);
				assert.ok(body);
				assert.ok(body.data);
				AuthValue = body.data;
				done();
			});
		});
		
		it("user 1 - application 1 - access fail", function (done) {
			var user1_Login = {
				uri: 'http://localhost:4000/oauth/token',
				headers: {
					'Content-Type': 'application/json',
					'key': t1_app1_key,
					Authorization: AuthValue
				},
				body: {
					"username": "user1",
					"password": "123456",
					"grant_type": "password"
				},
				json: true
			};
			
			helper.requester('post', user1_Login, function (err, body, req) {
				assert.ifError(err);
				assert.ok(body);
				assert.ok(body.access_token);
				
				apibuildNameParams.qs.access_token = body.access_token;
				helper.requester('get', apibuildNameParams, function (err, body, req) {
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, false);
					assert.ok(body.errors);
					assert.equal(body.errors.details[0].message, 'Access denied: The service is not available in your current package.');
					assert.equal(body.errors.details[0].code, 154);
					done();
				});
			});
			
			
		});
		
		var user2_loginParams = {
			uri: 'http://localhost:4000/oauth/token',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {"username": "user2", "password": "123456", "grant_type": "password"},
			json: true
		};
		
		it(" user 2 - application 1 - access success", function (done) {
			user2_loginParams.headers.key = t1_app1_key;
			user2_loginParams.headers.Authorization = AuthValue;
			
			helper.requester('post', user2_loginParams, function (err, body, req) {
				assert.ifError(err);
				assert.ok(body);
				apibuildNameParams.qs.access_token = body.access_token;
				
				helper.requester('get', apibuildNameParams, function (err, body, req) {
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, true);
					assert.ok(body.data.fullName);
					assert.equal(body.data.tenantName, "Client One");
					done();
				});
			});
		});
		
		it(" user 2 - application 2 - access success - config value specific to user", function (done) {
			user2_loginParams.headers.key = t1_app2_key;
			apibuildNameParams.headers.key = t1_app2_key;
			
			helper.requester('post', user2_loginParams, function (err, body, req) {
				assert.ifError(err);
				assert.ok(body);
				
				apibuildNameParams.qs.access_token = body.access_token;
				helper.requester('get', apibuildNameParams, function (err, body, req) {
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, true);
					assert.ok(body.data.fullName);
					assert.equal(body.data.tenantName, "Client One");
					done();
				});
			});
		});
		
		describe(" user 3 ", function () {
			var user3_loginParams = {
				uri: 'http://127.0.0.1:4000/oauth/token',
				body: {
					"username": "user3", "password": "654321", "grant_Type": "password"
				},
				headers: {
					'key': t1_app1_key
				}
			};
			it(" user 3 - application 1 - access success", function (done) {
				user3_loginParams.headers.Authorization = AuthValue;
				
				helper.requester('post', user2_loginParams, function (err, body, req) {
					assert.ifError(err);
					assert.ok(body);
					apibuildNameParams.qs.access_token = body.access_token;
					
					helper.requester('get', apibuildNameParams, function (err, body, req) {
						assert.ifError(err);
						assert.ok(body);
						assert.equal(body.result, true);
						assert.ok(body.data.fullName);
						assert.equal(body.data.tenantName, "Client One");
						done();
					});
				});
			});
			
			// before(function (done) {
			// 	user3_loginParams.headers.Authorization = AuthValue;
			// 	helper.requester('post', user3_loginParams, function (err, body, req) {
			// 		assert.ifError(err);
			// 		assert.ok(body);
			// 		apibuildNameParams.qs.access_token = body.access_token;
			// 		apitestGetParams.qs.access_token = body.access_token;
			// 		done();
			// 	});
			// });
			
			it('application 1 - buildName route - access success', function (done) {
				apibuildNameParams.headers.key = t1_app1_key;
				helper.requester('get', apibuildNameParams, function (err, body, req) {
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, true);
					assert.ok(body.data.fullName);
					assert.equal(body.data.tenantName, "Client One");
					//console.log(body.data);
					done();
				});
			});
			it('application 1 - testGet route - fail access', function (done) {
				helper.requester('get', apitestGetParams, function (err, body, req) {
					console.log(JSON.stringify(body,null,2));
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, false);
					assert.ok(body.errors);
					assert.equal(body.errors.details[0].message, 'The access token was not found');
					assert.equal(body.errors.details[0].code, 400);
					done();
				});
				
				
			});
			
		});
		
	});
	
	
});
