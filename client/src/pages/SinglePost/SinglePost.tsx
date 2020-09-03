import React, { useState, useEffect } from 'react';
import styles from './SinglePost.module.scss';

import axios from '../../axios';
import { useParams } from 'react-router-dom';

import Post from '../../components/Post/Post';
import PostType from '../../types/post';
import FetchPostData from '../../types/fetchPostData';
import Cart from '../../types/cart';
import Wishlist from '../../types/wishlist';
import FetchCartData from '../../types/fetchCartData';
import FetchWishlistData from '../../types/fetchWishlistData';

const SinglePost = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [post, setPost] = useState<PostType>();
	const [cart, setCart] = useState<Cart>({
		products: [],
		totalPrice: 0,
		user: '',
	});
	const [wishlist, setWishlist] = useState<Wishlist>({
		products: [],
		user: '',
	});
	const { id } = useParams();

	useEffect(() => {
		try {
			const fetchPost = async () => {
				const post = await axios.get<FetchPostData>(`/posts/${id}`);
				setPost(post.data.post);
				const cart = await axios.get<FetchCartData>('/cart');
				setCart(cart.data.cart);
				const wishlist = await axios.get<FetchWishlistData>(
					'/wishlist'
				);
				setWishlist(wishlist.data.wishlist);
				setIsLoading(false);
			};

			fetchPost();
		} catch (err) {
			console.log('ERROR:', err);
		}
	}, [id]);

	const cartProductIds = cart.products.map((product) => {
		return product.product;
	});

	const wishlistProductIds = wishlist.products.map((product) => {
		return product._id;
	});

	return (
		<div className={styles.singlePost}>
			{!isLoading && post && (
				<Post
					key={post._id}
					post={post}
					date={new Date(post.createdAt)}
					isInCart={cartProductIds.includes(post._id)}
					isInWishlist={wishlistProductIds.includes(post._id)}
				/>
			)}
		</div>
	);
};

export default SinglePost;
