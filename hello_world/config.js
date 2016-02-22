module.exports = {
	serviceName: "helloworld",
	serviceGroup: "Examples Group",
	servicePort: 4020,
	extKeyRequired: false,
	"errors": {

	},
	"schema": {
		"/hello": {
			"_apiInfo":{
				"l": "hello world"
			},
			"firstName": {
				"source": ['query.firstName'],
				"required": true,
				"validation": {
					"type": "string"
				}
			},
			"lastName": {
				"source": ['query.lastName'],
				"required": true,
				"validation": {
					"type": "string"
				}
			}
		}
	}
};