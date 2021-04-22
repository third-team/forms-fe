import { useState, useEffect } from 'react';

import Header from './Components/Header/Header';
import Auth from './Components/Auth/Auth';
import Body from './Components/Body/Body';

import { AppContext } from './AppContext';

function App() {
	const [tokenExists, setTokenExists] = useState(false);

	useEffect(() => {
		if (localStorage.token) {
			setTokenExists(true);
		}
	});

	return (
		<AppContext.Provider value={{ tokenExists, setTokenExists }}>
			<Header />

			{tokenExists ? <Body /> : <Auth setLoginState={setTokenExists} />}
		</AppContext.Provider>
	);
}

export default App;
