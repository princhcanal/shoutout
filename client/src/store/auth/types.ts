export interface AuthState {
	isLoggedIn: boolean;
	userId: string;
}

export interface TokenPayload {
	_id: string;
	iat: number;
	exp: number;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_USER_ID = 'SET_USER_ID';

export interface LoginAction {
	type: typeof LOGIN;
}

export interface LogoutAction {
	type: typeof LOGOUT;
}

export interface SetIsLoggedInAction {
	type: typeof SET_IS_LOGGED_IN;
	isLoggedIn: boolean;
}

export interface SetUserIdAction {
	type: typeof SET_USER_ID;
	userId: string;
}

export type AuthActionTypes =
	| LoginAction
	| LogoutAction
	| SetIsLoggedInAction
	| SetUserIdAction;
