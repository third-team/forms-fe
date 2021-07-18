import { INITIALIZE_FORM, UPDATE_FORM_TEXT, CLEAN_FORM } from 'redux/constants/formConstants';

export const initializeFormActionCreator = (form) => ({ type: INITIALIZE_FORM, form });
export const updateFormTextActionCreator = (name) => ({ type: UPDATE_FORM_TEXT, name });
export const cleanFormActionCreator = () => ({ type: CLEAN_FORM });
