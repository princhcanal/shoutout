import React from 'react';
import styles from './NoWishlistItems.module.scss';

const NoWishlistItems = () => {
	return (
		<div className={styles.noWishlistItems}>
			<img src='/img/no_data_3.png' alt='' />
			<p>No wishlist items :(</p>
		</div>
	);
};

export default NoWishlistItems;
