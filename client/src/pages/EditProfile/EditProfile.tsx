import React, { useState, useEffect } from 'react';
import styles from './EditProfile.module.scss';

import EditProfileForm from '../../components/Form/EditProfileForm/EditProfileForm';
import User from '../../types/models/user';
import FetchUserProfileData from '../../types/fetchData/fetchUserData';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import axios from '../../axios';
import { showErrorMessage } from '../../utils/errors';
import { ErrorMessageRef } from '../../components/ErrorMessage/ErrorMessage';

const EditProfile = () => {
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);
	const [user, setUser] = useState<User>({
		username: '',
		name: '',
		email: '',
		url: '',
		subscription: '',
		followers: [],
		following: [],
		subscribers: [],
		subscriptions: [],
	});
	const dispatch = useDispatch();
	const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
		(state) => state.error.errorMessageRef
	);

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
			showErrorMessage(err, errorMessageRef, dispatch);
		}
	}, [username, dispatch, errorMessageRef]);

	return (
		<div className={styles.editProfile}>
			<EditProfileForm user={user} />
		</div>
	);
};

export default EditProfile;
