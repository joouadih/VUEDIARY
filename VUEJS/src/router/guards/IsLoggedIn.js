import store from '../../store/store';

export default (to, from, next) =>
{

	if (!store.getters['auth/loggedin'])
	{
		store.dispatch('auth/logout');
		return next('/login');
	}

	return next();
}
