import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import {
	AuthState,
	AuthActionTypes,
	LoginAction,
	LogoutAction,
	SetIsLoggedInAction,
	SetUserIdAction,
	LOGIN,
	LOGOUT,
	SET_IS_LOGGED_IN,
	SET_USER_ID,
	SetUsernameAction,
	SET_USERNAME,
	TokenPayload,
} from './types';

const initialState: AuthState = {
	isLoggedIn: false,
	userId: '',
	username: '',
	name: '',
	email: '',
};

const login = (state: AuthState, action: LoginAction): AuthState => {
	const token = Cookies.get('Authorization');

	if (!token) {
		return {
			...state,
			isLoggedIn: false,
			userId: '',
			username: '',
		};
	}

	const tokenPayload = jwtDecode<TokenPayload>(token);
	const username = tokenPayload.username;
	const userId = tokenPayload._id;
	const name = tokenPayload.name;
	const email = tokenPayload.email;

	return {
		...state,
		isLoggedIn: true,
		username,
		userId,
		name,
		email,
	};
};

const logout = (state: AuthState, action: LogoutAction): AuthState => {
	Cookies.remove('Authorization');

	return {
		...state,
		isLoggedIn: false,
		userId: '',
		username: '',
		name: '',
		email: '',
	};
};

const setIsLoggedIn = (
	state: AuthState,
	action: SetIsLoggedInAction
): AuthState => {
	return {
		...state,
		isLoggedIn: action.isLoggedIn,
	};
};

const setUserId = (state: AuthState, action: SetUserIdAction): AuthState => {
	return {
		...state,
		userId: action.userId,
	};
};

const setUsername = (
	state: AuthState,
	action: SetUsernameAction
): AuthState => {
	return {
		...state,
		username: action.username,
	};
};

export const authReducer = (
	state: AuthState = initialState,
	action: AuthActionTypes
): AuthState => {
	switch (action.type) {
		case LOGIN:
			return login(state, action);
		case LOGOUT:
			return logout(state, action);
		case SET_IS_LOGGED_IN:
			return setIsLoggedIn(state, action);
		case SET_USER_ID:
			return setUserId(state, action);
		case SET_USERNAME:
			return setUsername(state, action);
		default:
			return state;
	}
};
