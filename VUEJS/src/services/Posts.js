import Vue from 'vue';
import axios from 'axios';

const appURL = 'http://localhost:3000'

export default
{
	getPosts (userid)
	{

		console.log("Fetching posts...");

		return axios.get(appURL + '/posts?userid=' + userid)
			.then(response => response.data)
			.catch(error => Promise.reject(error.response));
	},
	addPost (post)
	{
		return axios.post(appURL + '/post', post)
			.then(response => response.data)
			.catch(error => Promise.reject(error.response));
	},
	removePost (postid)
	{
		return axios.delete(appURL + '/posts?postid=' + postid)
			.then(response => response.data)
			.catch(error => Promise.reject(error.response));
	}
}
