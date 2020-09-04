import React, { useRef, Ref, useImperativeHandle, forwardRef } from 'react';
import styles from './Button.module.scss';

type ButtonStyles = 'hollow' | 'hollow-red';
type ButtonTypes = 'button' | 'submit' | 'reset' | undefined;

export interface ButtonProps {
	children: any;
	onClick?: any;
	style?: ButtonStyles;
	type?: ButtonTypes;
}

export interface ButtonRef {
	button: HTMLButtonElement | null;
}

const Button = forwardRef((props: ButtonProps, ref: Ref<ButtonRef>) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const classNames = [
		styles.button,
		props.style === 'hollow' && styles.hollow,
		props.style === 'hollow-red' && styles.hollowRed,
	];

	useImperativeHandle(
		ref,
		(): ButtonRef => ({
			button: buttonRef.current,
		})
	);

	return (
		<button
			className={classNames.join(' ')}
			onClick={props.onClick}
			ref={buttonRef}
			type={props.type ? props.type : undefined}
		>
			{props.children}
		</button>
	);
});

export default Button;
