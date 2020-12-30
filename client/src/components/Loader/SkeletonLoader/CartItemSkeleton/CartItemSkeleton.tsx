import React from 'react';
import cartItemStyles from '../../../CartItems/CartItem/CartItem.module.scss';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CartItemSkeleton = () => {
	return (
		<SkeletonTheme color='#bbb' highlightColor='#ccc'>
			<div className={cartItemStyles.CartItem}>
				<div className={cartItemStyles.image}>
					<Skeleton height={64} width={64} />
				</div>
				<div className={cartItemStyles.text}>
					<Skeleton width={250} height={30} />
				</div>
				<div className={cartItemStyles.price}>
					<Skeleton width={64} height={32} />
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default CartItemSkeleton;
