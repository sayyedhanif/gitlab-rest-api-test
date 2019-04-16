const joi = require('joi');
const Teams = require('../Services/Teams')

const getOrgTeams = {
	path: '/api/v1/organisation/{org_name}/teams',
	method: 'GET',
	config: {
		description: 'Get Organisation Teams',
		tags: ['api', 'teams'],
		validate: {
			headers: joi.object({
				"token": joi.string().required(),
				"username": joi.string().required(),
				}).unknown(),
			params: {
				org_name: joi.string().required(),
			},
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers.token) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}	
			try {
				const data = await Teams.getOrgTeams(request.headers, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			}				
		},
	},
};

const createTeam = {
	path: '/api/v1/organisation/{org_name}/teams',
	method: 'POST',
	config: {
		description: 'Create Team',
		tags: ['api', 'team'],
		validate: {
			payload: {
				name: joi.string().required(),
				description: joi.string().optional(),
				privacy: joi.string().optional(),
				parent_team_id: joi.number().optional(),
				permission: joi.string().optional(),
			},
			params: {
				org_name: joi.string().required(),
			},
			headers: joi.object({
				"token": joi.string().required(),
				"username": joi.string().required(),
			}).unknown(),
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers.token) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}			
			try {
				const data = await Teams.createTeam(request.headers,request.payload, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			} 
		},
	},
};

const getUserTeams = {
	path: '/api/v1/user/teams',
	method: 'GET',
	config: {
		description: 'Get User Teams',
		tags: ['api', 'teams'],
		validate: {
			headers: joi.object({
				"token": joi.string().required(),
				"username": joi.string().required(),
				}).unknown(),
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers.token) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}	
			try {
				const data = await Teams.getUserTeams(request.headers, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			}				
		},
	},
};

const listTeamMembers = {
	path: '/api/v1/teams/{id}/members',
	method: 'GET',
	config: {
		description: 'Get Team Members',
		tags: ['api', 'team', 'members'],
		validate: {
			headers: joi.object({
				"token": joi.string().required(),
				"username": joi.string().required(),
				}).unknown(),
			params: {
				id: joi.string().required(),
			},
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers.token) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}	
			try {
				const data = await Teams.listTeamMembers(request.headers, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			}				
		},
	},
};

const addTeamMembers = {
	path: '/api/v1/teams/{id}/members/{user}',
	method: 'PUT',
	config: {
		description: 'Add Team Members',
		tags: ['api', 'team', 'members'],
		validate: {
			headers: joi.object({
				"token": joi.string().required(),
				"username": joi.string().required(),
				}).unknown(),
			params: {
				id: joi.string().required(),
				user: joi.string().required(),
			},
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers.token) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}	
			try {
				const data = await Teams.addTeamMembers(request.headers, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			}				
		},
	},
};

module.exports = [
	getOrgTeams,
	createTeam,
	getUserTeams,
	listTeamMembers,
	addTeamMembers
]