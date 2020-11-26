import React from 'react';
import styles from './NoCartItems.module.scss';

const NoCartItems = () => {
	return (
		<div className={styles.noCartItems}>
			<img src='/img/no_data_2.png' alt='' />
			<p>No items in cart</p>
		</div>
	);
};

export default NoCartItems;
