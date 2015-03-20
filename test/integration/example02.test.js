"use strict";
var assert = require('assert');
var request = require("request");
var helper = require("../helper.js");
var ex02 = helper.requireModule('example02/index');

var tkey ="aa39b5490c4a4ed0e56d7ec1232a428f771e8bb83cfcee16de14f735d0f5da587d5968ec4f785e38570902fd24e0b522b46cb171872d1ea038e88328e7d973ff47d9392f72b2d49566209eb88eb60aed8534a965cf30072c39565bd8d72f68ac";
var Authorization ='Basic MTBkMmNiNWZjMDRjZTUxZTA2MDAwMDAxOnNoaGggdGhpcyBpcyBhIHNlY3JldA==' ;

var oAuthParams = {
    url: 'http://127.0.0.1:4000/oauth/token',
    method : "POST",    
    body: 'username=oauthuser&password=oauthpassword&grant_type=password' ,     
    json: true , 
    headers: {     
    	'accept': '*/*',
    	'content-type': 'application/x-www-form-urlencoded',
    	"Authorization":Authorization ,
        'key': tkey
    }
};
var buildNameParams={
	uri: 'http://127.0.0.1:4000/example02/buildName',
	qs: {
    	'firstName':'David',
    	'lastName':'Smith'
    },
	headers:{
		'key': tkey,
	    "Content-type":"application/json" ,
	    'Accept': "application/json"				
	}
};

describe("example02", function() {	
	before(function(done) {
		setTimeout(function() {
			done();
		}, 1000);

	});
	afterEach(function(done) {
		console.log(' ------------------------------------------------- ');
		done();
	});
	
	describe(" buildName route", function() {	
		
		it('try to access service - without token - fail', function(done) {								
			helper.requester('get', buildNameParams, function(err, body, req){
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.ok(body.errors);				
				assert.deepEqual(body.errors.details[0], {"code": 400, "message": "The access token was not found"});	
				done();
			});			
		});
		
		it('login to oauth - then redirect to service - success', function(done) {				
			
			function callback(error, response, body) {
				assert.ok(body);
				assert.ok(body.access_token);					    
				buildNameParams.qs.access_token =  body.access_token;
	    		
	    		helper.requester('get', buildNameParams, function(err, body, req){
					assert.ifError(err);
					assert.ok(body);
					assert.equal(body.result, true);
					assert.ok(body.data);
					done();
				});
			}			
			request(oAuthParams, callback);						 
		});
		
		
		it('hit service with invalid token', function(done) {						
			buildNameParams.qs.access_token =  'e58751473112bca2ed939e0445e55b0f7921f544';   					    		
    		helper.requester('get', buildNameParams, function(err, body, req){
				assert.ifError(err);
				assert.ok(body);
				assert.equal(body.result, false);
				assert.equal(body.errors.codes[0], 401);
				assert.deepEqual(body.errors.details[0], {"code": 401, "message": "The access token provided is invalid."});				
				done();
			});						 
		});
		
		
	});



});
