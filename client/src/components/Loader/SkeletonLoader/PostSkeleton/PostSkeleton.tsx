import React from 'react';
import postStyles from '../../../Post/Post.module.scss';

import Card from '../../../Card/Card';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const PostSkeleton = () => {
	return (
		<Card className={postStyles.post}>
			<SkeletonTheme color='#bbb' highlightColor='#ccc'>
				<div className={postStyles.heading}>
					<h2>
						<Skeleton width={200} height={30} />
					</h2>
					<div className={postStyles.price}>
						<Skeleton width={50} height={30} />
					</div>
				</div>
				<Skeleton height={300} />
				<div className={postStyles.description}>
					<p>
						{/* <Skeleton count={2} /> */}
						<Skeleton width={250} />
						<Skeleton width={250} />
					</p>
					<p className={postStyles.date}>
						<Skeleton width={100} />
					</p>
				</div>
			</SkeletonTheme>
		</Card>
	);
};

export default PostSkeleton;
