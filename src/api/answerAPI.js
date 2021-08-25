import { axios } from 'core';

export default {
	createAnswer: (answer, isCorrect, questionId) => axios.post('/answers', { answer, isCorrect, questionId }),
	updateAnswerText: (answer, objectsIds) => axios.put(`/answers/${objectsIds.answerId}`, { ...objectsIds, answer }),
	updateIsCorrect: (questionId, answerId, checked) => axios.put(`/answers/${answerId}`, { questionId, isCorrect: checked }),
	removeAnswer: (answerId) => axios.delete(`/answers/${answerId}`),
};
