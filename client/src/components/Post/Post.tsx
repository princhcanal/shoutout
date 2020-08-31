import React, { useState, useEffect } from 'react';
import styles from './Post.module.scss';
import ButtonStyles from '../Button/Button.module.scss';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../axios';

import Card from '../Card/Card';
import Button, { ButtonRef } from '../Button/Button';
import ButtonHandle from '../../types/buttonHandle';
import { RootState } from '../../store';

export interface PostProps {
	id: string;
	author: string;
	description: string;
	title: string;
	price: number;
	imageUrl: string;
	url: string;
	isInCart: boolean;
	isInWishlist: boolean;
}

// TODO: implement createdAt
const Post = (props: PostProps) => {
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);
	let addToCartButton: ButtonHandle<typeof Button>;
	let addToWishlistButton: ButtonHandle<typeof Button>;
	const [isInCart, setIsInCart] = useState<boolean>(props.isInCart);
	const [isInWishlist, setIsInWishlist] = useState<boolean>(
		props.isInWishlist
	);

	useEffect(() => {
		setIsInCart(props.isInCart);
	}, [props.isInCart]);

	useEffect(() => {
		setIsInWishlist(props.isInWishlist);
	}, [props.isInWishlist]);

	const handleAddToCart = async () => {
		try {
			await axios.post('/cart', {
				product: props.id,
				quantity: 1,
			});
			if (addToCartButton.button) {
				addToCartButton.button.innerText = 'Added to Cart';
				addToCartButton.button.classList.add(ButtonStyles.hollow);
				setIsInCart(true);
			}
		} catch (err) {
			console.log('ERROR:', err);
		}
	};

	const handleRemoveFromCart = async () => {
		try {
			await axios.delete(`/cart/${props.id}`);
			if (addToCartButton.button) {
				addToCartButton.button.innerText = 'Add to Cart';
				addToCartButton.button.classList.remove(ButtonStyles.hollow);
				setIsInCart(false);
			}
		} catch (err) {
			console.log('ERROR:', err);
		}
	};

	const handleAddToWishlist = async () => {
		try {
			await axios.post('/wishlist', {
				product: props.id,
			});
			if (addToWishlistButton.button) {
				addToWishlistButton.button.innerText = 'Added to Wishlist';
				addToWishlistButton.button.classList.add(ButtonStyles.hollow);
				setIsInWishlist(true);
			}
		} catch (err) {
			console.log('ERROR:', err);
		}
	};

	const handleRemoveFromWishlist = async () => {
		try {
			await axios.delete(`/wishlist/${props.id}`);
			if (addToWishlistButton.button) {
				addToWishlistButton.button.innerText = 'Add to Wishlist';
				addToWishlistButton.button.classList.remove(
					ButtonStyles.hollow
				);
				setIsInWishlist(false);
			}
		} catch (err) {
			console.log('ERROR:', err);
		}
	};

	let buttons;

	if (!(props.author === username)) {
		buttons = (
			<>
				<Button
					onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
					style={isInCart ? 'hollow' : undefined}
					ref={(c) => (addToCartButton = c as ButtonRef)}
				>
					{isInCart ? 'Added to Cart' : 'Add to Cart'}
				</Button>
				<Button
					onClick={
						isInWishlist
							? handleRemoveFromWishlist
							: handleAddToWishlist
					}
					style={isInWishlist ? 'hollow' : undefined}
					ref={(w) => (addToWishlistButton = w as ButtonRef)}
				>
					{isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
				</Button>
			</>
		);
	}

	return (
		<Card className={styles.post}>
			<h3 className={styles.heading}>
				<a href={props.url}>{props.title}</a>
				<div className={styles.price}>
					<p>${props.price}</p>
				</div>
			</h3>
			<div className={styles.image}>
				<img src={props.imageUrl} alt={props.title} />
			</div>
			<div className={styles.description}>
				<p>
					<Link to={`/profile/${props.author}`}>{props.author}</Link>{' '}
					{props.description}
				</p>
			</div>
			<div className={styles.buttons}>{buttons}</div>
		</Card>
	);
};

export default Post;
