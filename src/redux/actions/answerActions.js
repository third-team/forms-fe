import { ADD_ANSWER, UPDATE_ANSWER_TEXT, UPDATE_IS_CORRECT, REMOVE_ANSWER } from 'redux/constants/answerConstants';

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
