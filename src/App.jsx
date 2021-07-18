import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { setIsAuthThunkCreator } from 'redux/thunks/userThunks';

import ProtectedRoute from 'components/ProtectedRoute';

import { Header } from 'modules/Header';

import { Home } from 'pages/Home';
import { Auth } from 'pages/Auth';
import { FormCreationView } from 'pages/FormCreationView';

const App = ({ isAuth, setIsAuth }) => {
	useEffect(() => {
		if (localStorage.token) {
			setIsAuth(true);
		} else {
			setIsAuth(false);
		}
	}, []);

	if (isAuth === undefined) return null;

	return (
		<Switch>
			<Route exact path='/auth' render={(props) => <Auth {...props} />} />
			<>
				<Header />
				<ProtectedRoute exact path='/' component={Home} />
				<ProtectedRoute exact path='/editing/:id' component={FormCreationView} />
			</>
		</Switch>
	);
};

const mapStateToProps = (state) => ({ isAuth: state.user.isAuth });

const mapDispatchToProps = (dispatch) => ({
	setIsAuth: (isAuth) => {
		dispatch(setIsAuthThunkCreator(isAuth));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
