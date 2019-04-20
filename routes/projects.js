const joi = require('joi');
const Projects = require('../Services/Projects')

const getProjMembers = {
	path: '/api/v1/projects/{id}/members',
	method: 'GET',
	config: {
		description: 'Get Projects Members',
		tags: ['api', 'members','project'],
		validate: {
			headers: joi.object({
				"private-token": joi.string().required(),
			}).unknown(),
			params: {
				id: joi.string().required(),
			},
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers['private-token']) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}	
			try {
				const data = await Projects.getProjMembers(request.headers, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			}				
		},
	},
};

const addProjMembers = {
	path: '/api/v1/projects/{id}/members',
	method: 'POST',
	config: {
		description: 'Add member to project',
		tags: ['api', 'member',  'project'],
		validate: {
			payload: {
				user_id: joi.number().required(),
				access_level: joi.number().required(),
				expires_at: joi.string().optional(),
			},
			params: {
				id: joi.string().required(),
			},
			headers: joi.object({
				"private-token": joi.string().required(),
			}).unknown(),
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers['private-token']) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}			
			try {
				const data = await Projects.addProjMembers(request.headers,request.payload, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			} 
		},
	},
};

const delProjMembers = {
	path: '/api/v1/projects/{id}/members/{user_id}',
	method: 'DELETE',
	config: {
		description: 'Delete member from project',
		tags: ['api', 'member',  'project', 'delete'],
		validate: {
			params: {
				id: joi.string().required(),
				user_id: joi.string().required(),
			},
			headers: joi.object({
				"private-token": joi.string().required(),
			}).unknown(),
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers['private-token']) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}			
			try {
				const data = await Projects.delProjMembers(request.headers,request.payload, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			} 
		},
	},
};

const getProjReposContributors = {
	path: '/api/v1/projects/{id}/repository/contributors',
	method: 'GET',
	config: {
		description: 'Get repository contributors list',
		tags: ['api', 'repository','project'],
		validate: {
			headers: joi.object({
				"private-token": joi.string().required(),
			}).unknown(),
			params: {
				id: joi.string().required(),
			},
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers['private-token']) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}			
			try {
				const data = await Projects.getProjReposContributors(request.headers, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			} 
		},
	},
};

const getProjReposTree = {
	path: '/api/v1/projects/{id}/repository/tree',
	method: 'GET',
	config: {
		description: 'Get repository tree list',
		tags: ['api', 'repository','project'],
		validate: {
			headers: joi.object({
				"private-token": joi.string().required(),
			}).unknown(),
			params: {
				id: joi.string().required(),
			},
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers['private-token']) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}
			try {
				const data = await Projects.getProjReposTree(request.headers, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			}				
		},
	},
};


module.exports = [
	getProjMembers,
	addProjMembers,
	delProjMembers,
	getProjReposContributors,
	getProjReposTree,
]