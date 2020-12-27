import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';

import axios from '../../axios';

import Post from '../../components/Post/Post';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import PostType from '../../types/models/post';
import User from '../../types/models/user';
import FetchUserProfileData from '../../types/fetchData/fetchUserData';
import { useParams, useHistory } from 'react-router-dom';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import Cart from '../../types/models/cart';
import Wishlist from '../../types/models/wishlist';
import FetchCartData from '../../types/fetchData/fetchCartData';
import FetchWishlistData from '../../types/fetchData/fetchWishlistData';
import { showErrorMessage } from '../../utils/errors';
import { ErrorMessageRef } from '../../components/ErrorMessage/ErrorMessage';
import PostSkeleton from '../../components/Loader/SkeletonLoader/PostSkeleton/PostSkeleton';
import ProfileCardSkeleton from '../../components/Loader/SkeletonLoader/ProfileCardSkeleton/ProfileCardSkeleton';
import NoPosts from '../../components/NoData/NoPosts/NoPosts';

const Profile = () => {
	const [profileCardIsLoading, setProfileCardIsLoading] = useState<boolean>(
		true
	);
	const [feedIsLoading, setFeedIsLoading] = useState<boolean>(true);
	const history = useHistory();
	const userId = useSelector<RootState, string>((state) => state.auth.userId);
	const [posts, setPosts] = useState<PostType[]>([]);
	const [user, setUser] = useState<User>({
		username: '',
		name: '',
		email: '',
		url: '',
		subscription: '',
		followers: [],
		following: [],
		subscribers: [],
		subscriptions: [],
	});
	const { username } = useParams();
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
			const fetchUserProfile = async () => {
				try {
					const result = await axios.get<FetchUserProfileData>(
						`/user/${username}`
					);
					setUser(result.data.user);
					setPosts(result.data.posts);
					setProfileCardIsLoading(false);
				} catch (err) {
					history.push('/');
					console.log(err);
				}
			};

			fetchUserProfile();
		} catch (err) {
			showErrorMessage(err, errorMessageRef, dispatch);
		}
	}, [username, history, dispatch, errorMessageRef]);

	useEffect(() => {
		try {
			const fetchFeed = async () => {
				const cart = await axios.get<FetchCartData>('/cart');
				setCart(cart.data.cart);
				const wishlist = await axios.get<FetchWishlistData>(
					'/wishlist'
				);
				setWishlist(wishlist.data.wishlist);
				setFeedIsLoading(false);
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

	const userPosts = posts.map((post) => {
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
		<div className={styles.profile}>
			<div className={styles.profileCard}>
				{profileCardIsLoading ? (
					<ProfileCardSkeleton />
				) : (
					<ProfileCard
						name={user.name}
						username={user.username}
						email={user.email}
						userUrl={user.url}
						numFollowers={user.followers.length}
						numFollowing={user.following.length}
						numSubscribers={user.subscribers.length}
						numSubscriptions={user.subscriptions.length}
						isFollowing={user.followers.includes(userId)}
						isSubscribed={user.subscribers.includes(userId)}
					/>
				)}
			</div>
			<div className={styles.posts}>
				<div className={'postContainer'}>
					{feedIsLoading ? (
						<PostSkeleton />
					) : userPosts.length > 0 ? (
						userPosts
					) : (
						<NoPosts />
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
