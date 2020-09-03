import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { BackdropProps } from '../components/Backdrop/Backdrop';

type BackdropHandle<T> = T extends ForwardRefExoticComponent<
	BackdropProps & RefAttributes<infer T2>
>
	? T2
	: never;

export default BackdropHandle;
