var request = require('request');

const config = require('../config')

class User {
  static getMe(token,username) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'GET',
				url: 'https://api.github.com/user',
				auth : {
					user: username,
					pass: token
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
					resolve({ success: true, message :'user data return successfully!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authenticaion error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode: response.statusCode});
				}            
			})
		});
  }
}

module.exports = User;
