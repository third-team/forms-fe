import { formsListAPI } from 'api';

import { errorConsoleLog } from 'utils/errorConsoleLog';

import {
	GET_FORMS_LIST_STARTED,
	GET_FORMS_LIST_SUCCESS,
	GET_FORMS_LIST_FAILURE,
	DELETE_FORM_STARTED,
	DELETE_FORM_SUCCESS,
	DELETE_FORM_FAILURE,
} from 'redux/constants/formsListConstants';

import { addNotification } from 'redux/actions/notificationsListActions';

const getFormsListStarted = () => ({ type: GET_FORMS_LIST_STARTED });
const getFormsListSuccess = (forms) => ({ type: GET_FORMS_LIST_SUCCESS, payload: { forms } });
const getFormsListFailure = () => ({ type: GET_FORMS_LIST_FAILURE });

export const getFormsList = () => (dispatch) => {
	dispatch(getFormsListStarted());

	formsListAPI
		.getForms()
		.then((response) => {
			if (response.status === 200) {
				if (response.data) {
					dispatch(addNotification('Success', 'Forms list was got successfully!', 'success'));

					const newForms = response.data.forms.map((form) => ({ ...form, animation: true }));

					dispatch(getFormsListSuccess(newForms));
				}
			}
		})
		.catch((error) => {
			errorConsoleLog('Form`s list getting', error);

			dispatch(addNotification('Error', 'Form getting error! Check internet connection.', 'danger'));

			dispatch(getFormsListFailure());
		});
};

export const deleteFormStarted = (formId) => ({ type: DELETE_FORM_STARTED, payload: { formId } });
const deleteFormSuccess = (formId) => ({ type: DELETE_FORM_SUCCESS, payload: { formId } });
const deleteFormFailure = (formId) => ({ type: DELETE_FORM_FAILURE, payload: { formId } });

// prettier-ignore
export const deleteForm = ({formId}) => (dispatch) => {
	formsListAPI.removeForm(formId)
		.then((response) => {
			if (response.status === 200) {
				dispatch(addNotification('Success', 'Form was deleted successfully!', 'success'));

				dispatch(deleteFormSuccess(formId));
			}
		})
		.catch((error) => {
			errorConsoleLog('Form deleting', error);

			dispatch(addNotification('Error', 'Form deleting error! Check internet connection.', 'danger'));

			dispatch(deleteFormFailure());
		});
};
