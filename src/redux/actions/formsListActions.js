import { SET_FORMS_LIST, DELETE_FORM } from 'redux/constants/formsListConstants';

export const setFormsListActionCreator = (formList) => ({ type: SET_FORMS_LIST, formList });
export const deleteFormActionCreator = (formId) => ({ type: DELETE_FORM, formId });
