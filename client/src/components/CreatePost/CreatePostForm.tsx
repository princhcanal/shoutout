import React, { ChangeEvent, useRef, useState } from 'react';
import styles from './CreatePostForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
import * as ErrorActions from '../../store/error/actions';
import { ErrorMessageRef } from '../ErrorMessage/ErrorMessage';
import { showErrorMessage } from '../../utils/errors';

// const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];

interface CreatePostFormProps {
	className?: string;
}

const CreatePostForm = (props: CreatePostFormProps) => {
	const classNames = [styles.createPostForm];
	const history = useHistory();
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);
	const [showCard, setShowCard] = useState<boolean>(false);
	const dispatch = useDispatch();
	const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
		(state) => state.error.errorMessageRef
	);

	if (props.className) {
		classNames.push(...props.className.split(' '));
	}

	const imagePreviewRef = useRef<HTMLImageElement>(null);
	const imagePreviewDivRef = useRef<HTMLDivElement>(null);
	const createPostButtonRef = useRef<HTMLDivElement>(null);

	const initialValues = {
		description: '',
		title: '',
		price: 0,
		image: '',
	};

	const validationSchema = Yup.object({
		description: Yup.string().required('Required'),
		title: Yup.string().required('Required'),
		price: Yup.number()
			.typeError('Must be a number')
			.positive('Must be greater than 0')
			.required('Required'),
		image: Yup.mixed().required('Required'),
		// .test('fileType', 'Image must be jpg, jpeg, or png', (value) =>
		// 	SUPPORTED_IMAGE_FORMATS.includes(value.type)
		// ),
	});

	const onSubmit = async (values: CreatePostFormValues) => {
		const formData = new FormData();
		formData.append('title', values.title);
		formData.append('description', values.description);
		formData.append('price', values.price.toString());
		formData.append('image', values.image);

		try {
			await axios.post('/posts', formData);
			history.push(`/profile/${username}`);
		} catch (err) {
			showErrorMessage(err, errorMessageRef, dispatch);
		}
	};

	const handleSetShowCard = (showCard: boolean) => {
		if (
			createPostButtonRef.current &&
			createPostButtonRef.current.classList.contains(styles.rotate)
		) {
			createPostButtonRef.current.classList.remove(styles.rotate);
		}

		setShowCard(showCard);
	};

	return (
		<>
			<FloatingCard
				className={classNames.join(' ')}
				showCard={showCard}
				setShowCard={handleSetShowCard}
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
							<Input
								type='file'
								name='image'
								id='image'
								onChange={(
									e: ChangeEvent<HTMLInputElement>
								) => {
									if (e.target.files) {
										if (e.target.files[0]) {
											formProps.setFieldValue(
												'image',
												e.target.files[0]
											);
											const fileReader = new FileReader();
											if (
												e.target.files[0] &&
												imagePreviewDivRef.current
											) {
												imagePreviewDivRef.current.style.display =
													'block';
												fileReader.readAsDataURL(
													e.target.files[0]
												);
												fileReader.onload = (e) => {
													if (
														imagePreviewRef.current
													) {
														imagePreviewRef.current.src = e
															.target
															?.result as string;
													}
												};
											}
										} else {
											formProps.setFieldValue(
												'image',
												''
											);
											if (imagePreviewDivRef.current) {
												imagePreviewDivRef.current.style.display =
													'none';
											}
											if (imagePreviewRef.current) {
												imagePreviewRef.current.src =
													'';
											}
										}
									}
								}}
								label='Choose an image'
								accept='.jpg, .jpeg, .png'
								className={styles.input}
							/>
							<div
								className={styles.imagePreview}
								ref={imagePreviewDivRef}
							>
								<img ref={imagePreviewRef} alt='' />
							</div>
							<div className={styles.buttons}>
								<Button type='submit'>Post</Button>
							</div>
						</Form>
					)}
				</Formik>
			</FloatingCard>
			<div className={styles.createPostButton} ref={createPostButtonRef}>
				<Button
					onClick={() => {
						if (createPostButtonRef.current) {
							if (showCard) {
								createPostButtonRef.current.classList.remove(
									styles.rotate
								);
								setShowCard(false);
							} else {
								createPostButtonRef.current.classList.add(
									styles.rotate
								);
								setShowCard(true);
							}
						}
					}}
				>
					<div className={styles.addPostButtonText}>
						<FontAwesomeIcon icon={faPlus} />
					</div>
				</Button>
			</div>
		</>
	);
};

export default CreatePostForm;
