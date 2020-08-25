import React from 'react';

import styles from './Card.module.scss';

interface CardProps {
	children: any;
	classNames?: string[];
}

const Card = (props: CardProps) => {
	const classNames = [styles.card];

	if (props.classNames) {
		classNames.push(...props.classNames);
	}

	return <div className={classNames.join(' ')}>{props.children}</div>;
};

export default Card;
