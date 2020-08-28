import React from 'react';
import styles from './Post.module.scss';

import Card from '../Card/Card';

interface PostProps {}

const Post = (props: PostProps) => {
	return (
		<div className={styles.post}>
			<Card className={styles.card}>
				<h1>Post</h1>
				<div className='image'>
					<img
						src='https://cdn.dribbble.com/users/427368/screenshots/14073166/dribbble.jpg'
						alt=''
					/>
				</div>
				<div className='description'>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Sint qui iure hic voluptatem autem quos, quod quia dolor
						minima ratione!
					</p>
				</div>
				<div className='buttons'>
					<button>Add to Cart</button>
					<button>Add to Wishlist</button>
				</div>
			</Card>
		</div>
	);
};

export default Post;
