import { axios } from 'core';

import { setFormsListActionCreator, deleteFormActionCreator } from 'redux/actions/formsListActions';

import { errorConsoleLog } from 'utils/errorConsoleLog';

export const setFormsListThunkCreator = (setLoadingFlag) => (dispatch) => {
	axios
		.get('/forms/my')
		.then((response) => {
			if (response.status === 200) {
				if (response.data) {
					dispatch(setFormsListActionCreator(response.data.forms));

					setLoadingFlag(false);
				}
			}
		})
		.catch((error) => {
			errorConsoleLog('Form`s list getting', error);
		});
};

export const deleteFormThunkCreator = (formId) => (dispatch) => {
	axios
		.delete(`/forms/${formId}`)
		.then((response) => {
			if (response.status === 200) {
				dispatch(deleteFormActionCreator(formId));
			}
		})
		.catch((error) => {
			errorConsoleLog('Form deleting', error);
		});
};
