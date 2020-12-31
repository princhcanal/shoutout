import React from 'react';
import styles from './NoCartItems.module.scss';

const NoCartItems = () => {
	return (
		<div className={styles.noCartItems}>
			<h1>No items in cart :(</h1>
			<img src='/img/no_data_2.png' alt='' />
		</div>
	);
};

export default NoCartItems;
