import React, { useState, useEffect } from 'react';
import styles from './Cart.module.scss';

import axios from '../../axios';

// import CartType from '../../types/cart';
import FetchCartData from '../../types/fetchCartData';
import Wishlist from '../../types/wishlist';
import PostType from '../../types/post';
import Post from '../../components/Post/Post';
import FetchWishlistData from '../../types/fetchWishlistData';

const Cart = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	// const [cart, setCart] = useState<CartType>({
	// 	products: [],
	// 	totalPrice: 0,
	// 	user: '',
	// });
	const [wishlist, setWishlist] = useState<Wishlist>({
		products: [],
		user: '',
	});
	const [cartProducts, setCartProducts] = useState<PostType[]>([]);

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const cart = await axios.get<FetchCartData>('/cart');
				// setCart(cart.data.cart);
				setCartProducts(cart.data.products);
				const wishlist = await axios.get<FetchWishlistData>(
					'/wishlist'
				);
				setWishlist(wishlist.data.wishlist);
				setIsLoading(false);
			} catch (err) {
				console.log('ERROR:', err);
			}
		};

		fetchCart();
	}, []);

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

	return <div className={styles.cart}>{!isLoading && cartItems}</div>;
};

export default Cart;
