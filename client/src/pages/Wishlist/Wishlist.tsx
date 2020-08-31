import React, { useState, useEffect } from 'react';
import styles from './Wishlist.module.scss';

import WishlistType from '../../types/wishlist';
import PostType from '../../types/post';
import axios from '../../axios';
import FetchWishlistData from '../../types/fetchWishlistData';
import Post from '../../components/Post/Post';
import Cart from '../../types/cart';
import FetchCartData from '../../types/fetchCartData';

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

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const wishlist = await axios.get<FetchWishlistData>(
					'/wishlist'
				);
				console.log(wishlist);
				setWishlist(wishlist.data.wishlist);
				const cart = await axios.get<FetchCartData>('/cart');
				setCart(cart.data.cart);
				setIsLoading(false);
			} catch (err) {
				console.log('ERROR:', err);
			}
		};

		fetchWishlist();
	}, []);

	const cartProductIds = cart.products.map((product) => {
		return product.product;
	});

	const wishlistItems = wishlist.products.map((product) => {
		return (
			<Post
				key={product._id}
				id={product._id}
				author={product.author.username}
				description={product.description}
				imageUrl={product.image}
				price={product.price}
				title={product.title}
				url={product.url}
				isInCart={cartProductIds.includes(product._id)}
				isInWishlist={true}
			/>
		);
	});

	return <div className={styles.wishlist}>{!isLoading && wishlistItems}</div>;
};

export default Wishlist;
