import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Header from './Components/Header/Header';
import Auth from './Components/Auth/Auth';
import Body from './Components/Body/Body';

import { AppContext } from './AppContext';

function App() {
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		if (localStorage.token) {
			setIsLogin(true);
		}
	});

	return (
		<AppContext.Provider value={{ isLogin, setIsLogin }}>
			<Header />

			<Router>
				<ProtectedRoute exact path='/' isLogin={isLogin} component={Body} />
				<Route exact path='/auth' component={Auth} />
			</Router>
		</AppContext.Provider>
	);
}

export default App;
