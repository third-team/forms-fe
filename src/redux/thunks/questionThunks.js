import { axios } from 'core';

import {
	addQuestionActionCreator,
	updateQuestionTextActionCreator,
	changeAnswerTypeActionCreator,
	removeQuestionActionCreator,
} from 'redux/actions/questionActions';

import { errorConsoleLog } from 'utils/errorConsoleLog';

export const addQuestionThunkCreator = (formId) => (dispatch) => {
	const requestBody = {
		formId,
		question: 'Question',
		answerType: 'checkbox',
	};

	axios
		.post('/questions', requestBody)
		.then((response) => {
			if (response.status === 201) {
				dispatch(addQuestionActionCreator(response.data.questionId));
			}
		})
		.catch((error) => {
			errorConsoleLog('Question posting', error);
		});
};

export const updateQuestionTextThunkCreator = (question, objectsIds, undoTextUpdate) => (dispatch) => {
	axios
		.put(`/questions/${objectsIds.questionId}`, { ...objectsIds, question })
		.then((response) => {
			if (response.status === 200) {
				console.log('Successful question`s text changing!');

				dispatch(updateQuestionTextActionCreator(objectsIds.questionId, question));
			}
		})
		.catch((error) => {
			errorConsoleLog('Answer text updating', error);

			undoTextUpdate();
		});
};

export const changeAnswerTypeThunkCreator = (formId, questionId, answerType) => (dispatch) => {
	axios
		.put(`/questions/${questionId}`, { formId, answerType })
		.then((response) => {
			if (response.status === 200) {
				dispatch(changeAnswerTypeActionCreator(questionId, answerType));
			}
		})
		.catch((error) => {
			errorConsoleLog('Answer type updating', error);
		});
};

export const removeQuestionThunkCreator = (questionId, setAnimationState) => (dispatch) => {
	axios
		.delete(`/questions/${questionId}`)
		.then((response) => {
			if (response.status === 200) {
				dispatch(removeQuestionActionCreator(questionId));
			}
		})
		.catch((error) => {
			errorConsoleLog('Question deleting', error);

			setAnimationState(true);
		});
};
