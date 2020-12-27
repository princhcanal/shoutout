import React, { useEffect } from 'react';
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

	return (
		<div>
			<Button onClick={manageBillingForm}>Manage Billing</Button>
		</div>
	);
};

export default SubscriptionSuccess;
