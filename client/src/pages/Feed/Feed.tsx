import React from 'react';

import styles from './Feed.module.scss';

import Post from '../../components/Post/Post';

const Feed = () => {
	return (
		<div className={styles.feed}>
			<Post />
		</div>
	);
};

export default Feed;
