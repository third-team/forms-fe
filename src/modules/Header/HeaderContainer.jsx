import { connect } from 'react-redux';

import { setIsAuthThunkCreator } from 'redux/thunks/userThunks';

import Header from './Header';

const HeaderContainer = ({ isAuth, setIsAuth }) => {
	const handleLogin = () => {
		if (isAuth) {
			delete localStorage.token;

			setIsAuth(false);
		}
	};

	return <Header isAuth={isAuth} handleLogin={handleLogin} />;
};

const mapStateToProps = (state) => ({
	isAuth: state.user.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
	setIsAuth: (isAuth) => {
		dispatch(setIsAuthThunkCreator(isAuth));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
