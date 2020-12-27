import React, { useEffect, useState } from 'react';

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

	return <div>{message}</div>;
};

export default PayStatus;
