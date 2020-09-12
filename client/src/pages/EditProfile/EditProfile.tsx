import React, { useState, useEffect } from 'react';
import styles from './EditProfile.module.scss';

import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import User from '../../types/models/user';
import FetchUserProfileData from '../../types/fetchData/fetchUserData';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import axios from '../../axios';

const EditProfile = () => {
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);
	const [user, setUser] = useState<User>({
		username: '',
		name: '',
		email: '',
		url: '',
		followers: [],
		following: [],
		subscribers: [],
		subscriptions: [],
	});

	useEffect(() => {
		try {
			const fetchUserProfile = async () => {
				try {
					const result = await axios.get<FetchUserProfileData>(
						`/user/${username}`
					);
					setUser(result.data.user);
				} catch (err) {
					console.log(err);
				}
			};

			fetchUserProfile();
		} catch (err) {
			console.log('ERROR:', err);
		}
	}, [username]);

	return (
		<div className={styles.editProfile}>
			<EditProfileForm user={user} />
		</div>
	);
};

export default EditProfile;
