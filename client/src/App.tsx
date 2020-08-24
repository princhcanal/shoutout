import React, { useState } from 'react';
import './scss/App.scss';

import { Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

const App = (props: any) => {
	let routes = (
		<Switch>
			<Route path='/register' component={Register} />
			<Route path='/login' component={Login} />
			<Route path='/' component={Landing} />
		</Switch>
	);
	return <div className='App'>{routes}</div>;
};

export default App;
