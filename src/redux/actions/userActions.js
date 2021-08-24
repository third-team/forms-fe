import { axios } from 'core';

import { errorConsoleLog } from 'utils/errorConsoleLog';

import { SET_IS_AUTH_STARTED, SET_IS_AUTH_SUCCESS, SET_IS_AUTH_FAILURE } from 'redux/constants/userConstants';

import { addNotification } from 'redux/actions/notificationsListActions';

const setIsAuthStarted = () => ({ type: SET_IS_AUTH_STARTED });
export const setIsAuthSuccess = (isAuth) => ({ type: SET_IS_AUTH_SUCCESS, payload: { isAuth } });
const setIsAuthFailure = () => ({ type: SET_IS_AUTH_FAILURE });

export const signIn = (authType, email, password, redirectToPageCallback) => (dispatch) => {
	dispatch(setIsAuthStarted());

	axios
		.post(`/${authType}`, { email, password })
		.then((response) => {
			if (response.status === 200) {
				axios.updateToken(response.data.token);

				dispatch(addNotification('Success', 'You was authenticated successfully!', 'success'));

				dispatch(setIsAuthSuccess(true));

				redirectToPageCallback();
			}
		})
		.catch((error) => {
			errorConsoleLog('Auth ', error);

			dispatch(addNotification('Error', 'Authentication error! Check internet connection.', 'danger'));

			dispatch(setIsAuthFailure());
		});
};
