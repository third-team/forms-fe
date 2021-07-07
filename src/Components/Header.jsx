import { useContext } from 'react';

import { AppContext } from '../AppContext';

import './Header.scss';

export default function Header() {
	const { loggedIn, setLoggedIn } = useContext(AppContext);

	const handleLoginButton = () => {
		if (loggedIn) {
			delete localStorage.token;

			setLoggedIn(false);
		}
	};

	return (
		<header>
			<button type='button' className='button button-original margin-left' onClick={handleLoginButton}>
				{loggedIn ? 'Log out' : 'Log in'}
			</button>
		</header>
	);
}
