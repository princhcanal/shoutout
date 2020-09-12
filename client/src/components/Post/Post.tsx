import React, { useState, useEffect } from 'react';
import styles from './Post.module.scss';
import ButtonStyles from '../Button/Button.module.scss';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import Card, { CardRef } from '../Card/Card';
import Button, { ButtonRef } from '../Button/Button';
import EditPostForm, { EditPostFormRef } from '../EditPostForm/EditPostForm';
import CardHandle from '../../types/handles/cardHandle';
import ButtonHandle from '../../types/handles/buttonHandle';
import PostType from '../../types/models/post';
import { RootState } from '../../store';
import * as date from '../../utils/dates';
import EditPostFormHandle from '../../types/handles/editPostFormHandle';

export interface PostProps {
	post: PostType;
	date: Date;
	isInCart: boolean;
	isInWishlist: boolean;
}

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
	const [clickedBody, setClickedBody] = useState<boolean>(false);
	let editOptionsRef: CardHandle<typeof Card>;
	let postRef: CardHandle<typeof Card>;
	let formRef: EditPostFormHandle<typeof EditPostForm>;

	useEffect(() => {
		setIsInCart(props.isInCart);
	}, [props.isInCart]);

	useEffect(() => {
		setIsInWishlist(props.isInWishlist);
	}, [props.isInWishlist]);

	useEffect(() => {
		const body = document.querySelector('body');
		const onBodyClick = (e: MouseEvent) => {
			if (!editOptionsRef) return;
			if (editOptionsRef.card && !clickedBody) {
				if (editOptionsRef.card.classList.contains(styles.show)) {
					editOptionsRef.card.classList.remove(styles.show);
					setClickedBody(true);
				}
			}
		};

		body?.addEventListener('click', onBodyClick);

		return () => {
			body?.removeEventListener('click', onBodyClick);
		};
	});

	const handleAddToCart = async () => {
		try {
			await axios.post('/cart', {
				product: props.post._id,
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
			await axios.delete(`/cart/${props.post._id}`);
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
				product: props.post._id,
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
			await axios.delete(`/wishlist/${props.post._id}`);
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
	const isAuthorized = props.post.author.username === username;

	if (!isAuthorized) {
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

	const timestamp = date.getTimestamp(props.date);

	const handleDelete = async () => {
		try {
			await axios.delete(`/posts/${props.post._id}`);
			if (postRef.card) {
				postRef.card.remove();
			}
		} catch (err) {
			console.log('ERROR:', err);
		}
	};

	const handleEdit = () => {
		formRef.setShowCard(true);
	};

	const handleToggleEditOptions = (
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
	) => {
		if (editOptionsRef.card && !clickedBody) {
			if (!editOptionsRef.card.classList.contains(styles.show)) {
				editOptionsRef.card.classList.add(styles.show);
			} else {
				editOptionsRef.card.classList.remove(styles.show);
			}
		}
		setClickedBody(false);
	};

	let editOptions;
	if (isAuthorized) {
		editOptions = (
			<>
				<FontAwesomeIcon
					icon={faEllipsisV}
					onClick={handleToggleEditOptions}
				/>
				<Card
					className={styles.editButtons}
					ref={(e) => (editOptionsRef = e as CardRef)}
				>
					<Button onClick={handleEdit}>Edit</Button>
					<Button onClick={handleDelete} style={true && 'hollow-red'}>
						Delete
					</Button>
				</Card>
			</>
		);
	}

	return (
		<>
			<Card className={styles.post} ref={(p) => (postRef = p as CardRef)}>
				<h3 className={styles.heading}>
					<Link to={`/posts/${props.post._id}`}>
						{props.post.title}
					</Link>
					<div className={styles.price}>
						<p>${props.post.price}</p>
					</div>
				</h3>
				<div className={styles.image}>
					<img src={props.post.image} alt={props.post.title} />
				</div>
				<div className={styles.description}>
					<p>
						<Link to={`/profile/${props.post.author.username}`}>
							{props.post.author.username}
						</Link>{' '}
						{props.post.description}
					</p>
					<p className={styles.date}>{timestamp}</p>
				</div>
				<div className={styles.buttons}>{buttons}</div>
				<div className={styles.editOptions}>{editOptions}</div>
			</Card>
			{isAuthorized && (
				<EditPostForm
					ref={(f) => (formRef = f as EditPostFormRef)}
					initialValues={{
						description: props.post.description,
						title: props.post.title,
						price: props.post.price,
						image: props.post.image,
					}}
					postId={props.post._id}
				/>
			)}
		</>
	);
};

export default Post;
