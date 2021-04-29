import {
	ADD_QUESTION,
	UPDATE_QUESTION_TEXT,
	CHANGE_ANSWER_TYPE,
	REMOVE_QUESTION,
	ADD_ANSWER,
	UPDATE_ANSWER_TEXT,
	UPDATE_IS_CORRECT,
	REMOVE_ANSWER,
} from './actions';

export const addQuestionActionCreator = () => ({ type: ADD_QUESTION });

export const updateQuestionTextActionCreator = (questionIndex, text) => ({ type: UPDATE_QUESTION_TEXT, questionIndex, text });

export const changeAnswerTypeActionCreator = (questionIndex, answerType) => ({ type: CHANGE_ANSWER_TYPE, questionIndex, answerType });

export const removeQuestionActionCreator = (questionIndex) => ({ type: REMOVE_QUESTION, questionIndex });

export const addAnswerActionCreator = (questionIndex) => ({ type: ADD_ANSWER, questionIndex });

export const updateAnswerTextActionCreator = (questionIndex, answerIndex, text) => ({
	type: UPDATE_ANSWER_TEXT,
	questionIndex,
	answerIndex,
	text,
});

export const updateIsCorrectActionCreator = (questionIndex, answerIndex, answerType, checked) => ({
	type: UPDATE_IS_CORRECT,
	questionIndex,
	answerIndex,
	answerType,
	checked,
});

export const removeAnswerActionCreator = (questionIndex, answerIndex) => ({ type: REMOVE_ANSWER, questionIndex, answerIndex });
