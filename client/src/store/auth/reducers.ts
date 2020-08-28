import Cookies from 'js-cookie';

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
} from './types';

const initialState: AuthState = {
	isLoggedIn: false,
	userId: '',
};

const login = (state: AuthState, action: LoginAction): AuthState => {
	const token = Cookies.get('token');

	if (!token) {
		return {
			...state,
			isLoggedIn: false,
			userId: '',
		};
	}

	return {
		...state,
		isLoggedIn: true,
	};
};

const logout = (state: AuthState, action: LogoutAction): AuthState => {
	Cookies.remove('token');

	return {
		...state,
		isLoggedIn: false,
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
		default:
			return state;
	}
};
