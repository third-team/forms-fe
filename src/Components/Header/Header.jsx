import { useContext } from 'react';

import './Header.scss';

import { AppContext } from '../../AppContext';

export default function Header() {
	const { isLogin, setIsLogin } = useContext(AppContext);

	const handleLoginButton = () => {
		if (isLogin) {
			delete localStorage.token;

			setIsLogin(false);
		}
	};

	return (
		<header>
			<button type='button' className='button' onClick={handleLoginButton}>
				{isLogin ? 'Log out' : 'Log in'}
			</button>
		</header>
	);
}
