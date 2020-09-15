import React, { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import styles from './ErrorMessage.module.scss';

export interface ErrorMessageProps {
	children: any;
}

export interface ErrorMessageRef {
	errorMessage: HTMLDivElement | null;
}

const ErrorMessage = forwardRef(
	(props: ErrorMessageProps, ref: Ref<ErrorMessageRef>) => {
		const errorMessageRef = useRef<HTMLDivElement>(null);

		useImperativeHandle(
			ref,
			(): ErrorMessageRef => ({
				errorMessage: errorMessageRef.current,
			})
		);

		return (
			<div className={styles.errorMessage} ref={errorMessageRef}>
				{props.children}
			</div>
		);
	}
);

export default ErrorMessage;
