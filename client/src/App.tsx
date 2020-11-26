import React, { useLayoutEffect } from 'react';
import './scss/App.scss';

import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Landing from './pages/Landing/Landing';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Feed from './pages/Feed/Feed';
import Profile from './pages/Profile/Profile';
import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Wishlist/Wishlist';
import EditProfile from './pages/EditProfile/EditProfile';
import SinglePost from './pages/SinglePost/SinglePost';
import NotFound from './pages/NotFound/NotFound';
import Layout from './components/Layout/Layout';
import ErrorMessage, {
	ErrorMessageRef,
} from './components/ErrorMessage/ErrorMessage';
import { RootState } from './store';
import * as AuthActions from './store/auth/actions';
import * as ErrorActions from './store/error/actions';
import ErrorMessageHandle from './types/handles/errorMessageHandle';

// TODO: style landing page
// TODO: add 0 posts, connections
// TODO: add 404 page
const App = () => {
	const dispatch = useDispatch();
	const errorMessage = useSelector<RootState, string>(
		(state) => state.error.errorMessage
	);
	let errorMessageRef: ErrorMessageHandle<typeof ErrorMessage>;

	useLayoutEffect(() => {
		dispatch(AuthActions.login());
		dispatch(ErrorActions.setErrorMessageRef(errorMessageRef));
	});

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
