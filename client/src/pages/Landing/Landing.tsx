import React from 'react';
import styles from './Landing.module.scss';
import buttonStyles from '../../components/Button/Button.module.scss';

import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div className={styles.landing}>
			<div className={styles.text}>
				<h1>Shoutout</h1>
				<p>
					Shoutout allows users to sell their artwork online. Sellers
					can also subscribe to other users to get a discount on their
					products. Discover, support, and get inspired by talent from
					all over the world!
				</p>
				<div className={styles.buttons}>
					<Link
						to='/register'
						className={[
							buttonStyles.button,
							buttonStyles.bright,
						].join(' ')}
					>
						Register
					</Link>
					<Link
						to='/login'
						className={[
							buttonStyles.button,
							buttonStyles.bright,
						].join(' ')}
					>
						Login
					</Link>
				</div>
			</div>
			{/* <div className={styles.text}>
				<h1>Shoutout</h1>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Adipisci, quisquam! Quas omnis quod explicabo cum vitae
					nihil temporibus qui possimus a numquam sint, officiis ex
				</p>
				<div className={styles.buttons}>
				</div>
			</div> */}
			{/* <div className={styles.image}>
				<img
					src='https://assets.website-files.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg'
					alt=''
				/>
			</div> */}
		</div>
	);
};

export default Landing;
