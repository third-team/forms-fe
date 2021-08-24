import { axios, uuid } from 'core';

import { errorConsoleLog } from 'utils/errorConsoleLog';

import {
	GET_FORM_STARTED,
	GET_FORM_SUCCESS,
	GET_FORM_FAILURE,
	UPDATE_FORM_TEXT_SUCCESS,
	CLEAN_FORM,
} from 'redux/constants/formConstants';

import { addNotification } from 'redux/actions/notificationsListActions';

const getFormStarted = () => ({ type: GET_FORM_STARTED });
const getFormSuccess = (form) => ({ type: GET_FORM_SUCCESS, payload: { ...form } });
const getFormFailure = () => ({ type: GET_FORM_FAILURE });

export const getForm = (formId, viewType) => (dispatch) => {
	dispatch(getFormStarted());

	axios
		.get(`/forms/${viewType === 'edit' ? 'my/' : ''}${formId}`)
		.then((response) => {
			if (response.status === 200) {
				dispatch(addNotification('Success', 'Form was got successfully!', 'success'));

				const formWithUuid = {
					...response.data.form,
					questions: response.data.form.questions.map((question) => ({
						...question,
						_uuid: uuid(),
						animation: true,
						answers: question.answers.map((answer) => ({ ...answer, _uuid: uuid(), animation: true })),
					})),
				};

				dispatch(getFormSuccess(formWithUuid));
			}
		})
		.catch((error) => {
			errorConsoleLog('Form`s getting', error);

			dispatch(addNotification('Error', 'Form getting error! Check internet connection.', 'danger'));

			dispatch(getFormFailure());
		});
};

const updateFormNameSuccess = (formName) => ({ type: UPDATE_FORM_TEXT_SUCCESS, payload: { formName } });

export const updateFormName = (formName, objectsIds, undoTextUpdate) => (dispatch) => {
	axios
		.put(`/forms/${objectsIds.formId}`, { ...objectsIds, name: formName })
		.then((response) => {
			if (response.status === 200) {
				dispatch(addNotification('Success', 'Form name was updated successfully!', 'success'));

				dispatch(updateFormNameSuccess(formName));
			}
		})
		.catch((error) => {
			errorConsoleLog('Form name updating', error);

			dispatch(addNotification('Error', 'Form name updating error! Check internet connection.', 'danger'));

			undoTextUpdate();
		});
};

export const cleanForm = () => ({ type: CLEAN_FORM });
