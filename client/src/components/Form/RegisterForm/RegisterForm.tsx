import React from 'react';
import styles from './RegisterForm.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../store';
import { ErrorMessageRef } from '../../ErrorMessage/ErrorMessage';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from '../../../axios';
import Cookies from 'js-cookie';

import Input from '../../Form/Input/Input';
import Card from '../../../components/Card/Card';
import { Link } from 'react-router-dom';
import * as AuthActions from '../../../store/auth/actions';
import { RegisterFormValues } from '../../../store/auth';
import Button, { ButtonRef } from '../../Button/Button';
import ButtonHandle from '../../../types/handles/buttonHandle';
import { showErrorMessage } from '../../../utils/errors';

const RegisterForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	let submitRef: ButtonHandle<typeof Button>;

	const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
		(state) => state.error.errorMessageRef
	);

	const initialValues = {
		email: '',
		password: '',
		username: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email address').required('Required'),
		password: Yup.string()
			.min(4, 'Password must be 4-15 characters')
			.max(15, 'Password must be 4-15 characters')
			.required('Required'),
		username: Yup.string().required('Required'),
	});

	const onSubmit = async (values: RegisterFormValues) => {
		try {
			if (submitRef.button) {
				submitRef.button.innerText = 'Loading...';
			}

			const res = await axios.post('/auth/register', values);
			const expires = 1 / 24;
			Cookies.set('Authorization', res.data.token.token, { expires });
			const token = Cookies.get('Authorization');

			if (token) {
				dispatch(AuthActions.login());
				history.push('/');
			} else {
				history.replace('/register');
			}
		} catch (err) {
			if (submitRef.button) {
				submitRef.button.innerText = 'Register';
			}

			showErrorMessage(err, errorMessageRef, dispatch);
			history.replace('/register');
		}
	};

	return (
		<div className={styles.registerForm}>
			<Card className={styles.card}>
				<div className={styles.image}>
					<div className={styles.imageHeader}>
						<h1>Discover the World's Creativity</h1>
					</div>
					<div className={styles.imagePicture}>
						{/* <img
							src='https://assets.website-files.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg'
							alt=''
						/> */}
						<img src='/img/window.svg' alt='' />
					</div>
				</div>
				<div className={styles.form}>
					<div className={styles.formHeader}>
						<h1>Register</h1>
					</div>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						<Form>
							<Input
								type='text'
								name='username'
								id='username'
								label='Username'
								// placeholder='Username'
								className={styles.input}
							/>
							<Input
								type='email'
								name='email'
								id='email'
								label='Email'
								// placeholder='Email'
								className={styles.input}
							/>
							<Input
								type='password'
								name='password'
								id='password'
								label='Password'
								// placeholder='Password'
								className={styles.input}
							/>
							<p className={styles.login}>
								Already have an account?{' '}
								<Link to='/login'>Login</Link>
							</p>
							<div className={styles.buttons}>
								<Button
									type='submit'
									ref={(s) => (submitRef = s as ButtonRef)}
								>
									Register
								</Button>
							</div>
						</Form>
					</Formik>
				</div>
			</Card>
		</div>
	);
};

export default RegisterForm;
