import React, { useState } from 'react';
import styles from './SearchUser.module.scss';

import axios from '../../../axios';
import { useDispatch, useSelector } from 'react-redux';

import { showErrorMessage } from '../../../utils/errors';
import { RootState } from '../../../store';
import { ErrorMessageRef } from '../../ErrorMessage/ErrorMessage';
import UserListItem from '../../UserList/UserListItem/UserListItem';
import UserList from '../../UserList/UserList';
import Card, { CardRef } from '../../Card/Card';
import CardHandle from '../../../types/handles/cardHandle';

// FIXME: search users without typing full username
const SearchUser = () => {
	// const [isLoading, setIsLoading] = useState<boolean>(true);
	const [userListItems, setUserListItems] = useState<JSX.Element[] | string>(
		[]
	);
	const dispatch = useDispatch();
	const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
		(state) => state.error.errorMessageRef
	);
	let cardRef: CardHandle<typeof Card>;

	const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			if (cardRef.card) {
				if (e.target.value.length > 0) {
					cardRef.card.classList.add(styles.show);
				} else {
					cardRef.card.classList.remove(styles.show);
				}
			}

			const username = e.target.value;

			const data = await axios.get('/user', {
				params: { username },
			});

			if (data.data.users) {
				setUserListItems([
					<UserListItem
						key={data.data.users.username}
						name={data.data.users.name}
						username={data.data.users.username}
					/>,
				]);
			} else {
				setUserListItems(`User ${username} not found`);
				// setUserListItems('No users found');
			}
		} catch (err) {
			showErrorMessage(err, errorMessageRef, dispatch);
		}
	};

	return (
		<>
			<div className={styles.searchUser}>
				<input
					type='text'
					onChange={handleOnChange}
					name='username'
					placeholder='Search User'
					autoComplete='off'
				/>
				<Card
					className={styles.userList}
					ref={(c) => (cardRef = c as CardRef)}
				>
					<UserList>{userListItems}</UserList>
				</Card>
			</div>
		</>
	);
};

export default SearchUser;
