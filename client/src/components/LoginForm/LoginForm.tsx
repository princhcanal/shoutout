import React from 'react';
import styles from './LoginForm.module.scss';

import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

import * as AuthActions from '../../store/auth/actions';
import Input from '../Form/Input/Input';
import { LoginFormValues } from '../../store/auth';
import Button from '../Button/Button';

// TODO: abstract onSubmit
const LoginForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email address').required('Required'),
		password: Yup.string().required('Required'),
	});

	const onSubmit = async (values: LoginFormValues) => {
		try {
			const res = await axios.post('/auth/login', values);
			const expires = 1 / 24;
			Cookies.set('Authorization', res.data.token.token, { expires });
			const token = Cookies.get('Authorization');

			if (token) {
				dispatch(AuthActions.login());
				history.push('/');
			} else {
				history.replace('/login');
			}
		} catch (err) {
			console.log(err);
			history.replace('/login');
		}
	};

	return (
		<div className={styles.loginForm}>
			<div className={styles.form}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					<Form>
						<Input
							type='email'
							name='email'
							id='email'
							label='Email'
							placeholder='Email'
							className={styles.input}
						/>
						<Input
							type='password'
							name='password'
							id='password'
							label='Password'
							placeholder='Password'
							className={styles.input}
						/>
						<p className={styles.register}>
							Don't have an account?{' '}
							<Link to='/register'>Register</Link>
						</p>
						<div className={styles.buttons}>
							<Button type='submit'>Login</Button>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default LoginForm;
