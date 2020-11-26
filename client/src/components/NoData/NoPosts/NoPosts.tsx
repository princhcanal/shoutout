import React from 'react';
import styles from './NoPosts.module.scss';

const NoPosts = () => {
	return (
		<div className={styles.noPosts}>
			<img src='/img/no_data_1.png' alt='' />
			<p>No posts to show :(</p>
		</div>
	);
};

export default NoPosts;
