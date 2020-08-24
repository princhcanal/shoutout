import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Landing.module.scss';

const Landing = () => {
	return (
		<div className={styles.landing}>
			<div className={styles.text}>
				<h1>Checkout-My</h1>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Adipisci, quisquam! Quas omnis quod explicabo cum vitae
					nihil temporibus qui possimus a numquam sint, officiis ex
				</p>
				<div className={styles.buttons}>
					<Link to='/register' className={styles.link}>
						Register
					</Link>
					<Link to='/login' className={styles.link}>
						Login
					</Link>
				</div>
			</div>
			<div className={styles.image}>
				<img
					src='https://assets.website-files.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg'
					alt=''
				/>
			</div>
		</div>
	);
};

export default Landing;
