import React, { useLayoutEffect } from 'react';
import './scss/App.scss';

import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from './axios';

import Landing from './pages/Landing/Landing';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Feed from './pages/Feed/Feed';
import Profile from './pages/Profile/Profile';
import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Wishlist/Wishlist';
import EditProfile from './pages/EditProfile/EditProfile';
import SinglePost from './pages/SinglePost/SinglePost';
import Subscribe from './pages/Subscribe/Subscribe';
import NotFound from './pages/NotFound/NotFound';
import SubscriptionSuccess from './pages/SubscriptionSuccess/SubscriptionSuccess';
import PayStatus from './pages/PayStatus/PayStatus';
import Layout from './components/Layout/Layout';
import ErrorMessage, {
	ErrorMessageRef,
} from './components/ErrorMessage/ErrorMessage';
import { RootState } from './store';
import * as AuthActions from './store/auth/actions';
import * as ErrorActions from './store/error/actions';
import ErrorMessageHandle from './types/handles/errorMessageHandle';
import fetchUserData from './types/fetchData/fetchUserData';

const App = () => {
	const dispatch = useDispatch();
	const errorMessage = useSelector<RootState, string>(
		(state) => state.error.errorMessage
	);
	const subscription = useSelector<RootState, string>(
		(state) => state.auth.subscription
	);
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);
	let errorMessageRef: ErrorMessageHandle<typeof ErrorMessage>;

	useLayoutEffect(() => {
		dispatch(AuthActions.login());
		dispatch(ErrorActions.setErrorMessageRef(errorMessageRef));
	});

	useLayoutEffect(() => {
		const setSubscription = async () => {
			if (!username) return;
			const user = await axios.get<fetchUserData>(`/user/${username}`);
			if (user.data.user.subscription) {
				dispatch(
					AuthActions.setSubscription(user.data.user.subscription)
				);
			}
		};
		setSubscription();
	}, [dispatch, subscription, username]);

	const isLoggedIn = useSelector<RootState, boolean>(
		(state) => state.auth.isLoggedIn
	);

	let routes = (
		<Switch>
			<Route path='/register' component={Register} />
			<Route path='/login' component={Login} />
			<Route path='/' component={Landing} />
			<Route path='/404' component={NotFound} />
			<Redirect to='/login' />
		</Switch>
	);

	if (isLoggedIn) {
		routes = (
			<Layout>
				<Switch>
					<Route path='/account/edit' component={EditProfile} />
					<Route path='/profile/:username' component={Profile} />
					<Route path='/posts/:id' component={SinglePost} />
					<Route path='/cart' component={Cart} />
					<Route path='/wishlist' component={Wishlist} />
					<Route path='/pay-status' component={PayStatus} />
					{subscription === 'None' && (
						<Route path='/subscribe' component={Subscribe} />
					)}
					<Route
						path='/subscription-success'
						component={SubscriptionSuccess}
					/>
					<Route path='/' exact component={Feed} />
					<Route path='/404' component={NotFound} />
					<Redirect to='/404' />
				</Switch>
			</Layout>
		);
	}

	return (
		<div className='App'>
			{routes}
			<ErrorMessage ref={(e) => (errorMessageRef = e as ErrorMessageRef)}>
				{errorMessage}
			</ErrorMessage>
		</div>
	);
};

export default App;
