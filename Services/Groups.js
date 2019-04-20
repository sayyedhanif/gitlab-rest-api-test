var request = require('request');

const config = require('../config')

class Teams {
  static getGroupMembers(headers,params) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'GET',
				url: `https://gitlab.com/api/v4/groups/${params.id}/members`,
				headers: {
					"Private-Token": headers['private-token'],
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
					resolve({ success: true, message :'Group members fetched successfully!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}
	static addGroupMembers(headers,payload,params) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'POST',
				url: `https://gitlab.com/api/v4/groups/${params.id}/members`,
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
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					if (body && typeof body === 'string'){
						try {
							body = JSON.parse(body)
						} catch (err) {
							reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
						}
					}
					resolve({ success: true, message :'Member added to group!' , data: body, statusCode: 201});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authenticaion error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}

	static delGroupMembers(headers,payload,params) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'DELETE',
				url: `https://gitlab.com/api/v4/groups/${params.id}/members/${params.user_id}`,
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
					
					resolve({ success: true, message :'Member deleted from group!' , data: {}, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authentication error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :body.message , data: {}, statusCode: response.statusCode});
				}             
			})
		});
	}
}

module.exports = Teams;
