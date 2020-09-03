import React from 'react';
import styles from './Input.module.scss';

import { useField } from 'formik';

import InvalidMessage from '../ValidationMessage/InvalidMessage/InvalidMessage';

type InputType = 'text' | 'email' | 'password' | 'number' | 'file';

interface InputProps {
	type: InputType;
	name: string;
	id?: string;
	label?: string;
	className?: string;
	placeholder?: string;
	onChange?: any;
	accept?: string;
}

const Input = ({ label, onChange, ...props }: InputProps) => {
	const classNames = [styles.input];

	if (props.className) {
		classNames.push(...props.className.split(' '));
	}

	const [field, meta] = useField(props);

	return (
		<div className={classNames.join(' ')}>
			<label
				htmlFor={props.name}
				className={props.type === 'file' ? styles.fileInputLabel : ''}
			>
				{label}
			</label>
			{props.type === 'file' ? (
				<input
					{...props}
					onChange={onChange}
					className={styles.fileInput}
				/>
			) : (
				<input {...props} {...field} />
			)}
			{meta.touched && meta.error ? (
				<InvalidMessage className={styles.invalidMessage}>
					{meta.error}
				</InvalidMessage>
			) : (
				''
			)}
		</div>
	);
};

export default Input;
