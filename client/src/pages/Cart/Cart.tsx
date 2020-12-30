import React, { useState, useEffect } from 'react';
import styles from './Cart.module.scss';

import axios from '../../axios';
import { loadStripe } from '@stripe/stripe-js';

import FetchCartData from '../../types/fetchData/fetchCartData';
import PostType from '../../types/models/post';
import CartItemsSkeleton from '../../components/Loader/SkeletonLoader/CartItemsSkeleton/CartItemsSkeleton';
import { showErrorMessage } from '../../utils/errors';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessageRef } from '../../components/ErrorMessage/ErrorMessage';
import { RootState } from '../../store';
import NoCartItems from '../../components/NoData/NoCartItems/NoCartItems';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CartItems from '../../components/CartItems/CartItems';
import CartItem from '../../components/CartItems/CartItem/CartItem';
const STRIPE_PK =
	'pk_test_51HCfR6F38j4MOFesQcpNmFtbdDI2ycw98qfIceAWijhgdAwwqLTLDKNtCTW4QEHnWkNYcdqMBXrlPXP3ndAuQeKO00OIenhGPr';
const stripePromise = loadStripe(STRIPE_PK);

const Cart = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [cartProducts, setCartProducts] = useState<PostType[]>([]);
	const [cartItems, setCartItems] = useState<any[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const dispatch = useDispatch();
	const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
		(state) => state.error.errorMessageRef
	);

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const cart = await axios.get<FetchCartData>('/cart');
				setCartProducts(cart.data.products);
				setIsLoading(false);
			} catch (err) {
				showErrorMessage(err, errorMessageRef, dispatch);
			}
		};

		fetchCart();
	}, [dispatch, errorMessageRef]);

	useEffect(() => {
		setCartItems(createCartItems(cartProducts));
		// eslint-disable-next-line
	}, [cartProducts]);

	const removeCartItem = async (cartItem: PostType) => {
		await axios.delete(`/cart/${cartItem._id}`);
		cartProducts.splice(cartProducts.indexOf(cartItem), 1);
		setCartProducts([...cartProducts]);
	};

	const createCartItems = (cartProducts: PostType[]) => {
		let total = 0;
		const updatedCartItems = cartProducts.map((product) => {
			total += parseFloat(product.price.toFixed(2));

			return (
				<CartItem
					key={product._id}
					post={product}
					removeCartItem={removeCartItem}
				/>
			);
		});
		setTotalPrice(total);
		return updatedCartItems;
	};

	const checkout = async () => {
		try {
			const session = await axios.post('/pay/create-checkout-session');
			const stripe = await stripePromise;
			const redirect = await stripe?.redirectToCheckout({
				sessionId: session.data.session.id,
			});
			if (redirect?.error) {
				console.log(redirect.error.message);
			}
		} catch (err) {
			showErrorMessage(err, errorMessageRef, dispatch);
		}
	};

	return (
		<div className={styles.cart}>
			<div>
				{isLoading ? (
					<CartItemsSkeleton />
				) : cartProducts.length > 0 ? (
					<>
						<CartItems totalPrice={totalPrice}>
							{cartItems}
						</CartItems>
						<div className={styles.checkoutButton}>
							<Button
								onClick={checkout}
								style={['bright', 'full-width']}
							>
								Checkout
							</Button>
						</div>
						<Card className={styles.note}>
							<p>
								Note: This is a test checkout flow. Use credit
								card number 4242 4242 4242 4242 to succeed at
								checkout
							</p>
						</Card>
					</>
				) : (
					<NoCartItems />
				)}
			</div>
		</div>
	);
};

export default Cart;
