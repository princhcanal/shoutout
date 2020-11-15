import React from 'react';
import styles from './ConnectionLoader.module.scss';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ConnectionLoader = () => {
	let connections = [];

	for (let i = 0; i < 5; i++) {
		connections.push(
			<li key={`connection ${i}`} className={styles.connection}>
				<strong>
					<Skeleton width={150} />
				</strong>
				<em>
					<Skeleton width={200} />
				</em>
			</li>
		);
	}
	return (
		<SkeletonTheme color='#bbb' highlightColor='#ccc'>
			{/* <li className={styles.connection}>
				<strong>
					<Skeleton width={150} />
				</strong>
				<em>
					<Skeleton width={200} />
				</em>
			</li> */}
			{connections}
		</SkeletonTheme>
	);
};

export default ConnectionLoader;
