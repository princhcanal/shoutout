import React from 'react';
import styles from './InvalidMessage.module.scss';

import ValidationMessage from '../../ValidationMessage/ValidationMessage';

interface InvalidMessageProps {
	children: any;
	className?: string;
}

const InvalidMessage = (props: InvalidMessageProps) => {
	const classNames = [styles.invalidMessage];

	if (props.className) {
		classNames.push(...props.className.split(' '));
	}

	return (
		<ValidationMessage className={classNames.join(' ')}>
			{props.children}
		</ValidationMessage>
	);
};

export default InvalidMessage;
