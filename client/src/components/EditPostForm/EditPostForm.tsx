import React, { useState, forwardRef, useImperativeHandle, Ref } from 'react';
import styles from './EditPostForm.module.scss';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import FloatingCard from '../Card/FloatingCard/FloatingCard';
import Input from '../Form/Input/Input';
import TextArea from '../Form/TextArea/TextArea';
import Button from '../Button/Button';
import { CreatePostFormValues } from '../../store/auth';
import { showErrorMessage } from '../../utils/errors';
import { ErrorMessageRef } from '../ErrorMessage/ErrorMessage';

export interface EditPostFormProps {
	className?: string;
	initialValues: CreatePostFormValues;
	postId: string;
}

export interface EditPostFormRef {
	setShowCard: any;
}

const EditPostForm = forwardRef(
	(props: EditPostFormProps, ref: Ref<EditPostFormRef>) => {
		const history = useHistory();
		const username = useSelector<RootState, string>(
			(state) => state.auth.username
		);
		const [showCard, setShowCard] = useState<boolean>(false);
		const classNames = [styles.editPostForm];
		const dispatch = useDispatch();
		const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
			(state) => state.error.errorMessageRef
		);

		useImperativeHandle(
			ref,
			(): EditPostFormRef => ({
				setShowCard,
			})
		);

		if (props.className) {
			classNames.push(...props.className.split(' '));
		}

		const initialValues: CreatePostFormValues = props.initialValues;

		const validationSchema = Yup.object({
			description: Yup.string().required('Required'),
			title: Yup.string().required('Required'),
			price: Yup.number()
				.typeError('Must be a number')
				.positive('Must be greater than 0')
				.required('Required'),
			image: Yup.mixed().required('Required'),
		});

		const onSubmit = async (values: CreatePostFormValues) => {
			const formData = new FormData();
			formData.append('title', values.title);
			formData.append('description', values.description);
			formData.append('price', values.price.toString());
			formData.append('image', values.image);

			try {
				await axios.patch(`/posts/${props.postId}`, formData);
				history.push(`/profile/${username}`);
			} catch (err) {
				showErrorMessage(err, errorMessageRef, dispatch);
			}
		};

		return (
			<FloatingCard
				className={classNames.join(' ')}
				showCard={showCard}
				setShowCard={setShowCard}
			>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(formProps) => (
						<Form>
							<Input
								type='text'
								name='title'
								id='title'
								label='Title'
								placeholder='Title'
								className={styles.input}
							/>
							<TextArea
								id='description'
								name='description'
								placeholder='Description'
								label='Description'
								className={styles.input}
							></TextArea>
							<Input
								type='number'
								name='price'
								id='price'
								label='Price'
								placeholder='Price'
								className={styles.input}
							/>
							<div className={styles.buttons}>
								<Button type='submit'>Update</Button>
							</div>
						</Form>
					)}
				</Formik>
			</FloatingCard>
		);
	}
);

export default EditPostForm;
