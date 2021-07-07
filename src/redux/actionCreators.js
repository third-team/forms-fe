import {
	SET_FORMS_LIST,
	REMOVE_FORM,
	UPDATE_FORM_TEXT,
	ADD_QUESTION,
	UPDATE_QUESTION_TEXT,
	CHANGE_ANSWER_TYPE,
	REMOVE_QUESTION,
	ADD_ANSWER,
	UPDATE_ANSWER_TEXT,
	UPDATE_IS_CORRECT,
	REMOVE_ANSWER,
	INITIALIZE_FORM_STATE,
	CLEAN_FORM_STATE,
} from './actions';

export const setFormsListActionCreator = (formList) => ({ type: SET_FORMS_LIST, formList });

export const removeFormActionCreator = (id) => ({ type: REMOVE_FORM, id });

export const updateFormTextActionCreator = (name) => ({ type: UPDATE_FORM_TEXT, name });

export const addQuestionActionCreator = (questionId) => ({ type: ADD_QUESTION, questionId });

export const updateQuestionTextActionCreator = (questionId, text) => ({ type: UPDATE_QUESTION_TEXT, questionId, text });

export const changeAnswerTypeActionCreator = (questionId, answerType) => ({ type: CHANGE_ANSWER_TYPE, questionId, answerType });

export const removeQuestionActionCreator = (questionId) => ({ type: REMOVE_QUESTION, questionId });

export const addAnswerActionCreator = (questionId, answerId) => ({ type: ADD_ANSWER, questionId, answerId });

export const updateAnswerTextActionCreator = (questionId, answerId, answer) => ({
	type: UPDATE_ANSWER_TEXT,
	questionId,
	answerId,
	answer,
});

export const updateIsCorrectActionCreator = (questionId, answerId, answerType, checked) => ({
	type: UPDATE_IS_CORRECT,
	questionId,
	answerId,
	answerType,
	checked,
});

export const removeAnswerActionCreator = (questionId, answerId) => ({ type: REMOVE_ANSWER, questionId, answerId });

export const initializeFormStateActionCreator = (form) => ({ type: INITIALIZE_FORM_STATE, form });

export const cleanFormStateActionCreator = () => ({ type: CLEAN_FORM_STATE });
