import { axios } from 'core';

import {
	addAnswerActionCreator,
	updateAnswerTextActionCreator,
	updateIsCorrectActionCreator,
	removeAnswerActionCreator,
} from 'redux/actions/answerActions';

import { errorConsoleLog } from 'utils/errorConsoleLog';

export const addAnswerThunkCreator = (questionId) => (dispatch) => {
	const requestBody = {
		answer: 'Answer',
		isCorrect: false,
		questionId,
	};

	axios
		.post('/answers', requestBody)
		.then((response) => {
			if (response.status === 201) {
				dispatch(addAnswerActionCreator(questionId, response.data.answerId));
			}
		})
		.catch((error) => {
			errorConsoleLog('Answer posting', error);
		});
};

export const updateAnswerTextThunkCreator = (answer, objectsIds, undoTextUpdate) => (dispatch) => {
	axios
		.put(`/answers/${objectsIds.answerId}`, { ...objectsIds, answer })
		.then((response) => {
			if (response.status === 200) {
				console.log('Successful answer`s text changing!');

				dispatch(updateAnswerTextActionCreator(objectsIds.questionId, objectsIds.answerId, answer));
			}
		})
		.catch((error) => {
			errorConsoleLog('Answer text updating', error);

			undoTextUpdate();
		});
};
export const updateIsCorrectThunkCreator = (questionId, answerId, answerType, checked) => (dispatch) => {
	axios
		.put(`/answers/${answerId}`, { questionId, isCorrect: checked })
		.then((response) => {
			if (response.status === 200) {
				dispatch(updateIsCorrectActionCreator(questionId, answerId, answerType, checked));
			}
		})
		.catch((error) => {
			errorConsoleLog('isCorrect updating', error);

			dispatch(updateIsCorrectActionCreator(questionId, answerId, answerType, !checked));
		});
};
export const removeAnswerThunkCreator = (questionId, answerId, setAnimationState) => (dispatch) => {
	axios
		.delete(`/answers/${answerId}`)
		.then((response) => {
			if (response.status === 200) {
				dispatch(removeAnswerActionCreator(questionId, answerId));
			}
		})
		.catch((error) => {
			errorConsoleLog('Answer deleting', error);

			setAnimationState(true);
		});
};
