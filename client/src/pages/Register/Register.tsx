import React from 'react';
import styles from './Register.module.scss';

import RegisterForm from '../../components/Form/RegisterForm/RegisterForm';

const Register = () => {
	return (
		<div className={styles.register}>
			<RegisterForm />
		</div>
	);
};

export default Register;
