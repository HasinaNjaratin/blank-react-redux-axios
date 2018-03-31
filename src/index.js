import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoggedIn, userLoggedOut } from './actions/auth';
import rootReducer from './reducers';
import 'babel-polyfill';

// Import the components used as pages
import App from './app';


const StoreInstance = createStore( rootReducer, composeWithDevTools(applyMiddleware( thunk )));

// Init Current User
if (localStorage.getItem('user_uid')) {
	const user = {
		uid: localStorage.getItem('user_uid'),
		name: localStorage.getItem('user_name'),
		csrf_token: localStorage.getItem('user_csrf_token'),
		logout_token: localStorage.getItem('user_token'),
		role: localStorage.getItem('user_role'),
	};
	StoreInstance.dispatch(userLoggedIn(user));
} 

ReactDOM.render(
	<BrowserRouter>
		<Provider store={StoreInstance}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>,
	document.getElementById('container')
);