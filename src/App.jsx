import { useState, useEffect, createContext } from 'react';

import Header from './Components/Header/Header';
import Auth from './Components/Auth/Auth';
import Body from './Components/Body/Body';

export const AppContext = createContext();

function App() {
	const [tokenExists, setTokenExists] = useState(false);

	// temporary solution

	useEffect(() => {
		if (!localStorage.token) {
			// send request to back-end

			localStorage.token = 'tempToken';
			// setTokenExists(true);
		}
	});

	if (tokenExists) {
		return (
			<AppContext.Provider value={setTokenExists}>
				<Header />
				<Body />
			</AppContext.Provider>
		);
	}
	return <Auth setLoginState={setTokenExists} />;
}

export default App;
