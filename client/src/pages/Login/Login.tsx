import React from 'react';
import styles from './Login.module.scss';

import LoginForm from '../../components/LoginForm/LoginForm';

const Login = () => {
	return (
		<div className={styles.login}>
			<LoginForm />
		</div>
	);
};

export default Login;
