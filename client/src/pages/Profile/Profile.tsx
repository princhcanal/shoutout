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

// TODO: implement edit profile
const Profile = () => {
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

	useEffect(() => {
		try {
			const fetchUserProfile = async () => {
				try {
					const result = await axios.get<FetchUserProfileData>(
						`/user/${username}`
					);
					setUser(result.data.user);
					setPosts(result.data.posts);
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

	const userPosts = posts.map((post) => {
		return (
			<Post
				key={post._id}
				id={post._id}
				author={username}
				description={post.description}
				imageUrl={post.image}
				price={post.price}
				title={post.title}
				url={post.url}
				isInCart={false}
				isInWishlist={false}
			/>
		);
	});

	return (
		<div className={styles.profile}>
			<div className={styles.profileCard}>
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
			</div>
			<div className={styles.posts}>{userPosts}</div>
		</div>
	);
};

export default Profile;
