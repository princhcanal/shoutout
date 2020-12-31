import React from 'react';
import styles from './NoWishlistItems.module.scss';

const NoWishlistItems = () => {
	return (
		<div className={styles.noWishlistItems}>
			<h1>No wishlist items :(</h1>
			<img src='/img/no_data_3.png' alt='' />
		</div>
	);
};

export default NoWishlistItems;
