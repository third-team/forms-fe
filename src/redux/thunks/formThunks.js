import { axios } from 'core';

import { initializeFormActionCreator, updateFormTextActionCreator, cleanFormActionCreator } from 'redux/actions/formActions';

import { errorConsoleLog } from 'utils/errorConsoleLog';

export const initializeFormThunkCreator = (formId, setLoadingFlag, viewType) => (dispatch) => {
	axios
		.get(`/forms/${viewType === 'edit' ? 'my/' : ''}${formId}`)
		.then((response) => {
			if (response.status === 200) {
				dispatch(initializeFormActionCreator(response.data.form));

				setLoadingFlag(false);
			}
		})
		.catch((error) => {
			errorConsoleLog('Form`s getting', error);
		});
};

export const updateFormTextThunkCreator = (formName, objectsIds, undoTextUpdate) => (dispatch) => {
	axios
		.put(`/forms/${objectsIds.formId}`, { ...objectsIds, name: formName })
		.then((response) => {
			if (response.status === 200) {
				console.log('Successful form`s text changing!');

				dispatch(updateFormTextActionCreator(formName));
			}
		})
		.catch((error) => {
			errorConsoleLog('Form name updating', error);

			undoTextUpdate();
		});
};

export const cleanFormStateThunkCreator = () => (dispatch) => {
	dispatch(cleanFormActionCreator);
};
