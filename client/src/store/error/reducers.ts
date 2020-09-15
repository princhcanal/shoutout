import {
	ErrorState,
	ErrorActionTypes,
	ShowErrorMessageAction,
	SHOW_ERROR_MESSAGE,
	SetErrorMessageRef,
	SET_ERROR_MESSAGE_REF,
} from './types';
import errorMessageStyles from '../../components/ErrorMessage/ErrorMessage.module.scss';

const initialState: ErrorState = {
	errorMessage: '',
	showError: false,
	errorMessageRef: null,
};

const showErrorMessage = (
	state: ErrorState,
	action: ShowErrorMessageAction
): ErrorState => {
	const errorMessageRef = action.errorMessageRef.errorMessage;

	if (errorMessageRef) {
		errorMessageRef.classList.remove(errorMessageStyles.show);

		setTimeout(() => {
			errorMessageRef.classList.add(errorMessageStyles.show);
		}, 100);
	}

	return {
		...state,
		showError: true,
		errorMessage: action.errorMessage,
	};
};

const setErrorMessageRef = (
	state: ErrorState,
	action: SetErrorMessageRef
): ErrorState => {
	return {
		...state,
		errorMessageRef: action.errorMessageRef,
	};
};

export const errorReducer = (
	state: ErrorState = initialState,
	action: ErrorActionTypes
): ErrorState => {
	switch (action.type) {
		case SHOW_ERROR_MESSAGE:
			return showErrorMessage(state, action);
		case SET_ERROR_MESSAGE_REF:
			return setErrorMessageRef(state, action);
		default:
			return state;
	}
};
