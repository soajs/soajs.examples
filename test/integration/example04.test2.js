"use strict";
var assert = require('assert');
var request = require("request");
var helper = require("../helper.js");
var ex04 = helper.requireModule('example04/index');

var t1_app3_key ="4232477ed993d167ec13ccf8836c29c4c3eabd8dc5d6b29af1725af616353c2ef59ab49a11f64affc60fa73a48eda79187085b064d533fb2f2adccf3e48b41088765a3665c91a193cf13808d68194ecc2061ae81639b49c9f1a73150a3123254";

var Authorization ='Basic NTRlZTIxNTBiN2E2NjlmYzIyYjdmNmI5Ok15IHNlY3JldCBwaHJhc2U=' ;

var oAuthParams = {
    url: 'http://127.0.0.1:4000/oauth/token',
    method : "POST",    
    body: 'username=oauthuser_tenant1&password=oauthpassword_tenant1&grant_type=password' ,     
    json: true, 
    headers: {     
    	'accept': '*/*',
    	'content-type': 'application/x-www-form-urlencoded',
    	"Authorization":Authorization ,
        'key': t1_app3_key
    }
};
var buildNameParams={
	uri: 'http://127.0.0.1:4000/example04/buildName',
	qs: {
    	'firstName':'David',
    	'lastName':'Smith'
    },
	headers:{
		'key': t1_app3_key,
	    "Content-type":"application/json" ,
	    'Accept': "application/json"				
	}
};
var buildNameGold_params={
	uri: 'http://127.0.0.1:4000/example04/buildNameGold',
	qs: {
    	'firstName':'David',
    	'lastName':'Smith'
    },
	headers:{
		'key': t1_app3_key,
	    "Content-type":"application/json" ,
	    'Accept': "application/json"				
	}
};


var testGetParams={
	uri: 'http://127.0.0.1:4000/example04/testGet',
	qs: {
    	'firstName':'David',
    	'lastName':'Smith'
    },
	headers:{
		'key': t1_app3_key,
	    "Content-type":"application/json" ,
	    'Accept': "application/json"				
	}
};

var user1_loginParams={
	uri: 'http://127.0.0.1:4000/urac/login',
	body: {   	
    	"username":"user1", "password":"123456" 
    },
	headers:{
		'key':  t1_app3_key
	}
};
var user2_loginParams={
	uri: 'http://127.0.0.1:4000/urac/login',
	body: {   	
    	"username":"user2", "password":"123456" 
    },
	headers:{
		'key':  t1_app3_key
	}
};

var access_token = null;	
describe("example04 - application 3", function() {	
	before(function(done) {
		setTimeout(function() {
			done();
		}, 1000);

	});
	afterEach(function(done) {
		console.log(' ----------------------------------------------------------------------------------------------- ');
		done();
	});		
	
	describe("login to oauth - then redirect to service", function() {			
		before(function(done) {
			function callback(error, response, body) {
				assert.ifError(error);
				assert.ok(body);
				assert.ok(body.access_token);
				access_token = body.access_token;
				buildNameParams.qs.access_token =  body.access_token;
				testGetParams.qs.access_token =  body.access_token;
				buildNameGold_params.qs.access_token =  body.access_token;
				done();
			}			
			request(oAuthParams, callback);					
		});
		
		describe("user not logged in", function() { 
			it('testGet - access success', function(done) {				
				helper.requester('get', testGetParams, function(err, body, req){
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, true);
					assert.ok(body.data);													
					done();
				});									
			});			
			it('buildName - fail access', function(done) {							
				helper.requester('get', buildNameParams, function(err, body, req){
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, false);
					assert.ok(body.errors);			 
					assert.deepEqual(body.errors.details[0], {"code": 161, "message": "You need to be logged in to access this API."});
					console.log( JSON.stringify (body) ) ;
					done();
				});									
			});			
			it('buildNameGold - fail access', function(done) {							
				helper.requester('get', buildNameGold_params, function(err, body, req){
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, false);
					assert.ok(body.errors);			 
					assert.deepEqual(body.errors.details[0], {"code": 161, "message": "You need to be logged in to access this API."});					
					done();
				});									
			});
		});
		
		
		describe("login as user 1", function() { 
			before(function(done) {
				helper.requester('post', user1_loginParams, function(err, body, req){
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, true);
					assert.ok(body.soajsauth);
					console.log( JSON.stringify (body) ) ;
					buildNameParams.headers.soajsauth = body.soajsauth;						
					buildNameGold_params.headers.soajsauth = body.soajsauth;
					done();
				});					
			});
			
			it('buildName access success - but no tenant name', function(done) {						
				helper.requester('get', buildNameParams, function(err, body, req){
					assert.ifError(err);
					assert.ok(body);
					console.log(body.data);
					assert.equal(body.result, true);
					assert.ok(body.data);							
					done();
				});
									
			});
			it('buildNameGold access success', function(done) {						
				helper.requester('get', buildNameGold_params, function(err, body, req){							
					assert.ifError(err);
					assert.ok(body);						
					assert.equal(body.result, true);
					assert.ok(body.data);							
					done();
				});
									
			});
			
		});
		
		describe("login as user 2", function() {			
			before(function(done) {
				helper.requester('post', user2_loginParams, function(err, body, req){
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, true);
					assert.ok(body.soajsauth);
					console.log( JSON.stringify (body) ) ;
					buildNameGold_params.headers.soajsauth = body.soajsauth;
					buildNameParams.headers.soajsauth = body.soajsauth;
					done();
				});					
			});
						
			it('access buildName success', function(done) {
				helper.requester('get', buildNameParams, function(err, body, req){
					assert.ifError(err);
					console.log( JSON.stringify (body) ) ;
					assert.ok(body);
					assert.equal(body.result, true);
					assert.ok(body.data);					
					done();
				});								
			});
			it('buildNameGold access fail', function(done) {										
				helper.requester('get', buildNameGold_params, function(err, body, req){							
					assert.ifError(err);
					assert.ok(body);
					console.log( JSON.stringify (body) ) ;
					assert.equal(body.result, false);													
					assert.deepEqual(body.errors.details[0], {"code": 160, "message": "You do not belong to a group with access to this system API."});	
					done();
				});
				
												
			});
			
		});		
			
	}); 	
			
});
