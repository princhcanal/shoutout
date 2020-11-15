import React from 'react';
import profileCardStyles from '../../../ProfileCard/ProfileCard.module.scss';

import Card from '../../../Card/Card';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ProfileCardSkeleton = () => {
	return (
		<Card className={profileCardStyles.profileCard}>
			<SkeletonTheme color='#bbb' highlightColor='#ccc'>
				<div className={profileCardStyles.header}>
					<div className={profileCardStyles.image}>
						<Skeleton circle={true} height={120} width={120} />
					</div>
					<h1>
						<Skeleton width={250} />
					</h1>
					<p>
						<Skeleton width={200} />
					</p>
				</div>
				<div className={profileCardStyles.text}>
					<div className={profileCardStyles.connections}>
						<div className={profileCardStyles.connection}>
							<strong>
								<Skeleton />
							</strong>
							<p>Followers</p>
						</div>
						<div className={profileCardStyles.connection}>
							<strong>
								<Skeleton />
							</strong>
							<p>Following</p>
						</div>
						<div className={profileCardStyles.connection}>
							<strong>
								<Skeleton />
							</strong>
							<p>Subscribers</p>
						</div>
						<div className={profileCardStyles.connection}>
							<strong>
								<Skeleton />
							</strong>
							<p>Subscribing</p>
						</div>
					</div>
				</div>
			</SkeletonTheme>
		</Card>
	);
};

export default ProfileCardSkeleton;
