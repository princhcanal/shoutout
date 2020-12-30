import React from 'react';
import styles from './CartItem.module.scss';

import Button from '../../Button/Button';
import PostType from '../../../types/models/post';

interface CartItemProps {
	post: PostType;
	removeCartItem: (cartItem: PostType) => void;
}

const CartItem = (props: CartItemProps) => {
	return (
		<div className={styles.CartItem}>
			<div className={styles.image}>
				<img src={props.post.image} alt={props.post.title} />
			</div>
			<div className={styles.text}>
				<div className={styles.title}>{props.post.title}</div>
			</div>
			<div className={styles.price}>${props.post.price.toFixed(2)}</div>
			<div className={styles.remove}>
				<Button
					style={['hollow-red']}
					onClick={() => props.removeCartItem(props.post)}
				>
					Remove
				</Button>
			</div>
		</div>
	);
};

export default CartItem;
