import { useEffect, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setIsAuthThunkCreator } from 'redux/thunks/userThunks';

import * as userSelector from 'redux/selectors/userSelectors';

import ProtectedRoute from 'components/ProtectedRoute';

import { Header } from 'modules';

import { Home, Auth, FormEditView, FormPassView } from 'pages';

const App = () => {
	const isAuth = useSelector(userSelector.isAuth);

	const dispatch = useDispatch();

	const setIsAuth = useCallback((newIsAuth) => {
		dispatch(setIsAuthThunkCreator(newIsAuth));
	}, []);

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
				<Header isAuth={isAuth} setIsAuth={setIsAuth} />
				<ProtectedRoute exact path='/' component={Home} />
				<ProtectedRoute exact path='/edit/:id' component={FormEditView} viewType='edit' />
				<ProtectedRoute exact path='/pass/:id' component={FormPassView} viewType='pass' />
			</>
		</Switch>
	);
};

export default App;
