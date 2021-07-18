import { axios } from 'core';

import { setIsAuthActionCreator } from 'redux/actions/userActions';

import { errorConsoleLog } from 'utils/errorConsoleLog';

export const setIsAuthThunkCreator = (isAuth) => (dispatch) => {
	dispatch(setIsAuthActionCreator(isAuth));
};

export const signInThunkCreator = (authType, email, password, redirectToPageCallback) => (dispatch) => {
	axios
		.post(`/${authType}`, { email, password })
		.then((response) => {
			if (response.status === 200) {
				axios.updateToken(response.data.token);

				dispatch(setIsAuthActionCreator(true));

				redirectToPageCallback();
			}
		})
		.catch((error) => {
			errorConsoleLog('Auth ', error);
		});
};
