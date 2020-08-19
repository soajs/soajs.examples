'use strict';

module.exports = {
	_id: "5f3d2b84fa42ab5ea7448421",
	code: "EXAMPLE",
	description: "This is an example environment to deploy and run soajs.examples microservices",
	domain: "localhost",
	port: 20000,
	protocol: "http",
	deployer: {
		type: "manual",
		selected: "manual",
		manual: {
			nodes: "127.0.0.1"
		}
	},
	dbs: {
		config: {
			prefix: ""
		},
		databases: {}
	},
	services: {
		controller: {
			authorization: false,
			requestTimeout: 30,
			requestTimeoutRenewal: 0
		},
		config: {
			awareness: {
				cacheTTL: 3600000,
				healthCheckInterval: 5000,
				autoRelaodRegistry: 86400000,
				maxLogCount: 5,
				autoRegisterService: true
			},
			key: {
				algorithm: "aes256",
				password: "9e44b490-fd8e-4fcc-91a3-52379b7000b0"
			},
			logger: {
				src: false,
				level: "error",
				formatter: {
					levelInString: false,
					outputMode: "short"
				}
			},
			cors: {
				enabled: true,
				origin: "*",
				credentials: "true",
				methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
				headers: "key,soajsauth,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,__env",
				maxage: 1728000
			},
			oauth: {
				grants: [
					"password",
					"refresh_token"
				],
				debug: false,
				getUserFromToken: true,
				accessTokenLifetime: 7200,
				refreshTokenLifetime: 1209600
			},
			ports: {
				controller: 20000,
				maintenanceInc: 1000,
				randomInc: 100
			},
			cookie: {
				secret: "e3fd929e-a16d-4f2c-ad1e-f1b586d1711b"
			},
			session: {
				name: "soajsID",
				secret: "dca71b72-2a55-4b6b-9bf6-60027f3c2ba1",
				cookie: {
					path: "/",
					httpOnly: true,
					secure: false,
					maxAge: null
				},
				resave: false,
				saveUninitialized: false,
				rolling: false,
				unset: "keep"
			}
		}
	}
};