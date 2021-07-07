import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import axios from 'axios';

import './styles/utils.scss';
import './index.scss';

import appReducer from './redux/reducers';

import App from './App';

const store = createStore(appReducer);

axios.defaults.baseURL = 'https://third-team-forms.herokuapp.com';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
