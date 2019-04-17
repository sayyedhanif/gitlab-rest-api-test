var request = require('request');

const config = require('../config')

class Project {
  static getProjMembers(headers,params) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'GET',
				url: `https://gitlab.com/api/v4/projects/${params.id}/members`,
				headers: {
					"Private-Token": headers['private-token'],
				}	
			}, function (error, response, body) {
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if (body && typeof body === 'string'){
					try {
						body = JSON.parse(body)
					} catch (err) {
						reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
					}
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					
					resolve({ success: true, message :'Get projects members successfully!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authentication error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :body.message , data: {}, statusCode: response.statusCode});
				}              
			})
		});
	}
	static addProjMembers(headers,payload,params) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'POST',
				url: `https://gitlab.com/api/v4/projects/${params.id}/members`,
				json:true,
        json: payload,
				headers: {
					"Private-Token": headers['private-token'],
				}	
			}, function (error, response, body) {
				console.log(error,  body)
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if (body && typeof body === 'string'){
					try {
						body = JSON.parse(body)
					} catch (err) {
						reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
					}
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					
					resolve({ success: true, message :'Member added to project!' , data: body, statusCode: 201});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authentication error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :body.message , data: {}, statusCode: response.statusCode});
				}             
			})
		});
	}

	static getProjReposContributors(headers,params) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'GET',
				url: `https://gitlab.com/api/v4/projects/${params.id}/repository/contributors`,
				headers: {
					"Private-Token": headers['private-token'],
				}	
			}, function (error, response, body) {
				console.log(error, body)
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if (body && typeof body === 'string'){
					try {
						body = JSON.parse(body)
					} catch (err) {
						reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
					}
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					
					resolve({ success: true, message :'Get projects repository contributors successfully!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authentication error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :body.message , data: {}, statusCode: response.statusCode});
				}           
			})
		});
	}

	static getProjReposTree(headers,params) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'GET',
				url: `https://gitlab.com/api/v4/projects/${params.id}/repository/tree`,
				headers: {
					"Private-Token": headers['private-token'],
				}	
			}, function (error, response, body) {
				console.log(error, body)
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if (body && typeof body === 'string'){
					try {
						body = JSON.parse(body)
					} catch (err) {
						reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
					}
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					
					resolve({ success: true, message :'Get projects repository tree successfully!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authentication error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :body.message , data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}

	
}

module.exports = Project;
