import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';

import axios from '../../axios';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import Post from '../../components/Post/Post';
import PostType from '../../types/post';
import FetchUserProfileData from '../../types/fetchUserData';

const Profile = () => {
	const [posts, setPosts] = useState<PostType[]>([]);
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);

	useEffect(() => {
		try {
			const fetchUserProfile = async () => {
				const result = await axios.get<FetchUserProfileData>(
					`/user/${username}`
				);
				setPosts(result.data.posts);
			};

			fetchUserProfile();
		} catch (err) {
			console.log('ERROR:', err);
		}
	}, [username]);

	const userPosts = posts.map((post) => {
		return (
			<Post
				key={post._id}
				author={username}
				description={post.description}
				imageUrl={post.image}
				price={post.price}
				title={post.title}
				url={post.url}
			/>
		);
	});

	return <div className={styles.profile}>{userPosts}</div>;
};

export default Profile;
