import { axios } from 'core';

export default {
	createQuestion: (formId, question, answerType) => axios.post('/questions', { formId, question, answerType }),
	updateQuestionText: (question, objectsIds) =>
		axios.put(`/questions/${objectsIds.questionId}`, { ...objectsIds, question }),
	changeAnswerType: (formId, questionId, answerType) => axios.put(`/questions/${questionId}`, { formId, answerType }),
	removeQuestion: (questionId) => axios.delete(`/questions/${questionId}`),
};
