import React, { useRef, Ref, useImperativeHandle, forwardRef } from 'react';
import styles from './Button.module.scss';

type ButtonTypes = 'button' | 'submit' | 'reset' | undefined;

export interface ButtonProps {
	children: any;
	onClick?: any;
	style?: string[];
	type?: ButtonTypes;
	className?: string[];
}

export interface ButtonRef {
	button: HTMLButtonElement | null;
}

const Button = forwardRef((props: ButtonProps, ref: Ref<ButtonRef>) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const classNames = [
		styles.button,
		props.style?.includes('hollow') && styles.hollow,
		props.style?.includes('hollow-red') && styles.hollowRed,
		props.style?.includes('bright') && styles.bright,
		props.style?.includes('full-width') && styles.fullWidth,
		props.className?.join(' '),
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
