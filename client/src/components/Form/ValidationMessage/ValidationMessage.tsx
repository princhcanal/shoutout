import React from 'react';
import styles from './ValidationMessage.module.scss';

interface ValidationMessageProps {
	children: any;
	className?: string;
}

const ValidationMessage = (props: ValidationMessageProps) => {
	const classNames = [styles.validationMessage];

	if (props.className) {
		classNames.push(...props.className.split(' '));
	}

	return <div className={classNames.join(' ')}>{props.children}</div>;
};

export default ValidationMessage;
