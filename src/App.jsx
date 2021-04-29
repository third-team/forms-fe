import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import FormsList from './components/FormsList/FormsList';
import Auth from './components/Auth/Auth';
import Form from './components/Form/Form';

import { AppContext } from './AppContext';

function App() {
	const [loggedIn, setLoggedIn] = useState(null);

	useEffect(() => {
		if (localStorage.token) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	}, []);

	if (loggedIn === null) return null;
	return (
		<Router>
			<AppContext.Provider value={{ loggedIn, setLoggedIn }}>
				<Header />
				<Switch>
					<ProtectedRoute exact path='/' component={FormsList} />
					<ProtectedRoute exact path='/create-form' component={Form} />
					<Route exact path='/auth' render={(props) => <Auth {...props} />} />
				</Switch>
			</AppContext.Provider>
		</Router>
	);
}

export default App;
