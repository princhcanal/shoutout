import { combineReducers } from 'redux';

import { authReducer, AuthState } from './auth';

export interface StoreState {
	auth: AuthState;
}

export const rootReducer = combineReducers<StoreState>({
	auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
