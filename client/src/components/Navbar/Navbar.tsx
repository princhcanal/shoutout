import React from 'react';
import styles from './Navbar.module.scss';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as AuthActions from '../../store/auth/actions';
import { RootState } from '../../store';
import Button from '../Button/Button';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';

const Navbar = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);
	const subscription = useSelector<RootState, string>(
		(state) => state.auth.subscription
	);

	const handleLogout = () => {
		dispatch(AuthActions.logout());
		history.push('/');
	};

	return (
		<header className={styles.navbar}>
			<div className={styles.logo}>
				<h1>Shoutout</h1>
			</div>
			<nav className={styles.nav}>
				<Link to='/'>Home</Link>
				<Link to='/wishlist'>Wishlist</Link>
				<Link to='/cart'>Cart</Link>
				{subscription === 'None' && (
					<Link to='/subscribe'>Subscribe</Link>
				)}
				<Link to={`/profile/${username}`}>Profile</Link>
				<Button onClick={handleLogout}>Logout</Button>
			</nav>
			<HamburgerMenu className={styles.hamburgerMenu} />
		</header>
	);
};

export default Navbar;
