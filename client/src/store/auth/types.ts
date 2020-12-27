export interface AuthState {
	isLoggedIn: boolean;
	userId: string;
	username: string;
	name: string;
	email: string;
	subscription: string;
	// user: User;
}

export interface TokenPayload {
	userId: string;
	username: string;
	name: string;
	email: string;
	subscription: string;
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

export interface EditProfileFormValues {
	name?: string;
	username?: string;
	email?: string;
}

export interface CreatePostFormValues {
	description: string;
	title: string;
	price: number;
	image: any;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_SUBSCRIPTION = 'SET_SUBSCRIPTION';
export const GET_SUBSCRIPTION = 'GET_SUBSCRIPTION';

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

export interface SetSubscriptionAction {
	type: typeof SET_SUBSCRIPTION;
	subscription: string;
}

export type AuthActionTypes =
	| LoginAction
	| LogoutAction
	| SetIsLoggedInAction
	| SetUserIdAction
	| SetUsernameAction
	| SetSubscriptionAction;
