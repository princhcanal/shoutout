import React, { useEffect, useState } from 'react';
import styles from './Feed.module.scss';

import axios from '../../axios';

import Post from '../../components/Post/Post';
import CreatePostForm from '../../components/Form/CreatePostForm/CreatePostForm';
import PostType from '../../types/models/post';
import FetchFeedData from '../../types/fetchData/fetchFeedData';
import Cart from '../../types/models/cart';
import FetchCartData from '../../types/fetchData/fetchCartData';
import Wishlist from '../../types/models/wishlist';
import FetchWishlistData from '../../types/fetchData/fetchWishlistData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ErrorMessageRef } from '../../components/ErrorMessage/ErrorMessage';
import { showErrorMessage } from '../../utils/errors';
import SearchUser from '../../components/Form/SearchUser/SearchUser';
import PostSkeleton from '../../components/Loader/SkeletonLoader/PostSkeleton/PostSkeleton';
import NoPosts from '../../components/NoData/NoPosts/NoPosts';

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
	const dispatch = useDispatch();
	const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
		(state) => state.error.errorMessageRef
	);

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
			showErrorMessage(err, errorMessageRef, dispatch);
		}
	}, [dispatch, errorMessageRef]);

	const cartProductIds = cart.products.map((product) => {
		return product.product;
	});

	const wishlistProductIds = wishlist.products.map((product) => {
		return product._id;
	});

	const feedPosts = posts.map((post) => {
		const date = new Date(post.createdAt);

		return (
			<Post
				key={post._id}
				post={post}
				date={date}
				isInCart={cartProductIds.includes(post._id)}
				isInWishlist={wishlistProductIds.includes(post._id)}
			/>
		);
	});

	return (
		<div className={styles.feed}>
			<CreatePostForm />
			<SearchUser />
			<div className={'postContainer'}>
				{isLoading ? (
					<PostSkeleton />
				) : feedPosts.length > 0 ? (
					feedPosts
				) : (
					<NoPosts />
				)}
			</div>
		</div>
	);
};

export default Feed;
