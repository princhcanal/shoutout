export interface AuthState {
	isLoggedIn: boolean;
	userId: string;
	username: string;
}

export interface TokenPayload {
	_id: string;
	username: string;
	iat: number;
	exp: number;
}

export interface LoginFormValues {
	email: string;
	password: string;
}

export interface RegisterFormValues {
	email: string;
	password: string;
	username: string;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USERNAME = 'SET_USERNAME';

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

export interface SetUsernameAction {
	type: typeof SET_USERNAME;
	username: string;
}

export type AuthActionTypes =
	| LoginAction
	| LogoutAction
	| SetIsLoggedInAction
	| SetUserIdAction
	| SetUsernameAction;
