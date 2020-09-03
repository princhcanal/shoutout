import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { CardProps } from '../components/Card/Card';

type CardHandle<T> = T extends ForwardRefExoticComponent<
	CardProps & RefAttributes<infer T2>
>
	? T2
	: never;

export default CardHandle;
