import { uuid } from 'core';

import { questionAPI } from 'api';

import { errorConsoleLog } from 'utils/errorConsoleLog';

import {
	ADD_QUESTION_STARTED,
	ADD_QUESTION_SUCCESS,
	ADD_QUESTION_FAILURE,
	UPDATE_QUESTION_TEXT_SUCCESS,
	CHANGE_ANSWER_TYPE_SUCCESS,
	REMOVE_QUESTION_STARTED,
	REMOVE_QUESTION_SUCCESS,
	REMOVE_QUESTION_FAILURE,
} from 'redux/constants/questionConstants';

import { addNotification } from 'redux/actions/notificationsListActions';

const addQuestionStarted = (questionUuid) => ({ type: ADD_QUESTION_STARTED, payload: { questionUuid } });
const addQuestionSuccess = (questionUuid, questionId) => ({
	type: ADD_QUESTION_SUCCESS,
	payload: { questionUuid, questionId },
});
const addQuestionFailure = (questionUuid) => ({ type: ADD_QUESTION_FAILURE, payload: { questionUuid } });

export const addQuestion = (formId) => (dispatch) => {
	const questionUuid = uuid();
	dispatch(addQuestionStarted(questionUuid));

	questionAPI
		.createQuestion(formId, 'Question', 'checkbox')
		.then((response) => {
			if (response.status === 201) {
				dispatch(addNotification('Success', 'Question was created successfully!', 'success'));

				dispatch(addQuestionSuccess(questionUuid, response.data.questionId));
			}
		})
		.catch((error) => {
			errorConsoleLog('Question posting', error);

			dispatch(addNotification('Error', 'Question creating error! Check internet connection.', 'danger'));

			dispatch(addQuestionFailure(questionUuid));
		});
};

const updateQuestionTextSuccess = (questionId, text) => ({
	type: UPDATE_QUESTION_TEXT_SUCCESS,
	payload: { questionId, text },
});

export const updateQuestionText = (question, objectsIds, undoTextUpdate) => (dispatch) => {
	questionAPI
		.updateQuestionText(question, objectsIds)
		.then((response) => {
			if (response.status === 200) {
				dispatch(addNotification('Success', 'Question text was updated successfully!', 'success'));

				dispatch(updateQuestionTextSuccess(objectsIds.questionId, question));
			}
		})
		.catch((error) => {
			errorConsoleLog('Answer text updating', error);

			dispatch(addNotification('Error', 'Question text updating error! Check internet connection.', 'danger'));

			undoTextUpdate();
		});
};

const changeAnswerTypeSuccess = (questionId, answerType) => ({
	type: CHANGE_ANSWER_TYPE_SUCCESS,
	payload: {
		questionId,
		answerType,
	},
});

export const changeAnswerType = (formId, questionId, oldAnswerType, answerType) => (dispatch) => {
	dispatch(changeAnswerTypeSuccess(questionId, answerType));

	questionAPI
		.changeAnswerType(formId, questionId, answerType)
		.then((response) => {
			if (response.status === 200) {
				dispatch(addNotification('Success', 'Question answertype was updated successfully!', 'success'));
			}
		})
		.catch((error) => {
			errorConsoleLog('Answer type updating', error);

			dispatch(addNotification('Error', 'Question answertype updating error! Check internet connection.', 'danger'));

			dispatch(changeAnswerTypeSuccess(questionId, oldAnswerType));
		});
};

export const removeQuestionStarted = (questionId) => ({ type: REMOVE_QUESTION_STARTED, payload: { questionId } });
const removeQuestionSuccess = (questionId) => ({ type: REMOVE_QUESTION_SUCCESS, payload: { questionId } });
const removeQuestionFailure = (questionId) => ({ type: REMOVE_QUESTION_FAILURE, payload: { questionId } });

// prettier-ignore
export const removeQuestion = ({ questionId }) =>	(dispatch) => {
	questionAPI.removeQuestion(questionId)
		.then((response) => {
			if (response.status === 200) {
				dispatch(addNotification('Success', 'Question was removed successfully!', 'success'));

				dispatch(removeQuestionSuccess(questionId));
			}
		})
		.catch((error) => {
			errorConsoleLog('Question removing', error);

			dispatch(addNotification('Error', 'Question removing error! Check internet connection.', 'danger'));

			dispatch(removeQuestionFailure(questionId));
		});
};
