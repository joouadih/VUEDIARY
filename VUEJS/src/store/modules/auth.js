import Auth from '../../services/Auth';

const state =
{
	loggedin: false,
	user: false,
	token: null
};

const getters =
{
	user ()
	{
		return state.user;
	},
	loggedin ()
	{
		return state.loggedin;
	},
	token ()
	{
		return state.token;
	},
	auth ()
	{
		return state;
	}
};

const actions =
{
	login({ commit }, credentials)
	{
		console.log(credentials);
		return Auth.login(credentials).then((data) =>
		{
			commit('setLoggedIn', true);
			commit('setUser', data.user);
			commit('setToken', data.token);
		});
	},
	register({ commit }, credentials)
	{
		return Auth.register(credentials).then((data) =>
		{

		});
	},
	authenticate({ commit }, token,user)
	{
		return Auth.authenticate(token).then((data) =>
		{
			commit('setLoggedIn', true);
		});
	},
	logout({ commit })
	{
		commit('setLoggedIn', false);
		commit('setUser', false);
		commit('clearToken', false);
	}
};

const mutations =
{
	setUser (state, user)
	{
		localStorage.setItem('user', JSON.stringify(user));
		state.user = user;
	},
	clearUser (state, user)
	{
		state.user = false;
	},
	setToken (state, token)
	{
		localStorage.setItem('token', token);
		state.token = token;
	},
	clearToken (state)
	{
		localStorage.removeItem('token')
		state.token = false;
	},
	setLoggedIn (state, status)
	{
		state.loggedin = status;
	}
};

export default
{
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
