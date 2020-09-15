import { ErrorMessageRef } from '../../components/ErrorMessage/ErrorMessage';

export interface ErrorState {
	errorMessage: string;
	showError: boolean;
	errorMessageRef: ErrorMessageRef | null;
}

export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';
export const SET_ERROR_MESSAGE_REF = 'SET_ERROR_MESSAGE_REF';

export interface ShowErrorMessageAction {
	type: typeof SHOW_ERROR_MESSAGE;
	errorMessage: string;
	errorMessageRef: ErrorMessageRef;
}

export interface SetErrorMessageRef {
	type: typeof SET_ERROR_MESSAGE_REF;
	errorMessageRef: ErrorMessageRef;
}

export type ErrorActionTypes = ShowErrorMessageAction | SetErrorMessageRef;
