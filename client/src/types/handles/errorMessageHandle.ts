import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ErrorMessageProps } from '../../components/ErrorMessage/ErrorMessage';

type ErrorMessageHandle<T> = T extends ForwardRefExoticComponent<
	ErrorMessageProps & RefAttributes<infer T2>
>
	? T2
	: never;

export default ErrorMessageHandle;
