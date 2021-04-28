import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Header from './Components/Header/Header';
import FormsList from './Components/FormsList/FormsList';
import Auth from './Components/Auth/Auth';
import Form from './Components/Form/Form';

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
		<div className='app'>
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
		</div>
	);
}

export default App;
