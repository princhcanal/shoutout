import React from 'react';
import styles from './NoPosts.module.scss';

const NoPosts = () => {
	return (
		<div className={styles.noPosts}>
			<h1>No posts to show :(</h1>
			<img src='/img/no_data_1.png' alt='' />
		</div>
	);
};

export default NoPosts;
