import React, { useState, useEffect } from 'react';
import styles from './Wishlist.module.scss';

import WishlistType from '../../types/models/wishlist';
import axios from '../../axios';
import FetchWishlistData from '../../types/fetchData/fetchWishlistData';
import Post from '../../components/Post/Post';
import Cart from '../../types/models/cart';
import FetchCartData from '../../types/fetchData/fetchCartData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ErrorMessageRef } from '../../components/ErrorMessage/ErrorMessage';
import { showErrorMessage } from '../../utils/errors';
import NoWishlistItems from '../../components/NoData/NoWishListItems/NoWishlistItems';
import WishlistItemsSkeleton from '../../components/Loader/SkeletonLoader/WishlistItemsSkeleton/WishlistItemsSkeleton';

const Wishlist = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [wishlist, setWishlist] = useState<WishlistType>({
		products: [],
		user: '',
	});
	const [cart, setCart] = useState<Cart>({
		products: [],
		totalPrice: 0,
		user: '',
	});
	const dispatch = useDispatch();
	const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
		(state) => state.error.errorMessageRef
	);

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const wishlist = await axios.get<FetchWishlistData>(
					'/wishlist'
				);
				setWishlist(wishlist.data.wishlist);
				const cart = await axios.get<FetchCartData>('/cart');
				setCart(cart.data.cart);
				setIsLoading(false);
			} catch (err) {
				showErrorMessage(err, errorMessageRef, dispatch);
			}
		};

		fetchWishlist();
	}, [dispatch, errorMessageRef]);

	const cartProductIds = cart.products.map((product) => {
		return product.product;
	});

	const wishlistItems = wishlist.products.map((product) => {
		const date = new Date(product.createdAt);

		return (
			<Post
				key={product._id}
				post={product}
				date={date}
				isInCart={cartProductIds.includes(product._id)}
				isInWishlist={true}
			/>
		);
	});

	return (
		<div className={styles.Wishlist}>
			<div>
				{isLoading ? (
					<WishlistItemsSkeleton />
				) : wishlistItems.length > 0 ? (
					<div className={styles.items}>{wishlistItems}</div>
				) : (
					<NoWishlistItems />
				)}
			</div>
		</div>
	);
};

export default Wishlist;
