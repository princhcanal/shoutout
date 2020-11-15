import React, { useState, useEffect } from 'react';
import styles from './Cart.module.scss';

import axios from '../../axios';

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
			</div>
		</div>
	);
};

export default Cart;
