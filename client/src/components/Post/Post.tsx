import React from 'react';
import styles from './Post.module.scss';

import { Link } from 'react-router-dom';

import Card from '../Card/Card';
import Button from '../Button/Button';

export interface PostProps {
	author: string;
	description: string;
	title: string;
	price: number;
	imageUrl: string;
	url: string;
}

const Post = (props: PostProps) => {
	return (
		<div className={styles.post}>
			<Card className={styles.card}>
				<h3 className={styles.heading}>
					<a href={props.url}>{props.title}</a>
					<div className={styles.price}>
						<p>${props.price}</p>
					</div>
				</h3>
				<div className={styles.image}>
					<img
						src={
							/*props.imageUrl*/ 'https://static.dribbble.com/users/1090020/screenshots/14100191/media/e7b5f3d8284c2344cb2e2e0a2e701218.png'
						}
						alt={props.title}
					/>
				</div>
				<div className={styles.description}>
					<p>
						<Link to={`/profile/${props.author}`}>
							{props.author}
						</Link>{' '}
						{props.description}
					</p>
				</div>
				<div className={styles.buttons}>
					<Button>Add to Cart</Button>
					<Button>Add to Wishlist</Button>
					{/* <button onClick={handleTest}>Test</button> */}
				</div>
			</Card>
		</div>
	);
};

export default Post;
