var request = require('request');

const config = require('../config')

class Teams {
  static getOrgTeams(headers,params) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'GET',
				url: `https://api.github.com/orgs/${params.org_name}/teams`,
				auth : {
					user: headers.username,
					pass: headers.token
				},
				headers: {
					"Accept" : "application/vnd.github.inertia-preview+json",
					"Content-Type": 'application/json',
					'user-agent': 'node.js'
				}	
			}, function (error, response, body) {
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					if (body && typeof body === 'string'){
						try {
							body = JSON.parse(body)
						} catch (err) {
							reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
						}
					}
					resolve({ success: true, message :'Org teams return successfully!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}
	static createTeam(headers,payload,params) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'POST',
				url: `https://api.github.com/orgs/${params.org_name}/teams`,
				auth : {
					user: headers.username,
					pass: headers.token
				},
				json:true,
        json: payload,
				headers: {
					"Accept" : "application/vnd.github.inertia-preview+json",
					"Content-Type": 'application/json',
					'user-agent': 'node.js'
				}	
			}, function (error, response, body) {
				console.log(error,  body)
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					if (body && typeof body === 'string'){
						try {
							body = JSON.parse(body)
						} catch (err) {
							reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
						}
					}
					resolve({ success: true, message :'Org team created successfully!' , data: body, statusCode: 201});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authenticaion error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}

	static getUserTeams(headers,params) {
    return new Promise(async (resolve, reject) => {

			console.log(`https://api.github.com/user/teams`)


			request({
				method: 'GET',
				url: `https://api.github.com/user/teams`,
				auth : {
					user: headers.username,
					pass: headers.token
				},
				headers: {
					"Accept" : "application/vnd.github.hellcat-preview+json",
					"Content-Type": 'application/json',
					'user-agent': 'node.js'
				}	
			}, function (error, response, body) {
				console.log(error, body)
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					if (body && typeof body === 'string'){
						try {
							body = JSON.parse(body)
						} catch (err) {
							reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
						}
					}
					resolve({ success: true, message :'Get user team!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authenticaion error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}
	static listTeamMembers(headers,params) {
    return new Promise(async (resolve, reject) => {

			console.log(`https://api.github.com/teams/${params.id}/members`)


			request({
				method: 'GET',
				url: `https://api.github.com/teams/${params.id}/members`,
				auth : {
					user: headers.username,
					pass: headers.token
				},
				headers: {
					"Accept" : "application/vnd.github.hellcat-preview+json",
					"Content-Type": 'application/json',
					'user-agent': 'node.js'
				}	
			}, function (error, response, body) {
				console.log(error, body)
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					if (body && typeof body === 'string'){
						try {
							body = JSON.parse(body)
						} catch (err) {
							reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
						}
					}
					resolve({ success: true, message :'Team members return successfully!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authenticaion error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}

	static addTeamMembers(headers,params) {
    return new Promise(async (resolve, reject) => {
			console.log(`https://api.github.com/teams/${params.id}/members/${params.user}`)
			request({
				method: 'PUT',
				url: `https://api.github.com/teams/${params.id}/members/${params.user}`,
				auth : {
					user: headers.username,
					pass: headers.token
				},
				headers: {
					"Accept" : "application/vnd.github.hellcat-preview+json",
					"Content-Type": 'application/json',
					'user-agent': 'node.js'
				}	
			}, function (error, response, body) {
				console.log(error, body)
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					if (body && typeof body === 'string'){
						try {
							body = JSON.parse(body)
						} catch (err) {
							reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
						}
					}
					resolve({ success: true, message :'Team members added successfully!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authenticaion error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}
}

module.exports = Teams;
