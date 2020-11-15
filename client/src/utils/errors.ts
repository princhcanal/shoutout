import { Dispatch } from 'redux';

import * as ErrorActions from '../store/error/actions';
import { ErrorMessageRef } from '../components/ErrorMessage/ErrorMessage';

// ? how to type err object ?
export const showErrorMessage = (
	err: any,
	errorMessageRef: ErrorMessageRef | null,
	dispatch: Dispatch<any>
) => {
	let errorMessage =
		'Something went wrong. Sorry for the inconvenience. Please try again later.';

	if (err.response.data.message) {
		errorMessage = err.response.data.message;
	}

	if (err.response.data.data && err.response.data.data.errors) {
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
	}

	if (err.response.status >= 500) {
		errorMessage =
			"There's an error on our side. Sorry for the inconvenience. Please try again later.";
	}

	if (errorMessageRef) {
		dispatch(ErrorActions.showErrorMessage(errorMessage, errorMessageRef));
	}
};
