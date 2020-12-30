import React from 'react';
import cartItemsStyles from '../../../CartItems/CartItems.module.scss';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import CartItemSkeleton from '../CartItemSkeleton/CartItemSkeleton';

const CartItemsSkeleton = () => {
	return (
		<SkeletonTheme color='#bbb' highlightColor='#ccc'>
			<div className={cartItemsStyles.CartItems}>
				<CartItemSkeleton />
				<CartItemSkeleton />
				<CartItemSkeleton />
				<CartItemSkeleton />
				<CartItemSkeleton />
				<CartItemSkeleton />
				<CartItemSkeleton />
				<CartItemSkeleton />
				<div className={cartItemsStyles.total}>
					<Skeleton width={250} height={50} />
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default CartItemsSkeleton;
