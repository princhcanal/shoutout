import {
	AuthActionTypes,
	LOGIN,
	LOGOUT,
	SET_IS_LOGGED_IN,
	SET_USER_ID,
} from './types';

export const login = (): AuthActionTypes => {
	return {
		type: LOGIN,
	};
};

export const logout = (): AuthActionTypes => {
	return {
		type: LOGOUT,
	};
};

export const setIsLoggedIn = (isLoggedIn: boolean): AuthActionTypes => {
	return {
		type: SET_IS_LOGGED_IN,
		isLoggedIn,
	};
};

export const setUserId = (userId: string): AuthActionTypes => {
	return {
		type: SET_USER_ID,
		userId,
	};
};
