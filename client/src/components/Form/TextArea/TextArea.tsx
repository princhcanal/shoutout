import React from 'react';
import styles from './TextArea.module.scss';

import { useField } from 'formik';

import InvalidMessage from '../ValidationMessage/InvalidMessage/InvalidMessage';

interface TextAreaProps {
	name: string;
	id: string;
	label?: string;
	className?: string;
	placeholder?: string;
}

const TextArea = ({ label, ...props }: TextAreaProps) => {
	const classNames = [styles.textArea];

	if (props.className) {
		classNames.push(...props.className.split(' '));
	}

	const [field, meta] = useField(props);

	return (
		<div className={classNames.join(' ')}>
			<label htmlFor={props.id}>{label}</label>
			<textarea {...props} {...field} />
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

export default TextArea;
