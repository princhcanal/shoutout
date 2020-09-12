import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { FloatingCardProps } from '../../components/Card/FloatingCard/FloatingCard';

type FloatingCardHandle<T> = T extends ForwardRefExoticComponent<
	FloatingCardProps & RefAttributes<infer T2>
>
	? T2
	: never;

export default FloatingCardHandle;
