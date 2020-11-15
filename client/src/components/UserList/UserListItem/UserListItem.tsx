import React from 'react';
import styles from './UserListItem.module.scss';

import { Link } from 'react-router-dom';

interface UserListItemProps {
	username: string;
	name: string;
}

const UserListItem = (props: UserListItemProps) => {
	return (
		<li className={styles.userListItem}>
			<Link to={`/profile/${props.username}`}>
				<strong>{props.username}</strong>
				<em>{props.name}</em>
			</Link>
		</li>
	);
};

export default UserListItem;
