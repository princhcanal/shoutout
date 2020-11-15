import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { EditPostFormProps } from '../../components/Form/EditPostForm/EditPostForm';

type EditPostFormHandle<T> = T extends ForwardRefExoticComponent<
	EditPostFormProps & RefAttributes<infer T2>
>
	? T2
	: never;

export default EditPostFormHandle;
