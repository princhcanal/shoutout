import React from 'react';
import wishlistStyles from '../../../../pages/Wishlist/Wishlist.module.scss';
import PostSkeleton from '../PostSkeleton/PostSkeleton';

const WishlistItemsSkeleton = () => {
	return (
		<div className={wishlistStyles.items}>
			<PostSkeleton />
			<PostSkeleton />
			<PostSkeleton />
			<PostSkeleton />
			<PostSkeleton />
			<PostSkeleton />
		</div>
	);
};

export default WishlistItemsSkeleton;
