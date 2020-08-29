import React, { useEffect, useState } from 'react';
import styles from './Feed.module.scss';

import axios from '../../axios';

import Post from '../../components/Post/Post';
import PostType from '../../types/post';
import FetchFeedData from '../../types/fetchFeedData';

const Feed = () => {
	const [posts, setPosts] = useState<PostType[]>([]);

	useEffect(() => {
		try {
			const fetchFeed = async () => {
				const result = await axios.get<FetchFeedData>('/feed');
				setPosts(result.data.posts);
				console.log(result.data.posts);
			};

			fetchFeed();
		} catch (err) {
			console.log('ERROR:', err);
		}
	}, []);

	const feedPosts = posts.map((post) => {
		return (
			<Post
				key={post._id}
				author={post.author.username}
				description={post.description}
				imageUrl={post.image}
				price={post.price}
				title={post.title}
				url={post.url}
			/>
		);
	});

	return <div className={styles.feed}>{feedPosts}</div>;
};

export default Feed;
