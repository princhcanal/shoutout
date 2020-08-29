import React from 'react';
import styles from './Post.module.scss';

import { useSelector } from 'react-redux';

import Card from '../Card/Card';
import { RootState } from '../../store';

export interface PostProps {
	author: string;
	description: string;
	title: string;
	price: number;
	imageUrl: string;
	url: string;
}

const Post = (props: PostProps) => {
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);
	const userId = useSelector<RootState, string>((state) => state.auth.userId);
	const isLoggedIn = useSelector<RootState, boolean>(
		(state) => state.auth.isLoggedIn
	);

	const handleTest = () => {
		console.log(username);
		console.log(userId);
		console.log(isLoggedIn);
	};

	return (
		<div className={styles.post}>
			<Card className={styles.card}>
				<a href={props.url}>
					<h1>{props.title}</h1>
				</a>
				<div className='image'>
					<img src={props.imageUrl} alt='' />
				</div>
				<div className='description'>
					<p>{props.description}</p>
					<p>${props.price}</p>
				</div>
				<div className='buttons'>
					<button>Add to Cart</button>
					<button>Add to Wishlist</button>
					<button onClick={handleTest}>Test</button>
				</div>
			</Card>
		</div>
	);
};

export default Post;
