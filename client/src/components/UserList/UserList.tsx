import React from 'react';
import styles from './UserList.module.scss';

interface UserListProps {
	children: any;
}

const UserList = (props: UserListProps) => {
	return <ul className={styles.userList}>{props.children}</ul>;
};

export default UserList;
