import React from 'react';
import styles from './NotFound.module.scss';

const NotFound = () => {
	return (
		<div className={styles.notFound}>
			<h1>Not Found :(</h1>
			<img src='/img/not_found.svg' alt='' />
		</div>
	);
};

export default NotFound;
