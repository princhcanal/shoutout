import React, { useEffect, useState } from 'react';
import styles from './PayStatus.module.scss';

import axios from '../../axios';

const PayStatus = () => {
	const query = new URLSearchParams(window.location.search);
	const [message, setMessage] = useState<string>();

	useEffect(() => {
		const showPayStatus = async () => {
			if (query.get('success')) {
				await axios.delete('/cart');
				setMessage('Order placed :)');
			}

			if (query.get('canceled')) {
				setMessage('Order canceled :(');
			}
		};
		showPayStatus();
	}, [query]);

	const image = query.get('success')
		? '/img/pay_success.svg'
		: '/img/pay_cancel.svg';

	return (
		<div className={styles.PayStatus}>
			<h1>{message}</h1>
			<img src={image} alt='' />
		</div>
	);
};

export default PayStatus;
