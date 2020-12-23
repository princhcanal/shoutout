import React, { useState, useEffect } from 'react';
import styles from './Cart.module.scss';

import axios from '../../axios';
import { loadStripe } from '@stripe/stripe-js';

import FetchCartData from '../../types/fetchData/fetchCartData';
import Wishlist from '../../types/models/wishlist';
import PostType from '../../types/models/post';
import FetchWishlistData from '../../types/fetchData/fetchWishlistData';
import Post from '../../components/Post/Post';
import PostSkeleton from '../../components/Loader/SkeletonLoader/PostSkeleton/PostSkeleton';
import { showErrorMessage } from '../../utils/errors';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessageRef } from '../../components/ErrorMessage/ErrorMessage';
import { RootState } from '../../store';
import NoCartItems from '../../components/NoData/NoCartItems/NoCartItems';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';

const Cart = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [wishlist, setWishlist] = useState<Wishlist>({
		products: [],
		user: '',
	});
	const [cartProducts, setCartProducts] = useState<PostType[]>([]);
	const dispatch = useDispatch();
	const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
		(state) => state.error.errorMessageRef
	);

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const cart = await axios.get<FetchCartData>('/cart');
				setCartProducts(cart.data.products);
				const wishlist = await axios.get<FetchWishlistData>(
					'/wishlist'
				);
				setWishlist(wishlist.data.wishlist);
				setIsLoading(false);
			} catch (err) {
				showErrorMessage(err, errorMessageRef, dispatch);
			}
		};

		fetchCart();
	}, [dispatch, errorMessageRef]);

	const wishlistProductIds = wishlist.products.map((product) => {
		return product._id;
	});

	const cartItems = cartProducts.map((product) => {
		const date = new Date(product.createdAt);

		return (
			<Post
				key={product._id}
				post={product}
				date={date}
				isInCart={true}
				isInWishlist={wishlistProductIds.includes(product._id)}
			/>
		);
	});

	const checkout = async () => {
		try {
			const STRIPE_PK =
				'pk_test_51HCfR6F38j4MOFesQcpNmFtbdDI2ycw98qfIceAWijhgdAwwqLTLDKNtCTW4QEHnWkNYcdqMBXrlPXP3ndAuQeKO00OIenhGPr';
			const stripe = await loadStripe(STRIPE_PK);
			const session = await axios.post('/pay/create-checkout-session');
			const redirect = await stripe?.redirectToCheckout({
				sessionId: session.data.session.id,
			});
			if (redirect?.error) {
				console.log(redirect.error.message);
			}
		} catch (err) {
			showErrorMessage(err, errorMessageRef, dispatch);
		}
	};

	return (
		<div className={styles.cart}>
			<div className={'postContainer'}>
				{isLoading ? (
					<PostSkeleton />
				) : cartItems.length > 0 ? (
					cartItems
				) : (
					<NoCartItems />
				)}
				<Button onClick={checkout} style={true && 'bright'}>
					Checkout
				</Button>
				<Card className={styles.note}>
					<p>
						Note: This is a test checkout flow. Use credit card
						number 4242 4242 4242 4242 to succeed a checkout
					</p>
				</Card>
			</div>
		</div>
	);
};

export default Cart;
