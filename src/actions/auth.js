import api from '../api';

export const userLoggedIn = (user) => ({
	type: 'USER_LOGGED_IN',
	payload: user
});

export const userLoggedOut = () => ({
  type: 'USER_LOGGED_OUT'
});

export const dispatchGetUser = (user) => ({
	type: 'USER_GET',
	payload: user
})

export const login = (data) => dispatch => {
	return api.user.login(data).then((response) => {
		var role = '';
		if(response.current_user.roles !== undefined){
			role = response.current_user.roles[1];
		}
		const user = {
			uid: response.current_user.uid,
			name: response.current_user.name,
			role: role,
			csrf_token: response.csrf_token,
			logout_token: response.logout_token
		}
		localStorage.setItem('user_uid', user.uid);
		localStorage.setItem('user_name', user.name);
		localStorage.setItem('user_csrf_token', user.csrf_token);
		localStorage.setItem('user_role', user.role);
    localStorage.setItem('user_logout_token', user.logout_token);
    document.cookie = "myuser_authenticated=true;path=/";
		dispatch(userLoggedIn(user));
	});
}


export const logout = () => dispatch => {
	return api.user.logout().then((response) => {
		localStorage.removeItem('user_uid');
		localStorage.removeItem('user_name');
		localStorage.removeItem('user_csrf_token');
		localStorage.removeItem('user_logout_token');
		localStorage.removeItem('user_role');
		document.cookie = 'myuser_authenticated=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		dispatch(userLoggedOut());
	});
}

export const getUser = (data) => dispatch => {
	return api.user.getUser(data).then((response) => {
		const user = response;
		dispatch(dispatchGetUser(user));
	});
}
