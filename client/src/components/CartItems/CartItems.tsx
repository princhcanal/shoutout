import React from 'react';
import styles from './CartItems.module.scss';

interface CartItemsProps {
	children: any;
	totalPrice: number;
}

const CartItems = (props: CartItemsProps) => {
	return (
		<div className={styles.CartItems}>
			<div className={styles.items}>{props.children}</div>
			<div className={styles.total}>
				Total: ${props.totalPrice.toFixed(2)}
			</div>
		</div>
	);
};

export default CartItems;
