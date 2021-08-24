import { axios, uuid } from 'core';

import { errorConsoleLog } from 'utils/errorConsoleLog';

import {
	ADD_ANSWER_STARTED,
	ADD_ANSWER_SUCCESS,
	ADD_ANSWER_FAILURE,
	UPDATE_ANSWER_TEXT_SUCCESS,
	UPDATE_IS_CORRECT_SUCCESS,
	REMOVE_ANSWER_STARTED,
	REMOVE_ANSWER_SUCCESS,
	REMOVE_ANSWER_FAILURE,
} from 'redux/constants/answerConstants';

import { addNotification } from 'redux/actions/notificationsListActions';

const addAnswerStarted = (questionId, answerUuid) => ({ type: ADD_ANSWER_STARTED, payload: { questionId, answerUuid } });
const addAnswerSuccess = (questionId, answerUuid, answerId) => ({
	type: ADD_ANSWER_SUCCESS,
	payload: { questionId, answerUuid, answerId },
});
const addAnswerFailure = (questionId, answerUuid) => ({ type: ADD_ANSWER_FAILURE, payload: { questionId, answerUuid } });

export const addAnswer = (questionId) => (dispatch) => {
	const answerUuid = uuid();

	dispatch(addAnswerStarted(questionId, answerUuid));

	const requestBody = {
		answer: 'Answer',
		isCorrect: false,
		questionId,
	};

	axios
		.post('/answers', requestBody)
		.then((response) => {
			if (response.status === 201) {
				dispatch(addNotification('Success', 'Answer was created successfully!', 'success'));

				dispatch(addAnswerSuccess(questionId, answerUuid, response.data.answerId));
			}
		})
		.catch((error) => {
			errorConsoleLog('Answer posting', error);

			dispatch(addNotification('Error', 'Answer creating error! Check internet connection.', 'danger'));

			dispatch(addAnswerFailure(questionId, answerUuid));
		});
};

const updateAnswerTextSuccess = (questionId, answerId, answer) => ({
	type: UPDATE_ANSWER_TEXT_SUCCESS,
	payload: {
		questionId,
		answerId,
		answer,
	},
});

export const updateAnswerText = (answer, objectsIds, undoTextUpdate) => (dispatch) => {
	axios
		.put(`/answers/${objectsIds.answerId}`, { ...objectsIds, answer })
		.then((response) => {
			if (response.status === 200) {
				dispatch(addNotification('Success', 'Answer text was updated successfully!', 'success'));

				dispatch(updateAnswerTextSuccess(objectsIds.questionId, objectsIds.answerId, answer));
			}
		})
		.catch((error) => {
			errorConsoleLog('Answer text updating', error);

			dispatch(addNotification('Error', 'Answer text updating error! Check internet connection.', 'danger'));

			undoTextUpdate();
		});
};

const updateIsCorrectSuccess = (questionId, answerId, answerType, checked) => ({
	type: UPDATE_IS_CORRECT_SUCCESS,
	payload: {
		questionId,
		answerId,
		answerType,
		checked,
	},
});

export const updateIsCorrect = (questionId, answerId, answerType, oldChecked, checked) => (dispatch) => {
	dispatch(updateIsCorrectSuccess(questionId, answerId, answerType, checked));

	axios
		.put(`/answers/${answerId}`, { questionId, isCorrect: checked })
		.then((response) => {
			if (response.status === 200) {
				dispatch(addNotification('Success', 'Answer isCorrect was updated successfully!', 'success'));
			}
		})
		.catch((error) => {
			errorConsoleLog('isCorrect updating', error);

			dispatch(addNotification('Error', 'Answer isCorrect updating error! Check internet connection.', 'danger'));

			dispatch(updateIsCorrectSuccess(questionId, answerId, answerType, oldChecked));
		});
};
export const removeAnswerStarted = (questionId, answerId) => ({
	type: REMOVE_ANSWER_STARTED,
	payload: { questionId, answerId },
});
const removeAnswerSuccess = (questionId, answerId) => ({ type: REMOVE_ANSWER_SUCCESS, payload: { questionId, answerId } });
const removeAnswerFailure = (questionId) => ({ type: REMOVE_ANSWER_FAILURE, payload: { questionId } });

// prettier-ignore
export const removeAnswer = ({questionId, answerId}) => (dispatch) => {
	axios
		.delete(`/answers/${answerId}`)
		.then((response) => {
			if (response.status === 200) {
				dispatch(addNotification('Success', 'Answer was removed successfully!', 'success'));

				dispatch(removeAnswerSuccess(questionId, answerId));
			}
		})
		.catch((error) => {
			errorConsoleLog('Answer deleting', error);

			dispatch(addNotification('Error', 'Answer removing error! Check internet connection.', 'danger'));

			dispatch(removeAnswerFailure(questionId, answerId));
		});
};
