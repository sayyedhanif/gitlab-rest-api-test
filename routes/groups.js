const joi = require('joi');
const Groups = require('../Services/Groups')

const getGroupMembers = {
	path: '/api/v1/groups/{id}/members',
	method: 'GET',
	config: {
		description: 'Get Group Members',
		tags: ['api', 'members','group'],
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
				const data = await Groups.getGroupMembers(request.headers, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			}				
		},
	},
};


const addGroupMembers = {
	path: '/api/v1/groups/{id}/members',
	method: 'POST',
	config: {
		description: 'Add member to group',
		tags: ['api', 'member',  'group'],
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
				const data = await Projects.addGroupMembers(request.headers,request.payload, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			} 
		},
	},
};

const delGroupMembers = {
	path: '/api/v1/groups/{id}/members/{user_id}',
	method: 'DELETE',
	config: {
		description: 'Delete member from group',
		tags: ['api', 'member',  'group', 'delete'],
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
				const data = await Groups.delGroupMembers(request.headers,request.payload, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			} 
		},
	},
};


module.exports = [
	getGroupMembers,
	addGroupMembers,
	delGroupMembers
]