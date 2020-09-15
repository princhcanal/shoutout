import { combineReducers } from 'redux';

import { authReducer, AuthState } from './auth';
import { errorReducer, ErrorState } from './error';

export interface StoreState {
	auth: AuthState;
	error: ErrorState;
}

export const rootReducer = combineReducers<StoreState>({
	auth: authReducer,
	error: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
