"use strict";
var assert = require('assert');
var request = require("request");
var helper = require("../helper.js");
var ex04 = helper.requireModule('example04/index');

var tkey_pck1 ="4232477ed993d167ec13ccf8836c29c400fef7eb3d175b1f2192b82ebef6fb2d129cdd25fe23c04f856157184e11f7f57b65759191908cb5c664df136c7ad16a56a5917fdeabfc97c92a1f199e457e31f2450a810769ff1b29269bcb3f01e3d2";
var tkey_pck4 ="4232477ed993d167ec13ccf8836c29c4c3eabd8dc5d6b29af1725af616353c2ef59ab49a11f64affc60fa73a48eda79187085b064d533fb2f2adccf3e48b41088765a3665c91a193cf13808d68194ecc2061ae81639b49c9f1a73150a3123254";
var t1_app3_key ='4232477ed993d167ec13ccf8836c29c4c3eabd8dc5d6b29af1725af616353c2ef59ab49a11f64affc60fa73a48eda79187085b064d533fb2f2adccf3e48b41088765a3665c91a193cf13808d68194ecc2061ae81639b49c9f1a73150a3123254';


var Authorization ='Basic NTRlZTIxNTBiN2E2NjlmYzIyYjdmNmI5Ok15IHNlY3JldCBwaHJhc2U=' ;

var oAuthParams = {
    url: 'http://rest-proxy:4000/oauth/token',
    method : "POST",    
    body: 'username=oauthuser_tenant1&password=oauthpassword_tenant1&grant_type=password' ,     
    json: true, 
    headers: {     
    	'accept': '*/*',
    	'content-type': 'application/x-www-form-urlencoded',
    	"Authorization":Authorization ,
        'key': tkey_pck1
    }
};
var buildNameParams={
	uri: 'http://rest-proxy:4000/example04/buildName',
	qs: {
    	'firstName':'David',
    	'lastName':'Smith'
    },
	headers:{
		'key': tkey_pck1,
	    "Content-type":"application/json" ,
	    'Accept': "application/json"				
	}
};

var testGetParams={
	uri: 'http://rest-proxy:4000/example04/testGet',
	qs: {
    	'firstName':'David',
    	'lastName':'Smith'
    },
	headers:{
		'key': tkey_pck1,
	    "Content-type":"application/json" ,
	    'Accept': "application/json"				
	}
};
var urac_getUser_Params={
	uri: 'http://rest-proxy:4000/urac/account/getUser?username=user2',	
	qs:{},
	headers:{
		'key':  tkey_pck4
	}
};
var urac_listusers_Params={
	uri: 'http://rest-proxy:4000/urac/admin/listUsers',	
	qs:{},
	headers:{
		'key':  tkey_pck4
	}
};

var user1_loginParams={
	uri: 'http://rest-proxy:4000/urac/login',
	body: {   	
    	"username":"user1", "password":"123456" 
    },
	headers:{
		'key':  tkey_pck4
	}
};
var user2_loginParams={
	uri: 'http://rest-proxy:4000/urac/login',
	body: {   	
    	"username":"user2", "password":"123456" 
    },
	headers:{
		'key':  tkey_pck4
	}
};

var accessToken;
describe("example04", function() {	
	before(function(done) {		
		setTimeout(function() {			
			done();
		}, 1000);
		
	});
	afterEach(function(done) {
		console.log(' ----------------------------------------------------------------------------------------------- ');
		done();
	});
	
	it('try to access service - without token - fail', function(done) {								
		buildNameParams.headers.key = tkey_pck1; 
		helper.requester('get', buildNameParams, function(err, body, req){
			assert.ifError(err);
			assert.ok(body);
			console.log( (body) ) ;				
			assert.equal(body.result, false);
			assert.ok(body.errors);				
			assert.deepEqual(body.errors.details[0], {"code": 400, "message": "The access token was not found"});	
			done();
		});			
	});
	
	
	describe(" login to oauth - then redirect to service ", function() {			
		describe(" example04 api checks", function() {
			before(function(done) {
				function callback(error, response, body) {
					assert.ifError(error);
					assert.ok(body);
					assert.ok(body.access_token);	
					accessToken = body.access_token;
					buildNameParams.qs.access_token =  body.access_token;
					testGetParams.qs.access_token =  body.access_token;
					done();
				}			
				request(oAuthParams, callback);				
			});
			
			it('testGet - success', function(done) {				
				helper.requester('get', testGetParams, function(err, body, req){
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, true);
					assert.ok(body.data);
					done();
				});					 
			});
				
			it('buildName - success', function(done) {							
				helper.requester('get', buildNameParams, function(err, body, req){
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, true);
					assert.ok(body.data);
					done();
				});				
			});
			
			it('testGet - from app 3 - success', function(done) {	
				testGetParams.headers.key = t1_app3_key;
				helper.requester('get', testGetParams, function(err, body, req){
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, true);
					assert.ok(body.data);
					done();
				});					 
			});								
		});
		
		describe(" tests to urac service", function() {			
			it(' urac account getUser - should fail ', function(done) {								
				helper.requester('get', urac_getUser_Params, function(err, body, req){
					assert.ifError(err);
					console.log( (body) ) ;		
					assert.ok(body);
					assert.equal(body.result, false);
					assert.deepEqual(body.errors.details[0], {"code": 161, "message": "You need to be logged in to access this API."});						
					done();
				});				
			});
			
			describe(" login as user 1 ", function() {
				before(function(done) {
					helper.requester('post', user1_loginParams, function(err, body, req){
						assert.ifError(err);
						assert.ok(body);
						assert.equal(body.result, true);
						assert.ok(body.soajsauth);							
						urac_getUser_Params.headers.soajsauth = body.soajsauth;
						urac_listusers_Params.headers.soajsauth = body.soajsauth;
						done();						
					});							
				});			
				
				it(' try urac account getUser - success ', function(done) {								 												
					helper.requester('get', urac_getUser_Params, function(err, body, req){
						assert.ifError(err);
						assert.ok(body);
						assert.equal(body.result, true);
						assert.ok(body.data);
						done();
					});					
				});
				it(' try urac admin listusers - success ', function(done) {								 												
					helper.requester('get', urac_listusers_Params, function(err, body, req){
						assert.ifError(err);
						assert.ok(body);
						console.log( JSON.stringify (body) ) ;
						assert.equal(body.result, true);
						assert.ok(body.data);
						done();
					});										
				});				
			});
			
			describe(" login as user 2 ", function() {
				before(function(done) {
					helper.requester('post', user2_loginParams, function(err, body, req){
						assert.ifError(err);
						assert.ok(body);
						assert.equal(body.result, true);
						assert.ok(body.soajsauth);						
						urac_getUser_Params.headers.soajsauth = body.soajsauth;
						urac_listusers_Params.headers.soajsauth = body.soajsauth;
						done();						
					});							
				});
				
				it(' try urac account getUser - success ', function(done) {								 												
					helper.requester('get', urac_getUser_Params, function(err, body, req){
						assert.ifError(err);
						assert.ok(body);
						assert.equal(body.result, true);
						assert.ok(body.data);
						done();
					});							
				});
				it(' try urac admin listusers - should fail ', function(done) {								 												
					helper.requester('get', urac_listusers_Params, function(err, body, req){
						assert.ifError(err);
						assert.ok(body);
						assert.equal(body.result, false);
						console.log( JSON.stringify (body) ) ;
						assert.deepEqual(body.errors.details[0], {"code": 160, "message": "You do not belong to a group with access to this system API."});							
						done();
					});										
				});
												
			});
			
		});
		
	}); 	
			
});
