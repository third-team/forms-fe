import { useContext } from 'react';

import './Header.scss';

import { AppContext } from '../../AppContext';

export default function Header() {
	const { tokenExists, setTokenExists } = useContext(AppContext);

	const handleLoginButton = () => {
		console.log('kukes');

		if (tokenExists) {
			delete localStorage.token;

			setTokenExists(false);
		}
	};

	return (
		<header>
			<button type='button' className='button' onClick={handleLoginButton}>
				{tokenExists ? 'Log out' : 'Log in'}
			</button>
		</header>
	);
}
