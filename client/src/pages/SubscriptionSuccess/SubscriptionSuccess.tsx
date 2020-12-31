import React, { useEffect } from 'react';
import styles from './SubscriptionSuccess.module.scss';
import { useDispatch } from 'react-redux';

import axios from '../../axios';

import Button from '../../components/Button/Button';
import * as AuthActions from '../../store/auth/actions';

const SubscriptionSuccess = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const sessionId = urlParams.get('session_id');
	const dispatch = useDispatch();

	useEffect(() => {
		const provisionSubscription = async () => {
			dispatch(AuthActions.setSubscription('Premium'));
			await axios.patch('/user', {
				subscription: 'Premium',
			});
		};
		provisionSubscription();
		// const manageBilling = async () => {
		// 	if (sessionId) {
		// 		let sessionData = await axios.get(
		// 			`/pay/checkout-session?sessionId=${sessionId}`
		// 		);
		// 		const session = sessionData.data.session;
		// 		let customerId = session.customer;
		// 		const subscriptionId = session.subscription;
		// 	}
		// };
		// manageBilling();
	}, [sessionId, dispatch]);

	const manageBillingForm = async () => {
		const { data } = await axios.post('/pay/customer-portal', {
			sessionId,
		});
		window.location.href = data.url;
	};

	const component = sessionId && (
		<div className={styles.SubscriptionSuccess}>
			<h1>You are now subscribed to Shoutout Premium :)</h1>
			<h3>Click the button below to manage your payment</h3>
			<Button
				onClick={manageBillingForm}
				style={['bright', 'full-width']}
				className={[styles.button]}
			>
				Manage Billing
			</Button>
		</div>
	);

	return <div>{component}</div>;
};

export default SubscriptionSuccess;
