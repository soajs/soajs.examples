"use strict";

var assert = require('assert');
var request = require("request");
var helper = require("../helper.js");

var ex03 = helper.requireModule('example03/index');

var t1_app1_key ="4232477ed993d167ec13ccf8836c29c400fef7eb3d175b1f2192b82ebef6fb2d129cdd25fe23c04f856157184e11f7f57b65759191908cb5c664df136c7ad16a56a5917fdeabfc97c92a1f199e457e31f2450a810769ff1b29269bcb3f01e3d2";
var t1_app2_key ='4232477ed993d167ec13ccf8836c29c4550e88551c880d36fd42223ef81e0a6e1f668d42edc70d3d98fa8d28757e951bd7a04cf43829b5c2f38ed8c9ee87f03b79e564dd6aeaf8c37e90c92e6a69dccbd52b5a7812cad139bfbeaab69b023322';
var t1_app3_key ='4232477ed993d167ec13ccf8836c29c4c3eabd8dc5d6b29af1725af616353c2ef59ab49a11f64affc60fa73a48eda79187085b064d533fb2f2adccf3e48b41088765a3665c91a193cf13808d68194ecc2061ae81639b49c9f1a73150a3123254';

var t2_key = "2423205b6ccd825aaa3dbf7f248f807996c1f39f4e128801107a10ea55eac9686f23b883b778b1763876fe47f7cc651fea232f7aa9dae3dfd1978d4948a3f26b948ebc1b71a9d6cacf08852312866d757b22392d8d3c0e28ee47edb0e7478157";
var t2_key_2 = '2423205b6ccd825aaa3dbf7f248f8079103601b9f8b272d331285c2db7f8aa9447a018572f63fb87c962076d7697ad8b7caeeaeafc5e6c05ab5d971cc5b4e238f05af11d9b9af75685739d7e838dc81eadabb0b4867bce48f99551ed0c92e1fd';

var t3_key = '7bc1e66d003a3b2acfce1557cbda7320ec45057be0505fd7e9dec19e9fe74c194b109a48568f53449c1cc607a3cb23d70de86831a2ac4b87f1c0c5d57d19702a74ac22a64531185af11f75967f9ba54cb930149ed8a1384f924be9baa4ed5b0b';

describe("example03 - all", function() {
	before(function(done) {	
		setTimeout(function() {
			done();
		}, 1000);
	});

	
	afterEach(function(done) {
		console.log(' ----------------------------------------------------------------------------------------------- ');
		done();
	});
	
	describe("Tenant 2", function() {
		it('application 1 - success', function(done) {
			var params={
				uri: 'http://127.0.0.1:4000/example03/buildName?lastName=Smith',
				headers:{
					'key': t2_key						
				}
			};
			
			helper.requester('get', params, function(err, body, req){
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, true);
				assert.ok(body.data);
				assert.equal(body.data.fullName , 'John Smith');
				assert.equal(body.data.tenantName , 'Client Two');
				done();
			});
				
			
		});
		it('application 1 - success - no tenant name', function(done) {
			var params={
				uri: 'http://127.0.0.1:4000/example03/buildName?lastName=Smith',
				headers:{
					'key': t2_key_2						
				}
			};
			
			helper.requester('get', params, function(err, body, req){
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, true);
				assert.ok(body.data);
				assert.equal(body.data.fullName , 'John Smith');
				console.log( body.data );
				done();
			});
				
			
		});
	});
	
	describe("Tenant 3", function() {
		it('application 1 - buildName success', function(done) {
			var params={
				uri: 'http://127.0.0.1:4000/example03/buildName?lastName=Smith',
				headers:{
					'key': t3_key						
				}
			};
			
			helper.requester('get', params, function(err, body, req){
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, true);
				assert.ok(body.data);
				assert.equal(body.data.tenantName , 'Client Three');
				assert.equal(body.data.fullName , 'John Smith');
				done();
			});
				
			
		});
		
		it('application 1 - testGet fail', function(done) {
			var params={
				uri: 'http://127.0.0.1:4000/example03/testGet?lastName=Smith',
				headers:{
					'key': t3_key						
				}
			};
			
			helper.requester('get', params, function(err, body, req){
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.ok(body.errors);
				assert.equal(body.errors.details[0].message, 'System api access is restricted. api is not in provision.') ;
				assert.equal(body.errors.details[0].code, 159) ;				
				done();
			});
				
			
		});
	});
	
	

});
