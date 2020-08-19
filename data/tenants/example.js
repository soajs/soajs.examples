'use strict';

module.exports = {
	"_id": "5e2c431c9cd7c25097e12b9e",
	"type": "product",
	"code": "EXAMP",
	"name": "example",
	"description": "the example tenant",
	"oauth": {
		"secret": "this is a secret",
		"disabled": 0,
		"type": 2,
		"loginMode": "urac",
		"pin": {
			"EXAMP": {
				"enabled": false
			}
		}
	},
	"applications": [
		{
			"product": "EXAMP",
			"package": "EXAMP_BASIC",
			"appId": "5e2c431c9cd7c23aace12b9f",
			"description": "Example application for tenant",
			"_TTL": 604800000,
			"keys": [
				{
					"key": "36a4361d623e01191b0c0a885d7febe9",
					"extKeys": [
						{
							"extKey": "4ea5db4c70b6168aeede6a8a56cb4624efdb6cb2cf3c7b88cbc1f5d97080a44f18083fa195e20dcc0b42496ae268ea91c657dd9b252b72de14c862e64f8522a9dbdaa1ce0f48ba2d5ed5eff49b47d0f728bddb2080c8cbc7bde3771116192b51",
							"device": {},
							"geo": {},
							"env": "EXAMPLE",
							"label": "example",
							"expDate": null
						}
					],
					"config": {}
				}
			]
		},
		{
			"product": "IURAC",
			"package": "IURAC_IURAC",
			"appId": "5e73de2372e509319051f218",
			"description": null,
			"_TTL": 21600000,
			"keys": [
				{
					"key": "c795149392a2031cdb4ff0ae44c51c2e",
					"extKeys": [
						{
							"extKey": "4ea5db4c70b6168aeede6a8a56cb46241baafb1add8e3c320c1a54316ad27f00b5a60796fe0d98e9e4ea32434c5f5ec681d7eb95800abc01d570fa373d3ba3cdbaaf0dd872c6096f19858b279bc47cc895109b29e43d93389bafe08f5d8635be",
							"device": {},
							"geo": {},
							"env": "EXAMPLE",
							"label": "iurac",
							"expDate": null
						}
					],
					"config": {}
				}
			]
		}
	],
	"profile": {}
};