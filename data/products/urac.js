'use strict';

let doc = {
	_id: "5e398cd379a7190c2670722a",
	code: "IURAC",
	name: "URAC integration",
	description: "This product is to be able to access URAC users and groups in other environments from Tenant Users UI",
	scope: {
		acl: {
			dev: {
				urac: {
					"3": {
						access: true,
						apisPermission: "restricted",
						get: [
							{
								group: "Administration",
								apis: {
									"/admin/all": {
										access: true
									}
								}
							},
							{
								group: "User administration",
								apis: {
									"/admin/users": {
										access: true
									}
								}
							},
							{
								group: "Group administration",
								apis: {
									"/admin/groups": {
										access: true
									}
								}
							}
						],
						post: [
							{
								group: "User administration",
								apis: {
									"/admin/user": {
										access: true
									}
								}
							},
							{
								group: "Group administration",
								apis: {
									"/admin/group": {
										access: true
									}
								}
							}
						],
						put: [
							{
								group: "User administration",
								apis: {
									"/admin/user/status": {
										access: true
									},
									"/admin/user": {
										access: true
									}
								}
							},
							{
								group: "Group administration",
								apis: {
									"/admin/group": {
										access: true
									},
									"/admin/groups/environments": {
										access: true
									}
								}
							}
						],
						delete: [
							{
								group: "Group administration",
								apis: {
									"/admin/group": {
										access: true
									}
								}
							}
						]
					}
				}
			},
			example: {
				urac: {
					"3": {
						access: true,
						apisPermission: "restricted",
						get: [
							{
								group: "Administration",
								apis: {
									"/admin/all": {
										access: true
									}
								}
							},
							{
								group: "User administration",
								apis: {
									"/admin/users": {
										access: true
									}
								}
							},
							{
								group: "Group administration",
								apis: {
									"/admin/groups": {
										access: true
									}
								}
							}
						],
						post: [
							{
								group: "User administration",
								apis: {
									"/admin/user": {
										access: true
									}
								}
							},
							{
								group: "Group administration",
								apis: {
									"/admin/group": {
										access: true
									}
								}
							}
						],
						put: [
							{
								group: "User administration",
								apis: {
									"/admin/user/status": {
										access: true
									},
									"/admin/user": {
										access: true
									}
								}
							},
							{
								group: "Group administration",
								apis: {
									"/admin/group": {
										access: true
									},
									"/admin/groups/environments": {
										access: true
									}
								}
							}
						],
						delete: [
							{
								group: "Group administration",
								apis: {
									"/admin/group": {
										access: true
									}
								}
							}
						]
					}
				}
			}
		}
	},
	packages: [
		{
			code: "IURAC_IURAC",
			name: "URAC integration",
			description: "this package has access to the needed APIs for tenant users to work correctly",
			acl: {
				dev: {
					urac: [
						{
							version: "3",
							get: [
								"Administration",
								"User administration",
								"Group administration"
							],
							post: [
								"User administration",
								"Group administration"
							],
							put: [
								"User administration",
								"Group administration"
							],
							delete: [
								"Group administration"
							]
						}
					]
				},
				example: {
					urac: [
						{
							version: "3"
						}
					]
				}
			},
			_TTL: 21600000
		}
	]
};

module.exports = doc;