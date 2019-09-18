import Vue from 'vue';
import axios from 'axios';

const appURL = 'http://localhost:3000'

export default
{
	register (data)
	{
		return axios.post(appURL + '/register', data)
			.then(response => response.data)
			.catch(error => Promise.reject(error.response));
	},
	login (data)
	{
		return axios.post(appURL + '/login', data)
			.then(response => response.data)
			.catch(error => Promise.reject(error.response));
	},
	authenticate (token)
	{

		console.log(token);

		return axios.get(appURL + '/authenticate',
    {headers:
			{
        "x-access-token" : token
      }
    })
			.then(response => response.data)
			.catch(error => Promise.reject(error.response));
	}
}
