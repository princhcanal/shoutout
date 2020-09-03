import React, { Ref, useRef, useImperativeHandle, forwardRef } from 'react';

import styles from './Card.module.scss';

export interface CardProps {
	children: any;
	className?: string;
}

export interface CardRef {
	card: HTMLDivElement | null;
}

const Card = forwardRef((props: CardProps, ref: Ref<CardRef>) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const classNames = [styles.card];

	useImperativeHandle(
		ref,
		(): CardRef => ({
			card: cardRef.current,
		})
	);

	if (props.className) {
		classNames.push(...props.className.split(' '));
	}

	return (
		<div className={classNames.join(' ')} ref={cardRef}>
			{props.children}
		</div>
	);
});

export default Card;
