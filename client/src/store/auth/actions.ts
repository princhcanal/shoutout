import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from '../../axios';

import {
	AuthActionTypes,
	LOGIN,
	LOGOUT,
	SET_IS_LOGGED_IN,
	SET_USER_ID,
	SET_USERNAME,
	SET_SUBSCRIPTION,
} from './types';
import { RootState } from '..';

export const login = (): AuthActionTypes => {
	return {
		type: LOGIN,
	};
};

export const onLogout = (): AuthActionTypes => {
	return {
		type: LOGOUT,
	};
};

export const logout = (): ThunkAction<
	void,
	RootState,
	unknown,
	Action<string>
> => {
	return async (dispatch) => {
		try {
			await axios.post('/auth/logout');
			dispatch(onLogout());
		} catch (err) {
			console.log('ERROR:', err);
		}
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

export const setUsername = (username: string): AuthActionTypes => {
	return {
		type: SET_USERNAME,
		username,
	};
};

export const setSubscription = (subscription: string): AuthActionTypes => {
	return {
		type: SET_SUBSCRIPTION,
		subscription,
	};
};
