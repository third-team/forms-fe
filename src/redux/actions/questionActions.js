import { ADD_QUESTION, UPDATE_QUESTION_TEXT, CHANGE_ANSWER_TYPE, REMOVE_QUESTION } from 'redux/constants/questionConstants';

export const addQuestionActionCreator = (questionId) => ({ type: ADD_QUESTION, questionId });
export const updateQuestionTextActionCreator = (questionId, text) => ({ type: UPDATE_QUESTION_TEXT, questionId, text });
export const changeAnswerTypeActionCreator = (questionId, answerType) => ({ type: CHANGE_ANSWER_TYPE, questionId, answerType });
export const removeQuestionActionCreator = (questionId) => ({ type: REMOVE_QUESTION, questionId });
