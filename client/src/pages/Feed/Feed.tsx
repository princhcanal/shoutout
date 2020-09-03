import React, { useEffect, useState } from 'react';
import styles from './Feed.module.scss';

import axios from '../../axios';

import Post from '../../components/Post/Post';
import CreatePostForm from '../../components/CreatePost/CreatePostForm';
import PostType from '../../types/post';
import FetchFeedData from '../../types/fetchFeedData';
import Cart from '../../types/cart';
import FetchCartData from '../../types/fetchCartData';
import Wishlist from '../../types/wishlist';
import FetchWishlistData from '../../types/fetchWishlistData';

const Feed = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [posts, setPosts] = useState<PostType[]>([]);
	const [cart, setCart] = useState<Cart>({
		products: [],
		totalPrice: 0,
		user: '',
	});
	const [wishlist, setWishlist] = useState<Wishlist>({
		products: [],
		user: '',
	});

	useEffect(() => {
		try {
			const fetchFeed = async () => {
				const feed = await axios.get<FetchFeedData>('/feed');
				setPosts(feed.data.posts);
				const cart = await axios.get<FetchCartData>('/cart');
				setCart(cart.data.cart);
				const wishlist = await axios.get<FetchWishlistData>(
					'/wishlist'
				);
				setWishlist(wishlist.data.wishlist);
				setIsLoading(false);
			};

			fetchFeed();
		} catch (err) {
			console.log('ERROR:', err);
		}
	}, []);

	const cartProductIds = cart.products.map((product) => {
		return product.product;
	});

	const wishlistProductIds = wishlist.products.map((product) => {
		return product._id;
	});

	const feedPosts = posts.map((post) => {
		return (
			<Post
				key={post._id}
				id={post._id}
				author={post.author.username}
				description={post.description}
				imageUrl={post.image}
				price={post.price}
				title={post.title}
				url={post.url}
				isInCart={cartProductIds.includes(post._id)}
				isInWishlist={wishlistProductIds.includes(post._id)}
			/>
		);
	});

	return (
		<div className={styles.feed}>
			<CreatePostForm />
			{!isLoading && feedPosts}
		</div>
	);
};

export default Feed;
