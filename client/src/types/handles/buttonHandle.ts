import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ButtonProps } from '../../components/Button/Button';

type ButtonHandle<T> = T extends ForwardRefExoticComponent<
	ButtonProps & RefAttributes<infer T2>
>
	? T2
	: never;

export default ButtonHandle;
