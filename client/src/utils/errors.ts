import { Dispatch } from 'redux';

import * as ErrorActions from '../store/error/actions';
import { ErrorMessageRef } from '../components/ErrorMessage/ErrorMessage';

// ? how to type err object ?
export const showErrorMessage = (
	err: any,
	errorMessageRef: ErrorMessageRef | null,
	dispatch: Dispatch<any>
) => {
	let errorMessage = err.response.data.message;
	const errors = err.response.data.data.errors;

	if (errors && errors.length > 0) {
		errorMessage += ': ';
		errors.forEach((error: any, i: number) => {
			errorMessage += error.msg;
			if (i < errors.length - 1) {
				errorMessage += ', ';
			}
		});
	}

	if (errorMessageRef) {
		dispatch(ErrorActions.showErrorMessage(errorMessage, errorMessageRef));
	}
};
