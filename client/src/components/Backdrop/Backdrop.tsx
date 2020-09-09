import React, {
	useRef,
	Ref,
	useImperativeHandle,
	forwardRef,
	useEffect,
} from 'react';
import styles from './Backdrop.module.scss';

export interface BackdropProps {
	onHide?: any;
	onShow?: any;
	showBackdrop: boolean;
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

	useEffect(() => {
		if (backdropRef.current) {
			if (props.showBackdrop) {
				backdropRef.current.style.display = 'block';

				setTimeout(() => {
					if (backdropRef.current) {
						backdropRef.current.classList.remove(styles.hide);
					}
					if (props.onShow) {
						props.onShow();
					}
				}, 300);
			} else {
				backdropRef.current.click();
			}
		}
	}, [props.showBackdrop]);

	const handleHide = () => {
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

		if (props.onHide) {
			props.onHide();
		}
	};

	return (
		<div
			ref={backdropRef}
			className={classNames.join(' ')}
			onClick={handleHide}
			style={{ display: 'none' }}
		></div>
	);
});

export default Backdrop;
