'use strict';

module.exports = {
	"_id": "5e2c42269cd7c2f356e12b9d",
	"code": "EXAMP",
	"name": "example",
	"description": "this is the example product",
	"scope": {
		"acl": {
			"example": {
				"urac": {
					"3": {
						"access": true,
						"apisPermission": "restricted",
						"get": [
							{
								"group": "My account guest",
								"apis": {
									"/password/forgot": {
										"access": false
									},
									"/validate/changeEmail": {
										"access": false
									}
								}
							},
							{
								"group": "Guest join",
								"apis": {
									"/validate/join": {
										"access": false
									},
									"/checkUsername": {
										"access": false
									}
								}
							},
							{
								"group": "My account",
								"apis": {
									"/user": {
										"access": true
									}
								}
							},
							{
								"group": "User administration",
								"apis": {
									"/admin/user": {
										"access": false
									},
									"/admin/users": {
										"access": false
									},
									"/admin/users/count": {
										"access": false
									}
								}
							},
							{
								"group": "Group administration",
								"apis": {
									"/admin/group": {
										"access": true
									},
									"/admin/groups": {
										"access": true
									}
								}
							},
							{
								"group": "Administration",
								"apis": {
									"/admin/all": {
										"access": true
									}
								}
							}
						],
						"put": [
							{
								"group": "My account guest",
								"apis": {
									"/password/reset": {
										"access": false
									}
								}
							},
							{
								"group": "My account",
								"apis": {
									"/account/password": {
										"access": true
									},
									"/account/email": {
										"access": true
									},
									"/account": {
										"access": true
									}
								}
							},
							{
								"group": "User administration",
								"apis": {
									"/admin/user": {
										"access": true
									},
									"/admin/user/groups": {
										"access": true
									},
									"/admin/user/pin": {
										"access": true
									},
									"/admin/user/status": {
										"access": true
									},
									"/admin/users/invite": {
										"access": true
									},
									"/admin/users/uninvite": {
										"access": true
									}
								}
							},
							{
								"group": "Group administration",
								"apis": {
									"/admin/group": {
										"access": true
									},
									"/admin/groups/environments": {
										"access": true
									},
									"/admin/groups/packages": {
										"access": true
									}
								}
							}
						],
						"post": [
							{
								"group": "Guest join",
								"apis": {
									"/join": {
										"access": false
									}
								}
							},
							{
								"group": "User administration",
								"apis": {
									"/admin/user": {
										"access": false
									},
									"/admin/users/ids": {
										"access": true
									}
								}
							},
							{
								"group": "Group administration",
								"apis": {
									"/admin/group": {
										"access": true
									}
								}
							},
							{
								"group": "Custom email",
								"apis": {
									"/email": {
										"access": true
									}
								}
							}
						],
						"delete": [
							{
								"group": "Group administration",
								"apis": {
									"/admin/group": {
										"access": true
									}
								}
							}
						]
					}
				},
				"oauth": {
					"1": {
						"access": true,
						"apisPermission": "restricted",
						"get": [
							{
								"group": "Guest",
								"apis": {
									"/authorization": {
										"access": false
									}
								}
							},
							{
								"group": "Guest Login(s)",
								"apis": {
									"/passport/login/:strategy": {
										"access": false
									},
									"/passport/validate/:strategy": {
										"access": false
									}
								}
							}
						],
						"post": [
							{
								"group": "Guest",
								"apis": {
									"/token": {
										"access": false
									}
								}
							},
							{
								"group": "Guest Login(s)",
								"apis": {
									"/openam/login": {
										"access": false
									},
									"/ldap/login": {
										"access": false
									}
								}
							},
							{
								"group": "Tokenization",
								"apis": {
									"/pin": {
										"access": true
									}
								}
							}
						],
						"delete": [
							{
								"group": "Cient Tokenization",
								"apis": {
									"/tokens/tenant/:clientId": {
										"access": true
									}
								}
							},
							{
								"group": "User Tokenization",
								"apis": {
									"/tokens/user/:userId": {
										"access": true
									}
								}
							},
							{
								"group": "Tokenization",
								"apis": {
									"/refreshToken/:token": {
										"access": true
									},
									"/accessToken/:token": {
										"access": true
									}
								}
							}
						]
					}
				}
			}
		}
	},
	"packages": [
		{
			"code": "EXAMP_BASIC",
			"name": "Example",
			"description": "The basic package for examples",
			"acl": {
				"example": {
					"urac": [
						{
							"version": "3",
							"get": [
								"My account guest",
								"Guest join",
								"My account",
								"User administration",
								"Group administration",
								"Administration"
							],
							"put": [
								"My account guest",
								"My account",
								"User administration",
								"Group administration"
							],
							"post": [
								"Guest join",
								"User administration",
								"Group administration",
								"Custom email"
							],
							"delete": [
								"Group administration"
							]
						}
					],
					"oauth": [
						{
							"version": "1",
							"get": [
								"Guest",
								"Guest Login(s)"
							],
							"post": [
								"Guest",
								"Guest Login(s)",
								"Tokenization"
							],
							"delete": [
								"Tokenization",
								"Cient Tokenization",
								"User Tokenization"
							]
						}
					]
				}
			},
			"_TTL": 21600000
		},
		{
			code: "EXAMP_3ZE08",
			name: "Example2",
			description: "this is example2 package",
			acl: {
				example: {
					example03: {
						"1": {
							access: true
						}
					}
				}
			},
			_TTL: 21600000,
			aclTypeByEnv: {
				example: "granular"
			}
		},
		{
			code: "EXAMP_4H6CQ",
			name: "Example3",
			description: "this is for example 3",
			acl: {
				example: {
					example03: {
						"1": {
							access: true,
							apisPermission: "restricted",
							get: {
								apis: {
									"/buildName": {
										group: "Example",
										access: true
									}
								}
							}
						}
					}
				}
			},
			_TTL: 21600000,
			aclTypeByEnv: {
				example: "granular"
			}
		}
	]
};