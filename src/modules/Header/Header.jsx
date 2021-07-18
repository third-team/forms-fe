import './Header.scss';

import { Button } from 'components';

const Header = ({ isAuth, handleLogin }) => (
	<header>
		<Button content={isAuth ? 'Log out' : 'Log in'} variant='original' classNames='margin-left' onClickCallback={handleLogin} />
	</header>
);

export default Header;
