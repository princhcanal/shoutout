import React, { useRef, useState } from 'react';
import styles from './HamburgerMenu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as AuthActions from '../../../store/auth/actions';
import Backdrop from '../../Backdrop/Backdrop';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Button from '../../Button/Button';

interface HamburgerMenuProps {
	className?: string;
}

const HamburgerMenu = (props: HamburgerMenuProps) => {
	const classNames = [styles.hamburgerMenu];
	const menuRef = useRef<HTMLDivElement>(null);
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);
	const subscription = useSelector<RootState, string>(
		(state) => state.auth.subscription
	);
	const dispatch = useDispatch();
	const history = useHistory();

	if (props.className) {
		classNames.push(...props.className.split(' '));
	}

	const handleShowMenu = (showMenu: boolean) => {
		setShowMenu(showMenu);
		if (showMenu) {
			menuRef.current?.classList.add(styles.show);
		} else {
			menuRef.current?.classList.remove(styles.show);
		}
	};

	const handleLogout = () => {
		dispatch(AuthActions.logout());
		history.push('/');
	};

	return (
		<>
			<div className={classNames.join(' ')}>
				<div
					className={styles.icon}
					onClick={() => handleShowMenu(true)}
				>
					<FontAwesomeIcon icon={faBars} />
				</div>

				<div className={[styles.menu].join(' ')} ref={menuRef}>
					<ul onClick={() => handleShowMenu(false)}>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/wishlist'>Wishlist</Link>
						</li>
						<li>
							<Link to='/cart'>Cart</Link>
						</li>
						<li>
							{subscription === 'None' && (
								<Link to='/subscribe'>Subscribe</Link>
							)}
						</li>
						<li>
							<Link to={`/profile/${username}`}>Profile</Link>
						</li>
						<li>
							<Button onClick={handleLogout}>Logout</Button>
						</li>
					</ul>
				</div>
			</div>
			<Backdrop
				showBackdrop={showMenu}
				onHide={() => handleShowMenu(false)}
			/>
		</>
	);
};

export default HamburgerMenu;
