import React from 'react';

import styles from './RegisterForm.module.scss';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface RegisterFormValues {
	email: string;
	password: string;
}

const RegisterForm = () => {
	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email address').required('Required'),
		password: Yup.string()
			.max(15, 'Password must be less than 15 characters or less')
			.required('Required'),
	});

	return (
		<div className={styles.registerForm}>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={validationSchema}
				onSubmit={(values: RegisterFormValues, { setSubmitting }) => {
					console.log(values);
					setSubmitting(false);
				}}
			>
				<Form>
					<label htmlFor='email'>Email</label>
					<Field type='email' name='email' />
					<ErrorMessage name='email' />
					<label htmlFor='password'>Password</label>
					<Field type='password' name='password' />
					<ErrorMessage name='password' />
					<button type='submit'>Submit</button>
				</Form>
			</Formik>
		</div>
	);
};

export default RegisterForm;
