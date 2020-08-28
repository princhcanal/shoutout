import React from 'react';

import styles from './Card.module.scss';

interface CardProps {
	children: any;
	className?: string;
}

const Card = (props: CardProps) => {
	const classNames = [styles.card];

	if (props.className) {
		classNames.push(...props.className.split(' '));
	}

	return <div className={classNames.join(' ')}>{props.children}</div>;
};

export default Card;
