import React, { useState, useEffect } from 'react';
import styles from './SinglePost.module.scss';

import axios from '../../axios';
import { useParams } from 'react-router-dom';

import Post from '../../components/Post/Post';
import PostType from '../../types/models/post';
import FetchPostData from '../../types/fetchData/fetchPostData';
import Cart from '../../types/models/cart';
import Wishlist from '../../types/models/wishlist';
import FetchCartData from '../../types/fetchData/fetchCartData';
import FetchWishlistData from '../../types/fetchData/fetchWishlistData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ErrorMessageRef } from '../../components/ErrorMessage/ErrorMessage';
import { showErrorMessage } from '../../utils/errors';
import PostSkeleton from '../../components/Loader/SkeletonLoader/PostSkeleton/PostSkeleton';

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
	const dispatch = useDispatch();
	const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
		(state) => state.error.errorMessageRef
	);

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
			showErrorMessage(err, errorMessageRef, dispatch);
		}
	}, [id, dispatch, errorMessageRef]);

	const cartProductIds = cart.products.map((product) => {
		return product.product;
	});

	const wishlistProductIds = wishlist.products.map((product) => {
		return product._id;
	});

	return (
		<div className={styles.singlePost}>
			<div className='postContainer'>
				{!isLoading && post ? (
					<Post
						key={post._id}
						post={post}
						date={new Date(post.createdAt)}
						isInCart={cartProductIds.includes(post._id)}
						isInWishlist={wishlistProductIds.includes(post._id)}
					/>
				) : (
					<PostSkeleton />
				)}
			</div>
		</div>
	);
};

export default SinglePost;
