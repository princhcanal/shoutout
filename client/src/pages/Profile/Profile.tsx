import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';

import axios from '../../axios';

import Post from '../../components/Post/Post';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import PostType from '../../types/post';
import User from '../../types/user';
import FetchUserProfileData from '../../types/fetchUserData';
import { useParams, useHistory } from 'react-router-dom';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import Cart from '../../types/cart';
import Wishlist from '../../types/wishlist';
import FetchCartData from '../../types/fetchCartData';
import FetchWishlistData from '../../types/fetchWishlistData';
import EditPostForm from '../../components/EditPostForm/EditPostForm';

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
			console.log('ERROR:', err);
		}
	}, [username, history]);

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
			console.log('ERROR:', err);
		}
	}, []);

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
				{!profileCardIsLoading && (
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
			<div className={styles.posts}>{!feedIsLoading && userPosts}</div>
		</div>
	);
};

export default Profile;
