import { RefObject } from 'react';

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
	ErrorActionTypes,
	SHOW_ERROR_MESSAGE,
	SET_ERROR_MESSAGE_REF,
} from './types';
import { ErrorMessageRef } from '../../components/ErrorMessage/ErrorMessage';

export const showErrorMessage = (
	errorMessage: string,
	errorMessageRef: ErrorMessageRef
): ErrorActionTypes => {
	return {
		type: SHOW_ERROR_MESSAGE,
		errorMessage,
		errorMessageRef,
	};
};

export const setErrorMessageRef = (
	errorMessageRef: ErrorMessageRef
): ErrorActionTypes => {
	return {
		type: SET_ERROR_MESSAGE_REF,
		errorMessageRef,
	};
};
