import React from 'react';
import styles from './Subscribe.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios';
import { loadStripe } from '@stripe/stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { showErrorMessage } from '../../utils/errors';
import { ErrorMessageRef } from '../../components/ErrorMessage/ErrorMessage';
import { RootState } from '../../store';

type PriceID =
	| 'price_1I1kj8F38j4MOFesWRTP5hOe'
	| 'price_1I1kjgF38j4MOFes71MV73xE';

const Subscribe = () => {
	const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
		(state) => state.error.errorMessageRef
	);
	const dispatch = useDispatch();

	const premiumPriceId = 'price_1I1kj8F38j4MOFesWRTP5hOe';
	// const goldPriceId = 'price_1I1kjgF38j4MOFes71MV73xE';

	const subscribe = async (priceId: PriceID) => {
		try {
			const STRIPE_PK =
				'pk_test_51HCfR6F38j4MOFesQcpNmFtbdDI2ycw98qfIceAWijhgdAwwqLTLDKNtCTW4QEHnWkNYcdqMBXrlPXP3ndAuQeKO00OIenhGPr';
			const stripe = await loadStripe(STRIPE_PK);
			const session = await axios.post(
				'/pay/create-subscription-session',
				{
					priceId,
				}
			);
			const { sessionId } = session.data;
			const redirect = await stripe?.redirectToCheckout({ sessionId });
			if (redirect?.error) {
				console.log(redirect.error.message);
			}
		} catch (err) {
			showErrorMessage(err, errorMessageRef, dispatch);
		}
	};

	return (
		<div className={styles.center}>
			<Card className={styles.Subscribe}>
				<h1>Shoutout Premium</h1>
				<img src='/img/shoutout_premium.svg' alt='Shoutout Premium' />
				<ul className={styles.benefitsList}>
					<li className={styles.benefit}>
						<FontAwesomeIcon icon={faCheck} color={'#3587a4'} />
						<p>Get 25% off all items</p>
					</li>
				</ul>
				<div className={styles.button}>
					<Button
						onClick={() => subscribe(premiumPriceId)}
						style={['bright', 'full-width']}
					>
						Subscribe to Shoutout Premium
					</Button>
				</div>
				{/* <Button onClick={() => subscribe(goldPriceId)}>
				Subscribe to Shoutout Gold
			</Button> */}
			</Card>
		</div>
	);
};

export default Subscribe;
