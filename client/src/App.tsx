import React, { useLayoutEffect } from 'react';
import './scss/App.scss';

import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Landing from './pages/Landing/Landing';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Feed from './pages/Feed/Feed';
import Profile from './pages/Profile/Profile';
import { RootState } from './store';
import * as AuthActions from './store/auth/actions';

const App = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		dispatch(AuthActions.login());
	});

	const isLoggedIn = useSelector<RootState, boolean>(
		(state) => state.auth.isLoggedIn
	);

	let routes = (
		<Switch>
			<Route path='/register' component={Register} />
			<Route path='/login' component={Login} />
			<Route path='/' component={Landing} />
			<Redirect to='/' />
		</Switch>
	);

	if (isLoggedIn) {
		routes = (
			<Switch>
				<Route path='/profile' component={Profile} />
				<Route path='/' component={Feed} />
				<Redirect to='/' />
			</Switch>
		);
	}

	return <div className='App'>{routes}</div>;
};

export default App;
