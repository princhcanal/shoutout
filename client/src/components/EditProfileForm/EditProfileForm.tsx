import React, { useEffect, useState } from 'react';
import styles from './EditProfileForm.module.scss';

import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';

import Card from '../Card/Card';
import Input from '../Form/Input/Input';
import { EditProfileFormValues } from '../../store/auth';
import Button from '../Button/Button';
import User from '../../types/models/user';

interface EditProfileFormProps {
	user: User;
}

const EditProfileForm = (props: EditProfileFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const history = useHistory();

	useEffect(() => {
		if (props.user.username !== '') {
			setIsLoading(false);
		}
	}, [props.user]);

	const initialValues = {
		name: props.user.name,
		username: props.user.username,
		email: props.user.email,
	};

	const validationSchema = Yup.object({});

	const onSubmit = async (values: EditProfileFormValues) => {
		try {
			await axios.patch('/user', values);
			history.push(`/profile/${props.user.username}`);
		} catch (err) {
			console.log('ERROR:', err);
		}
	};

	return (
		<Card className={styles.editProfileForm}>
			{!isLoading && (
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					<Form>
						<Input
							type='text'
							name='name'
							id='name'
							label='Name'
							placeholder='Name'
							className={styles.input}
						/>
						<Input
							type='text'
							name='username'
							id='username'
							label='Username'
							placeholder='Username'
							className={styles.input}
						/>
						<Input
							type='text'
							name='email'
							id='email'
							label='Email'
							placeholder='Email'
							className={styles.input}
						/>
						<div className={styles.buttons}>
							<Button type='submit'>Update</Button>
						</div>
					</Form>
				</Formik>
			)}
		</Card>
	);
};

export default EditProfileForm;
