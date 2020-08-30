import React from 'react';
import styles from './Navbar.module.scss';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as AuthActions from '../../store/auth/actions';
import { RootState } from '../../store';

const Navbar = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);

	const handleLogout = () => {
		dispatch(AuthActions.logout());
		history.push('/');
	};

	return (
		<header className={styles.navbar}>
			<div className={styles.logo}>
				<h1>Checkout-My</h1>
			</div>
			<nav className={styles.nav}>
				<Link to='/'>Home</Link>
				<Link to='/wishlist'>Wishlist</Link>
				<Link to='/cart'>Cart</Link>
				<Link to={`/profile/${username}`}>Profile</Link>
				<button onClick={handleLogout}>Logout</button>
			</nav>
		</header>
	);
};

export default Navbar;
