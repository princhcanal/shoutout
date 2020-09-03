import React, { useRef, Ref, useImperativeHandle, forwardRef } from 'react';
import styles from './Backdrop.module.scss';

export interface BackdropProps {
	onClick?: any;
}

export interface BackdropRef {
	backdrop: HTMLDivElement | null;
}

const Backdrop = forwardRef((props: BackdropProps, ref: Ref<BackdropRef>) => {
	const classNames = [styles.backdrop, styles.hide];
	const backdropRef = useRef<HTMLDivElement>(null);

	useImperativeHandle(
		ref,
		(): BackdropRef => ({
			backdrop: backdropRef.current,
		})
	);

	const handleClick = () => {
		if (backdropRef.current) {
			if (backdropRef.current.style.display === 'block') {
				backdropRef.current.classList.add(styles.hide);
				setTimeout(() => {
					if (backdropRef.current) {
						backdropRef.current.style.display = 'none';
					}
				}, 300);
			}
		}

		if (props.onClick) {
			props.onClick();
		}
	};

	return (
		<div
			ref={backdropRef}
			className={classNames.join(' ')}
			onClick={handleClick}
			style={{ display: 'none' }}
		></div>
	);
});

export default Backdrop;
