import store from '../../store/store';
import Auth from '../../services/Auth';

export default (to, from, next) =>
{

	if (!store.state.loading.appLoading)
	{
		return next();
	}

	const token = localStorage.getItem('token');
	const user = localStorage.getItem('user');

	if (!token)
	{
		store.dispatch('loading/setAppLoading', false);
		return next();
	}

	store.commit('auth/setToken', token);
	store.commit('auth/setUser', JSON.parse(user));

	store.dispatch('loading/setLoading', true);
	store.dispatch('auth/authenticate',token)
  		.then(() =>
			{
				store.dispatch('loading/setAppLoading', false);
				store.dispatch('loading/setLoading', false);
				next();
  		})
  		.catch((error) =>
			{
				store.dispatch('loading/setAppLoading', false);
				store.dispatch('loading/setLoading', false);
				store.dispatch('auth/logout');
				next('/login');
  		})
}
