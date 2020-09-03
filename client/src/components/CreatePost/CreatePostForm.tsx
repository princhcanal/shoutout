import React, { ChangeEvent, useRef } from 'react';
import styles from './CreatePostForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';

import Card, { CardRef } from '../Card/Card';
import Input from '../Form/Input/Input';
import TextArea from '../Form/TextArea/TextArea';
import Button from '../Button/Button';
import Backdrop, { BackdropRef } from '../Backdrop/Backdrop';
import backdropStyles from '../Backdrop/Backdrop.module.scss';
import { CreatePostFormValues } from '../../store/auth';
import CardHandle from '../../types/cardHandle';
import BackdropHandle from '../../types/backdropHandle';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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

	if (props.className) {
		classNames.push(...props.className.split(' '));
	}

	const imagePreviewRef = useRef<HTMLImageElement>(null);
	const imagePreviewDivRef = useRef<HTMLDivElement>(null);
	const createPostButtonRef = useRef<HTMLDivElement>(null);
	let form: CardHandle<typeof Card>;
	let backdrop: BackdropHandle<typeof Backdrop>;

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
		let formData = new FormData();
		formData.append('title', values.title);
		formData.append('description', values.description);
		formData.append('price', values.price.toString());
		formData.append('image', values.image);

		try {
			await axios.post('/posts', formData);
			history.push(`/profile/${username}`);
		} catch (err) {
			console.log('ERROR:', err);
		}
	};

	return (
		<>
			<Card
				className={classNames.join(' ')}
				ref={(f) => (form = f as CardRef)}
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
										console.log(e.target.files[0]);
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
			</Card>
			<Backdrop
				onClick={() => {
					if (form.card) {
						form.card.classList.remove(styles.center);
					}
					if (createPostButtonRef.current) {
						createPostButtonRef.current.style.transform =
							'rotate(0)';
					}
				}}
				ref={(b) => (backdrop = b as BackdropRef)}
			/>
			<div className={styles.createPostButton} ref={createPostButtonRef}>
				<Button
					onClick={() => {
						if (form.card) {
							if (form.card.classList.contains(styles.center)) {
								if (createPostButtonRef.current) {
									createPostButtonRef.current.style.transform =
										'rotate(0)';
								}
								form.card.classList.remove(styles.center);
								backdrop.backdrop?.click();
							} else {
								if (createPostButtonRef.current) {
									createPostButtonRef.current.style.transform =
										'rotate(405deg)';
								}
								form.card.classList.add(styles.center);
								if (backdrop.backdrop) {
									backdrop.backdrop.style.display = 'block';
									setTimeout(() => {
										if (backdrop.backdrop) {
											backdrop.backdrop.classList.remove(
												backdropStyles.hide
											);
										}
									}, 10);
								}
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
